class Graph{
    constructor() {
        this.data={}
    }
    addVertex(node) {
        if(!this.data[node]) this.data[node]=[]
    }
    addEdge(s, d) {
        if (!this.data[s]) this.addVertex(s)
        if (this.data[d]) this.addVertex(d)
        
        this.data[s].push(d)
        this.data[d].push(s)
    }
}
const graph = new Graph()
graph.addVertex(0)
graph.addVertex(1)
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(6);
graph.addVertex(7);
graph.addVertex(8);
// graph.addVertex(9);

graph.addEdge(0,1)
graph.addEdge(1, 2);
graph.addEdge(3, 4);
graph.addEdge(4, 5);
graph.addEdge(4, 6);
graph.addEdge(5, 7);
graph.addEdge(6, 7);
graph.addEdge(7, 8);

console.log(graph)

function cycleBFS(adjList, node, visited) {
    let q = [], parent = {};
    parent[node] = -1;
    visited[node] = true
    q.push(node)
    
    while (q.length != 0) {
        let frontnode = q.shift()
        for (let n of adjList[frontnode]) {
            if (visited[n] == true && parent[frontnode] != n) {
                return true
            } else if (!visited[n]) {
                q.push(n)
                visited[n] = true
                parent[n]= frontnode
            }
        }
    }
    return false
    
}

let visited = {}
let nodes = Object.keys(graph.data)
for (let i = 0; i < nodes.length; i++){
    if (!visited[i]) {
        let ans = cycleBFS(graph.data, i, visited)
        console.log(ans)
        
        if (ans == true) {
            console.log("Cycle found")
            break
        }
    }
}
console.log("Cycle not Found"); 











