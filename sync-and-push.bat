@echo off
setlocal enabledelayedexpansion
title Craftiva - Deploy Multi-Photo Galleries & 3-Grid Mobile
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - MULTI-PHOTO GALLERY DEPLOY
echo =======================================================
echo.

rem 1. Ensure public directories exist
if not exist "Catalogue_Images_For_Drive" mkdir "Catalogue_Images_For_Drive"
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Copying multi-angle photos for all 14 products...
call copy-multi-images.bat >nul 2>nul

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

echo [2/4] Staging all multi-photo galleries and 3-grid mobile updates...
"!GIT_EXE!" add -A

echo.
echo [3/4] Committing multi-angle galleries (4-5 photos per product) with interactive thumbnail strip...
"!GIT_EXE!" commit -m "Add full multi-angle photo gallery (4-5 HD photos per item) with interactive thumbnail strip to product modal"

echo.
echo [4/4] Pushing to GitHub (Auto-deploys to Vercel)...
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! 4-5 Photos Per Product + 3-Grid Mobile Live!
    echo   Open: https://craftivafurniture.vercel.app/
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
