const app = require('./app');
const { getConfig } = require('./config/env');
const { connectDatabase } = require('./config/database');

async function startServer() {
  try {
    const config = getConfig();
    await connectDatabase(config);

    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error(`Startup failed: ${error.message}`);
    process.exitCode = 1;
  }
}

startServer();