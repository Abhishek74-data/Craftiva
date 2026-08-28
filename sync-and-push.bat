@echo off
setlocal enabledelayedexpansion
title Craftiva - Master GitHub & Vercel Sync
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - GITHUB & VERCEL AUTO-DEPLOY
echo =======================================================
echo.

rem ---- Locate Node.js on Windows ----
set "NODE_CMD="
where node >nul 2>nul && set "NODE_CMD=node"
if not defined NODE_CMD if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles%\nodejs\node.exe"
if not defined NODE_CMD if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles(x86)%\nodejs\node.exe"
if not defined NODE_CMD if exist "%APPDATA%\nvm\current\node.exe" set "NODE_CMD=%APPDATA%\nvm\current\node.exe"
if not defined NODE_CMD if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_CMD=%LOCALAPPDATA%\Programs\node\node.exe"
if not defined NODE_CMD if exist "C:\nodejs\node.exe" set "NODE_CMD=C:\nodejs\node.exe"
if not defined NODE_CMD if exist "D:\nodejs\node.exe" set "NODE_CMD=D:\nodejs\node.exe"

if not defined NODE_CMD (
    echo [ERROR] Node.js could not be found.
    pause
    exit /b 1
)

if not "%NODE_CMD%"=="node" (
    for %%i in ("%NODE_CMD%") do set "NODE_DIR=%%~dpi"
    set "PATH=!NODE_DIR!;!PATH!"
)

rem 1. Ensure public directories exist
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"

echo [1/4] Syncing all multi-angle product showcase images...
node scripts/sync-all-showcase.mjs
copy /y "Craftiva-Catalogue.html" "public\catalogue.html" >nul 2>nul
copy /y "Images\Logo.png" "public\img\Logo.png" >nul 2>nul
copy /y "Images\Logo.png" "public\Logo.png" >nul 2>nul

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

echo [2/4] Staging all verified files and photos...
"!GIT_EXE!" add -A

echo.
echo [3/4] Creating clean deployment commit...
"!GIT_EXE!" commit -m "Sync full multi-angle catalog, interactive product specs, and clean Vercel production build"

echo.
echo [4/4] Pushing to GitHub (Auto-triggering Vercel deployment)...
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! GitHub par code push ho gaya!
    echo   Vercel automatically ise 30 seconds me live kar dega.
    echo.
    echo   Live URL: https://craftivafurniture.vercel.app/
    echo =======================================================
) else (
    echo.
    echo [ERROR] Push failed. Check output above.
)

echo.
pause
