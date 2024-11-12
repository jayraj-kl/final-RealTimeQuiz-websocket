import { IoManager } from './managers/IoManager';
import { UserManager } from './managers/UserManager';
import express from 'express';

const app = express();

app.get('/hi', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log('Express server listening on port 3001');
});

const io = IoManager.getIo();

io.listen(3000);
const userManager = new UserManager();
io.on('connection', (socket) => {
  userManager.addUser(socket);
});
  