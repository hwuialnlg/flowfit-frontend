export interface Exercise {
    id: number,
    email: string,
    exercise_name: string,
}

export interface Group {
    id: number,
    name: string,
}

export interface Weekly {
    monday: Daily,
    tuesday: Daily,
    wednesday: Daily,
    thursday: Daily,
    friday: Daily,
    saturday: Daily,
    sunday: Daily,
}

export interface Daily {
    day: string,
    groups?: Array<WorkoutGroup>
    exercises?: Array<Exercise>
    key?: string
    state: Weekly
    setWeeklyState: (arg0: Weekly) => void
}