list = [1,6,23,4,47,74,453,3,43,56,245,32,7]
list.sort()

target = 47

def binarySearch(list):
    low = 0
    high = len(list)
    mid = (low + high) / 2

    while list[mid] != target:
        if target > list[mid]:
            low = mid
            high = len(list)
        elif target<list[mid]:
            high = mid
            low = len(list)

        