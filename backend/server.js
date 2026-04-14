const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notesRoutes');
const errorHandler = require('./middlewars/errorHandler');
const { initDb } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

app.use(cors({ origin: allowedOrigin }));
app.use(bodyParser.json());

app.use('/notes', notesRoutes);
app.use(errorHandler);

// Initialize database and start server
initDb().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});