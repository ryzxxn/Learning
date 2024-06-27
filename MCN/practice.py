import heapq

def best_first_search(graph, start, goals):
    visited = set()
    priority_queue = [(0, start)]

    while priority_queue:
        (cost, vertex) = heapq.heappop(priority_queue)
        visited.add(vertex)
        print(vertex, end=" ")

        if vertex in goals:
            print(f"\nGoal {vertex} reached!")
            goals.discard(vertex)

        if not goals:
            break

        for neighbour, neighbour_cost in graph[vertex]:
            if neighbour not in visited:
                heapq.heappush(priority_queue, (cost + neighbour_cost, neighbour))

# Take user input for the graph
graph = {}
num_vertices = int(input("Enter the number of vertices: "))

for i in range(num_vertices):
    vertex = input(f"Enter vertex {i+1}: ")
    num_neighbours = int(input(f"Enter the number of neighbours of {vertex}: "))
    neighbours = [input(f"Enter neighbour {j+1} of {vertex} and its cost (separated by space): ").split() for j in range(num_neighbours)]
    graph[vertex] = [(neighbour, int(cost)) for neighbour, cost in neighbours]

start_vertex = input("Enter the starting vertex for Best-First Search: ")
goals = set(input("Enter the goal vertices (separated by space): ").split())

print("Best-First Search starting from vertex", start_vertex)
best_first_search(graph, start_vertex, goals)