'use client';

import { useState } from 'react';
import styles from './food.module.css';

const crops = [
  { id: 'wheat', name: 'Wheat', icon: '🌾', desc: 'Staple grain crop' },
  { id: 'rice', name: 'Rice', icon: '🍚', desc: 'Tropical grain' },
  { id: 'tomato', name: 'Tomatoes', icon: '🍅', desc: 'Nutrient-rich vegetable' },
  { id: 'fish', name: 'Fish Farms', icon: '🐟', desc: 'Protein source' },
];

const regions = [
  { id: 'tropical', name: 'Tropical Zone', icon: '☀️', climate: 'Hot & Humid' },
  { id: 'temperate', name: 'Temperate Zone', icon: '🌤️', climate: 'Mild Seasons' },
  { id: 'arid', name: 'Arid Region', icon: '🏜️', climate: 'Dry Climate' },
  { id: 'aquatic', name: 'Coastal Area', icon: '🌊', climate: 'Water-based' },
];

export default function Food() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (Object.keys(assignments).length === regions.length) {
      setMessage({
        text: '🌾 Excellent! Food security achieved for all regions! SDG 2 Complete!',
        type: 'success',
      });
    } else {
      setMessage({
        text: `⚠️ ${regions.length - Object.keys(assignments).length} region(s) still need crops!`,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.foodContainer}>
      <h1 className={styles.title}>🌾 Food Security Puzzle - SDG 2</h1>
      <div className={styles.grid}>
        <div className={styles.cropList}>
          <h2>Available Crops</h2>
          {crops.map((crop) => (
            <div
              key={crop.id}
              className={styles.cropItem}
              draggable
              onDragStart={() => setDragging(crop.id)}
              onDragEnd={() => setDragging(null)}
            >
              <div className={styles.icon}>{crop.icon}</div>
              <div>
                <h4>{crop.name}</h4>
                <p>{crop.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.regionGrid}>
          <h2>Regions to Feed</h2>
          {regions.map((region) => (
            <div
              key={region.id}
              className={styles.regionSlot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) setAssignments((prev) => ({ ...prev, [region.id]: dragging }));
              }}
            >
              <div className={styles.regionIcon}>{region.icon}</div>
              <h3>{region.name}</h3>
              <p>{region.climate}</p>
              {assignments[region.id] && (
                <div className={styles.assigned}>
                  {crops.find((c) => c.id === assignments[region.id])?.icon}{' '}
                  {crops.find((c) => c.id === assignments[region.id])?.name}
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
