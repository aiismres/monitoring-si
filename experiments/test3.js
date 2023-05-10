const arrObj = [
  { x: 1, y: 2 },
  { x: 3, y: 4 },
  { x: 5, y: 6 },
];
arrObj.forEach((item) => (item.x = 0));
arrObj.reverse();
console.log(arrObj);
