import { sharedNode } from './shared-node';

describe('sharedNode', () => {
  it('should work', () => {
    expect(sharedNode()).toEqual('shared-node');
  });
});
