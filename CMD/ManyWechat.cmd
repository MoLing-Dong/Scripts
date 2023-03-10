@echo off
set /p needWehat=请输入多开微信的数量----
@REM echo 您输入的内容为%needWehat%  

@REM 循环输出needWehat个数的微信
for /l %%i in (1,1,%needWehat%) do (
start "" "D:\WeChat\WeChat.exe"
)

echo 回车清楚缓存
pause
cls
@REM echo 是否要关闭
@REM pause