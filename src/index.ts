import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { Headless, PublicEnvironment, Widget } from './types';

export async function loadHeadlessCheckout(env: PublicEnvironment = 'production'): Promise<Headless> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace('headless');
}

export async function loadWidgetV3(env: PublicEnvironment = 'production'): Promise<Widget> {
  await injectScript(SDKs['widget'][env]);
  return getWindowNameSpace('widget');
}
