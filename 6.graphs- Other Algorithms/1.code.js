function dfs(node, parent, vis, adj, tin, low, bridges, timer) {
  vis[node] = 1;
  tin[node] = low[node] = timer;
  timer++;

  for (let i = 0; i < adj[node].length; i++) {
    const it = adj[node][i];
    if (it === parent) continue;

    if (vis[it] === 0) {
      dfs(it, node, vis, adj, tin, low, bridges, timer);
      //minimum time of insertion between node and parent gets stored into low[node]
      low[node] = Math.min(low[it], low[node]);
      // node --- it
      // node is parent
      //it is child
      // low of it when greater then time of insertion of node , then that is a bridge
      if (low[it] > tin[node]) {
        // if the adjacent node cannot reach back to the node or before it, then that means that is a bridge
        bridges.push([it, node]);
      }
    } else {
      //vis[it] === 1
      low[node] = Math.min(low[node], low[it]);
    }
  }
}

function criticalConnections(n, connections) {
  const adj = [];
  for (let i = 0; i < n; i++) {
    adj.push([]);
  }
  for (let i = 0; i < connections.length; i++) {
    const [u, v] = connections[i];
    adj[u].push(v);
    adj[v].push(u);
  }
  const vis = Array(n).fill(0);
  const tin = Array(n); // time of insertion
  const low = Array(n); //lowest time of insertion of all adjacent nodes apart from parent
  const bridges = [];
  let timer = 1;

  dfs(0, -1, vis, adj, tin, low, bridges, timer);
  return bridges;
}

// const n = 2;
// const connections = [[0, 1]]; //[1, 0]

const n = 4;
const connections = [
  [0, 1],
  [1, 2],
  [2, 0],
  [1, 3],
]; //[3, 1]

// const n = 12;
// const connections = [
//   [1,2],
//   [2,3],
//   [1,4],
//   [4,3],
//   [4,5],
// [5,6],
// [6,7],
// [7,8],
// [8,9],
// [6,9],
// [8,10],
// [10,12],
// [10,11]
// ];

const bridges = criticalConnections(n, connections);
for (let i = 0; i < bridges.length; i++) {
  console.log(`[${bridges[i][0]}, ${bridges[i][1]}]`);
}
