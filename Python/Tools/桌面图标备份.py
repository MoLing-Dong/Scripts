# 桌面图标位置备份

import os
import win32api
import win32gui


def get_icon_position(icon_name):
    desktop = win32gui.GetDesktopWindow()
    shell_dll = win32api.LoadLibrary("shell32.dll")
    folder = shell_dll.SHGetDesktopFolder()
    pidl, _ = folder.ParseDisplayName(0, None, icon_name)
    if pidl:
        desktop_location = folder.GetUIObjectOf(None, [pidl], win32gui.IID_IDropTarget)[0].DragOver(0, 0, 0)[1]
        x, y, _, _ = desktop_location
        return (x, y)
    else:
        return None


# 获取桌面路径
desktop = os.path.join(os.path.expanduser("~"), 'Desktop')

# 获取桌面图标位置
desktop_icon = os.listdir(desktop)
# print(desktop_icon)
# 获取桌面图标在桌面的坐标
icon_position = {}
for icon_name in desktop_icon:
    icon_position[icon_name] = get_icon_position(icon_name)
print(icon_position)
# print(icon_position['QQ.lnk']
# 备份路径
# backup_path = os.path.join(desktop, '桌面图标备份')
