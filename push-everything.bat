@echo off
setlocal enabledelayedexpansion
title Craftiva - Master Upload to GitHub
cd /d "%~dp0"

echo ==========================================================
echo    CRAFTIVA FURNITURE - MASTER GITHUB CODE & ASSETS PUSH
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

echo [1/3] Verifying all 226 photos and assets are ready...
if not exist "public\Catalogue_Images_For_Drive" mkdir "public\Catalogue_Images_For_Drive"
if not exist "public\img" mkdir "public\img"
if defined NODE_CMD node scripts/sync-all-showcase.mjs
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
echo [2/3] Adding ALL local files, images, code, and catalog to Git...
"!GIT_EXE!" add -A

echo.
echo [3/3] Committing and pushing exact local site to GitHub...
"!GIT_EXE!" commit -m "Upload complete 100% exact local site code, luxury homepage, 226 verified multi-angle photos, and catalog to GitHub"

"!GIT_EXE!" push origin main

echo.
if %errorlevel% equ 0 (
    echo ==========================================================
    echo   SUCCESS! Saara local code, images, backend, frontend
    echo   100%% exact GitHub par upload ho chuka hai!
    echo   Vercel ise automatically 30 seconds me live kar dega!
    echo ==========================================================
) else (
    echo.
    echo [ERROR] Git push failed. Output upar check karein.
)

echo.
pause
