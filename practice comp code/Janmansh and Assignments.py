def complete(start_time, end_time, each_assignment_time):
    if end_time - start_time >= each_assignment_time:
        print('yes')
    else:
        print('no')


complete(7, 10, 3)