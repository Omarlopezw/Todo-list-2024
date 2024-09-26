//backend server
const http = require('http');

class Server
{
    constructor()
    {
        this.host = '127.0.0.1';
        this.port = '8080';
        this.resources = {};
        this.routes = 
        {
            '/addNewTask': this.handleAddNewTask,
            '/anotherRoute': this.handleAnotherRoute,
            // Puedes agregar más rutas aquí
        };
    }

    get(url,resource)
    {
        this.resources['GET' + url] = resource;
    }

    post(url, resource)
    {
        this.resources['POST' + url] = resource;        
    }

    start()
    {
        const server = http.createServer( (request, response)=> 
        {
            this.processRequest(request, response)
        })

        server.listen(this.port ,this.host,() => 
        {
            console.log('RUNNING SERVER...');
        })
    }
    processRequest(request, response) 
    {
        this.setCORSHeaders(response);
        
        const method = request.method;
        const url = request.url;

        // Verificar si existe una función de manejo para la URL
        const routeHandler = this.routes[url];
        
        if (routeHandler && method === 'POST') 
        {
            this.collectRequestBody(request)
            // Llamar a la función de manejo con call y this para que no se pierda el contexto de la clase server en la función
            .then( (body)=> routeHandler.call(this, response, body) )
            .catch((error) => 
            {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid Request' }));
            });
 
        } 
        else 
        {
            response.writeHead(404, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Not Found' }));
        }
    }

    setCORSHeaders(response) 
    {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    //Manejo de 'endpoint AddNewTask' para su respuesta 
    handleAddNewTask(response, body) 
    {
        try 
        {
            // Convierte la cadena en un objeto JSON
            const requestBody = JSON.parse(body);
            
            // Enviar respuesta
            response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            console.log('POST response: ', requestBody);
            response.end(JSON.stringify({ message: 'Task added successfully', task: requestBody }));
        } catch (error) 
        {
            // Manejar error de JSON
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    }

    //Procesar peticion para obtener los datos
    collectRequestBody(request) 
    {
        return new Promise((resolve, reject) => {
            let body = [];
            
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                resolve(body);
            }).on('error', (error) => {
                reject(error); // Manejar el error de la solicitud
            });
        });
    }
    // Método para establecer las cabeceras CORS
    setCORSHeaders(response) 
    {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
}

module.exports = {Server};