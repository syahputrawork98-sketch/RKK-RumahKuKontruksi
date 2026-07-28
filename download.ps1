$images = @{
  "hero-h1" = "29299826"
  "hero-h2" = "8470040"
  "hero-h3" = "29197533"
  "sec-s1" = "6285159"
  "sec-s2" = "6894105"
  "sec-s3" = "4792480"
}

$outDir = "apps/web/src/assets/images/home"
if (!(Test-Path $outDir)) {
  New-Item -ItemType Directory -Force -Path $outDir
}

foreach ($key in $images.Keys) {
  $id = $images[$key]
  $url = "https://images.pexels.com/photos/$id/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  $outFile = "$outDir/$key.jpg"
  Write-Host "Downloading $key from $url..."
  curl.exe -sL -o $outFile $url
}
Write-Host "Done downloading."
