import { WebSocketServer } from 'ws';
import { commands } from "./src/commands/commands";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: any) => {
    console.log('connection');

    ws.on('message', async (data: string) => {
        const command = data.toString();

        console.log('Received: %s', command);

        const commandParts = command.split(' ');
        const handler = commandParts.shift();
        console.log(handler);

        if (handler !== undefined && typeof commands[handler] === "function") {
            console.log(commandParts);

            const intParams = commandParts.map((value) => {
                return parseInt(value);
            });

            let result = await commands[handler](...intParams);

            let response = command;

            if (result !== undefined) {
                response += ` ${result}`;
            }

            ws.send(response);
        }
    });
});
