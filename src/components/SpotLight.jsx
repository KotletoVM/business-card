import { SpotLight } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';

export default function MySpotLight({ vec = new Vector3() }) {
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
        position={[1.5, 1, 1.4]}
        castShadow
        penumbra={0.3}
        distance={8}
        angle={0.2}
        attenuation={2.2}
        anglePower={5}
        intensity={0.6}
      />
      <SpotLight
        color={'#f7d683'}
        ref={light1}
        position={[-1.5, 1, -1.4]}
        castShadow
        penumbra={0.1}
        distance={6}
        angle={0.23}
        attenuation={2}
        anglePower={10}
        intensity={0.3}
      />
      <SpotLight
        color={'#ffffff'}
        position={[-0.4, 1.5, 1.5]}
        castShadow
        penumbra={0.4}
        distance={6}
        angle={0.4}
        attenuation={1.6}
        anglePower={10}
        intensity={0.7}
      />
      <SpotLight
        color={'#f7d683'}
        position={[0, 1.5, 0]}
        castShadow
        penumbra={0.4}
        distance={6}
        angle={1.5}
        attenuation={0.4}
        anglePower={10}
        intensity={0.7}
      />
    </>
  );
}
