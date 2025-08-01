# Purse web SDKs loader

A loader for injecting the [Purse's](https://docs.purse.tech/docs/integrate/purse-checkout/integration-mode) web scripts
and provide TypeScript types.

While the SDK can be imported through this package, the core Purse runtime is always loaded directly
from https://cdn.purse-sandbox.com to meet compliance and security requirements. This ensures that the global Purse
object behaves consistently across all environments without the need to self-host or bundle the script.

The `loadHeadlessCheckout` function dynamically retrieves the most up-to-date version of the Purse Web SDK, independent
of the version of `@purse-eu/web-sdk` in your project. Package updates focus on developer experience and do not alter
the runtime capabilities of the SDK itself.

## Features

| SDK | Description                                                                                                                            |      Loader       |     Types   |
|-----|----------------------------------------------------------------------------------------------------------------------------------------|:-----------------:|:-----------:|
| [Headless Checkout](https://docs.purse.tech/docs/integrate/purse-checkout/headless-checkout/how-to-build) | Full control over checkout UI with secure payment orchestration by Purse. Ideal for custom payment experiences.                        |    ✅ Available    |  ✅ Available |
| [Drop-in UI](https://docs.purse.tech/docs/integrate/purse-checkout/widget-v3) | Pre-built, configurable payment interface with multiple payment methods.                                                               |     🚧 Coming     |      🚧 Coming    |
| [Hosted Fields](https://docs.purse.tech/docs/integrate/purse-checkout/hosted-fields) | Lightweight integration for credit card payments with PCI-compliant fields. Customize the form while Purse handles the sensitive data. |        🚧 Coming        | 🚧 Coming |

## Requirements
To use @purse-eu/web-sdk in your project, ensure the following:

Node.js: ≥ 20.x

### Peer Dependencies
You can install the following peer dependency:

```bash
npm install @types/googlepay
```

## Installation

```bash
npm install @purse/web-sdk
```

## Usage

```ts
import {loadHeadlessCheckout, type  PurseHeadlessCheckoutV1Params} from '@purse/web-sdk';

//Loads the headless checkout sdk
loadHeadlessCheckout('sandbox').then(async module => {
    const headlessCheckout = await module.createHeadlessCheckout<PurseHeadlessCheckoutV1Params>({
        apiKey: 'YOUR_API_KEY',
        entityId: 'YOUR_ENTITY_ID',
        environment: 'sandbox',
        paymentSession: 'YOUR_SESSION',
    });
});
```
