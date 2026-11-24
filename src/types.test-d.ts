import { describe, expectTypeOf, it } from 'vitest';
import type { loadSecureFields } from './index';
import type { Securefields } from './generated/types';

type SecureFieldsLoaded = Awaited<ReturnType<typeof loadSecureFields>>;

describe('loadSecureFields module type', () => {
  it('exposes initSecureFields', () => {
    expectTypeOf<SecureFieldsLoaded['initSecureFields']>().toEqualTypeOf<(typeof Securefields)['initSecureFields']>();
  });

  it('exposes the 3DS helpers shipped by the Secure Fields bundle', () => {
    expectTypeOf<SecureFieldsLoaded['threeDSFingerprint']>().toEqualTypeOf<
      (typeof Securefields)['threeDSFingerprint']
    >();
    expectTypeOf<SecureFieldsLoaded['threeDSChallenge']>().toEqualTypeOf<(typeof Securefields)['threeDSChallenge']>();
    expectTypeOf<SecureFieldsLoaded['threeDSSavedCard']>().toEqualTypeOf<(typeof Securefields)['threeDSSavedCard']>();
    expectTypeOf<SecureFieldsLoaded['getBrowserData']>().toEqualTypeOf<(typeof Securefields)['getBrowserData']>();
    expectTypeOf<SecureFieldsLoaded['toPaymentBrowserNode']>().toEqualTypeOf<
      (typeof Securefields)['toPaymentBrowserNode']
    >();
  });

  it('lets an integrator chain the 3DS calls documented for Secure Fields', () => {
    expectTypeOf<ReturnType<SecureFieldsLoaded['getBrowserData']>>().toMatchTypeOf<
      Parameters<SecureFieldsLoaded['toPaymentBrowserNode']>[0]
    >();
    expectTypeOf<
      SecureFieldsLoaded['threeDSChallenge']
    >().returns.resolves.toEqualTypeOf<Securefields.ThreeDSFrameResult>();
  });
});
