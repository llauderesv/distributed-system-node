#!/usr/bin/env node

const fetch = require('node-fetch');
const server = require('fastify')();
const lru = new (require('lru-cache'))({
  max: 4096,
  maxSize: 1_024 * 1_024,
  sizeCalculation: (payload, key) => payload.length + key.length,
  ttl: 10 * 60 * 1_000
});

const PORT = process.env.PORT || 3000;

server.get('/account/:account', async (req, reply) => {
  return getAccount(req.params.account);
});
server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

async function getAccount(account) {
  const cached = lru.get(account);
  if (cached) { console.log('cache hit'); return JSON.parse(cached); }
  console.log('cache miss');
  const result = await fetch(`https://api.github.com/users/${account}`);
  const body = await result.text();
  lru.set(account, body);
  return JSON.parse(body);
}