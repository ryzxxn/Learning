def crc_division(data, divisor):
    dividend = data + '0' * (len(divisor) - 1)
    dividend = list(dividend)
    divisor = list(divisor)

    for i in range(len(data)):
        if dividend[i] == '0':
            continue
        for j in range(len(divisor)):
            dividend[i + j] = str(int(dividend[i + j]) ^ int(divisor[j]))

    return ''.join(dividend)[-len(divisor) + 1:]

def crc_check(data, divisor, received):
    crc = crc_division(data, divisor)
    received_crc = received[-len(crc):]
    return crc == received_crc

data = input("Enter message: ")
divisor = input("Enter divisor: ")

crc = crc_division(data, divisor)
transmitted = data + crc
print("Final message transmitted:", transmitted)

received = input("Enter received message: ")
if crc_check(data, divisor, received):
    print("No error.")
else:
    print("Error detected.")