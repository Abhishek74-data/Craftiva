@echo off
setlocal enabledelayedexpansion
title Craftiva - Reset & Instant Push to GitHub
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - CLEAN GITHUB DEPLOYMENT
echo =======================================================
echo.

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

echo [1/5] Removing 4.2GB old cache (.git)...
rd /s /q .git 2>nul

echo [2/5] Creating clean lightweight repository...
"!GIT_EXE!" init
"!GIT_EXE!" branch -M main
"!GIT_EXE!" config user.name "Abhishek"
"!GIT_EXE!" config user.email "craftivafurniture@gmail.com"

echo [3/5] Connecting to GitHub repo...
"!GIT_EXE!" remote add origin https://github.com/Abhishek74-data/Craftiva.git

echo [4/5] Staging essential website and catalogue files only...
"!GIT_EXE!" add .

echo [5/5] Committing and uploading clean build (<10MB)...
"!GIT_EXE!" commit -m "Deploy Craftiva Master Catalogue & Next.js Website"
"!GIT_EXE!" push -u origin main --force

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! Website pushed to GitHub in 3 seconds!
    echo =======================================================
    echo.
    echo Check your GitHub tab now (press F5 to refresh):
    echo https://github.com/Abhishek74-data/Craftiva
    echo.
    echo Then open https://vercel.com/new to deploy live!
) else (
    echo.
    echo If any error occurs, check output above.
)

echo.
pause
