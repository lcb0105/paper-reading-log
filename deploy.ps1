# Set error preference to stop on error
$ErrorActionPreference = "Stop"

Write-Host "Step 1: Committing and pushing source code..."
git add .
$msg = Read-Host "Enter commit message (default: 'Update content')"
if ([string]::IsNullOrWhiteSpace($msg)) { 
    $msg = "Update content" 
}

# Use try/catch only for the commit command to handle "nothing to commit" gracefully
try {
    git commit -m "$msg"
} catch {
    Write-Host "Nothing to commit or commit failed. Continuing..."
}

# Push source
$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Pushing to $branch..."
git push origin $branch

# Build
Write-Host "`nStep 2: Building project..."
cmd /c "npm run build"

if (-not (Test-Path "dist")) {
    Write-Error "Build failed: 'dist' directory missing."
    exit 1
}

# Deploy
Write-Host "`nStep 3: Deploying to GitHub Pages..."
Push-Location dist

# Clean existing git in dist if any
if (Test-Path ".git") {
    Remove-Item -Path ".git" -Recurse -Force
}

git init -q
git checkout -b gh-pages
git add -A
git commit -m "deploy" -q

$remoteUrl = git -C .. remote get-url origin
if (-not $remoteUrl) {
    Pop-Location
    throw "Remote 'origin' not found."
}

Write-Host "Pushing to $remoteUrl (gh-pages)..."
git push -f $remoteUrl gh-pages

Pop-Location
Write-Host "`nDeployment successful!" -ForegroundColor Green























