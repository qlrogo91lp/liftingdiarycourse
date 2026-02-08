import { pgTable, text, timestamp, uuid, integer, decimal, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// Exercises 테이블 (운동 종목)
// ============================================
export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('exercises_name_idx').on(table.name),
]);

// ============================================
// Workouts 테이블 (운동 세션)
// ============================================
export const workouts = pgTable('workouts', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: text('clerk_id').notNull(),
  startedAt: timestamp('started_at'),
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('workouts_clerk_id_idx').on(table.clerkId),
]);

// ============================================
// Workout Exercises 테이블 (세션 내 운동)
// ============================================
export const workoutExercises = pgTable('workout_exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutId: uuid('workout_id').notNull().references(() => workouts.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exercise_id').references(() => exercises.id, { onDelete: 'set null' }),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('workout_exercises_workout_id_idx').on(table.workoutId),
  index('workout_exercises_exercise_id_idx').on(table.exerciseId),
]);

// ============================================
// Sets 테이블 (세트 기록)
// ============================================
export const sets = pgTable('sets', {
  id: uuid('id').primaryKey().defaultRandom(),
  workoutExerciseId: uuid('workout_exercise_id').notNull().references(() => workoutExercises.id, { onDelete: 'cascade' }),
  setNumber: integer('set_number').notNull(),
  weight: decimal('weight', { precision: 5, scale: 2 }),
  reps: integer('reps'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('sets_workout_exercise_id_idx').on(table.workoutExerciseId),
]);

// ============================================
// Relations 정의
// ============================================
export const exercisesRelations = relations(exercises, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const workoutsRelations = relations(workouts, ({ many }) => ({
  workoutExercises: many(workoutExercises),
}));

export const workoutExercisesRelations = relations(workoutExercises, ({ one, many }) => ({
  workout: one(workouts, {
    fields: [workoutExercises.workoutId],
    references: [workouts.id],
  }),
  exercise: one(exercises, {
    fields: [workoutExercises.exerciseId],
    references: [exercises.id],
  }),
  sets: many(sets),
}));

export const setsRelations = relations(sets, ({ one }) => ({
  workoutExercise: one(workoutExercises, {
    fields: [sets.workoutExerciseId],
    references: [workoutExercises.id],
  }),
}));

// ============================================
// Type exports
// ============================================
export type Exercise = typeof exercises.$inferSelect;
export type NewExercise = typeof exercises.$inferInsert;

export type Workout = typeof workouts.$inferSelect;
export type NewWorkout = typeof workouts.$inferInsert;

export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type NewWorkoutExercise = typeof workoutExercises.$inferInsert;

export type Set = typeof sets.$inferSelect;
export type NewSet = typeof sets.$inferInsert;
