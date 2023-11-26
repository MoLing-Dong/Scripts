@echo off
set /p "numInstances=请输入多开微信的数量: "

echo 正在打开 %numInstances% 个微信实例...

for /l %%i in (1, 1, %numInstances%) do (
    start "" "C:\Programs\Tencent\WeChat\WeChat.exe"
)

echo.
set /p "clearCache=按回车清除缓存..."

cls

rem Add additional operations or messages here if needed.

echo 是否要关闭脚本？(Y/N)
set /p "closeScript="
if /i "%closeScript%"=="Y" (
    exit
)

echo 脚本未关闭。按任意键继续...
pause > nul
