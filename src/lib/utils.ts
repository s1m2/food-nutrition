export const lengthCheckValidator = (value: string, minLength: number, property: string): string => {
  if (value.length < minLength) return `${property} must be at least ${minLength} characters long`;
  return '';
}