---
HTML header:	<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
---
<style>
body{
    font-family: Fairfax HD, monospace
}
dt{
    text-decoration: underline;
}
blockquote {
    border-left: 4px solid grey;
    padding-left: 8px;
}
table, th, td {
    border: 1px solid;
    text-align: center;
    padding: 4px;
}
table {
    border-collapse: collapse;
}
</style>
# Algorithms Study Guide

## P and NP (6 sub questions)
> Problems that have algorithms to find a solution are called __decidable__.
>
> Problems for which no algorithm can be determine a solution are called __undecidable__.

Polynomial Time
:   Describes problems for which there exists an algorithm that can solve the problem in an amount of time polynomially related to the number of inputs
:   Linear Search, Binary Search, Insertion Sort, Merge Sort, Matrix Multiplication

Exponential Time
:   Describes problems for which an algorithm exists with an exponential runtime related to the number of inputs.
:   Traveling Salesperson, Graph Coloring

Nondeterministic Polynomial Time
:   Problems that can be verified in polynomial time, but not solved.
:   Problems that can be verified by a deterministic Turing Machine in polynomial time, and only solved by a nondeterministic Turing Machine in polynomial time.

NP-Hard
:   Every problem in NP can be reduced to a problem in the NP-Hard set
:   The reduction algorithm is in polynomial time.
:   If one NP-Hard problem can be solved with the reduction algorithm, all NP problems can be solved.

NP-Complete
:   NP-Hard problems that have a nondeterministic polynomial time algorithm.
:   A problem is NP-complete if it is in NP, and every problem in NP can be reduced to it.

Boolean Satisfiability
:   A problem is _satisfiable_ if it evaluates to TRUE for some assignment to its variables.


Optimization Problems
:   Asks for an optimal solution to a given problem
:   0-1 Knapsack, Minimum Spanning Trees, Optimal Binary Search Trees

Decision Problems
:   A decision problem is one with a yes or no answer

## Dynamic Programming (2 questions)

Dynamic Programming algorithms are built on recursion. Specifically, problems are broken into sub problems that are identical.

Top Down
:   DP algorithms memoize as they work, storing intermediate results while the logic of the algorithms recurses down the set of inputs.

Bottom Up
:   DP algorithms use Tabulation, they begin at the smallest sub problems, and use the results they generate to compute the higher-order sub-problems.

The Principle of Optimality
:   states that for a problem to have an optimal solution by dynamic programming, then there must be an optimal solution to all sub-problems.

> **Note!**
> all the "by hand" algorithms listed here are bottom-up algorithms that use tabulation.
> most of the problems have similarly performing or better performing top-down algorithms
> that use recursion, but such algorithms are typically not ideal for working by hand.

### topics covered

#### Binomial Coefficient Problem

Given two integer values, n and k, one must find the **Binomial Coefficient** of n and k.

The binomial coefficient can be defined as the number of ways that **k** objects can be selected from a collection of **n** objects.

__Computation by Hand__:
- lay down table of length (k+1) and width (n+1)
- each cell represents an answer to the question "what is the Binomial Coefficient of i and j?", with i being the row, and j being the column.
- fill in by the following ruls:
    - if the current column is 0, or is equal to the current row, set to **1**.
    - otherwise, set the current value to be **the cell 1 up and to the left** plus **the cell 1 up**
    
> **Note!**
> This is actually just a confusing description of how to construct **Pascal's Triangle**
> 
> If you want to find the binomial coefficient of **n and k**, take the **kth** number from the
> left in the **nth** row of Pascal's Triangle.

Here's a Pascal's Triangle just for you :)

![](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pascal%27s_triangle_5.svg/200px-Pascal%27s_triangle_5.svg.png)

#### Matrix-chain Multiplication / Minimum Multiplications Algorithm

Given a set of matricies of different dimensions, one must find the optimal order in which to multiply the matricies.

Matrix multiplication is commutative, as in, AB = BA, but the number of individual calculations required to compute the result, is not.

Take A.10x30, B.30x5, and C.5x60
- (AB)C = 4500 operations
- A(BC) = 27000 operations

__Computation by Hand__:
- lay down a table of size **nxn** where **n** is the number of matricies
- set all cells in the main diagonal to 0
- ignore all cells beneath the diagonal
- compute diagonally, where each iteration is along the diagonal one to the right of the last.
- the first diagonal is the **cost of computing the row's matrix with the column's matrix**.
- for each subsequent diagonal
    - for each cell
        - begin with the cell immediately to the left, and furthest to the bottom of the current cell
        - add the cells together
        - add the cost of computing the two components
        - move to the cells one further to the left, and one closer from the bottom.
    - repeat until all costs have been calculated, and take the minimum.

| * | A | B  | C  |
| - | - | -  | -- |
| A | 0 |1500|4500|
| B | * | 0  |9000|
| C | * | *  | 0  |

- AB: 10x30x5 == 1500
- BC: 30x5x60 == 9000
- (AB)C: 1500 + 0 + (10x5x60: 3000) == **4500**
- A(BC): 0 + 9000 + (10x30x60: 18000) == 27000
> - minimum: 4500
> - order: (AB)C

#### 0-1 Knapsack Problem

Given a knapsack with a capacity **W**, and a set of items each with a given weight **w**, and a given value **v**, one must find the set of items that maximize value while staying under or equal to the capacity.

__Computation by Hand__:
- lay down table of width **W**, and length **i** (the total number of items)
- each cell represents an answer to the question "what is the optimal value using **i** items and a capacity of **w**?"
- trivially, the row with 0 items and the column with 0 capacity is all 0.
- calculating by row, fill in by the following rules:
    - if the weight of the item of the current row is greater than the current capcity (column), then set the cell to the value of the cell immediately above.
    - otherwise, set the cell to **the cell above** or **the cell one row above, and the column at current capcity (column) minus the current item weight (row), plus the value of the current item**, whichever is larger.
    
![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Knapsack_problem_dynamic_programming.gif/220px-Knapsack_problem_dynamic_programming.gif)

#### Longest Common Subsequence

Given a set of sequences, typically exemplified by strings of characters, one must find the longest subsequence that occurs in all of them.

The following is an algorithm to compare two strings, for subsequent strings, use the resulting subsequence in another iteration of the algorithm as one of the input strings.

__Computation by Hand__:
- lay down a table of size **n+1 x k+1**, where **n** is the length of the first string, and **k** is the length of the second
- label the rows with the elements of the first sequence, starting with a null value called &epsilon;.
- label the columns with the elements of the second sequence, also starting with &epsilon;
- fill in the &epsilon; row and column with &epsilon;s.
- filling in by row, if the row and column element match
    - concatenate the element to the entry from the cell above, and the cell to the left.
    - these can be combined if they are still equal, or joined with an ampersand, if they are of equal length
    - otherwise, write the longer one.
- if the row and column do not match
    - take the values from the above and left cells, removing any redundancy, and taking the longest of the two, or both if they are equal.
- the last cell will contain either the longest common subsequence, or multiple common subsequences of the same maximum length.

see Wikipedia's [worked example](https://en.wikipedia.org/wiki/Longest_common_subsequence#Worked_example)

#### Optimal Binary Search Trees

Given a set of items, and a corresponding set of probabilities, one must construct a binary search 
tree that minimizes the overall cost of searching by placing items more likely to be accessed 
closer to the root of the tree.

> **Note!**
> This problem is nearly identical to the one solved by Huffman Coding, and can thus be 
> solved by following a nearly identical algorithm.
>
> Huffman coding is conceptually pretty simple, and the [Wikipedia article](https://en.wikipedia.org/wiki/Huffman_coding)
> does a good job explaining it.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/HuffmanCodeAlg.png/220px-HuffmanCodeAlg.png)

#### Floyd-Warshall Algorithm
Finds the shortest path between __all__ nodes, including negative edges.

__Computation by Hand__:
- lay down a table of size **v x v** where v is the number of verticies.
- each cell is an answer to the question "what is the minimum distance between the ith vertex and jth vertex?".
- initialize every value in the table to infinity. (at least conceptually)
- for each edge in the graph, set the cell that corresponds to that edge to the weight of that edge
    - source vertex row, destination vertex column
- set each cell where i = j to 0.
- for k in range 1 to the number of verticies (|V|)
    - for i in range 1 to |V|
        - for j in range 1 to |V|
            - if the cell at **row i, columnn j** is greater than cell **row i, column j** plus **row k, column j**
                - set cell **row i, column j** to that sum.
                
The detection of negative cycles naturally falls out of this algorithm, as the only way any 
distance between a vertex and itself can be improved from 0, is if it is part of a negative cycle, 
thus if the algorithm changes one of these diagonal values, there must be a negative cycle.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Floyd-Warshall_example.svg/600px-Floyd-Warshall_example.svg.png)

#### Bellman-Ford Algorithm
Finds the shortest path from __one__ node to all nodes, including negative edges.

Similarly to the Floyd-Warshall algorithm, I can't really describe a way to do this by hand that isn't just the pseudocode for the algorithm, so just use the [pseudocode](https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm#Algorithm).

![](http://www.programming-algorithms.net/image/id/47416)

## Greedy Algorithms (3 questions + 2 multiple-choice)

#### Dijkstra's Algorithm
Finds the shortest path between two nodes with only positive edges.

__Computation by Hand__:
- Begin by labeling each node with a distance.
    - 0 for the start node
    - the edge weight for each node adjacent to the starting node
    - infinity for all other nodes
- Proceed by selecting the closest adjacent node
    - update nodes adjacent to this node by adding this node's current distance to the adjacent's edge weight, **only if the new distance is shorter**.
- Repeat this for all other nodes, in a breadth-first manner, completing all nodes i edges away from the origin, before doing the closest nodes i+1 edges away from the origin.
- At the end of this process, each node will be labeled with its shortest distance to the origin.

![](https://ds055uzetaobb.cloudfront.net/brioche/uploads/lessons/dijkstra-EQ50NN.gif)

#### O-1 Knapsack Problem

There is no **optimal** greedy algorithm for the 0-1 Knapsack Problem, but there do exist greedy **approximation** algorithms that will be faster than the optimal DP algorithm.

__Computation by Hand__:
- Sort the items in decreasing order of value per unit weight. i.e. $v_1 / w_1 >= v_2 / w_2 ...$
- Insert them into the sack in order.
- If the problem is **unbounded**, meaning one can insert as many copies of a single item as one desires, then this algorithm will yield a maximum at least half of the optimal maximum.
- If the problem is **bounded**, meaning only one copy of each item exists, then take the set of items created by the algorithm (S_1), and a set containing the first item that didn't fit (S_2).
- One of these sets will have a value of at least half of the optimal value, assuming each item individually fits into the sack.


#### Prim's Algorithm / Kruskal's Algorithm / Minimum Spanning Trees
> For complete or nearly complete graphs, __Prim's Algorithm__ performs faster.  $O(E\log V)$
> 
> If the graph is spars, or has few edges, __Kruskal's Algorithm__ gives $O(E\log E)$

__Prim's Algorithm by Hand__:
- Arbitrarily select a node from the graph
- Of the edges that connect to verticies not in the tree
    - Add the minimum edge to the tree
- Repeat until all verticies are in the tree.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/PrimAlgDemo.gif/200px-PrimAlgDemo.gif)

__Kruskal's Algorithm by Hand__:
- Conceptualize each vertex as the root of a new tree. i.e. A forest
- Sort all edges of the graph by weight
- For each edge in the sortest list, starting with the smallest
    - Add the edge to the forest, if **adding it will not create a cycle**.

![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/KruskalDemo.gif/300px-KruskalDemo.gif)

Kruskal's algorithm will always generate a minimum spanning **forest**, unless the graph is
**connected**, where it will generate a minimum spanning tree.

#### Maximum Flow / Minimum Cut
> The max-flow min-cut theorem states that, in a flow network, the maximum amount of flow passing
> from the *source* to the *sink* is equal to the total weight of the edges in a minimum cut, the
> smallest total weight of the edges, which if removed from the network, would disconnect the
> source from the sink.

__Ford-Fulkerson Algorithm by Hand__:
- Given a source node **s**, and sink node **t**
- Each edge in the graph begins with a **flow** of 0.
- For each possible path between **s** and **t**
    - Find the minimum edge along the path, this is the total flow of the path. (**f**)
    - For each edge (u, v) in the path
        - Set the **flow** from **u to v** to the current flow(u, v) + **f**
        - Set the **flow** from **v to u** to the current flow(v, u) - **f**

![](https://miro.medium.com/v2/resize:fit:1400/1*UCb45MFbnUXqn-U2_qWtLQ.gif)

