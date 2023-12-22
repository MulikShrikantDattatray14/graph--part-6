function dfs(node, parent, vis, tin, low, mark, adj, timer) {
    vis[node] = 1;
    tin[node] = low[node] = timer.value++;
    let child = 0;
  
    for (const it of adj[node]) {
      if (it === parent) continue;
  
      if (vis[it] === 0) {
        dfs(it, node, vis, tin, low, mark, adj, timer);
        low[node] = Math.min(low[node], low[it]);
  
        if (low[it] >= tin[node] && parent !== -1) {
          mark[node] = 1;
        }
  
        child++;
      } else {
        low[node] = Math.min(low[node], tin[it]);
      }
    }
  
    if (child > 1 && parent === -1) {
      mark[node] = 1;
    }
  }
  
  
function articulationPoints(n, edges) {
  const vis = new Array(n).fill(0);
  const tin = new Array(n);
  const low = new Array(n);
  const mark = new Array(n);

  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    const u = edges[i][0],
      v = edges[i][1];
    adj[u].push(v);
    adj[v].push(u);
  }

  const timer = { value: 1 };
  for (let i = 0; i < n; i++) {
    if (vis[i] === 0) {
      dfs(i, -1, vis, tin, low, mark, adj, timer);
    }
  }

  const ans = [];
  for (let i = 0; i < n; i++) {
    if (mark[i] === 1) {
      ans.push(i);
    }
  }

  if (ans.length === 0) {
    ans.push(-1);
  }

  return ans;
}

// const n = 5;
// const edges = [
//   [0, 1],
//   [1, 4],
//   [2, 4],
//   [2, 3],
//   [3, 4],
// ];//1 4

const n = 7;
const edges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [2, 3],
  [2, 4],
  [4, 6],
  [6, 5],
  [2, 5],
]; //0 2

const nodes = articulationPoints(n, edges);

const size = nodes.length;
for (let i = 0; i < size; i++) {
  const node = nodes[i];
  process.stdout.write(node + " ");
}
console.log("");
