import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { HeadlessCheckoutModule, PublicEnvironment, SecurefieldsModule, DropinModule } from './types';

export * from './types';
export * from './generated/types';

export async function loadHeadlessCheckout(env: PublicEnvironment = 'production'): Promise<HeadlessCheckoutModule> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<HeadlessCheckoutModule>('headless');
}

export async function loadSecureFields(env: PublicEnvironment = 'production'): Promise<SecurefieldsModule> {
  await injectScript(SDKs['securefields'][env]);
  return getWindowNameSpace<SecurefieldsModule>('securefields');
}

export async function loadDropInCheckout(env: PublicEnvironment = 'production'): Promise<DropinModule> {
  await injectScript(SDKs['dropin'][env]);
  return getWindowNameSpace<DropinModule>('dropin');
}
