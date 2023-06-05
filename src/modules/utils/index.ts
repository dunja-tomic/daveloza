// convert from column number to A1 notation
export const convertToA1Notation = (column: number, row: number) => {
  const a1Notation = [`${row + 1}`];
  const totalAlphabets = 'Z'.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  let block = column;
  while (block >= 0) {
    a1Notation.unshift(
      String.fromCharCode((block % totalAlphabets) + 'A'.charCodeAt(0)),
    );
    block = Math.floor(block / totalAlphabets) - 1;
  }
  return a1Notation.join('');
};

export const formatProductsAndInventory = (
  products: string[],
  inventory: string[],
) => {
  return products.map((product, index) => `- ${product} (${inventory[index]})`);
};
