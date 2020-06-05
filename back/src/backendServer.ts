import * as http from 'http'
import express from 'express';
import { Server } from 'typescript-rest';
import { MorpionRest } from './morpionRest';
import { } from 'body-parser';

class BackendServer {
    private backendServer: http.Server;
    private app: express.Express;

    constructor() {
        const bodyParser = require('body-parser');
        this.backendServer = new http.Server();
        this.app = express();
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods",  "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            next();
        });
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        Server.buildServices(this.app, ...[ MorpionRest ]);
    }

    public start() {
        this.backendServer = this.app.listen(8081);
        console.log('Server listen on port: 8081...');
    }
}

export const server = new BackendServer();