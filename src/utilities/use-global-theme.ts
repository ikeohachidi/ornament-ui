import { inject, reactive, ref } from "vue";
import type { ComponentOptions, DefaultTheme } from "@/types";
import { injectionKey } from "@/types";


const useTheme = () => {
    const defaultTheme = ref<DefaultTheme>({});
    const textTheme = ref({});
    const keyTheme = ref<Record<string, unknown>>({});

    const theme = (inject(injectionKey) as ComponentOptions).theme;

    textTheme.value = theme.default.text!;
    for (const [key, value] of Object.entries(theme)) {
        if (key === 'default') {
            defaultTheme.value = value as DefaultTheme;
        }
        else {
            keyTheme.value[key as string] = value
        }
    }

    return {
        defaultTheme,
        textTheme,
        keyTheme
    };
}

export {
    useTheme
}