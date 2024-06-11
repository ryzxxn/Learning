@echo off

rem Start the Ngrok tunnel in a new command prompt window
start /b "" cmd /k ".\ngrok.exe tcp 25565"

rem Wait for 10 seconds
timeout /t 5 /nobreak > nul

rem Run the JavaScript file
node discord.js
