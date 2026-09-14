import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('workouts'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setWorkouts(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load workouts.');
        }
      }
    };

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="card-title mb-3">Workouts</h2>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id || workout.title}>
                <div className="border rounded-3 p-3 h-100">
                  <h3 className="h5 mb-2">{workout.title || 'Untitled workout'}</h3>
                  <p className="mb-1"><strong>Focus:</strong> {workout.focus || 'General fitness'}</p>
                  <p className="mb-1"><strong>Difficulty:</strong> {workout.difficulty || 'beginner'}</p>
                  <p className="mb-1"><strong>Duration:</strong> {workout.durationMinutes || 0} min</p>
                  <p className="mb-0"><strong>Description:</strong> {workout.description || 'No description provided.'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;
