import { randomArray } from './helpers.js'
import { swap } from './helpers.js'

function bubbleSort(arr){
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1)
            }
        }
    }
    return arr
}

const arr = randomArray(50, 100)

console.log(arr)
console.log(bubbleSort(arr))
