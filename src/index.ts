import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicEnvironment } from './types';
import { createHeadlessCheckout, initSecureFields } from './generated/types';

export * from './types';
export * from './generated/types';

export type HeadlessCheckoutModule = { createHeadlessCheckout: typeof createHeadlessCheckout };
export type SecurefieldsModule = { initSecureFields: typeof initSecureFields };

export async function loadHeadlessCheckout(env: PublicEnvironment = 'production'): Promise<HeadlessCheckoutModule> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<HeadlessCheckoutModule>('headless');
}

export async function loadSecureFields(env: PublicEnvironment = 'production'): Promise<SecurefieldsModule> {
  await injectScript(SDKs['securefields'][env]);
  return getWindowNameSpace<SecurefieldsModule>('securefields');
}
