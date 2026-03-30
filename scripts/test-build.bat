@echo off
chcp 65001 >nul
echo ========================================
echo Papyrus Build Test Script
echo ========================================
echo.

:: Check if dist-python exists
if not exist "dist-python\Papyrus\Papyrus.exe" (
    echo [ERROR] Backend not found: dist-python\Papyrus\Papyrus.exe
    echo Please run: npm run build:python
    pause
    exit /b 1
)

echo [OK] Backend executable found

:: Test backend standalone
echo.
echo Testing backend standalone...
echo ========================================
start "Backend Test" /MIN cmd /c "cd /d dist-python\Papyrus && Papyrus.exe > backend-test.log 2>&1"
timeout /t 3 /nobreak >nul

:: Check if backend started
curl -s http://127.0.0.1:8000/api/health >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Backend started successfully
    curl -s http://127.0.0.1:8000/api/health
) else (
    echo [ERROR] Backend failed to start
    echo Check backend-test.log for details
    type backend-test.log 2>nul
)

:: Kill backend
for /f "tokens=2" %%a in ('tasklist ^| findstr Papyrus.exe') do taskkill /PID %%a /F >nul 2>&1

echo.
echo ========================================
pause
