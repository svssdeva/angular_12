export class ExerciseModel {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
  constructor(props: any) {
    props = props || {};
    this.id = props?.id || '';
    this.name = props?.name || '';
    this.duration = props?.duration || 0;
    this.calories = props?.calories || 0;
    this.date = props?.date || new Date();
    this.state = props?.state || null;
  }
}
