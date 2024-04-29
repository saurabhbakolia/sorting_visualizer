export function getHeapSortAnimations(array) {
    const animations = [];
    heapSort(array, animations); // Call heapSort to generate animations
    return animations; // Return the animations array
}

function heapSort(array, animations) {
    buildMaxHeap(array, animations); // Build a max heap from the array
    let endIdx = array.length - 1;
    while (endIdx > 0) {
        // Swap the root (largest element) with the last element of the heap
        animations.push([0, endIdx]); // Highlight elements being swapped
        swap(array, 0, endIdx);
        maxHeapify(array, 0, endIdx, animations); // Restore heap property
        endIdx--; // Reduce the size of the heap
    }
}

function buildMaxHeap(array, animations) {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        maxHeapify(array, i, n, animations);
    }
}

function maxHeapify(array, idx, size, animations) {
    const leftIdx = 2 * idx + 1;
    const rightIdx = 2 * idx + 2;
    let largestIdx = idx;

    if (leftIdx < size && array[leftIdx] > array[largestIdx]) {
        largestIdx = leftIdx;
    }

    if (rightIdx < size && array[rightIdx] > array[largestIdx]) {
        largestIdx = rightIdx;
    }

    if (largestIdx !== idx) {
        animations.push([idx, largestIdx]); // Highlight elements being compared
        swap(array, idx, largestIdx); // Swap elements
        maxHeapify(array, largestIdx, size, animations); // Recursively heapify the affected subtree
    }
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
