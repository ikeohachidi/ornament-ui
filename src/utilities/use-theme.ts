import { inject, ref, Ref } from "vue";
import { ComponentOptions, DefaultTheme, injectionKey } from "@/types";
import { merge } from 'lodash/fp';

type ReturnValue<T> = {
    defaultTheme: Ref<Partial<DefaultTheme>>
    componentTheme: Ref<Partial<T> | undefined>
}

export const useTheme = <T>(key?: keyof ComponentOptions): ReturnValue<T> => {
    const defaultTheme = ref<Partial<DefaultTheme>>({
        primaryBg: '#000',
        secondaryBg: 'teal',
    });

    const componentTheme = ref<Partial<T>>();

    const theme = (inject(injectionKey) as ComponentOptions);

    // theme may be undefined because the ThemeProvider isn't being used
    if (theme && 'default' in theme) {
        defaultTheme.value = merge(defaultTheme.value, theme.default);

        if (key && key in theme) {
            componentTheme.value = (theme[key] as unknown) as Partial<T>;
        }
    }

    return {
        defaultTheme,
        componentTheme
    }
}

export const useStyles = <T extends {[key: string]: unknown}>(componentTheme: Ref<T | undefined>, defaultTheme: Ref<Partial<DefaultTheme>>) => {
    return {
        primaryBg: (componentTheme?.value?.primaryBg || defaultTheme.value.primaryBg),
    }
}