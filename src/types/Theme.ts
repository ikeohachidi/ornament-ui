import type { ButtonTheme } from '@/components/or-button';

// type HexColor = string
export type CssColor = string;

/**
 * Color Unit should be a valid CSS color unit i.e hex, rgb, rgba, hsl
 */
export interface BaseTheme {
    primary: {
        /**
         * @default #1F2937
         */
        background: CssColor
        /**
         * @default #fff
         * Color of text on the background
         */
        textColor: CssColor
    }
    secondary: {
        /**
         * @default #5f27cd
         */
        background: CssColor
        /**
         * @default #fff
         * Color of text on the background
         */
        textColor: CssColor
    }
    success: {
        /**
         * @default #2ecc71
         */
        background: CssColor
        /**
         * @default #fff
         * Color of text on the background
         */
        textColor: CssColor
    }
    danger: {
        /**
         * @default #e74c3c
         */
        background: CssColor
        /**
         * @default #fff
         * Color of text on the background
         */
        textColor: CssColor
    }
    info: {
        /**
         * @default #3498db
         */
        background: CssColor
        /**
         * @default #fff
         * Color of text on the background
         */
        textColor: CssColor
    }
    disabled: {
        /**
         * @default #d1d5db
         */
        background: CssColor,
        /**
         * @default #6b7280
         */
        textColor: CssColor
    },
    /**
     * The background of components like cards, menus etc
     */
    background: {
        /**
         * @default #fff
         * The main color used for the backgrounds of larger components
         */
        primary: CssColor
        /**
         * @default #fff
         * Accent color or complementary background colors
         */
        secondary: CssColor
    },
    border: {
        /**
         * @default #bdc3c7
         */
        primary: CssColor
        /**
         * @default #ecf0f1
         */
        secondary: CssColor
    },
    text: {
        /**
         * @default #3c3c3f
         * Primary color for texts
         */
        primary: CssColor
        /**
         * @default #59595e
         * Secondary color for texts
         */
        secondary: CssColor
    }
    [key: string]: string | unknown
}

export interface ComponentOptions {
    default: BaseTheme
    Chips?: Partial<BaseTheme>
    Button?: Partial<BaseTheme> & ButtonTheme
    Accordion?: Partial<BaseTheme>
    Dropdown?: Partial<BaseTheme>
    Checkbox?: Partial<BaseTheme>
}

export const injectionKey = 'OrnamentUI';