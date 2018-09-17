@echo off
echo Facebook bat

copy index.html fb-instant-games\

cd fb-instant-games

rd /s/q libs
rd /s/q js

cd ..

echo !!!!! Go on Create Zip !!!!!
pause

set str_time_first_bit="%time:~0,1%"  
if %str_time_first_bit%==" " (  
    set str_date_time=%date:~0,4%%date:~5,2%%date:~8,2%_0%time:~1,1%%time:~3,2%%time:~6,2%
)else (   
    set str_date_time=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
)  
set zipName=%str_date_time%.zip
echo %zipName%  

WinRAR a -r %zipName% fb-instant-games\*

rem pause
