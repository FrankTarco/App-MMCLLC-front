import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  exportExcel(data:any){
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)

    const ref = XLSX.utils.decode_range(ws['!ref']??'');

    if (ref.s.c < ref.e.c) {

      ref.e.c -= 1;


      for (let R = ref.s.r; R <= ref.e.r; ++R) {
        const cellAddress = { r: R, c: ref.e.c + 1 };
        delete ws[XLSX.utils.encode_cell(cellAddress)];
      }
      ws['!ref'] = XLSX.utils.encode_range(ref);
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'Sheet 1')

    XLSX.writeFile(wb, "Reporte.xlsx")
  }


}
