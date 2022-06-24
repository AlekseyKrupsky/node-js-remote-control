import * as dotenv from 'dotenv';
import { cwd } from "node:process";
import { listenSocket } from "./src/socket";
import { httpServer } from "./src/server";

dotenv.config({ path: `${cwd()}/.env`});

const DEFAULT_SOCKET_PORT: number = 8080;
const DEFAULT_HTTP_PORT: number = 3000;

const socketPort: number = +(process.env.SOCKET_PORT || DEFAULT_SOCKET_PORT);
const httpPort: number = +(process.env.HTTP_PORT || DEFAULT_HTTP_PORT);

console.log(`Start static http server on the ${httpPort} port!`);
httpServer.listen(httpPort);

listenSocket(socketPort);
