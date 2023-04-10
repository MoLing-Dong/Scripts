# -*- coding:utf-8 -*-
import os
import sys


# 检查是否以管理员身份运行
def check_admin():
    if os.getpid() != 0:
        print('请以管理员身份运行')
        sys.exit()


def check_restart_plan():
    # 检查是否有重启计划
    restart_plan = os.popen('shutdown -l').read()
    if restart_plan:
        print('已有重启计划')
        if input('是否取消重启计划？(y/n)') == 'y':
            os.system('shutdown -a')
            print('重启计划已取消')
        else:
            sys.exit()


if __name__ == '__main__':
    # 检查是否以管理员身份运行
    check_admin()
    # 恢复网络环境
    os.system('netsh winsock reset')
    os.system('Already netsh winhttp reset proxy')
    # 接收终端输入判断是否重启
    user_input = input('是否重启电脑？默认不重启(y/n/m)') or 'n'
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
