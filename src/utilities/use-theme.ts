import { inject, ref, Ref } from "vue";
import { ComponentOptions, DefaultTheme, injectionKey } from "@/types";

type ReturnValue<T> = {
    defaultTheme: Ref<DefaultTheme>
    componentTheme: Ref<T>
}

export const useTheme = <T>(key?: keyof ComponentOptions): ReturnValue<T> => {
    const defaultTheme = ref<DefaultTheme>({});
    const componentTheme = ref();

    const theme = (inject(injectionKey) as ComponentOptions);

    if ('default' in theme) {
        defaultTheme.value = theme.default;
    }

    if (key && key in theme) {
        componentTheme.value = theme[key];
    }

    return {
        defaultTheme,
        componentTheme
    }
}

export const useStyles = <T extends {[key: string]: unknown}>(componentTheme: Ref<T>, defaultTheme: Ref<DefaultTheme>) => {
    return {
        primary: (componentTheme.value.primary || defaultTheme.value.primary),
        secondary: (componentTheme.value.secondary || defaultTheme.value.secondary),
    }
}