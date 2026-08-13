import { useEffect, useMemo, useState } from 'react';
import { buildApiUrl } from '../config/api';

const extractActivities = (payload) => {
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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = useMemo(() => buildApiUrl('/api/activities/'), []);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(extractActivities(payload));
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities');
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [apiUrl]);

  return (
    <div className="page-card">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p className="eyebrow">Tracking</p>
          <h2>Activities</h2>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No activities found.
                  </td>
                </tr>
              ) : (
                activities.map((activity) => (
                  <tr key={activity._id || activity.id || activity.type}>
                    <td>{activity.type || '—'}</td>
                    <td>{activity.duration ? `${activity.duration} min` : '—'}</td>
                    <td>{activity.distance ? `${activity.distance} km` : '—'}</td>
                    <td>{activity.calories || '—'}</td>
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

export default Activities;
