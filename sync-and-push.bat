@echo off
setlocal enabledelayedexpansion
title Craftiva - Sync Images to Public & Push
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - SYNC IMAGES & PUSH
echo =======================================================
echo.

rem 1. Ensure public directories exist
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Copying images to public directory for Vercel CDN...
xcopy /s /y "Catalogue_Images_For_Drive\*.*" "public\Catalogue_Images_For_Drive\" >nul 2>nul
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

echo [2/4] Staging public images and updated components...
"!GIT_EXE!" add public/
"!GIT_EXE!" add -A

echo [3/4] Committing static image assets and header logo...
"!GIT_EXE!" commit -m "Add high-res curated catalogue photos and cloud logo to Vercel"

echo [4/4] Pushing to GitHub (Auto-deploys to Vercel)...
"!GIT_EXE!" push -u origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! All images and logo pushed to Vercel!
    echo   Live in 30 seconds: https://craftivafurniture.vercel.app/
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
