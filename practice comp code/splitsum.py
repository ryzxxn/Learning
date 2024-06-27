def splitSumWithEqualBeauty(arr):
    n = len(arr)
    print(n)

    if n < 3:
        return 0

    total_sum = sum(arr)
    print(total_sum)

    if total_sum % 3 != 0:
        return 0

    target_sum = total_sum // 3
    current_sum = 0
    count_splits = 0
    result = 0

    for i in range(n - 1):
        current_sum += arr[i]

        if current_sum == 2 * target_sum:
            result += count_splits

        if current_sum == target_sum:
            count_splits += 1

    return result


list = [5,10,15,20,25,26]

number =  84.0
number = number // 3
print(number)
# splitSumWithEqualBeauty(list)
# print(splitSumWithEqualBeauty(list))