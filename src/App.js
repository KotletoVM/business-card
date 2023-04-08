import './scss/app.scss';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { Bounds, Environment, PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { BusinessCard } from './components/gltfs/BusinessCard';

function App() {
  const cameraRef = useRef();
  const canvasRef = useRef();
  const [camSettings, setCamSettings] = useState({
    camera: {
      position: [-2, 0, 2],
      rotation: [0, -0.8, 0],
    },
    controls: {
      polar: [0, 0],
      azimuth: [-Math.PI / 10, Math.PI / 10],
    },
  });
  return (
    <div className="App">
      <Canvas className="canvas" shadows dpr={[1, 2]} ref={canvasRef}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            position={camSettings.camera.position}
            fov={30}
            rotation={camSettings.camera.rotation}
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
            <Bounds fit clip observe margin={0.14}>
              <BusinessCard
                camSettings={camSettings}
                setCamSettings={setCamSettings}
                canvasRef={canvasRef}
              />
            </Bounds>
          </PresentationControls>
        </Suspense>
      </Canvas>
      <footer>
        <button>Взять контакты</button>
        <button>Дать контакты</button>
      </footer>
    </div>
  );
}

export default App;
