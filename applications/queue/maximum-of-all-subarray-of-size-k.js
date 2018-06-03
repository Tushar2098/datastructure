/**
 * Sliding Window Maximum (Maximum of all subarrays of size k)
 * Can be also done using
 *      1. BST
 *      2. DEQUE
 */
const maxSubArray = function(arr, parts) {
    const output = [];
    for (let i = 0; i <= arr.length - parts; i++) {
        let max = arr[i];
        for (j = 1; j < parts; j++) {
            if (arr[i + j] > max) {
                max = arr[i + j];
            }
        }
        output.push(max);
        console.log(max);
    }
};

maxSubArray([1, 2, 3, 1, 4, 5, 2, 3, 6], 3);

/**
 * Sum of minimum and maximum elements of all subarrays of size k.
 * Input : arr[] = {2, 5, -1, 7, -3, -1, -2}  
        K = 4
Output : 18
Explanation : Subarrays of size 4 are : 
     {2, 5, -1, 7},   min + max = -1 + 7 = 6
     {5, -1, 7, -3},  min + max = -3 + 7 = 4      
     {-1, 7, -3, -1}, min + max = -3 + 7 = 4
     {7, -3, -1, -2}, min + max = -3 + 7 = 4   
     Sum of all min & max = 6 + 4 + 4 + 4 
                          = 18   
 */