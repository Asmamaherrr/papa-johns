import { register } from 'ts-node';
import { createRequire } from 'module';
import path from 'path';

register({
  transpileOnly: true,
  project: path.resolve('./tsconfig.json'),
});

const require = createRequire(import.meta.url);
export default require('./next.config.ts').default;
