/**
 * Fórmula
 *
 * decimal = dn×2^(n-1) ... + d2×2^0 + d1×2^1 + d0×2^2
 *
 * @param value binary text
 * @returns decimal value
 */
function convertBinToDec(value: string) {
  const reversedBinaryText = value.split('').map(Number).reverse();
  let result = 0;

  reversedBinaryText.forEach((item, index) => {
    result += item * 2 ** index;
  });

  return result;
}

export default convertBinToDec;
