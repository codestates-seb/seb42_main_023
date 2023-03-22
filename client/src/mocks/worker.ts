import { setupWorker } from 'msw';
import { handlers } from './handlers';
import { memberHandlers } from './memberHandler';
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers, ...memberHandlers);
