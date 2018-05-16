import { EnumToKeysPipe } from './enum-to-keys.pipe';

describe('EnumToKeysPipe', () => {
  it('create an instance', () => {
    const pipe = new EnumToKeysPipe();
    expect(pipe).toBeTruthy();
  });
});
