@echo off
set /p "numInstances=������࿪΢�ŵ�����: "

echo ���ڴ� %numInstances% ��΢��ʵ��...

for /l %%i in (1, 1, %numInstances%) do (
    start "" "C:\Programs\Tencent\WeChat\WeChat.exe"
)

echo.
set /p "clearCache=���س��������..."

cls

rem Add additional operations or messages here if needed.

echo �Ƿ�Ҫ�رսű���(Y/N)
set /p "closeScript="
if /i "%closeScript%"=="Y" (
    exit
)

echo �ű�δ�رա������������...
pause > nul
