import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicEnvironment, Widget } from './types';
import * as HeadlessCheckoutModule from './generated/types';

export * from './types';
export * from './generated/types';

export async function loadHeadlessCheckout(
  env: PublicEnvironment = 'production',
): Promise<typeof HeadlessCheckoutModule> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<typeof HeadlessCheckoutModule>('headless');
}

export async function loadWidgetV3(env: PublicEnvironment = 'production'): Promise<Widget> {
  await injectScript(SDKs['widget'][env]);
  return getWindowNameSpace('widget');
}
