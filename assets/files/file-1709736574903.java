package com.example.demo;
import java.util.*;

public class Graph {
    private Map<String, Vertex> vertices;
    private Map<Vertex, Set<Vertex>> edges;

    public Graph() {
        this.vertices = new HashMap<>();
        this.edges = new HashMap<>();
    }

    public void addVertex(Vertex v) {
        vertices.put(v.getName(), v);
        edges.put(v, new HashSet<>());
    }

    public void addEdge(Vertex v1, Vertex v2) {
        edges.get(v1).add(v2);
        edges.get(v2).add(v1);
    }

    public boolean hasCycle() {
        Set<String> visited = new HashSet<>(); // Tracks visited vertices
        Map<String, String> parent = new HashMap<>(); // Tracks the parent vertices in the DFS tree

        for (String vertexKey : vertices.keySet()) { // Iterate through each vertex in the graph
            if (!visited.contains(vertexKey) && hasCycleUtil(vertexKey, visited, parent)) {
                return true; // Cycle found
            }
        }
        return false; // No cycle found
    }

    private boolean hasCycleUtil(String vertexKey, Set<String> visited, Map<String, String> parent) {
        visited.add(vertexKey); // Mark the current node as visited

        Vertex currentVertex = vertices.get(vertexKey);
        if (edges.get(currentVertex) != null) { // Ensure there are edges for the current vertex
            for (Vertex neighbor : edges.get(currentVertex)) { // Iterate through all neighbors
                String neighborKey = neighbor.getName();

                // If the neighbor is not visited, then recur for the neighbor
                if (!visited.contains(neighborKey)) {
                    parent.put(neighborKey, vertexKey); // Set the current vertex as parent of neighbor
                    if (hasCycleUtil(neighborKey, visited, parent)) {
                        return true; // Cycle found in the neighbor's DFS subtree
                    }
                }
                // If the neighbor is visited and not the parent of the current vertex, then there is a cycle
                else if (!vertexKey.equals(parent.get(neighborKey))) {
                    return true; // Cycle found
                }
            }
        }
        return false; // No cycle found in the DFS subtree rooted at the current vertex
    }


//    is connected method to check the graph
    public boolean isConnected() {
        if (vertices.isEmpty()) {
            return true; // An empty graph is technically connected
        }

        Set<String> visited = new HashSet<>(); // Tracks visited vertices

        // Start DFS from the first vertex in the map
        String startVertexKey = vertices.keySet().iterator().next();
        depthFirstSearchUtil(startVertexKey, visited);

        // If the number of visited vertices equals the total number of vertices, the graph is connected
        return visited.size() == vertices.size();
    }

//    Depth first util for isconnected method
    private void depthFirstSearchUtil(String currentVertexKey, Set<String> visited) {
        visited.add(currentVertexKey); // Mark the current vertex as visited

        Vertex currentVertex = vertices.get(currentVertexKey);
        if (edges.containsKey(currentVertex)) { // Check if the current vertex has any edges
            for (Vertex neighbor : edges.get(currentVertex)) {
                if (!visited.contains(neighbor.getName())) { // If not visited
                    depthFirstSearchUtil(neighbor.getName(), visited);
                }
            }
        }
    }

// Depth First Search
    public List<Vertex> depthFirstSearch() {
        List<Vertex> visitedOrder = new ArrayList<>(); // To store the order of visited vertices
        Set<String> visited = new HashSet<>(); // To keep track of visited vertices

        // Optional: Starting from the first vertex in the map, but you can modify to start from a specific vertex
        String startVertexKey = vertices.keySet().iterator().next();

        // Recursive DFS from the starting vertex
        depthFirstSearchUtil(startVertexKey, visited, visitedOrder);
        return visitedOrder;
    }

    private void depthFirstSearchUtil(String currentVertexKey, Set<String> visited, List<Vertex> visitedOrder) {
        visited.add(currentVertexKey); // Mark the current vertex as visited
        visitedOrder.add(vertices.get(currentVertexKey)); // Add to visited order list

        // Recur for all the vertices adjacent to this vertex
        Vertex currentVertex = vertices.get(currentVertexKey);
        if (edges.containsKey(currentVertex)) { // Check if the current vertex has any edges
            for (Vertex neighbor : edges.get(currentVertex)) {
                if (!visited.contains(neighbor.getName())) { // If not visited
                    depthFirstSearchUtil(neighbor.getName(), visited, visitedOrder);
                }
            }
        }
    }

// breadth first search
    public List<Vertex> breadthFirstSearch() {
        List<Vertex> visitedOrder = new ArrayList<>(); // To store the order of visited vertices
        Set<String> visited = new HashSet<>(); // To keep track of visited vertices
        Queue<Vertex> queue = new LinkedList<>(); // Queue for BFS

        // Optional: Starting from the first vertex in the map, but you can modify to start from a specific vertex
        Vertex startVertex = vertices.get(vertices.keySet().iterator().next());

        // Enqueue the starting vertex and mark it as visited
        queue.add(startVertex);
        visited.add(startVertex.getName());

        while (!queue.isEmpty()) {
            Vertex currentVertex = queue.poll(); // Dequeue a vertex from the queue
            visitedOrder.add(currentVertex); // Add to visited order list

            // Process all adjacent vertices of the dequeued vertex
            for (Vertex neighbor : edges.get(currentVertex)) {
                if (!visited.contains(neighbor.getName())) { // If not visited
                    visited.add(neighbor.getName()); // Mark the neighbor as visited
                    queue.add(neighbor); // Enqueue the neighbor
                }
            }
        }

        return visitedOrder;
    }



//    Getters function
    public Collection<Vertex> getVertices() {
        return vertices.values();
    }

    public Vertex getVertex(String name) {
        return vertices.get(name);
    }

    public Set<Vertex> getEdges(Vertex vertex) {
        return edges.getOrDefault(vertex, Collections.emptySet());
    }



}

