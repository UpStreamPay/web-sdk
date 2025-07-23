export const SDKs = {
  headless: {
    namespace: 'Purse',
    loadErrorMessage: 'Purse headless checkout failed.',
    sandbox: 'https://cdn.purse-sandbox.com/headless-checkout/latest/purse.umd.js',
    production: 'https://cdn.purse-secure.com/headless-checkout/stable/purse.umd.js',
  },
  widget: {
    namespace: 'UpStreamPay',
    loadErrorMessage: 'WidgetV3 load failed.',
    sandbox: 'https://cdn.purse-sandbox.com/dropin/latest/purse.js',
    production: 'https://cdn.purse-secure.com/dropin/v3-stable/purse.js',
  },
} as const;
