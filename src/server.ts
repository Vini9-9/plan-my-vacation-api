import express from "express"
import cors from "cors"
import swaggerUi from 'swagger-ui-express';
import * as swaggerFile from './swagger_output.json';
import endpoints from './endpoints';

const app = express()
const port = process.env.port ? Number(process.env.port): 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    app.use(cors());
    next();
});

app.listen(port, () => {
    console.log("Server is running on port", port)
})


endpoints(app);
