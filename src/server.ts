import { env } from "../env/env";
import { app } from "./app";

try {
    app.listen({
        port: env.PORT,
        host: "0.0.0.0"
    }).then(()=>{
        console.log(`Servidor rodando na porta ${env.PORT}...`);
    });
} catch (err) {
    app.log.error(err)
    process.exit(1)
}