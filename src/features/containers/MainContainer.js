import React from 'react';
import styles from './MainContainer.module.css'
import Board from '../board/Board';

const MainContainer = () => {
  return (
    <div className={styles.container}>
      <Board />
    </div>
  );
};

export default MainContainer;