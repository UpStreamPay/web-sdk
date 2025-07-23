# Purse web SDKs loader

A lightweight loader for injecting the [Purse's](https://docs.purse.tech/docs/integrate/purse-checkout/integration-mode)
web scripts and provide TypeScript types.

## Features

|                                                                                                           | loader | types |
|-----------------------------------------------------------------------------------------------------------|--------|-------|
| [Drop-in UI](https://docs.purse.tech/docs/integrate/purse-checkout/widget-v3)                             | [x]    | [ ]   |
| [Headless checkout](https://docs.purse.tech/docs/integrate/purse-checkout/headless-checkout/how-to-build) | [x]    | [ ]   |
| [Hosted fields](https://docs.purse.tech/docs/integrate/purse-checkout/hosted-fields)                      | [ ]    | [ ]   |

## Installation

```bash
npm install @purse/web-sdk
```

## Usage

```ts
import {loadHeadlessCheckout, loadWidgetV3} from '@purse/web-sdk';

//Loads the headless checkout sdk
loadHeadlessCheckout('sandbox').then(async (module) => {
    const headlessCheckout = await module.createHeadlessCheckout({
        apiKey: "YOUR_API_KEY",
        entityId: "YOUR_ENTITY_ID",
        environment: "sandbox",
        paymentSession: "YOUR_SESSION"
    });
});

//Loads the widget v3 sdk
loadWidgetV3('sandbox').then(async (module) => {
    const widgetManager = await module.WidgetManager.buildForCredentials({
        apiKey:"YOUR_API_KEY",
        entityId:"YOUR_ENTITY_ID",
        environment:"sandbox",
    });
    await widgetManager.setPaymentSession(session);
});
```
