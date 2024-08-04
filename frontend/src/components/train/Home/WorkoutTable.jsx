const workoutPlan = {
  Monday: [
    { exercise: 'Push-ups', sets: 3, reps: 12 },
    { exercise: 'Pull-ups', sets: 3, reps: 8 },
  ],
};

// eslint-disable-next-line react/prop-types
const WorkoutTable = ({ selectedDay }) => {
  const exercises = workoutPlan[selectedDay] || [];

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="py-3 px-6 text-left font-semibold text-gray-600">Exercise</th>
          <th className="py-3 px-6 text-left font-semibold text-gray-600">Sets</th>
          <th className="py-3 px-6 text-left font-semibold text-gray-600">Reps</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
            <td className="py-3 px-6 border-b text-gray-700">{exercise.exercise}</td>
            <td className="py-3 px-6 border-b text-gray-700">{exercise.sets}</td>
            <td className="py-3 px-6 border-b text-gray-700">{exercise.reps}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutTable;
