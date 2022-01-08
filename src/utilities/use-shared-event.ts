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

type onCallback = (value?: any) => void;
type Emitter = {
	events: {[event: string]: onCallback[]};
	on: (event: string, callback: onCallback) => void;
	off: (event: string) => void;
	emit: (event: string, value?: any) => Promise<void>;
}

/**
 * emitter implements a more common api for pubsub
 */
const emitter: Emitter = {
	events: {},
	on(event: string, callback: onCallback) {
		if (event in this.events == false) {
			this.events[event] = [callback];
			return
		}

		this.events[event].push(callback);
	},
	off(event: string, callback?: onCallback) {
		if (event in this.events === false) throw new Error(`Event ${event} doesn't exist`);
		
		if (callback) {
			const index = this.events[event].findIndex(c => c === callback);
			if (index !== -1) {
				this.events[event].slice(index, 1);
			}
			return
		}

		delete this.events[event];
	},
	emit(event: string, value?: any) {
		return new Promise((resolve, reject) => {
			if (event in this.events === false) {
				reject(`Event ${event} doesn't exist`);
				return;
			}

			for (const callback of this.events[event]) {
				callback(value);
				resolve()
			}
		})
	}
} 

export {
	emitter
}

export default useEvent;