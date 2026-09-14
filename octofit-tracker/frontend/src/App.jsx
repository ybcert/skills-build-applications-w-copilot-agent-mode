import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container py-3">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="brand-mark">O</div>
              <div>
                <h1 className="h3 mb-0">Octofit Tracker</h1>
                <small className="text-white-50">Multi-tier fitness dashboard</small>
              </div>
            </div>

            <nav className="nav nav-pills align-items-center">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="app-content">
        <div className="container">
          <div className="alert alert-info" role="status">
            {codespaceName
              ? `Using the GitHub Codespaces API endpoint: ${apiBaseUrl}`
              : 'VITE_CODESPACE_NAME is not set; falling back to http://localhost:8000 for local development.'}
          </div>

          <div className="dashboard-grid">
            <div className="card stat-card">
              <div className="card-body">
                <div className="text-muted">Users</div>
                <div className="display-6 fw-bold">Live</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="card-body">
                <div className="text-muted">Teams</div>
                <div className="display-6 fw-bold">Live</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="card-body">
                <div className="text-muted">Activities</div>
                <div className="display-6 fw-bold">Live</div>
              </div>
            </div>
            <div className="card stat-card">
              <div className="card-body">
                <div className="text-muted">Workouts</div>
                <div className="display-6 fw-bold">Live</div>
              </div>
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;