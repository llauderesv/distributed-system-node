(function () {
  // const nt_recursive = () => process.nextTick(nt_recursive);
  // nt_recursive(); // setInterval will never run
  // const si_recursive = () => setImmediate(si_recursive);
  // si_recursive(); // setInterval will run
  // setInterval(() => console.log('hi'), 10);

  function myAsyncOperation(count, callback) {
    callback();
  }

  // Antipattern

  function foo(count, callback) {
    if (count <= 0) {
      return callback(new TypeError('count > 0'));
    }
    myAsyncOperation(count, callback);
  }

  function foo(count, callback) {
    if (count <= 0) {
      return process.nextTick(() => callback(new TypeError('count > 0')));
    }

    myAsyncOperation(count, callback);
  }

  /**
   * Output: true because the process.nextTick ensures that all user's code run before the
   * process.nextTick executes.
   *
   * By using process.nextTick() we guarantee that foo() always runs its callback
   * after the rest of the user's code and before the event loop is allowed to proceed.
   *
   */
  let bar = false;

  foo(0, error => {
    console.log('Start');
    console.log(error);
    console.log(bar);
    console.log('Next');
  });
  bar = true;
})();
