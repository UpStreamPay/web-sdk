export const PublicSDKs = ['securefields', 'headless'] as const;
export type PublicSDK = (typeof PublicSDKs)[number];
export const PublicEnvironments = ['sandbox', 'production'] as const;
export type PublicEnvironment = (typeof PublicEnvironments)[number];

//Generated types will come soon
export interface Headless {
  version: string;
}

export interface Widget {
  version: string;
}

declare global {
  interface Window {
    Purse: Headless;
    UpStreamPay: Widget;
  }
}
