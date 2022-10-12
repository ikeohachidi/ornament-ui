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
    theme: {
        default: DefaultTheme,
        [key: string]: Record<string, unknown>
    }
}

export const injectionKey = Symbol();

export { 
    ComponentOptions,
    DefaultTheme
}