// ExerciseTracker.jsx
import React, { useEffect, useState } from "react";
import {
  fetchExercisesForToday,
  addExerciseToFirestore,
  markExerciseCompleted,
  deleteExerciseFromFirestore,
} from "../config/firebase";
import "../styles/ExerciseTracker.css";

const ExerciseTracker = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseInput, setExerciseInput] = useState({ name: "", reps: "" });
  // const [UserID, setUserID] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  // Fetch Exercises
  const fetchExercises = async (userID) => {
    const data = await fetchExercisesForToday({ userID, date: today });
    setExercises(data);
  };

  // Add Exercise
  const addExercise = async () => {
    if (!exerciseInput.name || !exerciseInput.reps) return;
    const user = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const userID = user.userId;
    // setUserID(userID);

    await addExerciseToFirestore({
      userID,
      exerciseName: exerciseInput.name,
      exerciseReps: exerciseInput.reps,
      date: today,
    });
    setExerciseInput({ name: "", reps: "" });
    fetchExercises(userID);
  };

  // Mark Exercise as Done
  const markAsDone = async (exerciseId) => {
    const user = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const userID = user.userId;
    await markExerciseCompleted(userID, exerciseId);
    console.log("Marked exercise as done");
    fetchExercises(userID);
  };

  // Delete Exercise
  const deleteExercise = async (exerciseId) => {
    const user = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const userID = user.userId;
    await deleteExerciseFromFirestore(userID, exerciseId);
    console.log("exercise deleted");
    fetchExercises(userID);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentMedCareUser"));
    const userID = user.userId;
    fetchExercises(userID);
  }, []);

  return (
    <div className="exercise-container">
      <h2 className="exercise-title">🏋️‍♂️ Daily Exercise Tracker</h2>

      <div className="exercise-input-row">
        <input
          type="text"
          placeholder="Exercise (e.g., Push Ups)"
          value={exerciseInput.name}
          onChange={(e) =>
            setExerciseInput({ ...exerciseInput, name: e.target.value })
          }
          className="exercise-input"
        />
        <input
          type="number"
          placeholder="Reps (e.g., 10)"
          value={exerciseInput.reps}
          onChange={(e) =>
            setExerciseInput({ ...exerciseInput, reps: e.target.value })
          }
          className="exercise-input reps"
        />
        <button onClick={addExercise} className="exercise-button add">
          Add
        </button>
      </div>

      {exercises.length === 0 ? (
        <p className="exercise-empty">No exercises added today.</p>
      ) : (
        <ul className="exercise-list">
          {exercises.map((exercise) => (
            <li key={exercise.exerciseID} className="exercise-item">
              <div>
                <p className="exercise-name">
                  {exercise.exerciseName} - {exercise.exerciseReps} reps
                </p>
                <p
                  className={`exercise-status ${
                    exercise.completed ? "completed" : "not-completed"
                  }`}
                >
                  {exercise.completed ? "Completed" : "Not completed"}
                </p>
              </div>
              <div className="exercise-actions">
                {!exercise.completed && (
                  <button
                    onClick={() => markAsDone(exercise.exerciseID)}
                    className="exercise-button done"
                  >
                    Mark Done
                  </button>
                )}
                <button
                  onClick={() => deleteExercise(exercise.exerciseID)}
                  className="exercise-button delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExerciseTracker;
