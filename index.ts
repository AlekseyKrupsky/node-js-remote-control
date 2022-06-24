import { WebSocket, createWebSocketStream  } from 'ws';
import { commands } from "./src/commands/commands";
import * as dotenv from 'dotenv';
import { cwd } from "node:process";
import { ConsoleMessage as log } from "./src/console_messages";

dotenv.config({ path: `${cwd()}/.env`});

const port: number = +(process.env.PORT || 8080);

const wss = new WebSocket.Server({ port: port });

console.log(log.SERVER_RUNNING, port, port);

wss.on('connection', (ws: WebSocket) => {
    console.log(log.CONNECTION_ESTABLISHED);

    const duplex = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });

    ws.on('close', () => {
        wss.clients.delete(ws);
        duplex.end();
        console.log(log.CONNECTION_CLOSED);
    });

    duplex.on('data', async (command: string) => {
        console.log(log.INCOMING, command);

        const commandParts: string[] = command.split(' ');

        if (commandParts.length === 0) {
            console.log(log.INVALID_MESSAGE);

            return;
        }

        const handler: string | undefined = commandParts.shift();

        if (handler !== undefined && typeof commands[handler] === "function") {
            try {
                const intParams: number[] = commandParts.map((value) => {
                    return parseInt(value);
                });

                let result: string = await commands[handler](...intParams);

                let response: string = command;

                if (result !== undefined) {
                    response += ` ${result}`;
                }

                response += '\0';

                console.log(log.RESPONSE, response);

                duplex.write(response);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(log.ERROR, error.message);
                } else {
                    console.log(log.UNKNOWN_ERROR);
                }
            }
        } else {
            console.log(log.UNKNOWN_COMMAND);
        }
    });
});
