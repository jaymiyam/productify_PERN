import { ENV } from './config/env';
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import commentRouter from './routes/commentRoutes';
import userRouter from './routes/userRoutes';
import productRouter from './routes/productRoutes';

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

app.use('/api/users', userRouter);
app.use('/api/comments', commentRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.json({
    message:
      'Welcome to Productify API - Powered by PostgreSQL, Drizzle ORM & Clerk Auth',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      comments: 'api/comments',
    },
  });
});

app.listen(ENV.PORT, () => {
  console.log(`server listening on port ${ENV.PORT}`);
});
