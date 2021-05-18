import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-stop-training',
  template: `<h1 matDialogTitle> Are you sure ?</h1>

  <mat-dialog-content>
   You already got {{passedData.progress || 0}} %.
  </mat-dialog-content>

  <mat-dialog-actions>
    <button mat-button [matDialogClose]="false">No</button>
    <button mat-button [matDialogClose]="true">Yes</button>

  </mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: {progress: number}) {
  }
}
