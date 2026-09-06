@echo off
cd /d "%~dp0"
echo Starting the Detrap website...
echo.
echo When you see a "Local" link (like http://localhost:5173/),
echo open it in your browser.
echo.
echo To STOP the website later: close this black window.
echo.
call npm run dev
pause
