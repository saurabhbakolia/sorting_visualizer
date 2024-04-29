export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    
    const n = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            // Push indices of elements being compared for color change
            animations.push([i, i + 1]);
            // Push indices again to revert color change
            animations.push([i, i + 1]);
            if (array[i] > array[i + 1]) {
                // Push indices and values for swapping
                animations.push([i, array[i + 1]]);
                animations.push([i + 1, array[i]]);
                // Swap elements in the array
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
    } while (swapped);

    return animations;
}
