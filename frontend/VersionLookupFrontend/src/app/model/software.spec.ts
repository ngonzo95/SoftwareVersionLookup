import { Software } from './software';

describe('Software', () => {
  it('should create an instance', () => {
    expect(new Software("aName", "1.2")).toBeTruthy();
    expect(new Software("aName", "1.2").version).toBe("1.2");
    expect(new Software("aName", "1.2").name).toBe("aName");
  });
});
