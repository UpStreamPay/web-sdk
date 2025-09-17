import { CardInfo } from '@vault/shared';
import { Scheme } from '@vault/shared';
import { SubmitOptions } from '@vault/shared';
import { SubmitResult } from '@vault/shared';

declare type CSSPseudoClasses = ':empty' | ':focus' | ':valid' | ':invalid' | ':autocomplete' | '::placeholder' | ':brandDetected';

export declare interface FieldsState {
    cardNumber?: FieldState;
    cvv?: FieldState;
}

export declare interface FieldState {
    length?: number;
    valid?: boolean;
}

/* Excluded from this release type: initSecureFields */

export declare interface SdkAdapterEventData {
    /**
     * Triggered when the provider vaultSDK has been loaded and is ready to use.
     */
    ready: void;
    /**
     * Triggered when the submission has been successful
     * @returns {vault_form_token: string, card?: CardInfo}
         * The `vault_form_token` is the identifier for the vault form, and `card` contains information about the card such as the masked bin, the last digit and the detected brands.
         */
     success: {
         vault_form_token: string;
         card?: CardInfo;
     };
     /**
      * Triggered for multiple errors while using the SDK.
      */
     error: {
         message: string;
         code?: string;
         payload?: any;
     };
     /**
      * Triggered when the form validation changes.
      * It's fired once at initialization with `false` and then on every change.
      */
     formValid: {
         hasErrors: boolean;
         fields?: FieldsState;
     };
     /**
      * Triggered when a field is focused
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     focus: {
         fieldName: string;
     } & FieldState & {
         fields: FieldsState;
     };
     /**
      * Triggered when a field is blurred/unfocused
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     blur: {
         fieldName: string;
     } & FieldState & {
         fields: FieldsState;
     };
     /**
      * Triggered when a field is autocompleted
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     autocomplete: {
         fieldName: string;
     } & FieldState & {
         fields: FieldsState;
     };
     /**
      * Triggered when a key is pressed in a field
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     keyup: {
         fieldName: string;
     } & FieldState & {
         fields: FieldsState;
     };
     /**
      * Triggered when a key is pressed down in a field
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     keydown: {
         fieldName: string;
     } & FieldState & {
         fields: FieldsState;
     };
     /**
      * Triggered when a field changes(focus, blur, keyup, keydown, autocomplete).
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     change: {
         fieldName: string;
     } & FieldState & {
         fields: FieldsState;
     };
     /**
      * Triggered when a brand is detected in the card number field.
      * It can also contain a co-brand if applicable.
      */
     brandDetected: {
         brands?: Scheme[];
     };
    }

    export declare type SDKAdapterEvents = keyof SdkAdapterEventData;

    export declare type SDKVaultFieldConfig = {
        target: string;
        placeholder?: string;
        ariaLabel?: string;
        iframeTitle?: string;
    };

    export declare interface StylableInputVariables {
        fontFamily?: string;
        fontSize?: string;
        lineHeight?: string;
        fontWeight?: string;
        color?: string;
        placeholderColor?: string;
        backgroundColor?: string;
    }

    /**
     * Common interface for all vault SDK adapters.
     */
    export declare interface VaultSDKAdapter {
        /**
         * Renders the fields in the targets specified in the config.
         * @throws SdkErrors.CONTAINER_NOT_FOUND If the target element for the field is not found.
         */
        render: () => void;
        /**
         * Destroys the SDK instance and removes all event listeners.
         * This is terminal; the instance cannot be used after this call.
         */
        destroy: () => void;
        /**
         * Gets card information such as BIN, detected brands, and last four digits.
         * @returns Promise<CardInfo | null> - Null if the form is not complete enough.
         * @example
         * ```ts
         * const info = await hostedFields.getCardInfo();
         * if (info) {
         *   console.log(info.bin);
         *   console.log(info.detected_brands);
         *   console.log(info.last_four_digit);
         * }
         * ```
         */
        getCardInfo: () => Promise<CardInfo | null>;
        /**
         * Triggers validation and tokenization of the form.
         * @param payload - The payload containing expiry month, expiry year, cardholder name, and selected network.
         * @throws SdkErrors.TOKENIZATION_FAILED If the form is invalid or if there is an error during the process.
         * @throws SdkErrors.INVALID_FORM If the form is not valid.
         * @event success Emitted when the form is successfully tokenized.
         * @event error Emitted when there is an error during the tokenization process.
         * @example
         * ```ts
         *  const result = await hostedFields.submit({
         *      expiryMonth: 12;
         *      expiryYear: 25;
         *      cardHolderName: 'Joe Dawn';
         *      selectedNetwork: 'VISA';
         *      saveToken: false;
         *   });
         *   ```
         *
         */
        submit: (payload: SubmitOptions) => Promise<SubmitResult>;
        /**
         * Registers an event listener for the specified event.
         */
        on(event: SDKAdapterEvents, callback: (data: SdkAdapterEventData[SDKAdapterEvents]) => void): void;
    }

    /**
     * Configuration for the Vault SDK Adapter.
     */
    export declare interface VaultSDKAdapterConfig {
        /**
         * Eligible card networks for the vault form.
         */
        brands: Scheme[];
        /**
         * Targets and labels for the iframe fields.
         * The 'cvv' field is required; 'cardNumber' is optional.
         */
        fields: {
            cardNumber?: SDKVaultFieldConfig;
            cvv: SDKVaultFieldConfig;
        };
        /**
         * Applicable styles for the iframe fields.
         */
        styles?: {
            fontSrc?: string;
            input: StylableInputVariables & {
                [key in CSSPseudoClasses]?: StylableInputVariables;
            };
        };
    }

    export declare type Vendor = typeof VENDORS[number];

    export declare const VENDORS: readonly ["pci_proxy", "purse"];

    export { }
