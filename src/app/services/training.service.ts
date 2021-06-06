import { Injectable } from '@angular/core';
import {ExerciseModel} from "../training/exercise.model";
import {Subject} from "rxjs";

/*@Injectable({
  providedIn: 'root'
})*/
export class TrainingService {
  private availableExercise: Array<ExerciseModel> = [
    {id: '1', name: 'Burpees', calories: 100, state: null, date: new Date(), duration: 150}
  ];
  private runningExercise: ExerciseModel = new ExerciseModel({});
  exerciseChanged = new Subject<ExerciseModel>();
  constructor() {
  }
  getAvailableExercises() {
    return this.availableExercise.slice();
  }
  startExercise(selectedId: string) {
    this.runningExercise = new ExerciseModel(this.availableExercise.find(ex => ex.id === selectedId));
    if (this.runningExercise.id.length > 0) {
      this.exerciseChanged.next({...this.runningExercise});
    }
  }
}
