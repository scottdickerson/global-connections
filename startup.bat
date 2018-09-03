@echo off
TITLE Chrome Kiosk Mode
taskkill /f /im explorer.exe
start "" "c:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --chrome-frame --kiosk -incognito /max -fullscreen http://localhost:5000