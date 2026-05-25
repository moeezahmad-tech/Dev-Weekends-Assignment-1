@echo off
setlocal

if not exist "%~dp0Backend\node_modules" (
	echo Installing backend dependencies...
	pushd "%~dp0Backend" && npm install && popd
)

if not exist "%~dp0Frontend\node_modules" (
	echo Installing frontend dependencies...
	pushd "%~dp0Frontend" && npm install && popd
)

start "Backend" cmd /k "cd /d %~dp0Backend && npm run dev"
start "Frontend" cmd /k "cd /d %~dp0Frontend && npm run dev"

echo Servers started in separate windows.
