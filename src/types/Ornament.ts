import { ButtonOptions } from '@/components/or-button';

type HexColor = string

type DefaultTheme = {
    primaryBg: string
    secondaryBg: string
    danger?: HexColor
    success?: HexColor
    info?: HexColor 
    text?: {
        primary?: HexColor
        secondary?: HexColor
    }
    [key: string]: string | unknown
}

type ComponentOptions = {
    default: DefaultTheme
    Button?: ButtonOptions
}

export const injectionKey = Symbol();

export { 
    ComponentOptions,
    DefaultTheme
}