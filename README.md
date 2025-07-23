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
import {loadHeadlessCheckout} from '@purse/web-sdk';

loadHeadlessCheckout('production').then((module) => {
    module.createHeadlessCheckout({...});
});
```
