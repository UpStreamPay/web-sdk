export const SDKs = {
  headless: {
    namespace: 'Purse',
    loadErrorMessage: 'Purse headless checkout failed.',
    sandbox: 'https://cdn.purse-sandbox.com/headless-checkout/latest/purse.umd.js',
    production: 'https://cdn.purse-secure.com/headless-checkout/stable/purse.umd.js',
  },
  securefields: {
    namespace: 'Purse',
    loadErrorMessage: "Can't load securefields SDK",
    sandbox: 'https://cdn.purse-sandbox.com/secure-fields/latest/purse.js',
    production: 'https://cdn.purse-secure.com/secure-fields/stable/purse.js',
  },
} as const;
