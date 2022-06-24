export const enum ConsoleMessage {
    SERVER_RUNNING = 'Websocket server is running on %s port. Use this URL to connect: ws://localhost:%s',
    CONNECTION_ESTABLISHED = 'Connection has been established!',
    CONNECTION_CLOSED = 'Connection has been closed',
    INCOMING = 'Incoming message: %s',
    RESPONSE = 'Response: %s',
    INVALID_MESSAGE = 'Invalid message received',
    UNKNOWN_COMMAND = 'Received command is unknown',
    ERROR = 'Error occurred. Error message: %s',
    UNKNOWN_ERROR = 'Unknown error occurred',
}