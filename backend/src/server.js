import express from 'express'
import { clerkMiddleware } from '@clerk/express'
import dotenv from "dotenv";

dotenv.config();
const app = express()
const PORT = 5000

app.use(clerkMiddleware())
app.use(express.json())

import userRouter from './routes/user.routes.js'
import adminRouter from './routes/admin.route.js'
import fleetRouter from './routes/fleet-manager.route.js'
import driverRouter from './routes/driver.route.js'
import safetyRouter from './routes/safety-officer.route.js'
import financialRouter from './routes/financial-analyst.route.js'

app.use("/api/v1/me", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/fleet", fleetRouter)
app.use("/api/v1/driver", driverRouter)
app.use("/api/v1/safety", safetyRouter)
app.use("/api/v1/financial", financialRouter)

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