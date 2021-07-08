# fastify-express
Comparing Express.js and Fastify.js using the same request.

Each framework was tested with Autocannon by running:
```
autocannon -c 100 -d 60 -p 10 --warmup [ -c 5 -d 5 ] localhost:3000/candidates/search/ae588a6b-4540-5714-bfe2-a5c2a65f547a
```
where "-c" is number of connections, "-d" is duration in seconds, and "-p" is number of pipelined requests.

Express.js:
┌─────────┬───────┬───────┬───────┬───────┬──────────┬──────────┬────────┐
│ Stat    │ 2.5%  │ 50%   │ 97.5% │ 99%   │ Avg      │ Stdev    │ Max    │
├─────────┼───────┼───────┼───────┼───────┼──────────┼──────────┼────────┤
│ Latency │ 29 ms │ 35 ms │ 76 ms │ 80 ms │ 43.75 ms │ 15.74 ms │ 155 ms │
└─────────┴───────┴───────┴───────┴───────┴──────────┴──────────┴────────┘
┌───────────┬─────────┬─────────┬────────┬─────────┬──────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%    │ 97.5%   │ Avg      │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼────────┼─────────┼──────────┼────────┼─────────┤
│ Req/Sec   │ 21167   │ 21775   │ 22719  │ 23055   │ 22593.87 │ 373.44 │ 21162   │
├───────────┼─────────┼─────────┼────────┼─────────┼──────────┼────────┼─────────┤
│ Bytes/Sec │ 8.11 MB │ 8.34 MB │ 8.7 MB │ 8.83 MB │ 8.65 MB  │ 143 kB │ 8.11 MB │
└───────────┴─────────┴─────────┴────────┴─────────┴──────────┴────────┴─────────┘

Fastify.js:
┌─────────┬──────┬──────┬───────┬───────┬─────────┬─────────┬───────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%   │ Avg     │ Stdev   │ Max   │
├─────────┼──────┼──────┼───────┼───────┼─────────┼─────────┼───────┤
│ Latency │ 4 ms │ 9 ms │ 10 ms │ 10 ms │ 7.38 ms │ 2.32 ms │ 39 ms │
└─────────┴──────┴──────┴───────┴───────┴─────────┴─────────┴───────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬───────────┬────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg       │ Stdev  │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼────────┼─────────┤
│ Req/Sec   │ 116607  │ 116735  │ 127487  │ 128383  │ 126682.67 │ 2317.9 │ 116568  │
├───────────┼─────────┼─────────┼─────────┼─────────┼───────────┼────────┼─────────┤
│ Bytes/Sec │ 38.7 MB │ 38.8 MB │ 42.3 MB │ 42.6 MB │ 42.1 MB   │ 768 kB │ 38.7 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴───────────┴────────┴─────────┘


Tested locally on:
Macbook Air M1 with 16Gb RAM
Node.js 16.4.2