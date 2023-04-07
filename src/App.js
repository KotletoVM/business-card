import './scss/app.scss';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, PresentationControls } from '@react-three/drei';
import { BusinessCard } from './components/gltfs/BusinessCard';
function App() {
  return (
    <div className="App">
      <Canvas camera={{ position: [0, -0.2, 1.4], fov: 30 }}>
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <PresentationControls
            snap
            global
            zoom={0.9}
            speed={2}
            polar={[-Math.PI / 5, Math.PI / 4]}
            azimuth={[-Math.PI / 5, Math.PI / 5]}
            config={{ mass: 0.1, tension: 170, friction: 20 }}>
            <BusinessCard />
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
