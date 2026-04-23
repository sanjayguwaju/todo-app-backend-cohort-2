const app = require('./src/app')
const connectDB  = require('./src/config/db');
const { PORT } = require('./src/config/env');

const startServer = async () => {

    // Server start garnu bhanda pahila DB connect garnu parxa
     await connectDB();

    // Server start garna ko laagi ho
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    })
}

startServer()