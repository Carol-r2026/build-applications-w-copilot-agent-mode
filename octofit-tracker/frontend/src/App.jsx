import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (typeof codespaceName === 'string' && codespaceName.trim() !== '') {
    return `https://${codespaceName.trim()}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

function HomePage() {
  return (
    <div className="page-card text-center">
      <p className="eyebrow">Welcome</p>
      <h1>OctoFit Tracker</h1>
      <p className="lead text-muted">
        Track activity, build stronger teams, and compete on the leaderboard.
      </p>
      <div className="row g-3 mt-3 text-start">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Healthy habits</h5>
              <p className="card-text">Log workouts and measure progress across the school year.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Team spirit</h5>
              <p className="card-text">Track group activity and encourage friendly competition.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav ms-auto d-flex flex-row gap-3 flex-wrap">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="alert alert-light border mb-4">
          <strong>API base URL:</strong> {apiBaseUrl}
          <div className="small text-muted mt-1">
            Set VITE_CODESPACE_NAME in .env.local to use a Codespaces endpoint.
          </div>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
