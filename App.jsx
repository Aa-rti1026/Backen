import React, { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skill, setSkill] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    fetch(`${API}/profile`)
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
    fetch(`${API}/projects`)
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => {});
  }, []);

  const searchSkill = async () => {
    const url = skill ? `${API}/projects?skill=${encodeURIComponent(skill)}` : `${API}/projects`;
    const res = await fetch(url);
    const data = await res.json();
    setProjects(data);
  };

  const searchAll = async () => {
    const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    if (data.profile) setProfile(data.profile);
    setProjects(data.projects);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>Portfolio</h1>
      <div style={{ display: 'flex', gap: 20 }}>
        {/* Profile section */}
        <div style={{ flex: 1 }}>
          <h2>Profile</h2>
          {profile ? (
            <div>
              <p>
                <strong>{profile.name}</strong> — {profile.email}
              </p>
              <p>{profile.education}</p>
              <p>Skills: {profile.skills ? profile.skills.join(', ') : '—'}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <h3>Search Profile & Projects</h3>
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button onClick={searchAll}>Search</button>
        </div>

        {/* Projects section */}
        <div style={{ flex: 2 }}>
          <h2>Projects</h2>
          <div style={{ marginBottom: 8 }}>
            <input
              placeholder="Skill (e.g. Python)"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
            <button onClick={searchSkill}>Filter</button>
            <button
              onClick={() => {
                setSkill('');
                fetch(`${API}/projects`)
                  .then((r) => r.json())
                  .then(setProjects);
              }}
            >
              Clear
            </button>
          </div>
          <ul>
            {projects.map((p) => (
              <li key={p.id}>
                <strong>{p.title}</strong> — {p.description}
                <br />
                Skills: {(p.skills || []).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
