list = [2,65,54,2,3]

for i in range(len(list)):
    list = list[:]
    list[i] = 1 - list

print(list)