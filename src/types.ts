import { createHeadlessCheckout, initSecureFields } from './index';

export const PublicSDKs = ['securefields', 'headless'] as const;
export type PublicSDK = (typeof PublicSDKs)[number];
export const PublicEnvironments = ['sandbox', 'production'] as const;
export type PublicEnvironment = (typeof PublicEnvironments)[number];

export type HeadlessCheckoutModule = { createHeadlessCheckout: typeof createHeadlessCheckout };
export type SecurefieldsModule = { initSecureFields: typeof initSecureFields };

declare global {
  interface Window {
    Purse: HeadlessCheckoutModule;
    PurseSecurefields: SecurefieldsModule;
  }
}
