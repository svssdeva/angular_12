import { Injectable } from '@angular/core';
import {ExerciseModel} from "../training/exercise.model";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable()
export class TrainingService {
  private availableExercise: Array<ExerciseModel> = [];
  private runningExercise: ExerciseModel = new ExerciseModel({});
  exerciseChanged = new Subject<ExerciseModel>();
  exercisesChanged = new Subject<Array<ExerciseModel>>();
  finishedExerciseChanges = new Subject<Array<ExerciseModel>>();
  private finishedExercises: Array<ExerciseModel> = [];
  constructor( private angularFireStore: AngularFirestore) {

  }
  fetchAvailableExercises() {
    this.angularFireStore.collection('availableExercises').snapshotChanges().pipe(map((docArray: { payload: { doc: { id: any; data: () => any; }; }; }[]) => {
      return  docArray.map((doc: { payload: { doc: { id: any; data: () => any; }; }; }) => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    })).subscribe(exercises => {
      this.availableExercise = [...exercises];
      this.exercisesChanged.next([...this.availableExercise]);
    });
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
    this.addExerciseToDatabase({...this.runningExercise, state: 'completed', date: new Date()});
    this.runningExercise = new ExerciseModel({});
    this.exerciseChanged.next(new ExerciseModel({}));
  }
  cancelExercise(progress: number) {
    this.addExerciseToDatabase({...this.runningExercise,
      state: 'cancelled',
      date: new Date(),
      calories: this.runningExercise.calories * (progress / 100),
      duration: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = new ExerciseModel({});
    this.exerciseChanged.next(new ExerciseModel({}));
  }

  fetchCompletedOrCancelledExercises() {
    this.angularFireStore.collection('finishedExercises').valueChanges().subscribe((res) => {
      this.finishedExercises = res.map(el => new ExerciseModel(el));
      this.finishedExerciseChanges.next(this.finishedExercises);
    })
  }

  addExerciseToDatabase(exercise: ExerciseModel) {
    this.angularFireStore.collection('finishedExercises').add(exercise);
  }
}
