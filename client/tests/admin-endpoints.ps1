$ErrorActionPreference = "Stop"

$Port = 4310
$BaseUrl = "http://127.0.0.1:$Port"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$StdOutLog = Join-Path $PSScriptRoot "admin-endpoints.stdout.log"
$StdErrLog = Join-Path $PSScriptRoot "admin-endpoints.stderr.log"

function Assert-Equal {
  param(
    [Parameter(Mandatory = $true)] $Actual,
    [Parameter(Mandatory = $true)] $Expected,
    [Parameter(Mandatory = $true)] [string] $Message
  )

  if ($Actual -ne $Expected) {
    throw "$Message. Expected: $Expected, Actual: $Actual"
  }
}

function Read-ErrorContent {
  param([Parameter(Mandatory = $true)] $Exception)

  if ($Exception.Response -and $Exception.Response.GetResponseStream) {
    $stream = $Exception.Response.GetResponseStream()
    if ($stream) {
      $reader = New-Object System.IO.StreamReader($stream)
      return $reader.ReadToEnd()
    }
  }

  return $null
}

function Invoke-JsonRequest {
  param(
    [Parameter(Mandatory = $true)] [string] $Path,
    [Parameter(Mandatory = $true)] [string] $Method,
    [string] $Cookie = "",
    [string] $Body = ""
  )

  $headers = @{
    "Content-Type" = "application/json"
  }

  if ($Cookie) {
    $headers["Cookie"] = $Cookie
  }

  try {
    $response = Invoke-WebRequest -Uri "$BaseUrl$Path" -Method $Method -Headers $headers -Body $Body
    $jsonBody = $null
    if ($response.Content) {
      $jsonBody = $response.Content | ConvertFrom-Json
    }
    return @{
      status = [int]$response.StatusCode
      body = $jsonBody
    }
  } catch {
    $statusCode = 0
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
      $statusCode = [int]$_.Exception.Response.StatusCode
    }

    $content = Read-ErrorContent -Exception $_.Exception
    $jsonBody = $null
    if ($content) {
      $jsonBody = $content | ConvertFrom-Json
    }

    return @{
      status = $statusCode
      body = $jsonBody
    }
  }
}

function Wait-ForServer {
  param([int] $TimeoutSec = 120)

  $deadline = (Get-Date).AddSeconds($TimeoutSec)
  while ((Get-Date) -lt $deadline) {
    if ($process -and $process.HasExited) {
      $stderr = if (Test-Path $StdErrLog) { Get-Content -Path $StdErrLog -Raw } else { "" }
      $stdout = if (Test-Path $StdOutLog) { Get-Content -Path $StdOutLog -Raw } else { "" }
      throw "Next.js dev server berhenti lebih awal dengan exit code $($process.ExitCode).`nSTDERR:`n$stderr`nSTDOUT:`n$stdout"
    }

    try {
      $ping = Invoke-WebRequest -Uri "$BaseUrl/" -Method GET
      if ($ping.StatusCode -ge 200) {
        return
      }
    } catch {
      Start-Sleep -Milliseconds 1500
    }
  }

  throw "Next.js dev server tidak siap dalam $TimeoutSec detik."
}

$process = $null

try {
  if (Test-Path $StdOutLog) { Remove-Item $StdOutLog -Force }
  if (Test-Path $StdErrLog) { Remove-Item $StdErrLog -Force }

  $process = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "dev", "--", "--port", "$Port") -PassThru -WorkingDirectory $ProjectRoot -WindowStyle Hidden -RedirectStandardOutput $StdOutLog -RedirectStandardError $StdErrLog
  Wait-ForServer

  $unauthorizedUser = Invoke-JsonRequest -Path "/api/admin/users/status" -Method "POST" -Body '{"userId":"usr-002","status":"INACTIVE"}'
  Assert-Equal -Actual $unauthorizedUser.status -Expected 401 -Message "users/status unauthorized status mismatch"
  Assert-Equal -Actual $unauthorizedUser.body.error.code -Expected "UNAUTHORIZED" -Message "users/status unauthorized code mismatch"

  $forbiddenUserRole = Invoke-JsonRequest -Path "/api/admin/users/status" -Method "POST" -Cookie "rk_session=1; rk_role=USER" -Body '{"userId":"usr-002","status":"INACTIVE"}'
  Assert-Equal -Actual $forbiddenUserRole.status -Expected 403 -Message "users/status role forbidden status mismatch"
  Assert-Equal -Actual $forbiddenUserRole.body.error.code -Expected "FORBIDDEN" -Message "users/status role forbidden code mismatch"

  $forbiddenOwnerMutation = Invoke-JsonRequest -Path "/api/admin/users/status" -Method "POST" -Cookie "rk_session=1; rk_role=ADMIN" -Body '{"userId":"usr-001","status":"INACTIVE"}'
  Assert-Equal -Actual $forbiddenOwnerMutation.status -Expected 403 -Message "users/status owner mutation status mismatch"
  Assert-Equal -Actual $forbiddenOwnerMutation.body.error.code -Expected "FORBIDDEN" -Message "users/status owner mutation code mismatch"

  $notFoundUser = Invoke-JsonRequest -Path "/api/admin/users/status" -Method "POST" -Cookie "rk_session=1; rk_role=OWNER" -Body '{"userId":"usr-404","status":"INACTIVE"}'
  Assert-Equal -Actual $notFoundUser.status -Expected 404 -Message "users/status not found status mismatch"
  Assert-Equal -Actual $notFoundUser.body.error.code -Expected "NOT_FOUND" -Message "users/status not found code mismatch"

  $unauthorizedApproval = Invoke-JsonRequest -Path "/api/admin/approvals" -Method "POST" -Body '{"approvalId":"apr-001","action":"APPROVE"}'
  Assert-Equal -Actual $unauthorizedApproval.status -Expected 401 -Message "approvals unauthorized status mismatch"
  Assert-Equal -Actual $unauthorizedApproval.body.error.code -Expected "UNAUTHORIZED" -Message "approvals unauthorized code mismatch"

  $forbiddenApprovalRole = Invoke-JsonRequest -Path "/api/admin/approvals" -Method "POST" -Cookie "rk_session=1; rk_role=KONTRAKTOR" -Body '{"approvalId":"apr-001","action":"APPROVE"}'
  Assert-Equal -Actual $forbiddenApprovalRole.status -Expected 403 -Message "approvals role forbidden status mismatch"
  Assert-Equal -Actual $forbiddenApprovalRole.body.error.code -Expected "FORBIDDEN" -Message "approvals role forbidden code mismatch"

  $notFoundApproval = Invoke-JsonRequest -Path "/api/admin/approvals" -Method "POST" -Cookie "rk_session=1; rk_role=OWNER" -Body '{"approvalId":"apr-404","action":"APPROVE"}'
  Assert-Equal -Actual $notFoundApproval.status -Expected 404 -Message "approvals not found status mismatch"
  Assert-Equal -Actual $notFoundApproval.body.error.code -Expected "NOT_FOUND" -Message "approvals not found code mismatch"

  $conflictApproval = Invoke-JsonRequest -Path "/api/admin/approvals" -Method "POST" -Cookie "rk_session=1; rk_role=OWNER" -Body '{"approvalId":"apr-002","action":"APPROVE"}'
  Assert-Equal -Actual $conflictApproval.status -Expected 409 -Message "approvals conflict status mismatch"
  Assert-Equal -Actual $conflictApproval.body.error.code -Expected "CONFLICT" -Message "approvals conflict code mismatch"

  Write-Host "Admin endpoint tests passed (401/403/409/404)."
} finally {
  if ($process -and -not $process.HasExited) {
    Stop-Process -Id $process.Id -Force
  }
}
