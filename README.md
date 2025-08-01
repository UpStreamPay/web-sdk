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

|                                                                                                           | loader                  | types                   |
|-----------------------------------------------------------------------------------------------------------|-------------------------|-------------------------|
| [Headless checkout](https://docs.purse.tech/docs/integrate/purse-checkout/headless-checkout/how-to-build) | :white_check_mark:      | :white_check_mark:      |
| [Drop-in UI](https://docs.purse.tech/docs/integrate/purse-checkout/widget-v3)                             | :building_construction: | :building_construction: |
| [Hosted fields](https://docs.purse.tech/docs/integrate/purse-checkout/hosted-fields)                      | :building_construction: | :building_construction: |

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
