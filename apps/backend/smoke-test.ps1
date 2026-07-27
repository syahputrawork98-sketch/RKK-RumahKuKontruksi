$ErrorActionPreference = 'Stop'
Set-Location "apps\backend"

$env:PORT=4000
$env:SWAGGER_ENABLED='true'
$job1 = Start-Process node -ArgumentList "dist/main.js" -PassThru
Start-Sleep -Seconds 3
try {
  Write-Host "--- TEST 1: Health (PORT=4000) ---"
  $healthResponse = Invoke-WebRequest -Uri "http://localhost:4000/api/v1/health" -UseBasicParsing
  if ($healthResponse.StatusCode -ne 200) { throw "Health check failed, status code: $($healthResponse.StatusCode)" }
  Write-Host ($healthResponse.Content | ConvertFrom-Json | ConvertTo-Json)

  Write-Host "--- TEST 2: Swagger Enabled ---"
  $swaggerOnResponse = Invoke-WebRequest -Uri "http://localhost:4000/api/docs" -UseBasicParsing
  if ($swaggerOnResponse.StatusCode -ne 200) { throw "Swagger ON check failed, status code: $($swaggerOnResponse.StatusCode)" }
  Write-Host "Swagger is ON (Status 200)"
} finally {
  Stop-Process -Id $job1.Id -Force -ErrorAction SilentlyContinue
}

$env:PORT=4001
$env:SWAGGER_ENABLED='false'
$job2 = Start-Process node -ArgumentList "dist/main.js" -PassThru
Start-Sleep -Seconds 3
try {
  Write-Host "--- TEST 3: Swagger Disabled ---"
  try {
    $res = Invoke-WebRequest -Uri "http://localhost:4001/api/docs" -UseBasicParsing
    if ($res.StatusCode -ne 404) { throw "Swagger should be OFF but returned status code: $($res.StatusCode)" }
  } catch {
    $statusCode = 0
    if ($_.Exception -and $_.Exception.Response) {
       $statusCode = [int]$_.Exception.Response.StatusCode
    }
    if ($statusCode -eq 404) {
      Write-Host "Swagger is OFF (Status 404)"
    } else {
      throw "Swagger OFF check failed, expected 404 but got $statusCode. Error: $_"
    }
  }
} finally {
  Stop-Process -Id $job2.Id -Force -ErrorAction SilentlyContinue
}
