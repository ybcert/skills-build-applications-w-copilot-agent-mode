import { useEffect, useState } from 'react';
import { normalizeCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}`
    : 'http://localhost:8000';

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}-8000.app.github.dev/api/teams`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setTeams(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load teams.');
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="card-title mb-3">Teams</h2>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id || team.name}>
                <div className="border rounded-3 p-3 h-100">
                  <h3 className="h5 mb-2">{team.name || 'Unnamed team'}</h3>
                  <p className="mb-1"><strong>Sport:</strong> {team.sport || 'N/A'}</p>
                  <p className="mb-1"><strong>Coach:</strong> {team.coach || 'N/A'}</p>
                  <p className="mb-1"><strong>City:</strong> {team.city || 'N/A'}</p>
                  <p className="mb-0">
                    <strong>Members:</strong>{' '}
                    {(team.members || []).map((member) => member?.name || member?.email || 'Unknown member').join(', ') || 'No members'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;
