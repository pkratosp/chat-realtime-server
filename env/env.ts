import zod from "zod";


// adicionamos todos as variaveis de ambiente aqui
const envSchema = zod.object({
    PORT: zod.coerce.number().default(3333),
    NODE_ENV: zod.enum(["dev","production","test"]).default("dev"),
    SOCKETIO_CORS: zod.string().default("https://chat-realtime-client.vercel.app")
});

const _env = envSchema.safeParse(process.env);


if(_env.success === false){
    console.log("Variaveis de ambiente invalidas ❌", _env.error.format());
    throw new Error("Variaveis de ambiente invalidas ❌");
}

export const env = _env.data;