'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const puzzles = [
    {
      id: 1,
      title: 'Energy Connection',
      icon: '⚡',
      sdg: 'SDG 7',
      description:
        'Connect renewable energy sources to power buildings. Learn how solar, wind, hydro, and biomass work together for sustainable energy.',
      path: '/puzzle2',
    },
    {
      id: 2,
      title: 'Water Distribution',
      icon: '💧',
      sdg: 'SDG 6',
      description:
        'Distribute clean water to communities. Solve the puzzle to ensure access to clean water and sanitation for all.',
      path: '/puzzle3',
    },
    {
      id: 3,
      title: 'Food Security',
      icon: '🌾',
      sdg: 'SDG 2',
      description:
        'Match crops with suitable regions and seasons. Create a sustainable food supply chain that ends world hunger.',
      path: '/puzzle4',
    },
    {
      id: 4,
      title: 'Education Grid',
      icon: '📚',
      sdg: 'SDG 4',
      description:
        'Connect schools with resources and students. Build an educational network that ensures quality education for all.',
      path: '/puzzle5',
    },
    {
      id: 5,
      title: 'Health Network',
      icon: '🏥',
      sdg: 'SDG 3',
      description:
        'Connect patients with healthcare facilities. Create a sustainable health system that reaches every person.',
      path: '/puzzle6',
    },
    {
      id: 6,
      title: 'Climate Action',
      icon: '🌍',
      sdg: 'SDG 13',
      description:
        'Match solutions to climate challenges. Work together to combat climate change and its impacts.',
      path: '/puzzle7',
    },
  ];

  return (
    <div className={styles.landingContainer}>
      {/* Animated background orbs */}
      <div className={styles.bgOrb + ' ' + styles.orb1}></div>
      <div className={styles.bgOrb + ' ' + styles.orb2}></div>
      <div className={styles.bgOrb + ' ' + styles.orb3}></div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>SDG Puzzle Challenge</h1>
          <p className={styles.heroSubtitle}>
            Explore interactive puzzles designed to teach you about the Sustainable Development Goals. Connect, learn, and make a difference!
          </p>
        </div>

        {/* Puzzles Grid */}
        <div className={styles.puzzlesGrid}>
          {puzzles.map((puzzle, index) => (
            <div key={puzzle.id} className={styles.puzzleCard} style={{ '--index': index } as React.CSSProperties}>
              <div className={styles.sdgBadge}>{puzzle.sdg}</div>
              <div className={styles.puzzleIcon}>{puzzle.icon}</div>
              <h3 className={styles.puzzleTitle}>{puzzle.title}</h3>
              <p className={styles.puzzleDescription}>{puzzle.description}</p>
              <Link href={puzzle.path} className={styles.playButton}>
                Play Now →
              </Link>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>6</div>
            <div className={styles.statLabel}>Interactive Puzzles</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>17</div>
            <div className={styles.statLabel}>SDG Goals</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Impact Potential</div>
          </div>
        </div>
      </div>
    </div>
  );
}
