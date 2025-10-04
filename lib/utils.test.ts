import { formatIndianRupees } from './utils';

describe('formatIndianRupees', () => {
  it('should format a number into the Indian numbering system', () => {
    expect(formatIndianRupees(1000)).toBe('₹1,000');
    expect(formatIndianRupees(100000)).toBe('₹1,00,000');
    expect(formatIndianRupees(1234567)).toBe('₹12,34,567');
  });

  it('should handle zero correctly', () => {
    expect(formatIndianRupees(0)).toBe('₹0');
  });

  it('should handle single-digit numbers', () => {
    expect(formatIndianRupees(5)).toBe('₹5');
  });
});