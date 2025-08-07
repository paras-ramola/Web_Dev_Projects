let c = document.querySelector('.c_code');
let cpp = document.querySelector(".cpp_code");
let js = document.querySelector(".js_code");
let py = document.querySelector(".py_code");

let content = document.getElementById("content");
const codeMap = {
  dijkstra: {
    c: `#include &lt;limits.h&gt;<br>#include &lt;stdbool.h&gt;<br>#define V 100<br><br>int <span id="function">minDistance</span>(int dist[], bool sptSet[], int n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;int min = INT_MAX, min_index = -1;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int v = 0; v &lt; n; v++)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (sptSet[v] == false &amp;&amp; dist[v] &lt;= min)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min = dist[v], min_index = v;<br>&nbsp;&nbsp;&nbsp;&nbsp;return min_index;<br>}<br><br>void <span id="function">dijkstra</span>(int graph[V][V], int src, int n, int dist[]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;bool sptSet[V];<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; n; i++)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[i] = INT_MAX, sptSet[i] = false;<br>&nbsp;&nbsp;&nbsp;&nbsp;dist[src] = 0;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int count = 0; count &lt; n - 1; count++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int u = minDistance(dist, sptSet, n);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sptSet[u] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (int v = 0; v &lt; n; v++)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!sptSet[v] &amp;&amp; graph[u][v] &amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[u] != INT_MAX &amp;&amp; dist[u] + graph[u][v] &lt; dist[v])<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[v] = dist[u] + graph[u][v];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

    cpp: `#include &lt;climits&gt;<br>#include &lt;vector&gt;<br>using namespace std;<br><br>int <span id="function">minDistance</span>(vector&lt;int&gt;&amp; dist, vector&lt;bool&gt;&amp; sptSet, int n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;int min = INT_MAX, min_index = -1;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int v = 0; v &lt; n; v++)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!sptSet[v] &amp;&amp; dist[v] &lt;= min)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min = dist[v], min_index = v;<br>&nbsp;&nbsp;&nbsp;&nbsp;return min_index;<br>}<br><br>void <span id="function">dijkstra</span>(vector&lt;vector&lt;int&gt;&gt;&amp; graph, int src, int n, vector&lt;int&gt;&amp; dist) {<br>&nbsp;&nbsp;&nbsp;&nbsp;vector&lt;bool&gt; sptSet(n, false);<br>&nbsp;&nbsp;&nbsp;&nbsp;dist.assign(n, INT_MAX);<br>&nbsp;&nbsp;&nbsp;&nbsp;dist[src] = 0;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int count = 0; count &lt; n - 1; count++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int u = minDistance(dist, sptSet, n);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sptSet[u] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (int v = 0; v &lt; n; v++)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!sptSet[v] &amp;&amp; graph[u][v] &amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[u] != INT_MAX &amp;&amp; dist[u] + graph[u][v] &lt; dist[v])<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[v] = dist[u] + graph[u][v];<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,


    js: `function <span id="function">minDistance</span>(dist, sptSet, n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;let min = Number.MAX_VALUE;<br>&nbsp;&nbsp;&nbsp;&nbsp;let minIndex = -1;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (let v = 0; v &lt; n; v++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!sptSet[v] &amp;&amp; dist[v] &lt;= min) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min = dist[v];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;minIndex = v;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;return minIndex;<br>}<br><br>function <span id="function">dijkstra</span>(graph, src, n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;const dist = new Array(n).fill(Number.MAX_VALUE);<br>&nbsp;&nbsp;&nbsp;&nbsp;const sptSet = new Array(n).fill(false);<br>&nbsp;&nbsp;&nbsp;&nbsp;dist[src] = 0;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (let count = 0; count &lt; n - 1; count++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const u = minDistance(dist, sptSet, n);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sptSet[u] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (let v = 0; v &lt; n; v++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!sptSet[v] &amp;&amp; graph[u][v] &amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[u] !== Number.MAX_VALUE &amp;&amp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[u] + graph[u][v] &lt; dist[v]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[v] = dist[u] + graph[u][v];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;return dist;<br>}`,

    py: `def <span id="function">min_distance</span>(dist, spt_set, n):<br>&nbsp;&nbsp;&nbsp;&nbsp;min_val = float('inf')<br>&nbsp;&nbsp;&nbsp;&nbsp;min_index = -1<br>&nbsp;&nbsp;&nbsp;&nbsp;for v in range(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if not spt_set[v] and dist[v] &lt; min_val:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_val = dist[v]<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min_index = v<br>&nbsp;&nbsp;&nbsp;&nbsp;return min_index<br><br>def <span id="function">dijkstra</span>(graph, src, n):<br>&nbsp;&nbsp;&nbsp;&nbsp;dist = [float('inf')] * n<br>&nbsp;&nbsp;&nbsp;&nbsp;spt_set = [False] * n<br>&nbsp;&nbsp;&nbsp;&nbsp;dist[src] = 0<br>&nbsp;&nbsp;&nbsp;&nbsp;for _ in range(n - 1):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;u = min_distance(dist, spt_set, n)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;spt_set[u] = True<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for v in range(n):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (not spt_set[v] and graph[u][v] and<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[u] != float('inf') and<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[u] + graph[u][v] &lt; dist[v]):<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dist[v] = dist[u] + graph[u][v]<br>&nbsp;&nbsp;&nbsp;&nbsp;return dist`,
  },

  dfs: {
    c: `#include &lt;stdbool.h&gt;<br><br>void <span id="function">dfs</span>(int graph[][100], int v, bool visited[], int n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[v] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; n; i++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (graph[v][i] == 1 &amp;&amp; !visited[i]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dfs(graph, i, visited, n);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

    cpp: `#include &lt;vector&gt;<br>using namespace std;<br><br>void <span id="function">dfs</span>(vector&lt;vector&lt;int&gt;&gt;&amp; graph, int v, vector&lt;bool&gt;&amp; visited) {<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[v] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (int u : graph[v]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!visited[u]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dfs(graph, u, visited);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

    js: `function <span id="function">dfs</span>(graph, v, visited) {<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[v] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;for (const u of graph[v]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!visited[u]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dfs(graph, u, visited);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

    py: `def <span id="function">dfs</span>(graph, v, visited):<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[v] = True<br>&nbsp;&nbsp;&nbsp;&nbsp;for u in graph[v]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if not visited[u]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dfs(graph, u, visited)`,
  },

  bfs: {
    c: `#include &lt;stdbool.h&gt;<br>#include &lt;stdio.h&gt;<br><br>void <span id="function">bfs</span>(int graph[][100], int start, int n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;bool visited[100] = {false};<br>&nbsp;&nbsp;&nbsp;&nbsp;int queue[100], front = 0, rear = 0;<br>&nbsp;&nbsp;&nbsp;&nbsp;queue[rear++] = start;<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[start] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;while (front &lt; rear) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int v = queue[front++];<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (int i = 0; i &lt; n; i++) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (graph[v][i] == 1 &amp;&amp; !visited[i]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue[rear++] = i;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited[i] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

    cpp: `#include &lt;queue&gt;<br>#include &lt;vector&gt;<br>using namespace std;<br><br>void <span id="function">bfs</span>(vector&lt;vector&lt;int&gt;&gt;&amp; graph, int start, int n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;vector&lt;bool&gt; visited(n, false);<br>&nbsp;&nbsp;&nbsp;&nbsp;queue&lt;int&gt; q;<br>&nbsp;&nbsp;&nbsp;&nbsp;q.push(start);<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[start] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;while (!q.empty()) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int v = q.front();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q.pop();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (int u : graph[v]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!visited[u]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;q.push(u);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited[u] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

   
    js: `function <span id="function">bfs</span>(graph, start, n) {<br>&nbsp;&nbsp;&nbsp;&nbsp;const visited = new Array(n).fill(false);<br>&nbsp;&nbsp;&nbsp;&nbsp;const queue = [];<br>&nbsp;&nbsp;&nbsp;&nbsp;queue.push(start);<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[start] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;while (queue.length &gt; 0) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;const v = queue.shift();<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (const u of graph[v]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (!visited[u]) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.push(u);<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited[u] = true;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}`,

    py: `from collections import deque<br><br>def <span id="function">bfs</span>(graph, start, n):<br>&nbsp;&nbsp;&nbsp;&nbsp;visited = [False] * n<br>&nbsp;&nbsp;&nbsp;&nbsp;queue = deque([start])<br>&nbsp;&nbsp;&nbsp;&nbsp;visited[start] = True<br>&nbsp;&nbsp;&nbsp;&nbsp;while queue:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v = queue.popleft()<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for u in graph[v]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if not visited[u]:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;queue.append(u)<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;visited[u] = True`,
  },

  astar: {
    c: `#include &lt;math.h&gt;<br>#include &lt;stdbool.h&gt;<br>#include &lt;limits.h&gt;<br><br>typedef struct {<br>&nbsp;&nbsp;&nbsp;&nbsp;int x, y;<br>&nbsp;&nbsp;&nbsp;&nbsp;int f, g, h;<br>&nbsp;&nbsp;&nbsp;&nbsp;int parent;<br>} Node;<br><br>int <span id="function">heuristic</span>(int x1, int y1, int x2, int y2) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return abs(x1 - x2) + abs(y1 - y2);<br>}<br><br>int <span id="function">astar</span>(int grid[][100], int rows, int cols, int startX, int startY, int goalX, int goalY) {<br>&nbsp;&nbsp;&nbsp;&nbsp;Node nodes[10000];<br>&nbsp;&nbsp;&nbsp;&nbsp;bool closedSet[100][100] = {false};<br>&nbsp;&nbsp;&nbsp;&nbsp;bool openSet[100][100] = {false};<br>&nbsp;&nbsp;&nbsp;&nbsp;int nodeCount = 0;<br>&nbsp;&nbsp;&nbsp;&nbsp;// A* implementation here<br>&nbsp;&nbsp;&nbsp;&nbsp;return -1; // Path not found<br>}`,

    cpp: `#include &lt;vector&gt;<br>#include &lt;queue&gt;<br>#include &lt;cmath&gt;<br>using namespace std;<br><br>struct <span id="function">Node</span> {<br>&nbsp;&nbsp;&nbsp;&nbsp;int x, y;<br>&nbsp;&nbsp;&nbsp;&nbsp;int f, g, h;<br>&nbsp;&nbsp;&nbsp;&nbsp;Node* parent;<br>&nbsp;&nbsp;&nbsp;&nbsp;Node(int x, int y) : x(x), y(y), f(0), g(0), h(0), parent(nullptr) {}<br>};<br><br>int <span id="function">heuristic</span>(int x1, int y1, int x2, int y2) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return abs(x1 - x2) + abs(y1 - y2);<br>}<br><br>vector&lt;pair&lt;int, int&gt;&gt; <span id="function">astar</span>(vector&lt;vector&lt;int&gt;&gt;&amp; grid, int startX, int startY, int goalX, int goalY) {<br>&nbsp;&nbsp;&nbsp;&nbsp;int rows = grid.size(), cols = grid[0].size();<br>&nbsp;&nbsp;&nbsp;&nbsp;vector&lt;vector&lt;bool&gt;&gt; closedSet(rows, vector&lt;bool&gt;(cols, false));<br>&nbsp;&nbsp;&nbsp;&nbsp;vector&lt;vector&lt;Node*&gt;&gt; allNodes(rows, vector&lt;Node*&gt;(cols, nullptr));<br>&nbsp;&nbsp;&nbsp;&nbsp;priority_queue&lt;Node*, vector&lt;Node*&gt;, function&lt;bool(Node*, Node*)&gt;&gt; openSet(<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[](Node* a, Node* b) { return a-&gt;f &gt; b-&gt;f; });<br>&nbsp;&nbsp;&nbsp;&nbsp;// A* implementation<br>&nbsp;&nbsp;&nbsp;&nbsp;return vector&lt;pair&lt;int, int&gt;&gt;();<br>}`,

    js: `function heuristic(x1, y1, x2, y2) {<br>&nbsp;&nbsp;&nbsp;&nbsp;return Math.abs(x1 - x2) + Math.abs(y1 - y2);<br>}<br><br>function astar(grid, startX, startY, goalX, goalY) {<br>&nbsp;&nbsp;&nbsp;&nbsp;const rows = grid.length, cols = grid[0].length;<br>&nbsp;&nbsp;&nbsp;&nbsp;const closedSet = Array.from({ length: rows }, () => Array(cols).fill(false));<br>&nbsp;&nbsp;&nbsp;&nbsp;const openSet = new MinPriorityQueue({ priority: n => n.f });<br>&nbsp;&nbsp;&nbsp;&nbsp;openSet.enqueue({ x: startX, y: startY, f: 0, g: 0, h: 0, parent: null });<br>&nbsp;&nbsp;&nbsp;&nbsp;// A* logic here<br>&nbsp;&nbsp;&nbsp;&nbsp;return [];<br>}`,

    py: `def heuristic(x1, y1, x2, y2):<br>&nbsp;&nbsp;&nbsp;&nbsp;return abs(x1 - x2) + abs(y1 - y2)<br><br>def astar(grid, startX, startY, goalX, goalY):<br>&nbsp;&nbsp;&nbsp;&nbsp;import heapq<br>&nbsp;&nbsp;&nbsp;&nbsp;rows, cols = len(grid), len(grid[0])<br>&nbsp;&nbsp;&nbsp;&nbsp;closedSet = [[False]*cols for _ in range(rows)]<br>&nbsp;&nbsp;&nbsp;&nbsp;openSet = []<br>&nbsp;&nbsp;&nbsp;&nbsp;heapq.heappush(openSet, (0, 0, (startX, startY), None))<br>&nbsp;&nbsp;&nbsp;&nbsp;# A* logic here<br>&nbsp;&nbsp;&nbsp;&nbsp;return []`,
  },
};


let algo = "Dijkastra";
update_implementation();

function update_implementation() {
  algo = document.getElementById("algo_menu").value;
  console.log(curr_algo);



  if (algo == "Dijkastra") {

    c.innerHTML="";
    c.innerHTML=codeMap["dijkstra"]["c"];

    cpp.innerHTML="";
    cpp.innerHTML=codeMap["dijkstra"]["cpp"];
    js.innerHTML="";
    js.innerHTML=codeMap["dijkstra"]["js"];
    py.innerHTML="";
    py.innerHTML=codeMap["dijkstra"]["py"];
  } else if (algo == "A*") {
     c.innerHTML="";
    c.innerHTML=codeMap["astar"]["c"];
    cpp.innerHTML="";
    cpp.innerHTML=codeMap["astar"]["cpp"];
    js.innerHTML="";
    js.innerHTML=codeMap["astar"]["js"];
    py.innerHTML="";
    py.innerHTML=codeMap["astar"]["py"];
  } else if (algo == "Depth First") {
      c.innerHTML="";
    c.innerHTML=codeMap["dfs"]["c"];
    cpp.innerHTML="";
    cpp.innerHTML=codeMap["dfs"]["cpp"];
    js.innerHTML="";
    js.innerHTML=codeMap["dfs"]["js"];
    py.innerHTML="";
    py.innerHTML=codeMap["dfs"]["py"];
  } else if (algo == "Breadth First") {
    c.innerHTML="";
    c.innerHTML=codeMap["bfs"]["c"];
    cpp.innerHTML="";
    cpp.innerHTML=codeMap["bfs"]["cpp"];
    js.innerHTML="";
    js.innerHTML=codeMap["bfs"]["js"];
    py.innerHTML="";
    py.innerHTML=codeMap["bfs"]["py"];
  }
}
