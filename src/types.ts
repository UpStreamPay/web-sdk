import { HeadlessCheckout, Securefields, Dropin } from './generated/types/';
export const PublicSDKs = ['securefields', 'headless', 'dropin'] as const;
export type PublicSDK = (typeof PublicSDKs)[number];
export const PublicEnvironments = ['sandbox', 'production'] as const;
export type PublicEnvironment = (typeof PublicEnvironments)[number];

export type HeadlessCheckoutModule = { createHeadlessCheckout: (typeof HeadlessCheckout)['createHeadlessCheckout'] };
/**
 * Everything the Secure Fields bundle exposes on its global: `initSecureFields`, the 3DS helpers
 * (`threeDSFingerprint`, `threeDSChallenge`, `threeDSSavedCard`, `getBrowserData`,
 * `toPaymentBrowserNode`) and the public constants. The generated types are built from the same entry
 * point as the bundle, so they stay in step with each types sync.
 */
export type SecurefieldsModule = typeof Securefields;
export type DropinModule = { createDropinCheckout: (typeof Dropin)['createDropinCheckout'] };

declare global {
  interface Window {
    Purse: HeadlessCheckoutModule | DropinModule;
    PurseSecurefields: SecurefieldsModule;
  }
}
