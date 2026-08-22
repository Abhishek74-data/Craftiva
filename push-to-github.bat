@echo off
setlocal enabledelayedexpansion
title Craftiva - Push Updates to GitHub
cd /d "%~dp0"

echo =======================================================
echo     CRAFTIVA FURNITURE - PUSH FIXES TO GITHUB
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

echo [1/3] Staging updated CSS and Next config...
"!GIT_EXE!" add .

echo [2/3] Committing build fix...
"!GIT_EXE!" commit -m "Fix globals.css Tailwind syntax and next.config for Vercel build"

echo [3/3] Pushing to GitHub (Auto-deploys to Vercel)...
"!GIT_EXE!" push -u origin main

echo.
if %errorlevel% equ 0 (
    echo =======================================================
    echo   SUCCESS! Pushed to GitHub!
    echo   Vercel is now automatically rebuilding your website!
    echo =======================================================
) else (
    echo.
    echo Check error output above.
)

echo.
pause
