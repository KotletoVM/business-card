import React from 'react';
import styles from './watchButton.module.scss';

export default function WatchButton({ onFront, setOnFront }) {
  return (
    <button id="button" className={styles.button} onClick={() => setOnFront(!onFront)}>
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 48 48"
        style={{
          enableBackground: 'new 0 0 48 48',
          transform: onFront ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
        space="preserve">
        <path
          className={styles.path1}
          fill="white"
          d="M14.1,43.9L12,41.8l12-12l12,12l-2.1,2.1L24,34L14.1,43.9z"
        />
        <path
          className={styles.path2}
          fill="white"
          d="M14.1,31.1L12,29l12-12l12,12l-2.1,2.1L24,21.2L14.1,31.1z"
        />
        <path
          className={styles.path3}
          fill="white"
          d="M14.1,18.2L12,16.1l12-12l12,12l-2.1,2.1L24,8.3L14.1,18.2z"
        />
      </svg>
      <p>{onFront ? 'вернуться назад' : 'посмотреть визитку'}</p>
    </button>
  );
}
