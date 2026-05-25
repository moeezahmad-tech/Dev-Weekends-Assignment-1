@echo off
setlocal

start "Backend" cmd /k "cd /d %~dp0Backend && npm run dev"
start "Frontend" cmd /k "cd /d %~dp0Frontend && npm run dev"

echo Servers started in separate windows.
