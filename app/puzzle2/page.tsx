'use client';

import { useState } from 'react';
import styles from './energy.module.css';

const sources = [
  { id: 'solar', name: 'Solar Panels', icon: '☀️', desc: 'Clean daytime power' },
  { id: 'wind', name: 'Wind Turbines', icon: '💨', desc: 'Renewable wind energy' },
  { id: 'hydro', name: 'Hydropower', icon: '💧', desc: 'River-based power' },
  { id: 'geo', name: 'Geothermal', icon: '🌋', desc: 'Heat from the earth' },
];

const demandPoints = [
  { id: 'homes', name: 'Residential Homes', icon: '🏠', need: 'Daily household power' },
  { id: 'school', name: 'School District', icon: '🏫', need: 'Lighting and learning' },
  { id: 'hospital', name: 'Medical Center', icon: '🏥', need: 'Critical care systems' },
  { id: 'farm', name: 'Farming Grid', icon: '🌾', need: 'Irrigation and storage' },
];

export default function EnergyPuzzle() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (Object.keys(assignments).length === demandPoints.length) {
      setMessage({
        text: '⚡ Excellent! Energy access is balanced and sustainable! SDG 7 Complete!',
        type: 'success',
      });
    } else {
      setMessage({
        text: `⚠️ ${demandPoints.length - Object.keys(assignments).length} connection(s) still need power sources!`,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.energyContainer}>
      <h1 className={styles.title}>⚡ Energy Connection Challenge - SDG 7</h1>

      <div className={styles.grid}>
        <div className={styles.sourceList}>
          <h2>Renewable Sources</h2>
          {sources.map((source) => (
            <div
              key={source.id}
              className={styles.sourceItem}
              draggable
              onDragStart={() => setDragging(source.id)}
              onDragEnd={() => setDragging(null)}
            >
              <div className={styles.icon}>{source.icon}</div>
              <div>
                <h4>{source.name}</h4>
                <p>{source.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.demandGrid}>
          <h2>Power Demand</h2>
          {demandPoints.map((point) => (
            <div
              key={point.id}
              className={styles.demandSlot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) {
                  setAssignments((prev) => ({ ...prev, [point.id]: dragging }));
                }
              }}
            >
              <div className={styles.demandIcon}>{point.icon}</div>
              <h3>{point.name}</h3>
              <p>{point.need}</p>
              {assignments[point.id] && (
                <div className={styles.assigned}>
                  {sources.find((s) => s.id === assignments[point.id])?.icon}{' '}
                  {sources.find((s) => s.id === assignments[point.id])?.name}
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
