import { computed, inject, reactive, ref, Ref } from "vue";
import { ComponentOptions, DefaultTheme, injectionKey } from "@/types";
import { merge } from 'lodash/fp';

type ReturnValue<T> = {
    defaultTheme: Ref<Partial<DefaultTheme>>
    componentTheme: Ref<Partial<T> | undefined>
}

export const useTheme = <T>(key?: keyof ComponentOptions): ReturnValue<T> => {
    const defaultTheme = ref<Partial<DefaultTheme>>({
        primaryBg: '#1F2937',
        secondaryBg: '#5f27cd',
        dangerBg: '#e74c3c',
        successBg: '#2ecc71',
        infoBg: '#3498db',
        text: {
            primary: '#3c3c3f',
            secondary: '#59595e'
        },
        grey: {
            dark: '#cccccc',
            dark2: '#e6ebee77',
            dark3: '#e6ebee3b'
        }
    });

    const componentTheme = ref<Partial<T>>();

    const theme = (inject(injectionKey) as ComponentOptions);

    // theme may be undefined because the ThemeProvider isn't being used
    if (theme) {
        if ('default' in theme) {
            defaultTheme.value = merge(defaultTheme.value, theme.default);
        }

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
    return computed(() => ({
        primaryBg: (componentTheme?.value?.primaryBg || defaultTheme.value.primaryBg),
    }));
}