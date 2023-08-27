#!/usr/bin/env node

const fs = require('fs');

fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});

setImmediate(() => {
  console.log('This runs while file is being read');
});
