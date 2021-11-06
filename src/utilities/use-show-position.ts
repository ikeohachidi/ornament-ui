type Position = "show-top" | "show-bottom";

/**
 * useShowPosition should be used in an elements class attribute
 * the returned string "show-*" will be a class and should be set accordinly
 * eg. .show-top { bottom: 105% }
 * @argument element(HTMLElement)
 * @argument windowThreshold(num) the number at which to show either class
 * @returns either "show-top" | "show-bottom"
 */
const useShowPosition = <T extends Element>(element: T, windowThreshold: number): Position => {
    if (element === null) return "show-bottom";

    const threshold = window.innerHeight - windowThreshold; 
    const elementPos = element.getBoundingClientRect().top as number + window.scrollY;

    return elementPos > threshold ? "show-top" : "show-bottom";
}

export default useShowPosition;