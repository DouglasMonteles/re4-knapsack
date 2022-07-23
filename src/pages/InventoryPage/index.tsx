import { useEffect, useState } from "react";
import { Item } from "../../model/item.model";
import { items as data } from "../../utils/data";

export function InventoryPage() {
  const [matrix, setMatrix] = useState<any[]>([]);
  const [items] = useState<Item[]>([data[4]]);

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

    // if (matrixAux[i][j] === 0) {
    //   console.log(i, j)
    //   for (let w = 0; w < item.area.width; w++) {
    //     for (let h = 0; h < item.area.height; h++) {
    //       matrixAux[w][h] = index+1;
    //     }
    //   }
    // }

    matrixAux[0][0] = 1;
    matrixAux[1][1] = 1;

    items.forEach((item, index) => {
      let getIndexI = 0;
      let getIndexJ = 0;
      let isOk = true;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; i < columns; j++) {
          getIndexI = i;
          getIndexJ = j;

          for (let w = 0; w < item.area.width; w++) {
            for (let h = 0; h < item.area.height; h++) {
              if (matrixAux[i][j] === 0) {
                console.log(i, j);
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