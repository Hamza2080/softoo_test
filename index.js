/**
 * As mentioned, not to use any external library i.e. express 
 * so, I create node basic server for http...
 */

const modules = require('./utils/import.js');
const config = require('./utils/config.js');
const handleHttpRequest = require('./handleHttpRequest.js');

const server = modules.http.createServer((req, res) => {handleHttpRequest(req, res)});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});