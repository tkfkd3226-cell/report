@echo off
setlocal EnableExtensions

set "WEBROOT=C:\Users\KSIDC08\OneDrive\Documents\GitHub\report\03"
set "PORT=8003"
set "URL=http://localhost:8003/index.html"
set "LOG=%WEBROOT%\local_web_8003.log"

> "%LOG%" echo ============================================================
>>"%LOG%" echo Local Web Server Launcher
>>"%LOG%" echo Started: %date% %time%
>>"%LOG%" echo WEBROOT: %WEBROOT%
>>"%LOG%" echo PORT: %PORT%
>>"%LOG%" echo URL: %URL%
>>"%LOG%" echo ============================================================
>>"%LOG%" echo.

if not exist "%WEBROOT%\" goto ERROR_FOLDER
if not exist "%WEBROOT%\index.html" goto ERROR_INDEX

where py >nul 2>&1
if not errorlevel 1 (
    set "PYTHON=py"
    goto PYTHON_FOUND
)

where python >nul 2>&1
if not errorlevel 1 (
    set "PYTHON=python"
    goto PYTHON_FOUND
)

goto ERROR_PYTHON

:PYTHON_FOUND
>>"%LOG%" echo Python command: %PYTHON%
%PYTHON% --version >>"%LOG%" 2>&1

pushd "%WEBROOT%"
if errorlevel 1 goto ERROR_FOLDER

>>"%LOG%" echo.
>>"%LOG%" echo Port check before start:
netstat -ano | findstr ":%PORT%" >>"%LOG%" 2>&1

start "Local Web Server 8003" cmd /k "%PYTHON% -u -m http.server %PORT% --bind 127.0.0.1 >> ""%LOG%"" 2>&1"

timeout /t 2 /nobreak >nul

>>"%LOG%" echo.
>>"%LOG%" echo Port check after start:
netstat -ano | findstr ":%PORT%" >>"%LOG%" 2>&1

>>"%LOG%" echo.
>>"%LOG%" echo Opening browser: %URL%
start "" "%URL%"

popd
endlocal
exit /b 0

:ERROR_FOLDER
>>"%LOG%" echo ERROR: WEBROOT not found.
echo ERROR: WEBROOT not found.
echo %WEBROOT%
echo Log: %LOG%
pause
exit /b 1

:ERROR_INDEX
>>"%LOG%" echo ERROR: index.html not found.
echo ERROR: index.html not found.
echo %WEBROOT%\index.html
echo Log: %LOG%
pause
exit /b 1

:ERROR_PYTHON
>>"%LOG%" echo ERROR: Python not found.
echo ERROR: Python not found.
echo Install Python or add it to PATH.
echo Log: %LOG%
pause
exit /b 1
