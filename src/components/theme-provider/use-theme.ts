import { computed, inject, ref, Ref } from "vue";
import { injectionKey } from "@/types";
import type { BaseTheme, ComponentOptions } from "@/types";
import { defaultThemeSetting } from './defaults';
import { merge } from 'lodash/fp';

type Theme = {
    defaultTheme: Ref<BaseTheme>
    componentTheme: Ref<BaseTheme | undefined>
}

export const useTheme = (key?: keyof ComponentOptions): Theme => {
    const defaultTheme = ref<BaseTheme>(defaultThemeSetting);

    const componentTheme = ref<BaseTheme>();

    const theme = (inject(injectionKey) as ComponentOptions);

    // theme may be undefined because the ThemeProvider isn't being used
    if (theme) {
        if ('default' in theme) {
            defaultTheme.value = merge(defaultTheme.value, theme.default);
        }

        if (key && key in theme) {
            componentTheme.value = (theme[key] as unknown) as BaseTheme;
        }
    }

    return {
        defaultTheme,
        componentTheme
    }
}

export const useStyles = <T>(componentTheme: Ref<BaseTheme | undefined>, defaultTheme: Ref<BaseTheme>) => {
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

        disabledBg: (componentTheme?.value?.disabled?.background || defaultTheme.value.disabled.background),
        disabledTextColor: (componentTheme?.value?.disabled?.textColor || defaultTheme.value.disabled.textColor),

        component: componentTheme.value
    }));
}