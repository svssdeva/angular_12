import { Injectable } from '@angular/core';
import {ExerciseModel} from "../training/exercise.model";
import {Subject} from "rxjs";

/*@Injectable({
  providedIn: 'root'
})*/
export class TrainingService {
  private availableExercise: Array<ExerciseModel> = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
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
