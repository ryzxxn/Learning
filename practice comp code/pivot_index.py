def pivot_index(list):
    for i in range(len(list)):
        left_sum = sum(list[:i])
        right_sum = sum(list[i + 1:])

        if left_sum == right_sum:
            print("pivot index: ", i)

list = [4, 4, 1, 5, 5, 4]
pivot_index(list)