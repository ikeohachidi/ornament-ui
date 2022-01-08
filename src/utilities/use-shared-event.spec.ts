import useEvent, { emitter } from './use-shared-event';

const callback = jest.fn();

describe('useShareEvent', () => {
	it('should call run the callback function', () => {
		useEvent('fire').listen(callback);
		useEvent('fire').push('hello');

		expect(callback).toHaveBeenCalledWith('hello');
	})

	it('should call run the callback function', () => {
		emitter.on('fire', callback)
		emitter.emit('fire', 'hello');

		expect(callback).toHaveBeenCalledWith('hello');

	})
})