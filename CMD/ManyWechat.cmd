@echo off
set /p needWehat=������࿪΢�ŵ�����----
@REM echo �����������Ϊ%needWehat%  

@REM ѭ�����needWehat������΢��
for /l %%i in (1,1,%needWehat%) do (
start "" "D:\WeChat\WeChat.exe"
)

echo �س��������
pause
cls
@REM echo �Ƿ�Ҫ�ر�
@REM pause