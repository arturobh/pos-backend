const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../database/config');

module.exports = class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.cors;
        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());
        //body parser
        this.app.use(express.json());
        //public folder
        this.app.use(express.static('public') );
    }

    routes(){
        this.app.use('/api/categories', require('../routes/category'));
        this.app.use('/api/products', require('../routes/product'));
        this.app.use('/api/ingredients', require('../routes/ingredient'));
    }

    initialize(){
        var listener = this.app.listen(this.port || 4000)
        console.log(`App listening on ${listener.address().port}`);
    }
}
