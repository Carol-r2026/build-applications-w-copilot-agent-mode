import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../config/api';

const extractTeams = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  return [];
};

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = useMemo(() => buildApiUrl('/api/teams/'), []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(extractTeams(payload));
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams');
        setTeams([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [apiUrl]);

  return (
    <div className="page-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="eyebrow">Groups</p>
          <h2>Teams</h2>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading teams...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {teams.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-light text-muted">No teams found.</div>
            </div>
          ) : (
            teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id || team.name}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{team.name || 'Untitled Team'}</h5>
                    <p className="card-text text-muted">{team.description || 'No description provided.'}</p>
                    <div className="small text-secondary">
                      Members: {Array.isArray(team.members) ? team.members.length : 0}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Teams;
