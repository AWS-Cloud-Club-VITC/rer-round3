'use client';

import { useState } from 'react';
import styles from './health.module.css';

const treatments = [
  { id: 'vaccine', name: 'Vaccines', icon: '💉', desc: 'Disease prevention' },
  { id: 'medicine', name: 'Medicine', icon: '💊', desc: 'Treatment drugs' },
  { id: 'beds', name: 'Hospital Beds', icon: '🛏️', desc: 'Care facilities' },
  { id: 'staff', name: 'Healthcare Staff', icon: '👨‍⚕️', desc: 'Medical professionals' },
];

const patients = [
  { id: 'children', name: 'Children', icon: '👶', need: 'Immunization' },
  { id: 'elderly', name: 'Elderly', icon: '👴', need: 'Chronic care' },
  { id: 'mother', name: 'Mothers', icon: '👩‍🍼', need: 'Prenatal care' },
  { id: 'emergency', name: 'Emergency', icon: '🚑', need: 'Critical care' },
];

export default function Health() {
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [dragging, setDragging] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = () => {
    if (Object.keys(assignments).length === patients.length) {
      setMessage({
        text: '🏥 Excellent! Universal health coverage achieved! SDG 3 Complete!',
        type: 'success',
      });
    } else {
      setMessage({
        text: `⚠️ ${patients.length - Object.keys(assignments).length} group(s) need healthcare!`,
        type: 'error',
      });
    }
  };

  return (
    <div className={styles.healthContainer}>
      <h1 className={styles.title}>🏥 Health Network Challenge - SDG 3</h1>
      <div className={styles.grid}>
        <div className={styles.treatmentList}>
          <h2>Healthcare Resources</h2>
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className={styles.treatmentItem}
              draggable
              onDragStart={() => setDragging(treatment.id)}
            >
              <div className={styles.icon}>{treatment.icon}</div>
              <div>
                <h4>{treatment.name}</h4>
                <p>{treatment.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.patientGrid}>
          <h2>Groups in Need</h2>
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={styles.patientSlot}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) setAssignments((prev) => ({ ...prev, [patient.id]: dragging }));
              }}
            >
              <div className={styles.patientIcon}>{patient.icon}</div>
              <h3>{patient.name}</h3>
              <p>{patient.need}</p>
              {assignments[patient.id] && (
                <div className={styles.assigned}>
                  {treatments.find((t) => t.id === assignments[patient.id])?.icon}{' '}
                  {treatments.find((t) => t.id === assignments[patient.id])?.name}
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
