import React from 'react';
import { useGLTF } from '@react-three/drei';

export function CardHolder(props) {
  const { nodes, materials } = useGLTF('/plane-transformed.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane_low_1.geometry}
        material={materials.DefaultMaterial}
        rotation={[0, 0, -Math.PI / 2]}
      />
    </group>
  );
}

useGLTF.preload('/plane-transformed.glb');
