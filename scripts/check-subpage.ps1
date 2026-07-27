# Struktur-/A11y-Kurzprüfung für fuer-schulen-aemter.html
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$file = Join-Path $root 'fuer-schulen-aemter.html'
$h = Get-Content -Raw -Encoding UTF8 $file

function Grab($pattern) {
  [regex]::Matches($h, $pattern) | ForEach-Object { $_.Groups[1].Value }
}

$ids = @(Grab '\sid="([^"]+)"')
$dup = @($ids | Group-Object | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name })

Write-Output '--- Überschriften ---'
[regex]::Matches($h, '(?s)<(h[1-3])\b[^>]*>(.*?)</\1>') | ForEach-Object {
  $text = ($_.Groups[2].Value -replace '<[^>]+>', '' -replace '\s+', ' ').Trim()
  if ($text.Length -gt 64) { $text = $text.Substring(0, 64) + '…' }
  Write-Output ("  {0}: {1}" -f $_.Groups[1].Value, $text)
}

$h1 = @([regex]::Matches($h, '<h1\b')).Count
Write-Output ''
Write-Output ("H1-Anzahl: {0}" -f $h1)
Write-Output ("Doppelte IDs: {0}" -f $(if ($dup.Count) { $dup -join ', ' } else { 'keine' }))

$symbols = @(Grab '<symbol id="([^"]+)"')
$uses = @(Grab '<use href="#([^"]+)"' | Sort-Object -Unique)
$missingSym = @($uses | Where-Object { $symbols -notcontains $_ })
Write-Output ("Fehlende Icon-Symbole: {0}" -f $(if ($missingSym.Count) { $missingSym -join ', ' } else { 'keine' }))

$anchors = @(Grab 'href="#([^"]+)"' | Sort-Object -Unique)
$missingAnchor = @($anchors | Where-Object { $ids -notcontains $_ })
Write-Output ("Fehlende Anker-Ziele: {0}" -f $(if ($missingAnchor.Count) { $missingAnchor -join ', ' } else { 'keine' }))

$controls = @(Grab 'aria-controls="([^"]+)"' | Sort-Object -Unique)
$missingCtrl = @($controls | Where-Object { $ids -notcontains $_ })
Write-Output ("aria-controls ohne Ziel: {0}" -f $(if ($missingCtrl.Count) { $missingCtrl -join ', ' } else { 'keine' }))

$described = @(Grab 'aria-describedby="([^"]+)"' | ForEach-Object { $_ -split '\s+' } | Sort-Object -Unique)
$missingDesc = @($described | Where-Object { $ids -notcontains $_ })
Write-Output ("aria-describedby ohne Ziel: {0}" -f $(if ($missingDesc.Count) { $missingDesc -join ', ' } else { 'keine' }))

$labels = @(Grab '<label[^>]*for="([^"]+)"' | Sort-Object -Unique)
$missingLabel = @($labels | Where-Object { $ids -notcontains $_ })
Write-Output ("label[for] ohne Feld: {0}" -f $(if ($missingLabel.Count) { $missingLabel -join ', ' } else { 'keine' }))

$imgs = @([regex]::Matches($h, '<img\b[^>]*>') | ForEach-Object { $_.Value })
$noAlt = @($imgs | Where-Object { $_ -notmatch '\salt=' })
$noDim = @($imgs | Where-Object { $_ -notmatch '\swidth=' -or $_ -notmatch '\sheight=' })
Write-Output ("Bilder ohne alt: {0}" -f $noAlt.Count)
Write-Output ("Bilder ohne width/height: {0}" -f $noDim.Count)

$assets = @(Grab '(?:src|href)="((?:assets|css|js)/[^"?#]+)' | Sort-Object -Unique)
$missingAsset = @($assets | Where-Object { -not (Test-Path (Join-Path $root $_)) })
Write-Output ("Fehlende lokale Dateien: {0}" -f $(if ($missingAsset.Count) { $missingAsset -join ', ' } else { 'keine' }))

$pages = @(Grab 'href="([a-zA-Z0-9._-]+\.html)' | Sort-Object -Unique)
$missingPage = @($pages | Where-Object { -not (Test-Path (Join-Path $root $_)) })
Write-Output ("Fehlende lokale Seiten: {0}" -f $(if ($missingPage.Count) { $missingPage -join ', ' } else { 'keine' }))
