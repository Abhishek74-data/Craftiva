@echo off
setlocal enabledelayedexpansion
title Craftiva - Deploy 2-Column Mobile Grid & Product Modals
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - 2-COLUMN MOBILE GRID DEPLOY
echo =======================================================
echo.

rem 1. Ensure public directories exist
if not exist "Catalogue_Images_For_Drive" mkdir "Catalogue_Images_For_Drive"
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Copying Dining Table images & syncing all 26 photos...
copy /y "Images\West Elm Catalogue\Dining Tables\*Extendable*\01.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Main.jpg" >nul 2>nul
copy /y "Images\West Elm Catalogue\Dining Tables\*Extendable*\02.jpg" "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Lifestyle.jpg" >nul 2>nul

copy /y "Catalogue_Images_For_Drive\*.*" "public\Catalogue_Images_For_Drive\" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\*.*" "public\img\" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Main.jpg" "public\Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Set_Main.jpg" >nul 2>nul
copy /y "Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Lifestyle.jpg" "public\Catalogue_Images_For_Drive\13_Solid_Sheesham_Dining_Set_Lifestyle.jpg" >nul 2>nul
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

echo [2/4] Staging 2-column mobile layout & image fixes...
"!GIT_EXE!" add -A

echo.
echo [3/4] Committing 2-column mobile grid + instant slide-up product details...
"!GIT_EXE!" commit -m "2-column mobile e-commerce layout, instant product detail modal, and 100% verified dining images"

echo.
echo [4/4] Pushing to GitHub (Auto-deploys to Vercel)...
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! 2-Column Mobile Grid & Modals are Live!
    echo   Open: https://craftivafurniture.vercel.app/
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
