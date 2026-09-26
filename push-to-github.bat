@echo off
title Push to GitHub - Craftiva
cd /d "%~dp0"

echo =============================================
echo  Craftiva - Push to GitHub & Trigger Vercel
echo =============================================
echo.

REM Check if we're in a git repo
if not exist ".git" (
    echo [ERROR] Not a git repository
    pause
    exit /b 1
)

echo [1/4] Checking git status...
git status --short

echo.
echo [2/4] Staging all changes...
git add -A

echo.
echo [3/4] Committing...
set /p msg="Enter commit message (or press Enter for default): "
if "%msg%"=="" set msg="Fix: image fallbacks, price display, colour/size selectors, search, logo, ProductView data-driven sizes, QuickView modal, SearchDrawer integration, QuoteCTA consistency, header logo/count/search, category fallbacks, remove hardcoded URLs/assertions"

git commit -m "%msg%"
if errorlevel 1 (
    echo.
    echo [NOTE] Nothing to commit (working tree clean) or commit failed
    echo.
    goto push
)

:push
echo.
echo [4/4] Pushing to GitHub...
git push origin main
if errorlevel 1 (
    echo.
    echo [ERROR] Push failed. Are you on 'main' branch? Try: git push origin HEAD
    echo.
) else (
    echo.
    echo =============================================
    echo  SUCCESS! Changes pushed to GitHub.
    echo  Vercel will now auto-deploy.
    echo  Check: https://vercel.com/dashboard
    echo =============================================
)

echo.
pause