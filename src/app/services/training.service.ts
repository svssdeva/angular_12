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
  private exercises: Array<ExerciseModel> = [];
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
  getRunningExercise() {
    return {...this.runningExercise};
  }

  completeExercise() {
    this.exercises.push({...this.runningExercise, state: 'completed', date: new Date()});
    this.runningExercise = new ExerciseModel({});
    this.exerciseChanged.next(new ExerciseModel({}));
  }
  cancelExercise(progress: number) {
    this.exercises.push({...this.runningExercise,
      state: 'cancelled',
      date: new Date(),
      calories: this.runningExercise.calories * (progress / 100),
      duration: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = new ExerciseModel({});
    this.exerciseChanged.next(new ExerciseModel({}));
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice();
  }
}
