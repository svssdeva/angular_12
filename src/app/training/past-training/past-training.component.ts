import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../../services/training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns: Array<string> = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource: MatTableDataSource<ExerciseModel>;
  @ViewChild(MatSort) matSort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  constructor(private trainingService: TrainingService) {
    this.dataSource = new MatTableDataSource<ExerciseModel>();
    this.matSort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
    // @ts-ignore
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(event: any) {
    const data: string = event.target.value || '';
    this.dataSource.filter = data.trim().toLowerCase()
  }
}
