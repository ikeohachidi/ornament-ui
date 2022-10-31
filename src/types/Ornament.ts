import { ButtonOptions } from '@/components/or-button';
type Theme = {
    primary?: string
    secondary?: string
    [key: string]: string | unknown
}

type HexColor = string

type DefaultTheme = Theme & {
    danger?: HexColor
    success?: HexColor
    info?: HexColor 
    text?: {
        primary?: HexColor
        secondary?: HexColor
    }
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