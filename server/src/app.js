import express from 'express';
import cors from 'cors';
import customerRoutes from './modules/customers/customers.routes.js';
import projectRoutes from './modules/projects/projects.routes.js';
import supervisorRoutes from './modules/supervisors/supervisors.routes.js';
import foremanRoutes from './modules/foremen/foremen.routes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'RKK Data Service is running' });
});

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/foremen', foremanRoutes);

// Error Handler
app.use(errorHandler);

export default app;
