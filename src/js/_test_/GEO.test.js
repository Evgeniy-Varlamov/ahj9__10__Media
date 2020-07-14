import validateGEO from '../validateGEO';

describe('correct coordinates', () => {
  test('1', () => {
    expect(validateGEO('51.50851, -0.12572')).toEqual(true);
  });
  test('2', () => {
    expect(validateGEO('51.50851,-0.12572')).toEqual(true);
  });
  test('3', () => {
    expect(validateGEO('[51.50851,-0.12572]')).toEqual(true);
  });
});

describe('wrong coordinates', () => {
  test('1', () => {
    expect(validateGEO('51, 5')).toEqual(false);
  });
  test('2', () => {
    expect(validateGEO('qwerty')).toEqual(false);
  });
  test('3', () => {
    expect(validateGEO('51.50851,-0.12572, 5.4759')).toEqual(false);
  });
});
