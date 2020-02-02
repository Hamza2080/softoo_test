
const modules = require('./utils/import.js');

const newRequest = function (req, res) {
    let {path, querys} = parseUrl(req);
    let headers = req.headers;
    let methodName = req.method.toLowerCase();


    let httpBodyData = '';

    req.on('data',(data) => {
        httpBodyData += data;
        if (httpBodyData.length > 1e6) req.connection.destroy();
    })
    req.on('end', ()=> {
        let data = httpBodyData ? JSON.parse(httpBodyData) : {};
        forwardReqToRouteHandler({path, querys, headers, methodName, data:data}, req, res);
    })
    
}

function parseUrl(req) {
    let parsedURL = modules.url.parse(req.url, true);
    let path = parsedURL.pathname;
    let querys = parsedURL.query;
    path = path.replace(/^\/+|\/+$/g, ""); // remove any forward or backward slash from start and end of a variable...
    return {path, querys};
} 

function forwardReqToRouteHandler(dataObj, req, res) {
    let routeHandler = modules.routes[dataObj.path] ? modules.routes[dataObj.path] : modules.routes['notDefined'];
    console.log(routeHandler)
    routeHandler (dataObj, res);
}

module.exports = newRequest