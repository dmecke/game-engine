import Debug from '../../src/Debug/Debug';

describe('Debug', () => {
    it('set should set the value for the given key', () => {
        const debug = new Debug();
        debug.set('foo', 'bar');

        expect(debug.get('foo')).toEqual('bar');
    });
});
