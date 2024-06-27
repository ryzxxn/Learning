list = [3, 7, 2]

def greaterAvg(list):
    average = (list[0] + list[1])/2
    if average > list[2]:
        return True

if greaterAvg(list):
    print("yes".capitalize())
else:
    print("no".capitalize())