import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicEnvironment, Widget } from './types';
import { type PurseHeadlessCheckoutModule } from './generated/types';

export async function loadHeadlessCheckout(
  env: PublicEnvironment = 'production',
): Promise<PurseHeadlessCheckoutModule> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<PurseHeadlessCheckoutModule>('headless');
}

export async function loadWidgetV3(env: PublicEnvironment = 'production'): Promise<Widget> {
  await injectScript(SDKs['widget'][env]);
  return getWindowNameSpace('widget');
}
