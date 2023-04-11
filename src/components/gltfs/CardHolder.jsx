import React from 'react';
import { useGLTF } from '@react-three/drei';
import cardHolder from '../../assets/plane-transformed.glb';
export function CardHolder(props) {
  const { nodes, materials } = useGLTF(cardHolder);
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
