import React, { useEffect, useState } from 'react';
import './SortingVisualizer.css';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { getMergeSortAnimations } from '../../algorithm/mergeSortAlgorithm';
import { getQuickSortAnimations } from '../../algorithm/quickSortAlgorithm';
import { getHeapSortAnimations } from '../../algorithm/heapSortAlgorithm';
import { getBubbleSortAnimations } from '../../algorithm/bubbleSortAlgorithm';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const SWAP_COLOR = '#cfe7cd';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);

    useEffect(() => {
        handleResetArray();
    }, []);

    const handleResetArray = () => {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 1000));
        }
        setArray(array);
        console.log(array);
    };

    const handleMergeSort = () => {
        console.log('Merge Sort');
        const animations = getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight / 2}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    };

    const handleQuickSort = () => {
        console.log('Quick Sort');
        const animations = getQuickSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isSwap = animations[i].length === 3; // Check if it's a swap animation
            if (isSwap) {
                const [idx1, idx2, swap] = animations[i];
                const bar1Style = arrayBars[idx1].style;
                const bar2Style = arrayBars[idx2].style;
                const color = swap ? SWAP_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    bar1Style.backgroundColor = color;
                    bar2Style.backgroundColor = color;
                    if (swap) {
                        const tempHeight = bar1Style.height;
                        bar1Style.height = bar2Style.height;
                        bar2Style.height = tempHeight;
                    }
                }, i * ANIMATION_SPEED_MS);
            } else {
                const [idx1, pivotIdx] = animations[i];
                const bar1Style = arrayBars[idx1].style;
                const bar2Style = arrayBars[pivotIdx].style;
                setTimeout(() => {
                    bar1Style.backgroundColor = SECONDARY_COLOR;
                    bar2Style.backgroundColor = SECONDARY_COLOR;
                    const tempHeight = bar1Style.height;
                    bar1Style.height = bar2Style.height;
                    bar2Style.height = tempHeight;
                    bar1Style.backgroundColor = PRIMARY_COLOR;
                    bar2Style.backgroundColor = PRIMARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    };


    const handleHeapSort = () => {
        console.log('Heap Sort');
        const arrayBars = document.getElementsByClassName('array-bar');
        const animations = getHeapSortAnimations(array); // Assuming array is defined elsewhere

        for (let i = 0; i < animations.length; i++) {
            const [idx1, idx2] = animations[i];
            const bar1Style = arrayBars[idx1].style;
            const bar2Style = arrayBars[idx2].style;

            setTimeout(() => {
                const isSwap = i % 2 !== 0;
                if (isSwap) {
                    // Swap heights
                    const tempHeight = bar1Style.height;
                    bar1Style.height = bar2Style.height;
                    bar2Style.height = tempHeight;
                } else {
                    // Highlight bars
                    bar1Style.backgroundColor = SWAP_COLOR; // Assuming SWAP_COLOR is defined
                    bar2Style.backgroundColor = SWAP_COLOR; // Assuming SWAP_COLOR is defined
                }
            }, i * ANIMATION_SPEED_MS);
        }
    };

    const handleBubbleSort = () => {
        console.log('Bubble Sort');
        const animations = getBubbleSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 2 === 0;
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = isColorChange ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
                if (barOneStyle && barTwoStyle) {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }
                if (!isColorChange) {
                    const [idx, height] = animations[i];
                    const barStyle = arrayBars[idx].style;
                    if (barStyle) {
                        barStyle.height = `${height}px`;
                    }
                }
            }, i * ANIMATION_SPEED_MS);
        }
    };


    return (
        <div className='flex flex-col justify-between h-screen py-2'>
            <div className="flex flex-row justify-center align-center">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 h-[30px] w-[6px] bg-blue-300 flex items-center justify-center m-[2px] array-bar"
                        style={{ height: `${value / 2}px` }}
                    >
                        {/* {value} */}
                    </div>
                ))}
            </div>

            <div className='flex flex-row justify-center align-center'>
                <ButtonGroup>
                    <Button colorScheme='blue' size='xs' onClick={handleResetArray}>Generate New Array</Button>
                    <Button colorScheme='blue' size='xs' onClick={handleMergeSort}>Merge Sort</Button>
                    <Button colorScheme='blue' size='xs' onClick={handleQuickSort}>Quick Sort</Button>
                    <Button colorScheme='blue' size='xs' onClick={handleHeapSort}>Heap Sort</Button>
                    <Button colorScheme='blue' size='xs' onClick={handleBubbleSort}>Bubble Sort</Button>
                </ButtonGroup>
            </div>
        </div>

    )
}

export default SortingVisualizer;

const randomIntFromInterval = () => {
    // Generates a random number between 5 and 1000
    return Math.floor(Math.random() * (1000 - 5 + 1) + 5);
};