import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TrainingService} from "../services/training.service";

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining: boolean = false;
  exerciseSubs: Subscription | undefined;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubs = this.trainingService.exerciseChanged.subscribe(exercise => {
        this.onGoingTraining = !!exercise.name.length;
    });
  }
  async ngOnDestroy() {
    this.exerciseSubs?.unsubscribe();
  }
}
