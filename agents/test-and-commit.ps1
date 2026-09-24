# test-and-commit.ps1
# Runs TypeScript type-check + Next.js build. If both pass, commits and pushes.
# Usage: .\agents\test-and-commit.ps1 [-Message "commit message"]
#        .\agents\test-and-commit.ps1          # auto-generates message from git diff

param(
  [string]$Message = ""
)

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$AppDir   = Join-Path $RepoRoot "app"

function Write-Step($text) { Write-Host "`n==> $text" -ForegroundColor Cyan }
function Write-Ok($text)   { Write-Host "    [OK] $text" -ForegroundColor Green }
function Write-Fail($text) { Write-Host "    [FAIL] $text" -ForegroundColor Red }

# ── Step 1: TypeScript type-check ────────────────────────────────────────────
Write-Step "TypeScript type-check (npx tsc --noEmit)"
Push-Location $AppDir
try {
  npx tsc --noEmit
  if ($LASTEXITCODE -ne 0) {
    Write-Fail "Type errors found. Commit aborted."
    exit 1
  }
  Write-Ok "No type errors."
} finally {
  Pop-Location
}

# ── Step 2: Next.js build ─────────────────────────────────────────────────────
Write-Step "Next.js build (npm run build)"
Push-Location $AppDir
try {
  npm run build
  if ($LASTEXITCODE -ne 0) {
    Write-Fail "Build failed. Commit aborted."
    exit 1
  }
  Write-Ok "Build succeeded."
} finally {
  Pop-Location
}

# ── Step 3: Stage changes ─────────────────────────────────────────────────────
Write-Step "Staging changes"
Push-Location $RepoRoot
try {
  $status = git status --short
  if (-not $status) {
    Write-Host "    Nothing to commit." -ForegroundColor Yellow
    exit 0
  }

  # Stage everything except .env files
  git add --all
  git reset HEAD -- "*.env*" "**/.env*" "**/.env.local" 2>$null

  $staged = git diff --cached --stat
  if (-not $staged) {
    Write-Host "    Nothing staged after filtering secrets." -ForegroundColor Yellow
    exit 0
  }
  Write-Ok "Staged:`n$staged"

  # ── Step 4: Commit ────────────────────────────────────────────────────────
  Write-Step "Committing"
  if (-not $Message) {
    # Auto-generate from changed file names
    $files = (git diff --cached --name-only) -join ", "
    $Message = "Update $files"
  }

  $fullMessage = "$Message`n`nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
  git commit -m $fullMessage
  if ($LASTEXITCODE -ne 0) {
    Write-Fail "Commit failed."
    exit 1
  }
  $sha = git rev-parse --short HEAD
  Write-Ok "Committed: $sha"

  # ── Step 5: Push ──────────────────────────────────────────────────────────
  Write-Step "Pushing to GitHub"
  git push
  if ($LASTEXITCODE -ne 0) {
    Write-Fail "Push failed. Commit exists locally ($sha), push manually."
    exit 1
  }
  Write-Ok "Pushed to origin/master."

} finally {
  Pop-Location
}

Write-Host "`nDone. All checks passed and changes pushed." -ForegroundColor Green
