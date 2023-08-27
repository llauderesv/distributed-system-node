setTimeout(() => console.log('A'), 0);
console.log('B');
setTimeout(() => console.log('C'), 500);
setTimeout(() => console.log('D'), 100);

let i = 0;
while (i < 1_000_000) {
  let ignore = Math.sqrt(i);
  i++;
}
console.log('E');

setImmediate(() => console.log("I'm the first"));
