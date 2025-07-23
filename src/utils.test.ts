import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { injectScript, getWindowNameSpace } from './utils';
import { SDKs } from './SDKs';
import { PublicSDK } from './types';

describe('injectScript', () => {
  let originalHead: HTMLElement | null;
  let script: HTMLScriptElement;

  beforeEach(() => {
    originalHead = document.head;
    // Ensure a fresh document head for each test
    if (!document.head) {
      const head = document.createElement('head');
      document.documentElement.appendChild(head);
    }
  });

  afterEach(() => {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
    }
  });

  it('injects script and resolves on successful load', async () => {
    const fakeUrl = 'https://cdn.example.com/sdk.js';
    const promise = injectScript(fakeUrl);

    script = document.querySelector(`script[src="${fakeUrl}"]`)!;
    expect(script).toBeDefined();

    // Simulate successful load
    script.dispatchEvent(new Event('load'));

    const result = await promise;
    expect(result).toBe(script);
  });

  it('rejects if the script fails to load', async () => {
    const fakeUrl = 'https://cdn.example.com/fail.js';
    const promise = injectScript(fakeUrl);

    script = document.querySelector(`script[src="${fakeUrl}"]`)!;
    script.dispatchEvent(new Event('error'));

    expect(promise).rejects.toThrow(
      `The script "${fakeUrl}" failed to load. Check the HTTP status in DevTools to learn more.`,
    );
  });

  it('throws an error if document has no head or body', async () => {
    const originalHead = document.head;
    const originalBody = document.body;

    document.documentElement.removeChild(originalHead!);
    document.documentElement.removeChild(originalBody!);

    await expect(injectScript('https://cdn.example.com/sdk.js')).rejects.toThrow(
      'Could not find target for script to render (no Head nor Body)',
    );

    // Restore
    document.documentElement.appendChild(originalHead!);
    document.documentElement.appendChild(originalBody!);
  });
});

describe('getWindowNameSpace', () => {
  const mockSDK: PublicSDK = 'widget'; // Example key that should exist in SDKs
  const { namespace, loadErrorMessage } = SDKs[mockSDK];

  afterEach(() => {
    delete (window as any)[namespace];
  });

  it('resolves with the window namespace object if present', async () => {
    const fakeSDK = { api: 'mock' };
    (window as any)[namespace] = fakeSDK;

    const result = await getWindowNameSpace(mockSDK);
    expect(result).toBe(fakeSDK);
  });

  it('rejects with an error if the namespace is not present on window', async () => {
    expect(() => getWindowNameSpace(mockSDK)).toThrow(loadErrorMessage);
  });
});
