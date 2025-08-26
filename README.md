# Purse web SDKs loader

A loader for injecting the [Purse's](https://docs.purse.tech/docs/integrate/purse-checkout/integration-mode) web scripts
and provide TypeScript types.

While the SDK can be imported through this package, the core Purse runtime is always loaded directly
from https://cdn.purse-sandbox.com to meet PCI-DSS compliance requirements. This ensures that the global Purse
object behaves consistently across all environments without the need to self-host or bundle the script.

The `loadHeadlessCheckout` function dynamically retrieves the most up-to-date version of the Purse Web SDK, independent
of the version of `@purse-eu/web-sdk` in your project. Package updates focus on developer experience and do not alter
the runtime capabilities of the SDK itself.

## Features

| SDK                                                                                                       | Description                                                                                                                            |   Loader    |    Types    |
|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|:-----------:|:-----------:|
| [Headless Checkout](https://docs.purse.tech/docs/integrate/purse-checkout/headless-checkout/how-to-build) | Full control over checkout UI with secure payment orchestration by Purse. Ideal for custom payment experiences.                        | ✅ Available | ✅ Available |
| Securefields                                                                                              | Session less credit card form to collect payment data                                                                                  | ✅ Available | ✅ Available |
| [Drop-in UI](https://docs.purse.tech/docs/integrate/purse-checkout/widget-v3)                             | Pre-built, configurable payment interface with multiple payment methods.                                                               |  🚧 Coming  |  🚧 Coming  |
| [Hosted Fields](https://docs.purse.tech/docs/integrate/purse-checkout/hosted-fields)                      | Lightweight integration for credit card payments with PCI-compliant fields. Customize the form while Purse handles the sensitive data. |  🚧 Coming  |  🚧 Coming  |

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

# Purse web SDKs loader

This package provides a lightweight loader for Purse’s web SDKs and exposes the TypeScript types you need for
integration.

> ⚠️ Important:
> Although you import this package in your project, the Purse runtime is always loaded from the appropriate CDN based on
> the environment (e.g., https://cdn.purse-sandbox.com or https://cdn.purse-secure.com).
> This ensures PCI-DSS compliance and consistent behavior across all environments—without requiring you to self-host or
> bundle the SDK.

## What it does

The main function exposed by this package is:

```ts
loadHeadlessCheckout(environment
:
'sandbox' | 'production'
)
```

It dynamically loads the latest version of the Headless Checkout SDK from the correct CDN and returns a ready-to-use
module.
This decouples your integration from the package version of @purse-eu/web-sdk, and ensures you always use the latest
secure runtime.

## Available SDKs

| SDK                                                                                                       | Description                                                                                                                            |   Loader    |    Types    |
|-----------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|:-----------:|:-----------:|
| [Headless Checkout](https://docs.purse.tech/docs/integrate/purse-checkout/headless-checkout/how-to-build) | Full control over checkout UI with secure payment orchestration by Purse. Ideal for custom payment experiences.                        | ✅ Available | ✅ Available |
| Securefields                                                                                              | Session less credit card form to collect payment data                                                                                  | ✅ Available | ✅ Available |
| [Drop-in UI](https://docs.purse.tech/docs/integrate/purse-checkout/widget-v3)                             | Pre-built, configurable payment interface with multiple payment methods.                                                               |  🚧 Coming  |  🚧 Coming  |
| [Hosted Fields](https://docs.purse.tech/docs/integrate/purse-checkout/hosted-fields)                      | Lightweight integration for credit card payments with PCI-compliant fields. Customize the form while Purse handles the sensitive data. |  🚧 Coming  |  🚧 Coming  |

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

## Quick Start

Full documentation is available at: https://docs.purse.tech/docs/integrate/purse-checkout/integration-mode

This includes:

- Integration guides
- SDK reference (methods, types, events)
- Use cases and advanced examples

```ts
import {loadHeadlessCheckout, loadSecureFields, type  PurseHeadlessCheckoutV1Params} from '@purse/web-sdk';

//Loads the headless checkout sdk
loadHeadlessCheckout('sandbox').then(async module => {
    const headlessCheckout = await module.createHeadlessCheckout<PurseHeadlessCheckoutV1Params>({
        apiKey: 'YOUR_API_KEY',
        entityId: 'YOUR_ENTITY_ID',
        environment: 'sandbox',
        paymentSession: 'YOUR_SESSION',
    });
});

//Loads the securefields sdk
loadSecureFields('sandbox').then(async module => {
    const secureFields = await module.initSecureFields('merchant-id', {
        cardNumber: {
            target: '#pan',
            placeholder: '0000 0000 0000 0000'
        },
        cvv: {
            target: '#cvv',
            placeholder: '123'
        }
    });
});
```
