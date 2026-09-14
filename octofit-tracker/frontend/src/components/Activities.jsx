import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadActivities = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setActivities(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load activities.');
        }
      }
    };

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="card-title mb-3">Activities</h2>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Duration</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id || `${activity.type}-${activity.date}`}>
                    <td>{activity.type || 'N/A'}</td>
                    <td>{activity.user?.name || activity.user?.email || 'Unknown user'}</td>
                    <td>{activity.team?.name || 'No team'}</td>
                    <td>{activity.durationMinutes || 0} min</td>
                    <td>{activity.caloriesBurned || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
