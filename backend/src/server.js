import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import dotenv from "dotenv";

dotenv.config();
const app = express()
const PORT = 5000

app.use(clerkMiddleware())
app.use(express.json())

import userRouter from './routes/user.routes.js'
app.use("/api/v1/me", userRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    details: err.details || null,
    code: err.code || null,
  });
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})