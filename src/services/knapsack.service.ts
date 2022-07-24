export interface KnapsackItem {
  id: number;
  w: number; // peso
  v: number; // valor
} 

export interface Knapsack {
  maxValue: number;
  subset: KnapsackItem[];
}

export class KnapsackService {

  public knapSack(items: KnapsackItem[], capacity: number): Knapsack {
    const matrix: any = [];

    for (let i = 0; i < items.length; i++) {
      const row = [];

      for (let cap = 1; cap <= capacity; cap++) {
        row.push(this.getSolution(i, cap, matrix, items));
      }

      matrix.push(row);
    }

    return this.getLast(matrix);
  }

  private getLast(matrix: any[]) {
    const lastRow = matrix[matrix.length - 1];
    return lastRow[lastRow.length - 1];
  }

  private getSolution(row: any, cap: any, matrix: any[], items: any[]) {
    const NO_SOLUTION = { maxValue: 0, subset: [] };

    let col = cap - 1;
    let lastItem = items[row];
    let remaining = cap - lastItem.w;
    let lastSolution =
      row > 0 ? matrix[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
    let lastSubSolution =
      row > 0 ? matrix[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

    if (remaining < 0) {
      return lastSolution;
    }

    let lastValue = lastSolution.maxValue;
    let lastSubValue = lastSubSolution.maxValue;
    let newValue = lastSubValue + lastItem.v;

    if (newValue >= lastValue) {
      let _lastSubSet = lastSubSolution.subset.slice();

      _lastSubSet.push(lastItem);

      return {
        maxValue: newValue,
        subset: _lastSubSet,
      };
    } else {
      return lastSolution;
    }
  }
}
