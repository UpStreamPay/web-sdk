export declare type CardInfo = {
    detected_brands: CardNetwork[];
    bin: string;
    last_four_digits: string;
};

export declare type CardNetwork = (typeof CardNetworks)[number];

export declare const CardNetworks: readonly ["VISA", "CARTE_BANCAIRE", "MASTERCARD", "MAESTRO", "AMERICAN_EXPRESS", "DISCOVER", "JCB", "DINERS_CLUB", "UNIONPAY", "OTHER"];

declare type CSSPseudoClasses = ':empty' | ':focus' | ':valid' | ':invalid' | ':autocomplete' | '::placeholder' | ':brandDetected';

export declare interface FieldsState {
    cardNumber?: FieldState;
    cvv?: FieldState;
}

export declare interface FieldState {
    length?: number;
    valid?: boolean;
}

/**
 * Initializes the Secure Fields SDK with the provided tenant ID and configuration.
 * @param payload - An object containing the tenant ID and configuration for the SDK.
 * @returns A promise that resolves to an instance of the SDK identified for the tenantId.
 */
export declare const initSecureFields: (payload: {
    tenantId: string;
    config: VaultSDKAdapterConfig;
}) => Promise<VaultSDKAdapter>;

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
      * Triggered when the card information is available.
      * This include the detected brands, the masked bin and the last four digits of the card.
      */
     cardInfo: CardInfo;
     /**
      * Triggered when a brand is detected in the card number field.
      * It can also contain a co-brand if applicable.
      */
     brandDetected: {
         brands?: CardNetwork[];
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
        fontStyle?: string;
        textTransform?: string;
        color?: string;
        placeholderColor?: string;
        backgroundColor?: string;
    }

    /**
     * This is a common interface for all vault SDK adapters.
     */
    export declare interface VaultSDKAdapter {
        /**
         * Renders the fields in the targets specified in the config.
         * @throws SdkErrors.CONTAINER_NOT_FOUND if the target element for the field is not found.
         */
        render: () => void;
        /**
         * Destroys the SDK instance and removes all event listeners.
         * This is terminal and cannot the instance cannot be used after this call.
         */
        destroy: () => void;
        /**
         * Triggers a validation of the form, requesting the form_id to be returned if the form is valid.
         * @param payload - The payload containing the expiry month and year.
         * @throws SdkErrors.TOKENIZATION_FAILED if the form is invalid or if there is an error during the process.
         * @throws SdkErrors.INVALID_FORM if the form is not valid.
         * @event success - emitted when the form is successfully tokenized.
         * @event error - emitted when there is an error during the tokenization process.
         */
        submit: (payload: {
            expiry_month: number;
            expiry_year: number;
        }) => Promise<{
            vault_form_token: string;
            card?: {
                last_four_digits?: string;
                bin?: string;
                detected_brands?: CardNetwork[];
            };
        }>;
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
         * Eligible card networks for the vault form
         */
        brands: CardNetwork[];
        /**
         * Targets and labels for the iframe fields
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

    export { }
