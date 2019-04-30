import React from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';

import './styles.css';

function Content({ children }) {
  const start = 100;
  const [props, set] = useSpring(() => ({
    z: [start],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  const trans = z => `translateZ(-${z}px)`;
  return (
    <animated.div
      className={'content'}
      onMouseEnter={() => set({ z: -10 })}
      onMouseLeave={() => set({ z: start })}
      style={{ transform: props.z.interpolate(trans) }}
    >
      {children}
    </animated.div>
  );
}

function App() {
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  const trans = (x, y) => `rotateX(${x}deg) rotateY(${y}deg)`;
  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 64,
    -(x - window.innerWidth / 2) / 128,
    1.1
  ];
  return (
    <animated.div
      className="App"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
      style={{
        transform: props.xy.interpolate(trans),
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="contentHolder">
        <Content>Something</Content>
        <Content>Something</Content>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '25%',
          height: '25%',
          background: 'white'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(120deg, #f6d36500 0%, #fda085 100%)',
          transform: 'translateZ(-1000px) scale(2)'
        }}
      />
    </animated.div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
