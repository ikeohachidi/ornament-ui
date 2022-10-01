import { emitter } from './use-shared-event';

const callback = jest.fn();

describe('event emitters', () => {
	it('should call run the callback function', () => {
		emitter.on('fire', callback)
		emitter.emit('fire', 'hello');

		expect(callback).toHaveBeenCalledWith('hello');

	})
})