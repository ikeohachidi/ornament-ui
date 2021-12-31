const events: Record<string, {
	push: (value: unknown) => void;
	listen: (callback: Function) => void;
	_listeners: Function[];
}> = {};

const useEvent = (event: string) => {
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
			}
		}
	}

	const e = events[event];
	return {
		push: (value: unknown) => e.push(value),
		listen: (callback: Function) => e.listen(callback),
	}
}

export default useEvent;