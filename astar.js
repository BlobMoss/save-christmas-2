import { distance } from './helpers.js'
let grid = [
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','#','B',' ',' ',' ',' ',' ',' '],
    [' ',' ','#','#','#','#','#',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ','A',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' ',' ',' ']
]
let B
let A
for (let x = 0; x < grid.length; x++){
    for (let y = 0; y < grid[x].length; y++){
        if (grid[x][y] === 'A'){
            A = [x, y]
            explore(x,y)
        } else if(grid[x][y] === 'B'){
            B = [x, y]
        }
    }
}

while (true){
    let distance = Infinity
    let lowest
    for (let x = 0; x < grid.length; x++){
        for (let y = 0; y < grid[x].length; y++){
            if (grid[x][y] < distance && grid[x][y] > 0){
                distance = grid[x][y]
                lowest = [x, y]
            }
        }
    }
    console.log(lowest)
    if (lowest[0] === B[0] && lowest[1] === B[1]){
        explore(lowest[0],lowest[1])
        break
    }
    explore(lowest[0],lowest[1])
}
let node = [B[0],B[1]]
while (true){
    break
    node = grid[node[0]][node[1]]
    console.log(node)
    console.log(A)
    if (node[0] === A[0] && node[1] === A[1]){
        break
    }
}

function explore(x, y){
    const value = (x, y) => Math.floor((distance([x,y],A) + distance([x,y],B)) * 10)
    const treversable = (x, y) => grid[x][y].length == 1 && grid[x][y] != '#'

    grid[x][y] = [x, y]
    if (treversable(x + 1, y)) grid[x + 1][y] = value(x + 1, y)
    if (treversable(x - 1, y)) grid[x - 1][y] = value(x - 1, y)
    if (treversable(x, y + 1)) grid[x][y + 1] = value(x, y + 1)
    if (treversable(x, y - 1)) grid[x][y - 1] = value(x, y - 1)
    if (treversable(x + 1, y + 1)) grid[x + 1][y + 1] = value(x + 1, y + 1)
    if (treversable(x - 1, y + 1)) grid[x - 1][y + 1] = value(x - 1, y + 1)
    if (treversable(x + 1, y - 1)) grid[x + 1][y - 1] = value(x + 1, y - 1)
    if (treversable(x - 1, y - 1)) grid[x - 1][y - 1] = value(x - 1, y - 1)
}

let renderString = ''
for (let x = 0; x < grid.length; x++){
    for (let y = 0; y < grid[x].length; y++){
        renderString += `[${grid[x][y]}]`
        /*
        if (grid[x][y].length == 1){
            renderString += `[${grid[x][y]}]`
        } else{
            renderString += '[¤]'
        }
        */
    }
    renderString += '\n'
}
console.log(renderString)