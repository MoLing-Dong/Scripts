# 桌面图标位置备份

import os, shutil

# 获取桌面路径
desktop = os.path.join(os.path.expanduser("~"), 'Desktop')

# 获取桌面图标位置
desktop_icon = os.listdir(desktop)
# print(desktop_icon)
# 获取桌面图标在桌面的坐标
desktop_icon_position = []
for i in desktop_icon:
    desktop_icon_position.append(os.path.join(desktop, i))
print(desktop_icon_position)

# 备份路径
backup_path = os.path.join(desktop, '桌面图标备份')
