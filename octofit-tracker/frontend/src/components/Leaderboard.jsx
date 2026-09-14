import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setLeaderboard(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load leaderboard.');
        }
      }
    };

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="card-title mb-3">Leaderboard</h2>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Points</th>
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry._id || entry.id || entry.rank}>
                    <td>#{entry.rank || 'N/A'}</td>
                    <td>{entry.user?.name || entry.user?.email || 'Unknown user'}</td>
                    <td>{entry.team?.name || 'No team'}</td>
                    <td>{entry.points || 0}</td>
                    <td>{entry.streak || 0} days</td>
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

export default Leaderboard;
