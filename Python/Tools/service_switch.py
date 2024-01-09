""" 脚本用来开关Windows服务,默认为MongoDB服务,可自定义服务名称,可自定义检查的服务名称,可自定义服务状态提示信息 """
import os
import sys


# 判断检查的服务是什么,并返回服务名称
# return: service_name
# description: 用来检查的服务名称,将会被赋值给全局变量service_name
def check_service():
    switch = {
        1: 'MongoDB',
        2: 'MySQL',
        3: 'Redis',
        4: 'Memcached',
    }
    for i in switch:
        print(i, switch[i])
    user_input = input("输入需要检查的服务序号(默认为MongoDB)：") or 1
    # 判断用户输入是否为数字,并且在switch字典的键值范围内
    if user_input.isdigit() and int(user_input) in switch:
        return switch[int(user_input)]
    else:
        print('输入错误')
        sys.exit()


# 检查服务是否存活,并返回状态
def check_plan_service_live(service_name: str) -> bool:
    # 检查服务是否存在，是否安装当前服务
    try:
        service_name = os.popen(
            f'sc queryex type= service state= all | findstr "SERVICE_NAME:" | findstr "{service_name}"').read().split()[
            1]
    except IndexError:
        print(f'{service_name}服务不存在或未安装')
        sys.exit()

    # 检查当前是否正在运行
    if service_name in os.popen('net start').read():
        return True, service_name
    else:
        return False, service_name


#  检测服务status,并提示用户是否启动或关闭服务
def check_service_state(status: bool, service_name: str) -> None:
    if status:
        print(f'{service_name}服务已启动')
        if input(f'是否关闭{service_name}服务？(y/n)') == 'y':
            os.system(f'net stop {service_name}')
            print(f'{service_name}服务已关闭')
        else:
            sys.exit()
    else:
        print(f'{service_name}服务未启动')
        if input(f'是否启动{service_name}服务？(y/n)') == 'y':
            os.system(f'net start {service_name}')
            print(f'{service_name}服务已启动')
        else:
            sys.exit()


# 检查是否以管理员身份运行
def check_admin():
    if os.getpid() != 0:
        print('请以管理员身份运行')
        sys.exit()


# 设置窗口标题，大小，输出显示位置居中
def set_window():
    os.system('mode con cols=80 lines=20')
    os.system('title Windows服务开关')
    # os.system('color 0a')
    os.system('cls')
    os.system('mode con')


if __name__ == "__main__":
    # check_admin()
    # set_window()
    switch_item = check_service()
    alive_service, service_name = check_plan_service_live(switch_item)
    print('当前检测服务为', service_name)
    check_service_state(alive_service, service_name)
