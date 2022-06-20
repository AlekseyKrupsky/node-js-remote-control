import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws: any) => {
   console.log('connection');

   ws.on('message', (data: string) => {
       console.log('Received: %s', data);
   });
});
