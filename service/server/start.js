// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

const app = require('./server.js');
const PORT = process.env.PORT || 4095;

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`worker ${worker.process.pid} died`);
//     });
// }
// else {
    const serverInstance = app.listen(PORT, (err) => {
        // console.log(`Overview is listening at port http://localhost:${PORT}`);
        err ? console.log("Error in server setup") :
        console.log(`Server is listening at port http://localhost:${PORT} - process Id: ${process.pid}`);
    });
    
    const closeServer = () => {
        serverInstance.close();
    }
    
    exports.closeServer = closeServer;
// }