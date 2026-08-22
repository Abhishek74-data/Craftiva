@echo off
title Craftiva Furniture - Website Launcher
cd /d "%~dp0"

rem ---- locate Node.js ----
set "NODE_CMD="
where node >nul 2>nul && set "NODE_CMD=node"
if not defined NODE_CMD if exist "%ProgramFiles%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles%\nodejs\node.exe"
if not defined NODE_CMD if exist "%ProgramFiles(x86)%\nodejs\node.exe" set "NODE_CMD=%ProgramFiles(x86)%\nodejs\node.exe"
if not defined NODE_CMD if exist "%APPDATA%\nvm\current\node.exe" set "NODE_CMD=%APPDATA%\nvm\current\node.exe"
if not defined NODE_CMD if exist "C:\nodejs\node.exe" set "NODE_CMD=C:\nodejs\node.exe"
if not defined NODE_CMD if exist "D:\nodejs\node.exe" set "NODE_CMD=D:\nodejs\node.exe"

if not defined NODE_CMD (
    echo.
    echo [ERROR] Node.js could not be found.
    echo Install it from https://nodejs.org  -  or tell us the path.
    echo.
    pause
    exit /b 1
)

if not "%NODE_CMD%"=="node" set "PATH=%NODE_CMD%\..;%PATH%"

if not exist node_modules (
    echo.
    echo First run - installing dependencies, this takes a few minutes...
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

:menu
cls
echo.
echo   ==================================================
echo      CRAFTIVA FURNITURE  -  Website Launcher
echo   ==================================================
echo.
echo     [1]  Start site  (production, fast)
echo     [2]  Rebuild site, then start
echo     [3]  Refresh catalogue from Images/, then start
echo     [4]  Development mode  (live reload)
echo     [Q]  Quit
echo.
echo   Site runs at  http://localhost:3000
echo   ==================================================
echo.
set /p choice=Choose an option: 

if "%choice%"=="1" goto start
if "%choice%"=="2" goto build
if "%choice%"=="3" goto recatalog
if "%choice%"=="4" goto dev
if /i "%choice%"=="q" exit /b 0
goto menu

:start
if not exist ".next\BUILD_ID" (
    echo.
    echo No build found - building first time, takes about a minute...
    call npm run build
    if errorlevel 1 (
        echo [ERROR] Build failed.
        pause
        goto menu
    )
)
goto run

:build
echo.
echo Building the site (takes about a minute)...
call npm run build
if errorlevel 1 (
    echo [ERROR] Build failed.
    pause
    goto menu
)
goto run

:recatalog
echo.
echo Reading the Images folder and regenerating the catalogue...
call npm run catalog
if errorlevel 1 (
    echo [ERROR] Catalogue build failed.
    pause
    goto menu
)
goto build

:dev
echo.
echo Starting development server...
echo Keep this window open while you work. Press Ctrl+C to stop.
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"
call npm run dev
pause
exit /b 0

:run
echo.
echo Starting server - keep this window open. Press Ctrl+C to stop.
timeout /t 3 /nobreak >nul
start "" "http://localhost:3000"
call npm start
pause
exit /b 0