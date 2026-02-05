import { HeadlessCheckout, Securefields, Dropin } from './generated/types/';
export const PublicSDKs = ['securefields', 'headless', 'dropin'] as const;
export type PublicSDK = (typeof PublicSDKs)[number];
export const PublicEnvironments = ['sandbox', 'production'] as const;
export type PublicEnvironment = (typeof PublicEnvironments)[number];

export type HeadlessCheckoutModule = { createHeadlessCheckout: (typeof HeadlessCheckout)['createHeadlessCheckout'] };
export type SecurefieldsModule = { initSecureFields: (typeof Securefields)['initSecureFields'] };
export type DropinModule = { createDropinCheckout: (typeof Dropin)['createDropinCheckout'] };

declare global {
  interface Window {
    Purse: HeadlessCheckoutModule | DropinModule;
    PurseSecurefields: SecurefieldsModule;
  }
}
