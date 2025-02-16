/* Provide 3 unique implementations of the following function in JavaScript.

Input**: `n` - any integer

Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.
*/

/* Using loop
Time complexity: O(n)
Space complexity: O(1)
*/
var sum_to_n_a = function (n) {
  if (n < 0) return 0;
  let sum = 0;
  for (let i = 1; i <= n; ++i) {
    sum += i;
  }
  return sum;
};

/* Using mathematic formula for n consecutive integer numbers 
Time complexity: O(1)
Space complexity: O(1)
*/
var sum_to_n_b = function (n) {
  if (n < 0) return 0;
  return (n * (n + 1)) / 2;
};

/* Using recursion
Time complexity: O(n)
Space complexity: O(n)
*/
var sum_to_n_c = function (n) {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};

/* Using Array.reduce method ( only for JavaScript )
Time complexity: O(n)
Space complexity: O(n)
*/
var sum_to_n_d = function (n) {
  if (n < 0) return 0;
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (sum, num) => sum + num,
    0
  );
};

console.log(sum_to_n_a(-1)); // Output: 0
console.log(sum_to_n_b(-1)); // Output: 0
console.log(sum_to_n_c(-1)); // Output: 0
console.log(sum_to_n_d(-1)); // Output: 0

console.log(sum_to_n_a(0)); // Output: 0
console.log(sum_to_n_b(0)); // Output: 0
console.log(sum_to_n_c(0)); // Output: 0
console.log(sum_to_n_d(0)); // Output: 0

console.log(sum_to_n_a(1)); // Output: 1
console.log(sum_to_n_b(1)); // Output: 1
console.log(sum_to_n_c(1)); // Output: 1
console.log(sum_to_n_d(1)); // Output: 1

console.log(sum_to_n_a(2)); // Output: 3
console.log(sum_to_n_b(2)); // Output: 3
console.log(sum_to_n_c(2)); // Output: 3
console.log(sum_to_n_d(2)); // Output: 3

console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15
console.log(sum_to_n_d(5)); // Output: 15

console.log(sum_to_n_a(10)); // Output: 55
console.log(sum_to_n_b(10)); // Output: 55
console.log(sum_to_n_c(10)); // Output: 55
console.log(sum_to_n_d(10)); // Output: 55

console.log(sum_to_n_a(50)); // Output: 1275
console.log(sum_to_n_b(50)); // Output: 1275
console.log(sum_to_n_c(50)); // Output: 1275
console.log(sum_to_n_d(50)); // Output: 1275

console.log(sum_to_n_a(100)); // Output: 5050
console.log(sum_to_n_b(100)); // Output: 5050
console.log(sum_to_n_c(100)); // Output: 5050
console.log(sum_to_n_d(100)); // Output: 5050

console.log(sum_to_n_a(500)); // Output: 125250
console.log(sum_to_n_b(500)); // Output: 125250
console.log(sum_to_n_c(500)); // Output: 125250
console.log(sum_to_n_d(500)); // Output: 125250

console.log(sum_to_n_a(1000)); // Output: 500500
console.log(sum_to_n_b(1000)); // Output: 500500
console.log(sum_to_n_c(1000)); // Output: 500500
console.log(sum_to_n_d(1000)); // Output: 500500

// Add exports for testing
module.exports = {
  sum_to_n_a,
  sum_to_n_b,
  sum_to_n_c,
  sum_to_n_d,
};
