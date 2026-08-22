@echo off
setlocal enabledelayedexpansion
title Craftiva - Deploy Mobile-First Update
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - MOBILE-FIRST LIVE DEPLOY
echo =======================================================
echo.

rem 1. Ensure public directories exist
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Syncing photos and catalogue files...
copy /y "Catalogue_Images_For_Drive\*.*" "public\Catalogue_Images_For_Drive\" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\*.*" "public\img\" >nul 2>nul
copy /y "Images\Logo.png" "public\img\Logo.png" >nul 2>nul
copy /y "Images\Logo.png" "public\Logo.png" >nul 2>nul
copy /y "Craftiva-Catalogue.html" "public\catalogue.html" >nul 2>nul

rem Locate Git
set "GIT_EXE="
where git >nul 2>nul
if %errorlevel% equ 0 set "GIT_EXE=git"

if "%GIT_EXE%"=="" (
    if exist "C:\Program Files\Git\cmd\git.exe" (
        set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
        set "PATH=%PATH%;C:\Program Files\Git\cmd;C:\Program Files\Git\bin"
    )
)

if "%GIT_EXE%"=="" (
    if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" (
        set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
        set "PATH=%PATH%;%LOCALAPPDATA%\Programs\Git\cmd"
    )
)

echo [Found Git: !GIT_EXE!]
echo.

echo [2/4] Staging mobile-optimized layout...
"!GIT_EXE!" add -A

echo.
echo [3/4] Committing mobile-first interactive upgrade...
"!GIT_EXE!" commit -m "Mobile-first overhaul: Tap-to-flip room views, sticky chips, and mobile WhatsApp bar"

echo.
echo [4/4] Pushing to GitHub (Auto-deploys to Vercel)...
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! Mobile-friendly update deployed!
    echo   Live in 30 seconds: https://craftivafurniture.vercel.app/
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
