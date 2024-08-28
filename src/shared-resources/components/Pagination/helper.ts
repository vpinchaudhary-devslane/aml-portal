export function getPageNumbers(total: number, limit: number): number[] {
  const pageNumbers = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(total / limit); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

export function getLastPage(total: number, limit: number): number {
  return Math.ceil(total / limit);
}

export function getFromTo(
  currentPage: number,
  limit: number,
  total: number
): { fromIndex: number; toIndex: number; from: number; to: number } {
  return {
    fromIndex: currentPage * limit - limit,
    toIndex: currentPage * limit > total - 1 ? total - 1 : currentPage * limit,
    to: currentPage * limit > total ? total : currentPage * limit,
    from: currentPage * limit - limit + 1,
  };
}
