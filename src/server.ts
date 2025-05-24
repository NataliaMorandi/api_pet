import app from './app';
import { AppDataSource } from './data-source';

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Database initialized');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error during Data Source initialization:', error);
  });