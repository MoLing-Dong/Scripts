# -*- coding:utf-8 -*-
import os
import sys
if __name__ == '__main__':
    # 恢复网络环境
    os.system('netsh winsock reset')
    # 接收终端输入判断是否重启
    user_input = input('是否重启电脑？(y/n/m)')
    if user_input == 'y':
        time_restart = input('请输入重启时间(单位：秒)：')
        os.system('shutdown -r -t ' + time_restart)
    elif user_input == 'm':
        if input('是否取消重启？(y/n)') == 'y':
            os.system('shutdown -a')
        else:
            sys.exit()
    else:
        sys.exit()


