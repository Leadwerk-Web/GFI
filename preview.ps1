# Lokale Vorschau für die GFI-Homepage (ohne Python/Node)
$port = 5500
$root = $PSScriptRoot
$url = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
  $listener.Start()
} catch {
  Write-Host "Fehler: Port $port belegt oder keine Berechtigung." -ForegroundColor Red
  Write-Host $_.Exception.Message
  exit 1
}

Write-Host ""
Write-Host "GFI Vorschau laeuft:" -ForegroundColor Green
Write-Host "  $url"
Write-Host "  Ordner: $root"
Write-Host ""
Write-Host "Browser oeffnet sich automatisch. Strg+C zum Beenden."
Write-Host ""

Start-Process $url

function Get-MimeType([string]$ext) {
  switch ($ext.ToLower()) {
    ".html" { return "text/html; charset=utf-8" }
    ".css"  { return "text/css; charset=utf-8" }
    ".js"   { return "application/javascript; charset=utf-8" }
    ".svg"  { return "image/svg+xml" }
    ".jpeg" { return "image/jpeg" }
    ".jpg"  { return "image/jpeg" }
    ".png"  { return "image/png" }
    ".webp" { return "image/webp" }
    default { return "application/octet-stream" }
  }
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $rel = [Uri]::UnescapeDataString($request.Url.LocalPath).TrimStart("/")
    if (-not $rel -or $rel -eq "/") { $rel = "index.html" }

    $file = Join-Path $root ($rel -replace "/", [IO.Path]::DirectorySeparatorChar)

    if ((Test-Path $file -PathType Leaf) -and $file.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $response.ContentType = Get-MimeType ([IO.Path]::GetExtension($file))
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $rel")
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $response.Close()
  }
} finally {
  $listener.Stop()
}
