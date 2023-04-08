import './scss/app.scss';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import {
  Bounds,
  PerspectiveCamera,
  PresentationControls,
  RoundedBox,
  SpotLight,
  useDepthBuffer,
} from '@react-three/drei';
import { BusinessCard } from './components/gltfs/BusinessCard';
import { BackSide, Vector3 } from 'three';

function MySpotLight({ vec = new Vector3() }) {
  const depthBuffer = useDepthBuffer({ frames: 5 });
  const light = useRef();
  const light1 = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set((state.mouse.x * viewport.width) / 7, (state.mouse.y * viewport.height) / 6, 0),
      0.1,
    );
    light.current.target.updateMatrixWorld();
    light1.current.target.position.lerp(
      vec.set((state.mouse.x * viewport.width) / 6, (state.mouse.y * viewport.height) / 7, 0),
      0.1,
    );
    light1.current.target.updateMatrixWorld();
  });
  return (
    <>
      <SpotLight
        color={'#fae7b5'}
        ref={light}
        depthBuffer={depthBuffer}
        position={[1.5, 1, 1.4]}
        castShadow
        penumbra={0.3}
        distance={8}
        angle={0.25}
        attenuation={2.2}
        anglePower={5}
        intensity={0.6}
      />
      <SpotLight
        color={'#f7d683'}
        ref={light1}
        depthBuffer={depthBuffer}
        position={[-1.5, 1, -1.4]}
        castShadow
        penumbra={0.1}
        distance={6}
        angle={0.3}
        attenuation={2}
        anglePower={10}
        intensity={0.3}
      />
    </>
  );
}

function App() {
  const cameraRef = useRef();
  const canvasRef = useRef();
  const [camSettings, setCamSettings] = useState({
    camera: {
      position: [-2, 0.3, 2],
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
            <Bounds fit clip observe margin={1.6}>
              <BusinessCard
                camSettings={camSettings}
                setCamSettings={setCamSettings}
                canvasRef={canvasRef}
              />
            </Bounds>
            <MySpotLight />
            <ambientLight intensity={0.3} color={'#f7f4d5'} />
            <RoundedBox args={[10, 10, 10]} castShadow receiveShadow position={[0, 4.74, 0]}>
              <meshPhongMaterial color="#5e1c20" side={BackSide} />
            </RoundedBox>
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
