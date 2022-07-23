import { useEffect, useState } from "react";
import { Item } from "../../model/item.model";
import { items as data } from "../../utils/data";

export function InventoryPage() {
  const [matrix, setMatrix] = useState<any[]>([]);
  const [items] = useState<Item[]>([data[4], data[6], data[2]]);

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
    matrixAux[1][1] = 1;

    items.forEach((item, index) => {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (matrixAux[i][j] === 0) {
            let isAllZero = true;
            let addW = 0;
            let addH = 0;
            let m = [];

            l: for (let w = 0+addW; w < item.area.width+addW; w++) {
              for (let h = 0+addH; h < item.area.height+addH; h++) {
                if (w < 10 && matrixAux[w][h] !== 0) {
                  isAllZero = false;
                  addW++;
                  m = [];
                  continue l;
                } else if (matrixAux[h][w] !== 0) {
                  addH++;
                  m = [];
                  continue l;
                } else {
                  m.push({w,h});
                }
              }
            }

            console.log(m)
            //m.forEach((p: any) => matrixAux[p.w][p.h] = 1);
            for (let x = 0; x < m.length; x++) {
              if (m[x].w < 7 && m[x].h < 11) {
                matrixAux[m[x].w][m[x].h] = index + 1;
              }
            }
          }
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