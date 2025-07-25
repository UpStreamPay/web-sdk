import { PublicSDK } from './types';
import { SDKs } from './SDKs';

export const injectScript = async (url: string): Promise<HTMLScriptElement> => {
  const target = document.head ?? document.body;
  if (!target) {
    throw new Error('Could not find target for script to render (no Head nor Body)');
  }
  const script = document.createElement('script');
  script.setAttribute('src', url);
  await new Promise((resolve, reject) => {
    script.onload = resolve;
    script.onerror = () => {
      reject(new Error(`The script "${url}" failed to load. Check the HTTP status in DevTools to learn more.`));
    };
    target.appendChild(script);
  });
  return script;
};

export const getWindowNameSpace = <T>(sdk: PublicSDK) => {
  const { namespace, loadErrorMessage } = SDKs[sdk];
  if (!window[namespace]) {
    return Promise.reject(new Error(loadErrorMessage));
  }
  return window[namespace] as T;
};
