@echo off
setlocal EnableExtensions

set "WEBROOT=C:\Users\KSIDC08\OneDrive\Documents\GitHub\report\03"
set "PORT=8003"
set "URL=http://localhost:8003/index.html"

if not exist "%WEBROOT%\" (
    echo ERROR: WEBROOT not found.
    echo %WEBROOT%
    pause
    exit /b 1
)

if not exist "%WEBROOT%\index.html" (
    echo ERROR: index.html not found.
    echo %WEBROOT%\index.html
    pause
    exit /b 1
)

cd /d "%WEBROOT%"

where py >nul 2>&1
if not errorlevel 1 (
    set "PYTHON=py"
    goto START_SERVER
)

where python >nul 2>&1
if not errorlevel 1 (
    set "PYTHON=python"
    goto START_SERVER
)

echo ERROR: Python not found.
pause
exit /b 1

:START_SERVER
start "Local Web Server 8003" cmd /k "%PYTHON% -m http.server %PORT% --bind 127.0.0.1"

timeout /t 2 /nobreak >nul

powershell.exe -NoProfile -Command "Start-Process '%URL%'" >nul 2>&1
if errorlevel 1 (
    start "" "%URL%"
)

endlocal
exit /b 0
