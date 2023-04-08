import React, { useState } from 'react';
import { useBounds, useGLTF } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
export function BusinessCard({ camSettings, setCamSettings, canvasRef }) {
  const [onFront, setOnFront] = useState(false);
  const { nodes, materials } = useGLTF('/vizitka_remastered.glb');
  const bounds = useBounds();
  const [cardSpring, cardApi] = useSpring(
    () => ({ 'rotation-y': 0, config: { friction: 50 } }),
    [],
  );

  function onMeshClick(e) {
    /*setCamSettings({
      ...camSettings,
      controls: { ...camSettings.controls, polar: [-Math.PI / 10, Math.PI / 10] },
    });*/
    e.stopPropagation();
    if (onFront) {
      console.log(cardSpring['rotation-y'].animation.to);
      cardApi.start({ 'rotation-y': cardSpring['rotation-y'].animation.to ? 0 : Math.PI });
    } else {
      e.delta <= 2 && bounds.to({ position: [0, 0, 1.2], target: [0, 0, 0] });
      setOnFront(!onFront);
    }
  }

  function onLinkClick(e, link) {
    if (onFront) {
      e.stopPropagation();
      window.open(link, '_blank');
    }
  }

  return (
    <>
      <a.group dispose={null} {...cardSpring}>
        <mesh
          onClick={(e) => onMeshClick(e)}
          geometry={nodes.Cube_low_1.geometry}
          material={materials.DefaultMaterial}
          castShadow
        />
        <mesh position={[-0.315, -0.21, 0.01]} onClick={(e) => onLinkClick(e, 'tel:89219260207')}>
          <boxGeometry args={[0.18, 0.04, 0.01]} />
          <meshPhongMaterial color="#ff0000" opacity={0} transparent />
        </mesh>
        <mesh
          position={[0.27, -0.21, 0.01]}
          onClick={(e) => onLinkClick(e, 'mailto:vash.lavashik@gmail.com')}>
          <boxGeometry args={[0.28, 0.04, 0.01]} />
          <meshPhongMaterial color="#00ff00" opacity={0} transparent />
        </mesh>
        <mesh
          position={[0.21, -0.21, -0.01]}
          onClick={(e) => onLinkClick(e, 'https://github.com/KotletoVM')}>
          <boxGeometry args={[0.38, 0.04, 0.01]} />
          <meshPhongMaterial color="#00ff00" opacity={0} transparent />
        </mesh>
        <mesh
          position={[-0.25, -0.21, -0.01]}
          onClick={(e) => onLinkClick(e, 'https://t.me/kotlet_spb')}>
          <boxGeometry args={[0.3, 0.04, 0.01]} />
          <meshPhongMaterial color="#ff0000" opacity={0} transparent />
        </mesh>
      </a.group>
    </>
  );
}

useGLTF.preload('/vizitka_remastered.glb');

/*
<AccumulativeShadows
        receiveShadow
        position={[0, -0.25, 0]}
        frames={20}
        color="#5e1c20"
        colorBlend={2}
        toneMapped={true}
        alphaTest={0.9}
        opacity={2}>
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.7}
          intensity={1}
          position={[3, 5, 15]}
          bias={0.001}
        />
        <RandomizedLight
          amount={3}
          radius={6}
          ambient={1}
          intensity={0.1}
          position={[5, 5, -10]}
          bias={0.001}
        />
      </AccumulativeShadows>
*/
