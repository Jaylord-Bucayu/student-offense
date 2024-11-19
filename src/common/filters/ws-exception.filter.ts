import { WsExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch()
export class WebSocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient();

    const message = exception.message;

    socket.emit('exception', {
      statusCode: 400,
      timeStamp: new Date().toISOString(),
      message,
    });
  }
}
