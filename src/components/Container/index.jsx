import React, { Suspense, useRef, useState } from 'react';
import styles from './container.module.scss';
import MySpotLight from '../SpotLight';
import { Canvas } from '@react-three/fiber';
import { Bounds, PerspectiveCamera, PresentationControls, RoundedBox } from '@react-three/drei';
import { BusinessCard } from '../gltfs/BusinessCard';
import { CardHolder } from '../gltfs/CardHolder';
import WatchButton from '../WatchButton';
import { BackSide } from 'three';

export default function Container() {
  const cameraRef = useRef();
  const canvasRef = useRef();
  let [firstLoad, setFirstLoad] = useState(true);
  const [onFront, setOnFront] = useState(false);
  const [camSettings, setCamSettings] = useState({
    camera: {
      position: [-2, 0.3, 2],
      target: [0, 0, 0],
    },
    controls: {
      polar: [0, 0],
      azimuth: [-Math.PI / 10, Math.PI / 10],
    },
  });
  return (
    <div className={styles.container}>
      <Canvas id="canvas" className="canvas" shadows dpr={[1, 2]} ref={canvasRef}>
        <Suspense fallback={null}>
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={camSettings.camera.position}
            fov={30}
          />
          <PresentationControls
            makeDefault
            snap
            global
            zoom={1}
            speed={2}
            polar={camSettings.controls.polar}
            azimuth={camSettings.controls.azimuth}
            config={{ mass: 0.1, tension: 170, friction: 20 }}>
            <Bounds fit clip observe margin={1.6}>
              <BusinessCard
                firstLoad={firstLoad}
                setFirstLoad={setFirstLoad}
                onFront={onFront}
                setOnFront={setOnFront}
                camSettings={camSettings}
                setCamSettings={setCamSettings}
                canvasRef={canvasRef}
              />
            </Bounds>
            <MySpotLight />
            <CardHolder position={[0, -0.21, -0.02]} />
            <RoundedBox
              args={[5, 10, 6]}
              castShadow
              receiveShadow
              position={[0, 4.74, 0]}
              radius={0.25}
              smoothness={6}>
              <meshPhongMaterial color="#9b2d30" side={BackSide} />
            </RoundedBox>
          </PresentationControls>
        </Suspense>
      </Canvas>
      <footer>
        <WatchButton onFront={onFront} setOnFront={setOnFront} />
      </footer>
    </div>
  );
}
