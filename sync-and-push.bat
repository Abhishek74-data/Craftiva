@echo off
setlocal enabledelayedexpansion
title Craftiva - Master Deploy to Vercel
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - FIX BUILD & PUSH TO VERCEL
echo =======================================================
echo.

rem 1. Ensure public directories exist
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Syncing photos to public directory...
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

echo [2/4] Staging all files...
"!GIT_EXE!" add -A

echo.
echo [3/4] Committing fix for Vercel compilation...
"!GIT_EXE!" commit -m "Fix lib/data.ts exports (getCategory, getRelated) for successful Vercel build"

echo.
echo [4/4] Pushing to GitHub (Triggers GREEN build on Vercel)...
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! Pushed to GitHub!
    echo   Vercel Dashboard (Tab 11) will turn GREEN in 30s!
    echo   Live URL: https://craftivafurniture.vercel.app/
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
