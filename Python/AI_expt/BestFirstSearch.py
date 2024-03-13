from queue import PriorityQueue

class Graph:
    def __init__(self):
        self.graph = {}

    def add_edge(self, node, neighbors):
        self.graph[node] = neighbors

def best_first_search(graph, start, goal):
    visited = set()
    priority_queue = PriorityQueue()
    priority_queue.put((0, start))

    while not priority_queue.empty():
        cost, current_node = priority_queue.get()

        if current_node in visited:
            continue

        print("Visiting node:", current_node)

        visited.add(current_node)

        if current_node == goal:
            print("Goal reached!")
            return True

        for neighbor, neighbor_cost in graph.graph[current_node]:
            if neighbor not in visited:
                priority_queue.put((neighbor_cost, neighbor))

    print("Goal not reached.")
    return False

# Example usage:
graph = Graph()
graph.add_edge("A", [("B", 4), ("C", 2)])
graph.add_edge("B", [("A", 4), ("D", 5)])
graph.add_edge("C", [("A", 2), ("D", 1)])
graph.add_edge("D", [("B", 5), ("C", 1)])

start_node = "A"
goal_node = "D"

best_first_search(graph, start_node, goal_node)
