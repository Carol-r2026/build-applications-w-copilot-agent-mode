import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../config/api';

const extractLeaderboard = (payload) => {
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

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
// https://YOUR-CODESPACE-8000.app.github.dev/api/leaderboard
  const apiUrl = useMemo(() => buildApiUrl('/api/leaderboard/'), []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setLeaderboard(extractLeaderboard(payload));
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard');
        setLeaderboard([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [apiUrl]);

  return (
    <div className="page-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="eyebrow">Competition</p>
          <h2>Leaderboard</h2>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Score</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No leaderboard entries yet.
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr key={entry._id || entry.id || `${entry.user}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{entry.user?.username || entry.user || '—'}</td>
                    <td>{entry.score ?? '—'}</td>
                    <td>{entry.team?.name || entry.team || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
