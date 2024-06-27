from collections import deque

def bfs(graph, start, goals):
    visited = set()
    queue = deque([start])

    while queue:
        vertex = queue.popleft()
        print(vertex, end=" ")

        if vertex in goals:
            print(f"\nGoal {vertex} reached!")
            goals.remove(vertex)

            if not goals:
                break

        for neighbour in graph[vertex]:
            if neighbour not in visited:
                visited.add(neighbour)
                queue.append(neighbour)

# Take user input for the graph
graph = {}
num_vertices = int(input("Enter the number of vertices: "))

for i in range(num_vertices):
    vertex = input(f"Enter vertex {i+1}: ")
    neighbours = input(f"Enter neighbours of {vertex} (separated by space): ").split()
    graph[vertex] = neighbours

start_vertex = input("Enter the starting vertex for BFS: ")
goals = input("Enter the goal vertices (separated by space): ").split()

print("Breadth-First Search starting from vertex", start_vertex)
bfs(graph, start_vertex, goals)