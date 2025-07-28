import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicEnvironment } from './types';
import { createHeadlessCheckout } from './generated/types';

export * from './types';
export * from './generated/types';

export type HeadlessCheckoutModule = { createHeadlessCheckout: typeof createHeadlessCheckout };

export async function loadHeadlessCheckout(env: PublicEnvironment = 'production'): Promise<HeadlessCheckoutModule> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<{ createHeadlessCheckout: typeof createHeadlessCheckout }>('headless');
}
