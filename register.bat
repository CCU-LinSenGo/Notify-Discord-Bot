@echo off
chcp 65001 >nul
echo ==========================================
echo   Discord Slash Command Registration
echo ==========================================
echo.

REM Check if .env file exists
if not exist "%~dp0.env" (
    echo [ERROR] .env file not found!
    echo Please copy .env.example to .env and fill in the values.
    echo.
    pause
    exit /b 1
)

REM Check if node is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js 20.x from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "%~dp0node_modules" (
    echo [INFO] node_modules not found, running npm install...
    cd /d "%~dp0"
    call npm install
    echo.
)

echo [INFO] Registering slash command...
echo.

cd /d "%~dp0"
node --env-file=.env scripts/register.js

echo.
if %errorlevel% equ 0 (
    echo ==========================================
    echo   Done! Command registered successfully.
    echo ==========================================
) else (
    echo ==========================================
    echo   Registration failed. Check errors above.
    echo ==========================================
)

echo.
pause
