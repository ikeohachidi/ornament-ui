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