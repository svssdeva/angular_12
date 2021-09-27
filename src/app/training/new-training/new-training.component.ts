import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExerciseModel} from "../exercise.model";
import {TrainingService} from "../../services/training.service";
import {NgForm} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, Subscription} from "rxjs";
import {map} from 'rxjs/operators';
@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exerciseSubscription: Subscription | undefined;
  exercises:Array<ExerciseModel> | undefined;
  constructor(private trainingService: TrainingService,
              private angularFireStore: AngularFirestore) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(res => {
      if (res) {
        this.exercises = res;
      }
    });
    this.trainingService.fetchAvailableExercises();
  }
  async ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
