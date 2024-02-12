import { SocketStream } from "@fastify/websocket";
import { FastifyInstance, FastifyRequest } from "fastify";
import { Server } from "socket.io";


export async function appSendMessage(app: FastifyInstance) {
   
    const socketIO = new Server(app.server, {
        cors: {
            origin: "http://localhost:3000"
        }
    })

    let users:any = []

    socketIO.on('connection', (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`)  
            socket.on("message", data => {
            socketIO.emit("messageResponse", data)
        })

        socket.on("typing", data => (
            socket.broadcast.emit("typingResponse", data)
        ))

        socket.on("newUser", data => {
            users.push(data)
            socketIO.emit("newUserResponse", users)
        })
    
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
            users = users.filter((user:any) => user.socketID !== socket.id)
            socketIO.emit("newUserResponse", users)
            socket.disconnect()
        });
    });

    
    app.get("/send/message/user/:userId/:room", { websocket: true }, (connection: SocketStream, request:FastifyRequest) => {
       
        // connection.socket.on('message', (message: string) => {
        //     // message.toString() === 'hi from client'
        //     console.log(message.toString());
            
        //     connection.socket.send("mensagem do server")
        // })


        // connection.socket.clients.forEach(function each(client:any) {
        //     if(client.readyState == 1) {
        //         connection.socket.send("enviamo")
        //     }
        // });
        // connection.socket.on('message', async (message: string) => {

        //     console.log(message.toString())
        //     connection.socket.send(message.toString())
        // })


    })

}