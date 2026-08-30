'use client';

import { useState } from 'react';
import styles from './climate.module.css';

const solutions = [
  { id: 'renewable', name: 'Renewable Energy', icon: '♻️', desc: 'Clean power' },
  { id: 'forest', name: 'Reforestation', icon: '🌲', desc: 'Carbon sinks' },
  { id: 'transport', name: 'Green Transport', icon: '🚲', desc: 'Low emission' },
  { id: 'tech', name: 'Green Technology', icon: '🔬', desc: 'Innovations' },
];

const challenges = [
  { id: 'heat', name: 'Rising Heat', icon: '🔥', problem: 'Temperature rise' },
  { id: 'flood', name: 'Flooding', icon: '🌊', problem: 'Water overflow' },
  { id: 'drought', name: 'Drought', icon: '🏜️', problem: 'Water shortage' },
  { id: 'storm', name: 'Extreme Weather', icon: '⛈️', problem: 'Severe storms' },
];

export default function Climate() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (Object.keys(assignments).length === challenges.length) {
      setMessage({
        text: '🌍 Perfect! Climate action achieved! SDG 13 Complete!',
        type: 'success',
      });
    } else {
      setMessage({
        text: `⚠️ ${challenges.length - Object.keys(assignments).length} challenge(s) need solutions!`,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.climateContainer}>
      <h1 className={styles.title}>🌍 Climate Action Challenge - SDG 13</h1>
      <div className={styles.grid}>
        <div className={styles.solutionList}>
          <h2>Climate Solutions</h2>
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className={styles.solutionItem}
              draggable
              onDragStart={() => setDragging(solution.id)}
            >
              <div className={styles.icon}>{solution.icon}</div>
              <div>
                <h4>{solution.name}</h4>
                <p>{solution.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.challengeGrid}>
          <h2>Global Challenges</h2>
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={styles.challengeSlot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) setAssignments((prev) => ({ ...prev, [challenge.id]: dragging }));
              }}
            >
              <div className={styles.challengeIcon}>{challenge.icon}</div>
              <h3>{challenge.name}</h3>
              <p>{challenge.problem}</p>
              {assignments[challenge.id] && (
                <div className={styles.assigned}>
                  {solutions.find((s) => s.id === assignments[challenge.id])?.icon}{' '}
                  {solutions.find((s) => s.id === assignments[challenge.id])?.name}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className={styles.submitBtn} onClick={handleSubmit}>
        Check Solution
      </button>

      {message && <div className={`${styles.message} ${styles[message.type]}`}>{message.text}</div>}
    </div>
  );
}
