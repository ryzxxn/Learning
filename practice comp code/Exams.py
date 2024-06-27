num_schools = 1
num_students = 5
total_students = 3

total_student_in_chefland = (num_schools * num_students) - total_students
print(total_student_in_chefland)
chefpercent = (total_student_in_chefland / total_students) * 100
print(chefpercent / 2)
if chefpercent >= 50:
    print('YES')
else:
    print('NO')