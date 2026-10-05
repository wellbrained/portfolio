param([string]$Source = (Split-Path -Parent $PSScriptRoot))
$ErrorActionPreference = 'Stop'
$privateKey = (& git -C $Source config --local portfolio.sshKey)
$remoteHost = (& git -C $Source config --local portfolio.sshHost)
if (!$privateKey -or !$remoteHost) { throw 'Configure portfolio.sshKey and portfolio.sshHost in local Git config before deploying.' }
$changes = & git -C $Source status --porcelain
if ($LASTEXITCODE -ne 0 -or $changes) { throw 'Commit source changes before deploying.' }
$revision = (& git -C $Source rev-parse --short=12 HEAD).Trim()
$release = "$(Get-Date -Format yyyyMMddHHmmss)-$revision"
$archive = Join-Path $env:TEMP "portfolio-$release.tar.gz"
& git -C $Source archive --format=tar.gz "--output=$archive" HEAD
if ($LASTEXITCODE -ne 0) { throw 'Source archive failed.' }
& scp.exe -i $privateKey -o BatchMode=yes -o StrictHostKeyChecking=yes $archive "${remoteHost}:/tmp/portfolio-$release.tar.gz"
if ($LASTEXITCODE -ne 0) { throw 'Upload failed.' }
& ssh.exe -i $privateKey -o BatchMode=yes -o StrictHostKeyChecking=yes $remoteHost "/usr/local/bin/portfolio-deploy $release"
if ($LASTEXITCODE -ne 0) { throw 'Deployment failed. Previous release retained.' }
