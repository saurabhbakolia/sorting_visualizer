export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx >= endIdx) return;
    const pivotIdx = partition(mainArray, startIdx, endIdx, auxiliaryArray, animations);
    quickSortHelper(mainArray, startIdx, pivotIdx - 1, auxiliaryArray, animations);
    quickSortHelper(mainArray, pivotIdx + 1, endIdx, auxiliaryArray, animations);
}

function partition(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    const pivot = mainArray[endIdx];
    let pivotIdx = startIdx;
    for (let i = startIdx; i < endIdx; i++) {
        // Push indices to change their color
        animations.push([i, endIdx]);
        // Push again to revert color change
        animations.push([i, endIdx]);
        if (mainArray[i] <= pivot) {
            // Swap elements
            animations.push([i, pivotIdx, true]); // Highlight swapping elements
            const temp = mainArray[i];
            mainArray[i] = mainArray[pivotIdx];
            mainArray[pivotIdx] = temp;
            pivotIdx++;
        }
    }
    // Swap pivot with pivotIdx element
    animations.push([endIdx, pivotIdx, true]); // Highlight swapping elements
    const temp = mainArray[endIdx];
    mainArray[endIdx] = mainArray[pivotIdx];
    mainArray[pivotIdx] = temp;
    return pivotIdx;
}
