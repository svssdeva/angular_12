import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../../services/training.service";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: Array<string> = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource: MatTableDataSource<ExerciseModel>;
  private exChangedSubscription: Subscription | undefined;
  @ViewChild(MatSort) matSort : MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator | null;
  constructor(private trainingService: TrainingService) {
    this.dataSource = new MatTableDataSource<ExerciseModel>();
    this.matSort = new MatSort();
    this.paginator = null;
  }

  ngOnInit(): void {
   this.exChangedSubscription = this.trainingService.finishedExerciseChanges.subscribe((res: Array<ExerciseModel>) => {
      if (res) {
        this.dataSource.data = res;
      }
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(event: any) {
    const data: string = event.target.value || '';
    this.dataSource.filter = data.trim().toLowerCase()
  }

  ngOnDestroy() {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }
}
