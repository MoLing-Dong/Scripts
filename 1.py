import os

service_name = os.popen(
    'sc queryex type= service state= all | findstr "SERVICE_NAME:" | findstr "MySQL"'
).read().split()[1]

print(service_name)