@echo off
echo Facebook Server start

D:

cd D:\LayaWorkspace\LayaWorkspace\FBPuzzleBubble\release\fb-instant-games

http-server --ssl -c-1 -p 8080 -a 127.0.0.1

pause
