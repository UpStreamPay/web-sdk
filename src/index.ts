import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicEnvironment, Widget } from './types';
import * as HeadlessCheckout from 'headless-checkout';

export { type HeadlessCheckout };

export async function loadHeadlessCheckout(
  env: PublicEnvironment = 'production',
): Promise<typeof HeadlessCheckout.PurseHeadlessCheckout> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<typeof HeadlessCheckout.PurseHeadlessCheckout>('headless');
}

export async function loadWidgetV3(env: PublicEnvironment = 'production'): Promise<Widget> {
  await injectScript(SDKs['widget'][env]);
  return getWindowNameSpace('widget');
}
