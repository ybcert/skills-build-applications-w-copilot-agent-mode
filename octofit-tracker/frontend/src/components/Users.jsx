import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();

        if (isMounted) {
          setUsers(normalizeCollection(payload));
          setError('');
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError.message || 'Unable to load users.');
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="card-title mb-3">Users</h2>

        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Fitness Level</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id || user.email}>
                    <td>{user.name || 'Unknown user'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.role || 'student'}</td>
                    <td>{user.fitnessLevel || 'beginner'}</td>
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

export default Users;
