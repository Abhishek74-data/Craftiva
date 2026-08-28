@echo off
setlocal enabledelayedexpansion
title Craftiva - Master Clean Push (Zero HTTP 500 Error)
cd /d "%~dp0"

echo ==========================================================
echo    CRAFTIVA FURNITURE - CLEAN GITHUB & VERCEL PUSH
echo ==========================================================
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

if not "%NODE_CMD%"=="" if not "%NODE_CMD%"=="node" (
    for %%i in ("%NODE_CMD%") do set "NODE_DIR=%%~dpi"
    set "PATH=!NODE_DIR!;!PATH!"
)

echo [1/4] Optimizing image library for every single product...
if defined NODE_CMD node scripts/prepare-fast-catalog-images.mjs

copy /y "Craftiva-Catalogue.html" "public\catalogue.html" >nul 2>nul
copy /y "Images\Logo.png" "public\img\Logo.png" >nul 2>nul
copy /y "Images\Logo.png" "public\Logo.png" >nul 2>nul

rem Locate Git
set "GIT_EXE="
where git >nul 2>nul && set "GIT_EXE=git"
if "%GIT_EXE%"=="" if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_EXE=C:\Program Files\Git\cmd\git.exe"
if "%GIT_EXE%"=="" if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"

if "%GIT_EXE%"=="" (
    echo [ERROR] Git could not be found.
    pause
    exit /b 1
)

echo.
echo [2/4] Resetting heavy 4.15GB commit so Git stays light...
"!GIT_EXE!" config http.postBuffer 524288000
"!GIT_EXE!" reset origin/main

echo.
echo [3/4] Staging clean codebase with all real product photos...
"!GIT_EXE!" add -A

echo.
echo [4/4] Pushing to GitHub (Auto-deploys to Vercel)...
"!GIT_EXE!" commit -m "Deploy complete Craftiva site with authentic individual product photos"
"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo ==========================================================
    echo   SUCCESS! Saari authentic product photos aur exact
    echo   local website GitHub aur Vercel par live ho chuki hai!
    echo ==========================================================
) else (
    echo.
    echo [ERROR] Push failed. Output upar check karein.
)

echo.
pause
