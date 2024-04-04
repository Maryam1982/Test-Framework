const { forEach } = require("./index");
const assert = require("assert");

let arr;
beforeEach(() => {
  arr = [1, 2, 3];
});

it("Should sum an array", () => {
  let sum = 0;
  forEach(arr, (val) => {
    sum += val;
  });
  arr.push(4);
  assert.strictEqual(sum, 7);
});

it("Array length must be 3", () => {
  assert.strictEqual(arr.length, 3);
});
