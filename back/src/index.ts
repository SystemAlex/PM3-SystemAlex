import { PORT } from "./config/envs";
import server from "./server";

server.listen(PORT, () => {
    console.log("Servidor ejecuntandose en el puerto", PORT);
});