import Fastify from 'fastify'
import cors from "@fastify/cors"
import { env } from '../env/env'
import fastifyWebsocket from "@fastify/websocket"
import { appSendMessage } from './http/ws/send-message'

export const app = Fastify({
    logger: env.NODE_ENV === "dev"
})

app.register(cors, {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token, token, x-cron-auth",
    origin: "*",
    logLevel: "debug",
});

app.register(fastifyWebsocket)


// rotas
app.register(appSendMessage)