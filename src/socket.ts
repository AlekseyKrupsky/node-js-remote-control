import { createWebSocketStream, WebSocket } from "ws";
import { ConsoleMessage as log } from "./enums/console_messages";
import { commands } from "./commands/commands";

const parseCommand = (command: string): {
    handler: Function,
    params: number[]
} => {
    const commandParts: string[] = command.split(' ');

    if (commandParts.length === 0) {
        throw new Error(log.INVALID_MESSAGE);
    }

    const handler = commandParts.shift();

    const intParams: number[] = commandParts.map((value) => {
        return parseInt(value);
    });

    if (handler === undefined || typeof commands[handler] !== "function") {
        throw new Error(log.UNKNOWN_COMMAND);
    }

    return {
        handler: commands[handler],
        params: intParams
    };
};

export const listenSocket = (port: number) => {
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

            let response: string = command;

            try {
                const { handler, params } = parseCommand(command);

                let result: string = await handler(...params);

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
        });
    });
};