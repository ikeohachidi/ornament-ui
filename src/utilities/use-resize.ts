import { watch, ref, Ref } from 'vue';

export const useWindowResize = () => {
    const size = ref(0);

    window.addEventListener('resize', (e) => {
        size.value = window.innerWidth;
    });

    return size;
}

export const useElementResize = (element: Ref<HTMLElement | undefined>) => {
    const size = ref(0);

    const setSize = () => {
        if (element && element.value) {
            size.value = element.value.getBoundingClientRect().width;
        }
    }

    // elements are usually undefined during the initial function call
    // and the so this will run once when the element exists and won't run
    // again since the element won't change
    watch(element, setSize);

    window.addEventListener('resize', () => {
        setSize();
    });

    return size;
}