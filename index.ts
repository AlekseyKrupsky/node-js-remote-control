import { WebSocketServer } from 'ws';
import { commands } from "./src/commands/commands";
import * as dotenv from 'dotenv';
import { cwd } from "node:process";

dotenv.config({ path: `${cwd()}/.env`});

const port: number = +(process.env.PORT || 8080);

const wss = new WebSocketServer({ port: port });

console.log(`Websocket server is running on ${port} port. Use this URL to connect: ws://localhost:${port}`);

wss.on('connection', (ws: any) => {
    console.log('connection');

    ws.on('message', async (data: string) => {
        const command: string = data.toString();

        console.log('Received: %s', command);

        const commandParts: string[] = command.split(' ');

        if (commandParts.length === 0) {
            return;
        }

        const handler: string | undefined = commandParts.shift();
        console.log(handler);

        if (handler !== undefined && typeof commands[handler] === "function") {
            console.log(commandParts);

            const intParams: number[] = commandParts.map((value) => {
                return parseInt(value);
            });

            let result: string = await commands[handler](...intParams);

            let response: string = command;

            if (result !== undefined) {
                response += ` ${result}`;
            }

            ws.send(response);
        }
    });
});
