import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../config/api';

const extractWorkouts = (payload) => {
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

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = useMemo(() => buildApiUrl('/api/workouts/'), []);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(extractWorkouts(payload));
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workout suggestions');
        setWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [apiUrl]);

  return (
    <div className="page-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="eyebrow">Guidance</p>
          <h2>Workout Suggestions</h2>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row g-3">
          {workouts.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-light text-muted">No workout suggestions available.</div>
            </div>
          ) : (
            workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id || workout.title}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <h5 className="card-title">{workout.title || 'Workout plan'}</h5>
                    <p className="card-text text-muted">{workout.description || 'No description provided.'}</p>
                    <div className="small text-secondary d-flex gap-3 flex-wrap">
                      <span>{workout.duration ? `${workout.duration} min` : '—'}</span>
                      <span>{workout.intensity || '—'}</span>
                      <span>{workout.type || '—'}</span>
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

export default Workouts;
