const nt_recursive = () => process.nextTick(nt_recursive);
nt_recursive(); // setInterval will never run
const si_recursive = () => setImmediate(si_recursive);
si_recursive(); // setInterval will run
setInterval(() => console.log('hi'), 10);
