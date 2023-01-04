import app from './app';
import env from './config/env.config.manager';

const PORT = env.getEnvValue('PORT');
const NODE_ENV = env.getEnvValue('NODE_ENV');

app.listen(PORT, () => {
  console.log(`${NODE_ENV} server listening on port ${PORT}`);
});
