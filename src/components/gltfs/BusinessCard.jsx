import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
export function BusinessCard(props) {
  const { nodes, materials } = useGLTF('/vizitka_remastered.glb');
  return (
    <group {...props} dispose={null}>
      <a.mesh
        geometry={nodes.Cube_low_1.geometry}
        material={materials.DefaultMaterial}
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/vizitka_remastered.glb');
