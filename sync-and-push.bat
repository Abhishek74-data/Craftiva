@echo off
setlocal enabledelayedexpansion
title Craftiva - Sync Images to Public & Push
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - SYNC IMAGES TO PUBLIC CDN
echo =======================================================
echo.

rem 1. Ensure public folders exist
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Copying all 26 curated photos into public CDN folder...
copy /y "Catalogue_Images_For_Drive\*.*" "public\Catalogue_Images_For_Drive\"
copy /y "Catalogue_Images_For_Drive\*.*" "public\img\"
copy /y "Images\Logo.png" "public\img\Logo.png"
copy /y "Images\Logo.png" "public\Logo.png"
copy /y "Craftiva-Catalogue.html" "public\catalogue.html"

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

echo.
echo [2/4] Staging images for Git...
"!GIT_EXE!" add -A

echo.
echo [3/4] Committing images to GitHub repository...
"!GIT_EXE!" commit -m "Upload all curated product photos and logo to public CDN"

echo.
echo [4/4] Pushing images to GitHub (Triggers instant Vercel CDN deployment)...
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! All photos and logo uploaded to Vercel CDN!
    echo   Open: https://craftivafurniture.vercel.app/
    echo   Open: https://craftivafurniture.vercel.app/catalogue.html
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
