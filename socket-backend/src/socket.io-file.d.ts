declare module 'socket.io-file' {
  import { Socket } from "socket.io";

  interface UploaderOptions {
      maxFileSize?: number;
      uploadDir?: string;
      acceptTypes?: string[];
      chunkSize?: number;
  }

  class Uploader {
      constructor(socket: Socket, options?: UploaderOptions);
      dir: string;
      listen(socket: Socket): void;
      on(event: string, callback: (event: any) => void): void;
  }

  export = Uploader;
}
