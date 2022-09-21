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
            const rect = element.value.getBoundingClientRect();
            size.value = rect.width;
        }
    }

    // elements are usually undefined during the initial function call
    // and the element ref is rarelly ever reassigned so the watch will
    // never run again
    watch(element, setSize);

    window.addEventListener('resize', () => {
        setSize();
    });

    return size;
}