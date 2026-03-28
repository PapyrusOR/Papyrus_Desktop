@echo off
chcp 65001 >nul
echo Starting Papyrus Version Manager...
python tools\version_manager.py ui
pause
