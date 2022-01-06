const events: Record<string, {
	push: (value: unknown) => void;
	listen: (callback: Function) => void;
	flush: () => void;
	_listeners: Function[];
}> = {};


/**
 * useEvent is a simple pubsub implementation
 * @param event the name of the event to listen to
 */
const useEvent = (event: string) => {
	if (!event) {
		throw new Error("Attempting to create nameless event");
		
	}

	if ((event in events) === false) {
		events[event] = {
			_listeners: [],
			push: function(value: unknown) {
				this._listeners.forEach(_listener => {
					_listener(value);
				})
			},
			listen: function(callback: Function) {
				this._listeners.push(callback);
			},
			flush: function(): void {
				this._listeners = [];
			}
		}
	}

	const e = events[event];
	return {
		push: (value: unknown) => e.push(value),
		listen: (callback: Function) => e.listen(callback),
		flush: () => e.flush()
	}
}

export default useEvent;