import os
import sys
# 检测当前是什么系统什么环境
def check_system():
    if sys.platform == 'win32':
        return 'Windows'
    elif sys.platform == 'linux':
        return 'Linux'
    else:
        print('不支持的操作系统')
        sys.exit()
# 检查当前系统是否安装了Python

if __name__ == '__main__':
    text=check_system()
    print(text)
    print('脚本运行结束')
