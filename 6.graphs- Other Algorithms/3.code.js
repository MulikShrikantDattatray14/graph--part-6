function dfs(node, vis, adj, st) {
  vis[node] = 1;
  for (let it of adj[node]) {
    if (vis[it] === 0) {
      dfs(it, vis, adj, st);
    }
  }
  st.push(node);
}

function dfs3(node, vis, adjT) {
  vis[node] = 1;
  for (let it of adjT[node]) {
    if (vis[it] === 0) {
      dfs3(it, vis, adjT);
    }
  }
}

function kosaraju(V, adj) {
  const vis = new Array(V).fill(0);
  const st = [];
  for (let i = 0; i < V; i++) {
    if (vis[i] === 0) {
      dfs(i, vis, adj, st);
    }
  }

  const adjT = Array.from({ length: V }, () => []);
  for (let i = 0; i < V; i++) {
    vis[i] = 0;
    for (let it of adj[i]) {
      adjT[it].push(i);
    }
  }
  let scc = 0;
  while (st.length > 0) {
    let node = st.pop();
    if (vis[node] === 0) {
      scc++;
      dfs3(node, vis, adjT);
    }
  }
  return scc;
}

const n = 5;
const edges = [
  [1, 0],
  [0, 2],
  [2, 1],
  [0, 3],
  [3, 4],
];
const adj = new Array(n).fill(null).map(() => []);
for (let i = 0; i < n; i++) {
  adj[edges[i][0]].push(edges[i][1]);
}
const ans = kosaraju(n, adj);
console.log("The number of strongly connected components is: " + ans);
