tree = {
    'A': {'B', 'C'},
    'B': {'D', 'E'},
    'C': {'F', 'G'},
    'D': {'H'},
    'E': {None},
    'F': {None},
    'G': {'I'},
}

goal_node = 'F'
first_node = 'A'
active_node = first_node

open = []
close = []

open.insert(0, active_node)

def Move_gen():
    global active_node
    close.insert(0, open[len(open) - 1])
    open.pop(len(open) - 1)

    open.extend(tree[active_node])
    active_node = open[len(open)-1]

def Goal_test(current_node, target_node):
    if target_node == current_node:
        print("Goal reached!")
        close.insert(0, active_node)
        close.reverse()
        print("PATH TO GOAL:", close)
    else:
        Move_gen()

Goal_test(active_node, goal_node)
Goal_test(active_node, goal_node)
Goal_test(active_node, goal_node)

print("OPEN LIST:", open)
print("CLOSED LIST:", close)
# print("Current Node:", active_node)
