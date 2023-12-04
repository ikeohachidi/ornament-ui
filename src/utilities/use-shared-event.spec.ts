import { emitter } from './use-shared-event';
import { describe, it, expect, vi } from 'vitest';

const callback = vi.fn();

describe('event emitters', () => {
	it('should call run the callback function', () => {
		emitter.on('fire', callback)
		emitter.emit('fire', 'hello');

		expect(callback).toHaveBeenCalledWith('hello');

	})
})