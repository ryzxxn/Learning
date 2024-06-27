from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])

    while queue:
        vertex = queue.popleft()
        print(vertex, end=" ")

        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Take user input for the graph
graph = {}
num_vertices = int(input("Enter the number of vertices: "))

for _ in range(num_vertices):
    vertex = input("Enter the vertex: ")
    neighbors = input("Enter the neighbors of the vertex (comma-separated): ").split(',')
    graph[vertex] = neighbors

# Take user input for the starting vertex
start = input("Enter the starting vertex: ")

bfs(graph, start)