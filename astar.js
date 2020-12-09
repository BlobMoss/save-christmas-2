import { distance } from './helpers.js'

let grid = [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','#','B',' ',' ',' ',' ',' ',' '],
    [' ',' ','#','#','#','#','#',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ','A',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']
]

// save start and end start nodes
let start
let end

// fill string matrix with node objects
for (let x = 0; x < grid.length; x++){
    for (let y = 0; y < grid[x].length; y++){
        const symbol = grid[x][y]

        grid[x][y] = {
            position : [x,y],
            symbol : symbol,
            explored : false,
            cost : Infinity,
            parent : undefined
        }
        
        if (symbol === 'A'){
            start = grid[x][y]
            // lower cost of starting node to 0
            start.cost = 0
        } else if (symbol === 'B'){
            end = grid[x][y]
        }
    }
}

// find and explore the cheapest node
for (let cheapest; cheapest != end; explore(cheapest)){
    let distance = Infinity
    for (let x = 0; x < grid.length; x++){
        for (let y = 0; y < grid[x].length; y++){
            const node = grid[x][y]
            if (node.cost < distance && node.explored === false){
                distance = node.cost
                cheapest = node
            }
        }
    }
    // exit if no unsearched nodes were found
    if (distance === Infinity){
        console.log('Path Obstructed!')
        process.exit()
    }
}

// find eldest ancestor node
let node = end
while (node.parent != start){
    node = node.parent
    node.symbol = 'x'
}

function explore(node){
    // calculates cost of node as steps from A and distance from B
    const costOf = (neighbor) => distance(node, neighbor) + distance(node,end)

    // don't search obstacles or already searched nodes
    const treversable = (node) => node.symbol != '#' && node.parent == undefined

    // make sure to only fit nodes inside grid
    const limitX = (x) => Math.min(Math.max(x, 0), grid.length - 1)
    const limitY = (y) => Math.min(Math.max(y, 0), grid[0].length - 1)

    const x = node.position[0]
    const y = node.position[1]

    // find every neighboring node
    const neighbors = [
        grid[limitX(x + 1)][y],
        grid[limitX(x - 1)][y],
        grid[x][limitY(y + 1)],
        grid[x][limitY(y - 1)],
        grid[limitX(x + 1)][limitY(y - 1)],
        grid[limitX(x - 1)][limitY(y - 1)],
        grid[limitX(x + 1)][limitY(y + 1)],
        grid[limitX(x - 1)][limitY(y + 1)]
    ]
    
    // set cost and inheritance of each neighbor
    neighbors.forEach(neighbor => {
        if (treversable(neighbor)){
            neighbor.cost = costOf(neighbor)
            neighbor.parent = node
        }
    })

    node.explored = true
}

// console.log every symbol of the matrix in a string
let renderString = ''
for (let x = 0; x < grid.length; x++){
    for (let y = 0; y < grid[x].length; y++){
        renderString += `[${grid[x][y].symbol}]`
    }
    renderString += '\n'
}

console.log(renderString)