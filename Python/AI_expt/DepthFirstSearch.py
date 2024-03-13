tree = {
    'A': {'B', 'C'},
    'B': {'D', 'E'},
    'C': {'F', 'G'},
    'D': {'H'},
    'E': {None},
    'F': {None},
    'G': {'I'},
}

goal_nodes = {'D', 'G'}  # Use a set for faster membership checking
first_node = 'A'
active_node = first_node

open_stack = [first_node]
close_list = set()

def movegen(current_node):
    global active_node

    close_list.add(current_node)

    # Explore children (in reverse order for DFS) that haven't been explored
    if current_node in tree:
        children = list(tree[current_node])
        children.reverse()

        for child in children:
            if child not in close_list:
                open_stack.insert(0, child)

        active_node = open_stack[0]

def Goal_test(current_node, target_nodes):
    if current_node in target_nodes:
        close_list.add(current_node)
        print("GOAL FOUND:", current_node)
        target_nodes.remove(current_node)
    else:
        movegen(current_node)

# Perform DFS search for multiple goal nodes
while open_stack and goal_nodes:
    Goal_test(open_stack[0], goal_nodes)

if goal_nodes:
    print("Goal Doesn't exist")
else:
    print("Search Sequence:", list(close_list))
