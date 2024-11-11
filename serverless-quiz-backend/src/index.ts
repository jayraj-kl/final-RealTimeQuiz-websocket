import { Hono } from 'hono';
import { rootRouter } from './routes';
import { cors } from 'hono/cors';

// Create the main Hono app
const app = new Hono();

app.use('/*', cors())
app.route('/api/v1/', rootRouter)


export default app;
