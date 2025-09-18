import { CardInfo } from '@vault/shared';
import { Scheme } from '@vault/shared';
import { SubmitOptions } from '@vault/shared';
import { SubmitResult } from '@vault/shared';

declare type CSSPseudoClasses = ':empty' | ':focus' | ':valid' | ':invalid' | ':autocomplete' | '::placeholder' | ':brandDetected';

/**
 * @category undocumented
 */
export declare type FieldsState = SecureFieldsChangeEventPayload['fields'];

/**
 * @category undocumented
 */
export declare type FieldState = Exclude<FieldsState['cardNumber'] | FieldsState['cvv'], undefined>;

/* Excluded from this release type: initSecureFields */

/**
 * Payload for events that include the state of a specific field and all fields.
 * `fieldName` indicates which field triggered the event.
 * `FieldState` provides the state of that specific field.
 * @category Events
 */
export declare type SecureFieldsChangeEventPayload = {
    fieldName: string;
} & {
    length?: number;
    valid?: boolean;
} & {
    fields: {
        cardNumber?: {
            length?: number;
            valid?: boolean;
        };
        cvv?: {
            length?: number;
            valid?: boolean;
        };
    };
};

/**
 * Common interface for all vault SDK adapters.
 * @category Core
 */
export declare interface SecureFieldsClient {
    /**
     * Renders the fields in the targets specified in the config.
     * @throws SecureFieldsErrors.FIELD_RENDER_FAILED If the target element for the field is not found.
     * @throws SecureFieldsErrors.INSTANCE_DESTROYED If the instance has been destroyed.
     *
     * @see {@link SecureFieldsErrors}
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
     * @throws SecureFieldsErrors.TOKENIZATION_FAILED If the form is invalid or if there is an error during the process.
     * @throws SecureFieldsErrors.INVALID_FORM If the form is not valid.
     * @example
     * ```ts
     *  const result = await hostedFields.submit({
     *      expiryMonth: 12;
     *      expiryYear: 25;
     *      cardHolderName: 'Joe Dawn';
     *      selectedNetwork: 'VISA';
     *      saveToken: false;
     *   });
     *
     *   /**
     *   * result example
     *   * {
     *   *    vault_form_token: 'tok_xxx',
     *   *     card: {
     *   *       detected_brands: ['VISA'],
     *   *       bin: '41111111',
     *   *       last_four_digits: '1111',
     *   *       fingerprint: 'xxx'
     *   *     }
     *   *   }
     *   ```
     *
     * @see {@link SecureFieldsErrors}
     *
     * ### Events
     *
     * `success` Emitted when the form is successfully tokenized.
     *
     * `error` Emitted when there is an error during the tokenization process.
     */
    submit: (payload: SubmitOptions) => Promise<SubmitResult>;
    /**
     * Registers an event listener for the specified event.
     */
    on(event: SecureFieldsEvents, callback: (data: SecureFieldsEventsPayload[SecureFieldsEvents]) => void): void;
}

/**
 * Configuration for the Vault SDK Adapter.
 * @category Configuration
 */
export declare interface SecureFieldsConfig {
    /**
     * Eligible card networks for the vault form.
     */
    brands: Scheme[];
    /**
     * Targets and labels for the iframe fields.
     * The 'cvv' field is required; 'cardNumber' is optional.
     */
    fields: {
        cardNumber?: SecureFieldsFieldConfig;
        cvv: SecureFieldsFieldConfig;
    };
    /**
     * Applicable styles for the iframe fields.
     */
    styles?: {
        fontSrc?: string;
        input: SecureFieldsStyles & {
            [key in CSSPseudoClasses]?: SecureFieldsStyles;
        };
    };
}

/**
 * Error codes and messages for the Secure Fields SDK.
 * @category Errors
 */
export declare const SecureFieldsErrors: {
    /**
     * This is a custom doc
     */
    readonly TENANT_ID_REQUIRED: {
        readonly code: "TENANT_ID_REQUIRED";
        readonly message: "Tenant ID is required for Secure Fields initialization";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/#prerequisites";
    };
    readonly INVALID_BRANDS: {
        readonly code: "INVALID_BRANDS";
        readonly message: "One or more specified card brands are not supported";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Configuration/SecureFieldsConfig#brands";
    };
    readonly NOT_SUPPORTED_FIELD: {
        readonly code: "NOT_SUPPORTED_FIELD";
        readonly message: "The specified field type is not supported";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Configuration/SecureFieldsConfig#fields";
    };
    readonly FIELD_CONFIG_REQUIRED: {
        readonly code: "FIELD_CONFIG_REQUIRED";
        readonly message: "Fields configuration is mandatory for SDK initialization";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Configuration/SecureFieldsConfig#fields";
    };
    readonly FIELD_TARGET_INVALID: {
        readonly code: "FIELD_TARGET_INVALID";
        readonly message: "Fields target must be valid DOM element IDs";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Configuration/SecureFieldsFieldConfig#target";
    };
    readonly INIT_FAILED: {
        readonly code: "INIT_FAILED";
        readonly message: "SDK initialization failed";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/";
    };
    readonly CONTAINER_NOT_FOUND: {
        readonly code: "CONTAINER_NOT_FOUND";
        readonly message: "Container element not found in the DOM";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Configuration/SecureFieldsFieldConfig#target";
    };
    readonly FIELD_RENDER_FAILED: {
        readonly code: "FIELD_RENDER_FAILED";
        readonly message: "Failed to render one or more fields";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/";
    };
    readonly FIELDS_NOT_RENDERED: {
        readonly code: "FIELDS_NOT_RENDERED";
        readonly message: "Fields must be rendered before performing this action";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Core/SecureFieldsClient#submit";
    };
    readonly INVALID_FORM: {
        readonly code: "INVALID_FORM";
        readonly message: "Form validation failed - check field values";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Core/SecureFieldsClient#submit";
    };
    readonly TOKENIZATION_FAILED: {
        readonly code: "TOKENIZATION_FAILED";
        readonly message: "Failed to tokenize payment information";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/sdk-references/Core/SecureFieldsClient#submit";
    };
    readonly NETWORK_ERROR: {
        readonly code: "NETWORK_ERROR";
        readonly message: "Network request failed - check your connection";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/";
    };
    readonly INSTANCE_DESTROYED: {
        readonly code: "INSTANCE_DESTROYED";
        readonly message: "Instance has been destroyed and cannot be used";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/";
    };
    readonly UNEXPECTED_ERROR: {
        readonly code: "UNEXPECTED_ERROR";
        readonly message: "An unexpected error occurred";
        readonly documentationLink: "https://docs.purse.tech/docs/integrate/purse-checkout/advanced-flow/";
    };
};

/**
 * Events emitted by the Secure Fields SDK.
 * @see {@link SecureFieldsEventsPayload} for the payload of each event.
 * @category Events
 */
export declare type SecureFieldsEvents = 'ready' | 'success' | 'error' | 'formValid' | 'focus' | 'blur' | 'autocomplete' | 'keyup' | 'keydown' | 'change' | 'brandDetected';

/**
 * Payload for each event emitted by the Secure Fields SDK.
 * @category Events
 */
export declare interface SecureFieldsEventsPayload {
    /**
     * Triggered when the provider vaultSDK has been loaded and is ready to use.
     *
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
         fields?: SecureFieldsChangeEventPayload['fields'];
     };
     /**
      * Triggered when a field is focused
      * This include the state of the field on which the change happened but also the state of the other fields.
      * @see {@link SecureFieldsChangeEventPayload}
      */
     focus: SecureFieldsChangeEventPayload;
     /**
      * Triggered when a field is blurred/unfocused.
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     blur: SecureFieldsChangeEventPayload;
     /**
      * Triggered when a field is autocompleted.
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     autocomplete: SecureFieldsChangeEventPayload;
     /**
      * Triggered when a key is pressed in a field.
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     keyup: SecureFieldsChangeEventPayload;
     /**
      * Triggered when a key is pressed down in a field.
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     keydown: SecureFieldsChangeEventPayload;
     /**
      * Triggered when a field changes(focus, blur, keyup, keydown, autocomplete).
      *
      * This include the state of the field on which the change happened but also the state of the other fields.
      */
     change: SecureFieldsChangeEventPayload;
     /**
      * Triggered when a brand is detected in the card number field.
      * It can also contain a co-brand if applicable.
      */
     brandDetected: {
         brands?: Scheme[];
     };
    }

    /**
     * Configuration for each individual iframe field.
     * @category Configuration
     */
    export declare interface SecureFieldsFieldConfig {
        /**
         * The ID of the container element where the iframe will be rendered.
         */
        target: string;
        /**
         * (Optional) Placeholder text for the input field.
         */
        placeholder?: string;
        /**
         * (Optional) ARIA label for accessibility.
         */
        ariaLabel?: string;
        /**
         * (Optional) Title attribute for the iframe for accessibility.
         */
        iframeTitle?: string;
    }

    /**
     * CSS styles applicable to the iframe fields.
     * Each property is optional;
     * @category Configuration
     */
    export declare interface SecureFieldsStyles {
        fontFamily?: string;
        fontSize?: string;
        lineHeight?: string;
        fontWeight?: string;
        color?: string;
        placeholderColor?: string;
        backgroundColor?: string;
    }

    export { }
