// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api/api';

export default function Dashboard() {
  const { id } = useParams();
  const [queue, setQueue] = useState({
    size: 0,
    estimatedWait: 0,
    avgServiceTime: 0,
    entries: [],
  });

  // Load stats when page loads
  useEffect(() => {
    api.getOrgStats(id).then(setQueue);
  }, [id]);

  // Start a customer
  const handleStart = async (token) => {
    await api.startService(id, token);
    const stats = await api.getOrgStats(id);
    setQueue(stats);
  };

  // Complete a customer
  const handleComplete = async (token) => {
    await api.completeService(id, token);
    const stats = await api.getOrgStats(id);
    setQueue(stats);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* BACK BUTTON */}
      <Link to="/" className="text-blue-600 mb-4 inline-block">
        ← Back
      </Link>

      <h2 className="text-2xl font-bold mb-2">
        Admin Dashboard — {id}
      </h2>

      {/* TOP 3 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">Current Queue</div>
          <div className="text-2xl font-bold">{queue.size}</div>
        </div>

        <div className="p-4 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">Estimated Wait</div>
          <div className="text-2xl font-bold">{queue.estimatedWait} mins</div>
        </div>

        <div className="p-4 bg-white rounded shadow-sm">
          <div className="text-sm text-gray-500">Avg Service Time</div>
          <div className="text-2xl font-bold">{queue.avgServiceTime} mins</div>
        </div>
      </div>

      {/* ACTIVITY TABLE */}
      <section className="bg-white p-4 rounded shadow-sm">
        <h3 className="font-semibold mb-2">Recent Activity</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Token</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {queue.entries.map((e) => (
              <tr key={e.token} className="border-t">
                <td className="py-2">{e.token}</td>
                <td className="py-2">{e.name}</td>
                <td className="py-2">{e.status}</td>

                <td className="py-2">
                  {e.status !== "in_service" &&
                    e.status !== "completed" && (
                      <button
                        onClick={() => handleStart(e.token)}
                        className="mr-2 px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Start
                      </button>
                    )}

                  {e.status === "in_service" && (
                    <button
                      onClick={() => handleComplete(e.token)}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Complete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
