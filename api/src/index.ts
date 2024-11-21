import buyan from 'bunyan';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Setup logger
const logger = buyan.createLogger({
    name: 'index'
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

