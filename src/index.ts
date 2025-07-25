import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicEnvironment, Widget } from './types';
import {PurseHeadlessCheckout} from "./generated/types/headless-checkout";

export async function loadHeadlessCheckout(env: PublicEnvironment = 'production'): Promise<typeof PurseHeadlessCheckout> {
  await injectScript(SDKs['headless'][env]);
  return getWindowNameSpace<typeof PurseHeadlessCheckout>('headless');
}

export async function loadWidgetV3(env: PublicEnvironment = 'production'): Promise<Widget> {
  await injectScript(SDKs['widget'][env]);
  return getWindowNameSpace('widget');
}
