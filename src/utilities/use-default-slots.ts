import { useSlots, VNode } from "vue";

// filtered out comments, since they'll still render leaving an empty space on the web page 
const filterOutComments = (slot: VNode) => {
	return slot.type.toString() !== "Symbol(Comment)";
}

const useDefaultSlots = () => {
	const slots = useSlots();

	if (slots.default) {
		const defaultSlot = (slots.default() as VNode[]).filter(filterOutComments);

		// necessary check since it seems you can't create multiple components with a v-for
		// inside the default slot
		if (defaultSlot.length > 0 && defaultSlot[0].type.toString() === "Symbol(Fragment)") {
			return (defaultSlot[0].children as VNode[]).filter(filterOutComments);
		}

		return defaultSlot
	}
}

export default useDefaultSlots;