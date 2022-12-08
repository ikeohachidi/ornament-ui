import { computed, inject, ref, Ref } from "vue";
import { injectionKey } from "@/types";
import type { BaseTheme, ComponentOptions } from "@/types";
import { defaultThemeSetting } from './defaults';
import { merge } from 'lodash/fp';

type ComponentTheme<T> = Partial<T> & BaseTheme;

type Theme<T> = {
    defaultTheme: Ref<BaseTheme>
    componentTheme: Ref<ComponentTheme<T> | undefined>
}

export const useTheme = <T>(key?: keyof ComponentOptions): Theme<T> => {
    const defaultTheme = ref<BaseTheme>(defaultThemeSetting);

    const componentTheme = ref<ComponentTheme<T>>();

    const theme = (inject(injectionKey) as ComponentOptions);

    // theme may be undefined because the ThemeProvider isn't being used
    if (theme) {
        if ('default' in theme) {
            defaultTheme.value = merge(defaultTheme.value, theme.default);
        }

        if (key && key in theme) {
            componentTheme.value = (theme[key] as unknown) as ComponentTheme<T>;
        }
    }

    return {
        defaultTheme,
        componentTheme
    }
}

export const useStyles = <T extends {[key: string]: unknown}>(componentTheme: Ref<(T & BaseTheme) | undefined>, defaultTheme: Ref<BaseTheme>) => {
    return computed(() => ({
        primaryBg: (componentTheme?.value?.primary?.background || defaultTheme.value.primary.background),
        primaryTextColor: (componentTheme?.value?.primary?.textColor || defaultTheme.value.primary.textColor),

        secondaryBg: (componentTheme?.value?.secondary?.background || defaultTheme.value.secondary.background),
        secondaryTextColor: (componentTheme?.value?.secondary?.textColor || defaultTheme.value.secondary.textColor),

        dangerBg: (componentTheme?.value?.danger?.background || defaultTheme.value.danger.background),
        dangerTextColor: (componentTheme?.value?.danger?.textColor || defaultTheme.value.danger.textColor),

        infoBg: (componentTheme?.value?.info?.background || defaultTheme.value.info.background),
        infoTextColor: (componentTheme?.value?.info?.textColor || defaultTheme.value.info.textColor),

        successBg: (componentTheme?.value?.success?.background || defaultTheme.value.success.background),
        successTextColor: (componentTheme?.value?.success?.textColor || defaultTheme.value.success.textColor),
    }));
}