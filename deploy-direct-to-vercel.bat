@echo off
setlocal enabledelayedexpansion
title Craftiva - Direct PC to Vercel Deployer (No GitHub)
cd /d "%~dp0"

echo ==========================================================
echo    CRAFTIVA FURNITURE - DIRECT LOCAL TO VERCEL DEPLOY
echo          (Bina GitHub ke - Seedha PC se Cloud)
echo ==========================================================
echo.

rem ---- Locate Node.js & npx on Windows ----
set "NODE_CMD="
where node >nul 2>nul && set "NODE_CMD=node"
if not defined NODE_CMD if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles%\nodejs\node.exe"
if not defined NODE_CMD if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles(x86)%\nodejs\node.exe"
if not defined NODE_CMD if exist "%APPDATA%\nvm\current\node.exe" set "NODE_CMD=%APPDATA%\nvm\current\node.exe"
if not defined NODE_CMD if exist "%LOCALAPPDATA%\Programs\node\node.exe" set "NODE_CMD=%LOCALAPPDATA%\Programs\node\node.exe"
if not defined NODE_CMD if exist "C:\nodejs\node.exe" set "NODE_CMD=C:\nodejs\node.exe"
if not defined NODE_CMD if exist "D:\nodejs\node.exe" set "NODE_CMD=D:\nodejs\node.exe"

if not defined NODE_CMD (
    echo [ERROR] Node.js aapke PC me nahi mila.
    echo Please install Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

if not "%NODE_CMD%"=="node" (
    for %%i in ("%NODE_CMD%") do set "NODE_DIR=%%~dpi"
    set "PATH=!NODE_DIR!;!PATH!"
)

echo [Found Node.js in: !NODE_CMD!]
echo.

echo [1/3] Local photos aur assets prepare ho rahe hain...
node scripts/sync-all-showcase.mjs
copy /y "Craftiva-Catalogue.html" "public\catalogue.html" >nul 2>nul
copy /y "Images\Logo.png" "public\img\Logo.png" >nul 2>nul
copy /y "Images\Logo.png" "public\Logo.png" >nul 2>nul

echo.
echo [2/3] Vercel Account Login (Sirf pehli baar ke liye)...
echo Browser open hoga, wahan apne Vercel account se "Continue" karein.
echo.

rem One-time Login
call npx vercel login

echo.
echo [3/3] Direct PC se Vercel par Deploy kar rahe hain...
echo.

rem Run Vercel Deploy to Production
call npx vercel --prod

echo.
if %errorlevel% equ 0 (
    echo ==========================================================
    echo   SUCCESS! Aapka local PC project seedha Vercel par
    echo   live ho gaya (Bina kisi GitHub ke)!
    echo ==========================================================
) else (
    echo.
    echo Upar diye steps check karein.
)

echo.
pause
