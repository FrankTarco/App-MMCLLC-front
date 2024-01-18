import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-confirm',
  templateUrl: './add-confirm.component.html',
  styleUrls: ['./add-confirm.component.css']
})
export class AddConfirmComponent implements OnInit{

  msg:string=''

  constructor(private dialogRef:MatDialogRef<AddConfirmComponent>,@Inject(MAT_DIALOG_DATA)public data:any){}

  ngOnInit(): void {
    this.msg = this.data;
  }
}
