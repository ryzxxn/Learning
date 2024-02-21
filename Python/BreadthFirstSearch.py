tree = {
    'A': {'B', 'C'},
    'B': {'D', 'E'},
    'C': {'F', 'G'},
    'D': {'H'},
    'E': {None},
    'F': {None},
    'G': {'I'},
}

goal_nodes = ['D', 'G']  
first_node = 'A'
active_node = first_node

open_list = [first_node]
close_list = []

def movegen(current_node):
    global active_node
    close_list.insert(0, current_node)
    open_list.pop(0)  #pop first node in the open list

    #Explore children
    if current_node in tree:
        open_list.extend(tree[current_node])
        active_node = open_list[len(open_list) - 1]  #set active node as the last node in the open list

def Goal_test(current_node, target_nodes):
    if current_node in target_nodes:
        close_list.insert(0, current_node)  #add the current node as the last node in the sequence
        print("GOAL FOUND:", current_node)
        target_nodes.remove(current_node)  # remove the found goal node from the list
    else:
        movegen(current_node)

# Perform BFS search for multiple goal nodes
while open_list and goal_nodes:
    Goal_test(open_list[0], goal_nodes)

close_list.reverse()
if close_list:
    print("Search Sequence:", close_list)
else:
    print("Goal Doesn't exist")
