interface Exercise {
    id: number,
    email: string,
    exercise_name: string,
}

interface WorkoutGroup {
    type: string,
    name: string,
}

interface Weekly {
    monday: Daily,
    tuesday: Daily,
    wednesday: Daily,
    thursday: Daily,
    friday: Daily,
    saturday: Daily,
    sunday: Daily,
}

interface Daily {
    day: string,
    groups?: Array<WorkoutGroup>
    exercises?: Array<Exercise>
    key?: string
    state: Weekly
    setWeeklyState: (arg0: Weekly) => void
}