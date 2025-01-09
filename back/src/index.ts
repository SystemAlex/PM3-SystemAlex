import { AppDataSource } from "./config/dataSource";
import { PORT } from "./config/envs";
import server from "./server";
import "reflect-metadata";

AppDataSource.initialize()
    .then(res => {
        console.log("Base de Datos Conectada");
        server.listen(PORT, () => {
            console.log("Servidor ejecuntandose en el puerto", PORT);
        });
    });
