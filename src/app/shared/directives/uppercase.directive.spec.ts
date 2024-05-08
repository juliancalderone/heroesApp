import { UppercaseDirective } from './uppercase.directive';

describe('UppercaseDirective', () => {
  it('should create an instance', () => {
    const directive = new UppercaseDirective();
    expect(directive).toBeTruthy();
  });
});

describe('UppercaseDirective', () => {
  let directive: UppercaseDirective;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    directive = new UppercaseDirective();
    inputElement = document.createElement('input');
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should convert input value to uppercase', () => {
    inputElement.value = 'hello';
    directive.onInput({ target: inputElement } as unknown as KeyboardEvent);
    expect(inputElement.value).toBe('HELLO');
  });

  it('should keep input value as uppercase', () => {
    inputElement.value = 'WORLD';
    directive.onInput({ target: inputElement } as unknown as KeyboardEvent);
    expect(inputElement.value).toBe('WORLD');
  });
});
