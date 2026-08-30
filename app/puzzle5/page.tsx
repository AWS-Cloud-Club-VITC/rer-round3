'use client';

import { useState } from 'react';
import styles from './education.module.css';

const resources = [
  { id: 'books', name: 'Books', icon: '📚', desc: 'Learning materials' },
  { id: 'tech', name: 'Technology', icon: '💻', desc: 'Digital tools' },
  { id: 'teachers', name: 'Teachers', icon: '👨‍🏫', desc: 'Educators' },
  { id: 'meals', name: 'Meals', icon: '🍎', desc: 'Nutrition support' },
];

const schools = [
  { id: 'urban', name: 'Urban School', icon: '🏫', level: 'High resource' },
  { id: 'rural', name: 'Rural School', icon: '🏠', level: 'Low resource' },
  { id: 'special', name: 'Special Needs', icon: '♿', level: 'Adaptive' },
  { id: 'refugee', name: 'Refugee Camp', icon: '⛺', level: 'Emergency' },
];

export default function Education() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (Object.keys(assignments).length === schools.length) {
      setMessage({
        text: '📚 Perfect! Quality education for all! SDG 4 Achieved!',
        type: 'success',
      });
    } else {
      setMessage({
        text: `⚠️ ${schools.length - Object.keys(assignments).length} school(s) still need resources!`,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.eduContainer}>
      <h1 className={styles.title}>📚 Education Grid Challenge - SDG 4</h1>
      <div className={styles.grid}>
        <div className={styles.resourceList}>
          <h2>Educational Resources</h2>
          {resources.map((res) => (
            <div
              key={res.id}
              className={styles.resourceItem}
              draggable
              onDragStart={() => setDragging(res.id)}
            >
              <div className={styles.icon}>{res.icon}</div>
              <div>
                <h4>{res.name}</h4>
                <p>{res.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.schoolGrid}>
          <h2>Schools in Need</h2>
          {schools.map((school) => (
            <div
              key={school.id}
              className={styles.schoolSlot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) setAssignments((prev) => ({ ...prev, [school.id]: dragging }));
              }}
            >
              <div className={styles.schoolIcon}>{school.icon}</div>
              <h3>{school.name}</h3>
              <p>{school.level}</p>
              {assignments[school.id] && (
                <div className={styles.assigned}>
                  {resources.find((r) => r.id === assignments[school.id])?.icon}{' '}
                  {resources.find((r) => r.id === assignments[school.id])?.name}
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
