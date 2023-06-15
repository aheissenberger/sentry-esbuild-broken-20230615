import * as Sentry from '@sentry/node';

import { dolib } from './lib';
console.log('index.ts');
dolib();
Sentry.captureMessage('test');
