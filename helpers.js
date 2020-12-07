
export function randomArray(len, n) {

    // Skapa en ny tom array av längd len
    const a = new Array(len)

    // Fyll varje plats i arrayen med ett random heltal
    for (let i = 0; i < a.length; i++) {
        a[i] = randomInt(n)
    }

    return a
}

export function swap(arr, a, b){
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}

function randomInt(n) {
    return Math.floor(Math.random() * (n + 1))
}
