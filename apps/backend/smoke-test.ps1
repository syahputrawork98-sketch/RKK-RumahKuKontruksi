Set-Location "apps\backend"

$env:PORT=4000
$env:SWAGGER_ENABLED='true'
$job1 = Start-Process node -ArgumentList "dist/main.js" -PassThru
Start-Sleep -Seconds 3
Write-Host "--- TEST 1: Health (PORT=4000) ---"
Invoke-RestMethod -Uri "http://localhost:4000/api/v1/health" | ConvertTo-Json
Write-Host "--- TEST 2: Swagger Enabled ---"
Invoke-WebRequest -Uri "http://localhost:4000/api/docs" -UseBasicParsing | Select-Object StatusCode
Stop-Process -Id $job1.Id -Force

$env:PORT=4001
$env:SWAGGER_ENABLED='false'
$job2 = Start-Process node -ArgumentList "dist/main.js" -PassThru
Start-Sleep -Seconds 3
Write-Host "--- TEST 3: Swagger Disabled ---"
try {
  Invoke-WebRequest -Uri "http://localhost:4001/api/docs" -UseBasicParsing | Select-Object StatusCode
} catch {
  Write-Host $_.Exception.Response.StatusCode.value__
}
Stop-Process -Id $job2.Id -Force
