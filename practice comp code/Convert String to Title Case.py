T = 3
input = ['hello world','this is a CODECHEF problem','WELCOME to the JUNGLE']
testvar = []
for items in input:
    it = items.split(" ")
    for i in range(len(it)):
        print(it[i].capitalize())