class Graph{
    constructor(){
        this.data={}
    }
    addVertex(node) {
        if (!this.data[node]) {
            this.data[node]=[]
        }

    }
    addEdge(s, d) {
        if (!this.data[s]) {
            this.addVertex(s)
        }
        if (!this.data[d]) {
            this.addVertex(d)
        }
        this.data[s].push(d)
        this.data[d].push(s)
        
    }
}

let graph = new Graph()
graph.addVertex('a')
graph.addVertex('b')
graph.addVertex('c')
graph.addVertex('d')
graph.addVertex('e')
graph.addVertex('f')
graph.addVertex("g");
graph.addVertex("h");
graph.addVertex("i");

graph.addEdge('a', 'b')
graph.addEdge('a', 'c');
graph.addEdge('b','e');
graph.addEdge('b','d');
graph.addEdge("c", "d");
graph.addEdge("d", "e");
graph.addEdge("d", "i");

console.log(graph.data)

let ans = [];
let visited = {};

function BFS(adjList,node, visited, ans) {
    let q = []
  
    
    q.push(node)
   
    visited[node]=1
    while (q.length != 0) {
        frontnode = q.shift()
        ans.push(frontnode)

        for (let n of adjList[frontnode]) {
            if (!visited[n]) {
                q.push(n)
                visited[n]=1
            }
        } 
    }
   
    
}



let graphelements = Object.keys(graph.data)



for (let i = 0; i < Object.keys(graph.data).length; i++){
    
    if (!visited[graphelements[i]]) {
        BFS(graph.data, graphelements[i], visited, ans);
        
        
    }
}
console.log(ans)

// console.log(DFS(graph.data, 'e'))
let ans1 = []
let visited1={}
function DFS(adjList, node, visited1, ans1) {
  let s = [];
  visited1[node] = true;
  s.push(node);
  

  while (s.length != 0) {
    let fnode = s.pop();
    ans1.push(fnode);
    for (let n of adjList[fnode]) {
      if (!visited1[n]) {
        s.push(n);
        visited1[n] = true;
      }
    }
  }
 
}

for (let i = 0; i < Object.keys(graph.data).length; i++) {
  if (!visited1[graphelements[i]]) {
    DFS(graph.data, graphelements[i], visited1, ans1);
  }
}
console.log(ans1);
