import { useEffect, useState } from "react";
import { Item } from "../../models/item.model";
import { KnapsackService } from "../../services/knapsack.service";
import { items as data } from "../../utils/data";

export function InventoryPage() {
  const [matrix, setMatrix] = useState<any[]>([]);
  const [items] = useState<Item[]>([data[4]]);

  const knapSackService = new KnapsackService();

  useEffect(() => {
    const values = items.map(item => item.price);
    const weights = items.map(item => item.area.width * item.area.height);
    const n = items.length;
    const target = 10;
    const lookpup = new Map<any, any>();

    //console.log(knapSackService.knapSack(values, weights, n-1, target));
    console.log(lookpup);
  }, []);

  useEffect(() => {
    setMatrix([]);
    console.log(items);
    const rows = 7;
    const columns = 11;
    const matrixAux = new Array(columns);

    let totWidth = 0;
    let totHeight = 0;
    let totArea = 0;
    
    items.forEach(item => {
      totWidth += item.area.width;
      totHeight += item.area.height;
      totArea += (item.area.width * item.area.height);
    });

    for (let i = 0; i < matrixAux.length; i++) {
      matrixAux[i] = new Array(rows);
    }

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        matrixAux[i][j] = 0;
      }
    }

    let counter = 1;
    console.log('width:' + totWidth)
    console.log('height:' + totHeight)
    console.log('tot:' + totArea)

    // for (let i = 0; i < rows; i++) {
    //   for (let j = 0; j < columns; j++) {
    //     if (matrixAux[i][j] === 0) {
    //       for (let w = 0+2; w < item.area.width+2; w++) {
    //         for (let h = 0+2; h < item.area.height+2; h++) {
    //           matrixAux[w][h] = 3;
    //         }
    //       }
    //     }
    //   }
    // }

    matrixAux[0][0] = 1;
    matrixAux[0][1] = 1;

    items.forEach((item, index) => {
      const m = [];
      let freeMatrix: Array<{i: number, j:number}> = [];

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (matrixAux[i][j] === 0) {
            freeMatrix.push({i, j});
          }
        }
      }

      console.log(freeMatrix);

      for (let w = 0; w < item.area.width; w++) {
        for (let h = 0; h < item.area.height; h++) {
          m.push({w, h});
        }
      }

      console.log(m);

      let add = 0;

      l: for (let i = 0+add; i < item.area.width+add; i++) {
        for (let j = i; j < item.area.height; j++) {
          if (matrixAux[i][j] !== 0) {
            add++;
            continue l;
          }
          console.log("i, j = ", i, j)
        }
      }
    });

    setMatrix(matrixAux);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen p-8">
      <table className="w-full text-center">
        <tbody>
          {
            matrix.map((row: any) => (
              <tr>
                {
                  row.map((column: any) => (
                    <td className="border-4 p-2">
                      {column}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}