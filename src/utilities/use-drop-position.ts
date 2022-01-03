type cssProperty = {[property: string]: string | number};

const topStyle: cssProperty = {
    bottom: '100%'
}

const bottomStyle: cssProperty = {
    top: '100%'
}

/**
 * useDropPosition should be used in an elements class attribute
 * the returned string "show-*" will be a class and should be set accordinly
 * eg. .show-top { bottom: 105% }
 * @argument element(HTMLElement)
 * @argument windowThreshold(num) the number at which to show either class
 * @returns either "show-top" | "show-bottom"
 */
const useDropPosition = <T extends Element>(element: T, windowThreshold: number): cssProperty => {
    if (element === null) return topStyle;

    const threshold = window.innerHeight - windowThreshold; 
    const elementPos = element.getBoundingClientRect().top as number + window.scrollY;

    return elementPos > threshold ? topStyle : bottomStyle;
}

export default useDropPosition;