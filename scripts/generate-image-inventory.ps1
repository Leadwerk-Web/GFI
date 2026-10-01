param(
  [string]$Root = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$imageExtensions = @('.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico')
$sourceExtensions = @('.html', '.css', '.js')
$referencePattern = '(?i)(?:assets/[A-Za-z0-9_ ./()ÄÖÜäöüß-]+?\.(?:png|jpe?g|gif|webp|svg|avif|ico))(?:\?[^\s''""\)<>]+)?|https?://[^\s''""\)<>]+?\.(?:png|jpe?g|gif|webp|svg|avif|ico)(?:\?[^\s''""\)<>]+)?'
$excludedAssetPattern = '(?i)(?:\.svg$|(^|/)[^/]*(?:logo|favicon)[^/]*\.(?:png|jpe?g|gif|webp|avif|ico)$)'

function Relative-Path([string]$Path) {
  return $Path.Substring($rootPath.Length + 1).Replace('\', '/')
}

function Plain-Text([string]$Html) {
  $value = [regex]::Replace($Html, '<[^>]+>', ' ')
  $value = [System.Net.WebUtility]::HtmlDecode($value)
  return ([regex]::Replace($value, '\s+', ' ')).Trim()
}

function Escape-Cell([string]$Value) {
  if ($null -eq $Value) { return '' }
  return $Value.Replace('|', '\|').Replace("`r", ' ').Replace("`n", ' ')
}

function Placement([string]$Line, [string]$Heading, [bool]$InFooter) {
  if ($Line -match '(?i)og:image|twitter:image') { return 'Social-Media-Vorschaubild' }
  if ($Line -match '(?i)rel=[""''][^""'']*icon') { return 'Browser-Favicon' }
  if ($Line -match '(?i)loader-mark') { return 'Ladebildschirm' }
  if ($Line -match '(?i)brand-logo') { return 'Header / Navigation' }
  if ($InFooter -and $Line -match '(?i)<img') { return 'Footer' }
  if ($Line -match '(?i)poster=|hero-(?:image|img|video|media)|class=[""''][^""'']*\bhero\b') { return 'Hero / Seitenkopf' }
  if ($Line -match '(?i)quote|zitat|voices-mark') { return 'Zitat / Stimmen' }
  if ($Line -match '(?i)quality-badge|badge-gptw') { return 'Auszeichnungs-Badge' }
  if ($Line -match '(?i)news-media') { return 'News-Karte' }
  if ($Line -match '(?i)background|url\(') { return 'CSS-/Hintergrundbild' }
  if ($Heading) { return $Heading }
  return 'Seiteninhalt (ohne eindeutige Überschrift)'
}

$sourceFiles = Get-ChildItem -LiteralPath $rootPath -Recurse -File | Where-Object {
  $sourceExtensions -contains $_.Extension.ToLowerInvariant() -and
  $_.FullName -notmatch '\\(node_modules|dist|build)\\'
}

$usages = [System.Collections.Generic.List[object]]::new()
foreach ($file in $sourceFiles) {
  $relative = Relative-Path $file.FullName
  $lines = Get-Content -LiteralPath $file.FullName
  $heading = ''
  $inFooter = $false
  for ($index = 0; $index -lt $lines.Count; $index++) {
    $line = $lines[$index]
    if ($line -match '(?i)<footer\b') { $inFooter = $true }
    if ($line -match '(?i)<h[1-4]\b[^>]*>(.*?)</h[1-4]>') {
      $candidate = Plain-Text $Matches[1]
      if ($candidate) { $heading = $candidate }
    }
    foreach ($match in [regex]::Matches($line, $referencePattern)) {
      $reference = $match.Value
      $normalized = ($reference -replace '\?.*$', '')
      $alt = ''
      if ($line -match '(?i)alt=[""'']([^""'']*)[""'']') { $alt = Plain-Text $Matches[1] }
      $usages.Add([pscustomobject]@{
        File = $relative
        Line = $index + 1
        Reference = $reference
        Normalized = $normalized
        Placement = Placement $line $heading $inFooter
        Alt = $alt
        External = $reference -match '^https?://'
      })
    }
    if ($line -match '(?i)</footer>') { $inFooter = $false }
  }
}
$usages = @($usages | Where-Object { $_.Normalized.Replace('\', '/') -notmatch $excludedAssetPattern })

$imageFiles = Get-ChildItem -LiteralPath (Join-Path $rootPath 'assets') -Recurse -File | Where-Object {
  $imageExtensions -contains $_.Extension.ToLowerInvariant() -and
  (Relative-Path $_.FullName) -notmatch $excludedAssetPattern
}
$hashed = foreach ($image in $imageFiles) {
  [pscustomobject]@{
    Path = Relative-Path $image.FullName
    Hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $image.FullName).Hash
    Bytes = $image.Length
  }
}
$hashGroups = @($hashed | Group-Object Hash | Where-Object Count -gt 1 | Sort-Object Count -Descending)
$localNormalized = @($usages | Where-Object { -not $_.External } | ForEach-Object { $_.Normalized.Replace('\', '/') } | Sort-Object -Unique)
$unusedImages = @($hashed | Where-Object { $localNormalized -notcontains $_.Path } | Sort-Object Path)
$duplicateFileCount = ($hashGroups | ForEach-Object Count | Measure-Object -Sum).Sum
$multiReferencedHashGroups = @($hashGroups | Where-Object { @($_.Group | Where-Object { $localNormalized -contains $_.Path }).Count -gt 1 })
$duplicateExtraBytes = ($hashGroups | ForEach-Object { ($_.Count - 1) * $_.Group[0].Bytes } | Measure-Object -Sum).Sum
$repeatedReferences = @($usages | Group-Object Normalized | Where-Object Count -gt 1 | Sort-Object @{ Expression = 'Count'; Descending = $true }, Name)
$legacyPattern = '^(index-v[123]\.html|design-handout\.html|hero-veil-preview\.html|color-dark-preview\.html|Stand-seit-letztem-Termin\.html)$'
$activeUsages = @($usages | Where-Object { $_.File -notmatch $legacyPattern -and $_.File -notmatch '^css/(home-v1|styles-v[23])\.css$' })

$out = [System.Collections.Generic.List[string]]::new()
$tick = [char]96
$out.Add('# Bildinventar des GFI-Webprojekts')
$out.Add('')
$out.Add("Stand: $(Get-Date -Format 'dd.MM.yyyy HH:mm')")
$out.Add('')
$out.Add('## Kurzüberblick')
$out.Add('')
$out.Add('| Kennzahl | Anzahl |')
$out.Add('|---|---:|')
$out.Add("| Bildreferenzen im gesamten Projekt | $($usages.Count) |")
$out.Add("| Unterschiedliche referenzierte Bild-URLs/-Pfade | $(@($usages.Normalized | Sort-Object -Unique).Count) |")
$out.Add("| Bildreferenzen in aktiven Seiten/Styles (ohne Entwürfe/Versionen) | $($activeUsages.Count) |")
$out.Add("| Unterschiedliche Bilder in aktiven Seiten/Styles | $(@($activeUsages.Normalized | Sort-Object -Unique).Count) |")
$out.Add('| Lokale Bilddateien unter ' + $tick + 'assets/' + $tick + " | $($imageFiles.Count) |")
$out.Add("| Physische Dubletten-Gruppen (identischer SHA-256-Inhalt) | $($hashGroups.Count) |")
$out.Add("| Dateien innerhalb dieser Dubletten-Gruppen | $duplicateFileCount |")
$out.Add("| Dubletten-Gruppen, deren verschiedene Pfade tatsächlich referenziert werden | $($multiReferencedHashGroups.Count) |")
$out.Add("| Theoretisch redundanter Speicher durch alle physischen Dubletten | $([math]::Round($duplicateExtraBytes / 1MB, 2)) MiB |")
$out.Add("| Derzeit nicht referenzierte lokale Bilddateien | $($unusedImages.Count) |")
$out.Add('')
$out.Add('**Ausgenommen:** Logo-, Favicon- und sämtliche SVG-Dateien sind auf Wunsch nicht Bestandteil dieses auf Fotomaterial ausgerichteten Inventars.')
$out.Add('')
$out.Add('**Scope-Hinweis:** Als Entwürfe/Varianten gelten `index-v1.html`, `index-v2.html`, `index-v3.html`, `design-handout.html`, `hero-veil-preview.html`, `color-dark-preview.html` und `Stand-seit-letztem-Termin.html` sowie deren variantenspezifische Styles. Sie sind im vollständigen Inventar enthalten, aber nicht in der Kennzahl „aktive Seiten“.' )
$out.Add('')
$out.Add('## Mehrfach verwendete Bildreferenzen')
$out.Add('')
$out.Add('Hier bedeutet „Dopplung“: derselbe Pfad bzw. dieselbe URL wird mehrfach eingebunden. Das ist bei wiederkehrenden Gestaltungselementen, etwa dem Zitatzeichen, häufig beabsichtigt.')
$out.Add('')
$out.Add('| Anzahl | Bild | Verwendet in |')
$out.Add('|---:|---|---|')
foreach ($group in $repeatedReferences) {
  $pages = ($group.Group.File | Sort-Object -Unique) -join ', '
  $out.Add("| $($group.Count) | $tick$(Escape-Cell $group.Name)$tick | $(Escape-Cell $pages) |")
}
$out.Add('')
$out.Add('## Platzierung nach Datei')
$out.Add('')
$out.Add('Zeilennummern beziehen sich auf den aktuellen Projektstand. Wiederholungen desselben Bildes in derselben Datei sind in einer Tabellenzeile zusammengefasst.')
$out.Add('')
foreach ($fileGroup in ($usages | Group-Object File | Sort-Object Name)) {
  $out.Add("### $($fileGroup.Name)")
  $out.Add('')
  $out.Add('| Bild | Zeile(n) und Platzierung / Abschnitt | Alt-Text |')
  $out.Add('|---|---|---|')
  foreach ($refGroup in ($fileGroup.Group | Group-Object Normalized | Sort-Object { ($_.Group | Measure-Object Line -Minimum).Minimum })) {
    $locations = @()
    foreach ($placementGroup in ($refGroup.Group | Group-Object Placement | Sort-Object { ($_.Group | Measure-Object Line -Minimum).Minimum })) {
      $placementLines = ($placementGroup.Group.Line | Sort-Object -Unique) -join ', '
      $locations += "$placementLines – $(Escape-Cell $placementGroup.Name)"
    }
    $alts = ($refGroup.Group.Alt | Where-Object { $_ } | Sort-Object -Unique) -join '; '
    $out.Add("| $tick$(Escape-Cell $refGroup.Name)$tick | $($locations -join '; ') | $(Escape-Cell $alts) |")
  }
  $out.Add('')
}
$out.Add('## Physisch identische Dateien unter verschiedenen Pfaden')
$out.Add('')
$out.Add('Diese Gruppen sind byte-identisch (SHA-256), nicht nur optisch ähnlich. „genutzt“ heißt: mindestens eine Referenz im untersuchten HTML/CSS/JS.')
$out.Add('')
$groupNumber = 0
foreach ($group in $hashGroups) {
  $groupNumber++
  $out.Add("### Dublettengruppe $groupNumber — $($group.Count) Dateien, $($group.Group[0].Bytes) Bytes")
  $out.Add('')
  foreach ($entry in ($group.Group | Sort-Object Path)) {
    $used = if ($localNormalized -contains $entry.Path) { 'genutzt' } else { 'ungenutzt' }
    $out.Add("- $tick$($entry.Path)$tick — $used")
  }
  $out.Add('')
}
$out.Add('## Nicht referenzierte lokale Bilddateien')
$out.Add('')
$out.Add('Diese Dateien wurden in keinem untersuchten HTML-, CSS- oder JS-Quelltext gefunden. Eine indirekte Laufzeitnutzung außerhalb dieser Dateien ist damit nicht ausgeschlossen.')
$out.Add('')
foreach ($entry in $unusedImages) {
  $out.Add("- $tick$($entry.Path)$tick")
}

$out -join "`n"
