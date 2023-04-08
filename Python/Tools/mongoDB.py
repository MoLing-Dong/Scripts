import os
import sys

# 设置全局变量service_name
service_name = ''

# 检查MongoDB服务是否存在,存在返回True,不存在返回False
def check_mongo_service(service_name: str = 'MongoDB') -> bool:
    # 获取服务列表
    service_list = os.popen('net start').read()
    # 判断服务是否存在
    if service_name in service_list:
        return True
    else:
        return False


#   检查用户输入
def check_user_input(alive: bool):
    if alive:
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


#判断检查的服务是什么,并返回服务名称
def check_service():
    switch = {
        1: 'MongoDB',
        2: 'MySQL',
        3: 'Redis',
        4: 'Memcached',
    }
    for i in switch:
        print(i, switch[i])
    user_input = input("输入需要检查的服务名称(默认为MongoDB)：") or 1
    # 修改全局变量service_name
    global service_name
    return switch[int(user_input)]


if __name__ == "__main__":
    # check_admin()
    service_name = check_service()
    check_user_input(service_name, check_mongo_service(service_name))
