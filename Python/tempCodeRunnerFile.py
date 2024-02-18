tree = {
    'A': {'B', 'C'},
    'B': {'D', 'E'},
    'C': {'F', 'G'},
    'D': {'H'},
    'E': {None},
    'F': {None},
    'G': {'I'},
}

goal_node = 'K'
first_node = 'A'
active_node = first_node

open = [first_node]
close = []

def movegen(current_node):
    global active_node
    close.insert(0, current_node)
    open.pop(0) #pop first node in the open list

    # Explore children
    if current_node in tree:
        open.extend(tree[current_node])
        active_node = open[len(open)-1] #set active node as last node in open list

def Goal_test(current_node, target_node):
    if current_node == target_node:
        close.insert(0,current_node) #add current node as last node in the sequence
        print("GOAL FOUND")
    else:
        movegen(current_node)

# Perform BFS search
while open:
    if goal_node in close:
        break  # Exit the loop when the goal is found
    Goal_test(open[0], goal_node)

close.reverse()
print("Search Sequence:", close)
