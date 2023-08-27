console.log('Start');

setImmediate(() => {
  console.log('Next tick callback executed');
});

console.log('End');
