'use client';

import { useState } from 'react';
import styles from './water.module.css';

const waterSources = [
  { id: 'rain', name: 'Rainwater Harvesting', icon: '🌧️', desc: 'Collected rainfall for reuse' },
  { id: 'river', name: 'River Supply', icon: '🌊', desc: 'Freshwater network' },
  { id: 'ground', name: 'Groundwater', icon: '💧', desc: 'Well and aquifer access' },
  { id: 'desal', name: 'Desalination', icon: '🏝️', desc: 'Clean sea water treatment' },
];

const communityNeeds = [
  { id: 'school', name: 'School Campus', icon: '🏫', need: 'Safe drinking and sanitation' },
  { id: 'farm', name: 'Agricultural Zone', icon: '🌾', need: 'Irrigation and crop support' },
  { id: 'city', name: 'City District', icon: '🏙️', need: 'Household use and public services' },
  { id: 'clinic', name: 'Health Clinic', icon: '🏥', need: 'Clean water for care' },
];

export default function WaterPuzzle() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (Object.keys(assignments).length === communityNeeds.length) {
      setMessage({
        text: '💧 Excellent! Clean water reaches every community! SDG 6 Complete!',
        type: 'success',
      });
    } else {
      setMessage({
        text: `⚠️ ${communityNeeds.length - Object.keys(assignments).length} area(s) still need a water source!`,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.waterContainer}>
      <h1 className={styles.title}>💧 Water Distribution Challenge - SDG 6</h1>

      <div className={styles.grid}>
        <div className={styles.sourceList}>
          <h2>Available Supplies</h2>
          {waterSources.map((source) => (
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

        <div className={styles.communityGrid}>
          <h2>Community Needs</h2>
          {communityNeeds.map((need) => (
            <div
              key={need.id}
              className={styles.communitySlot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) {
                  setAssignments((prev) => ({ ...prev, [need.id]: dragging }));
                }
              }}
            >
              <div className={styles.communityIcon}>{need.icon}</div>
              <h3>{need.name}</h3>
              <p>{need.need}</p>
              {assignments[need.id] && (
                <div className={styles.assigned}>
                  {waterSources.find((s) => s.id === assignments[need.id])?.icon}{' '}
                  {waterSources.find((s) => s.id === assignments[need.id])?.name}
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
