import React, { useEffect } from 'react';
import { useBounds, useGLTF } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import LinkMesh from '../LinkMesh';
export function BusinessCard({ firstLoad, setFirstLoad, onFront, setOnFront }) {
  const { nodes, materials } = useGLTF('/vizitka_remastered.glb');
  const bounds = useBounds();
  const coef = window.innerWidth < window.innerHeight*0.75 ? 1.5 : 3;
  let positionY =  window.innerWidth < 550 && window.innerWidth < window.innerHeight ? (550 - window.innerWidth)/100 : 0; 
  useEffect(()=>{
    bounds.to({ position: [-2, 0.3, 2 + positionY], target: [0, 0, 0] });
  }, [])

  const [cardSpring, cardApi] = useSpring(
    () => ({
      'rotation-y': 0,
      'position-y': 0.016,
      'rotation-x': -0.1,
      'position-z': -0.02,
      config: { friction: 50 },
    }),
    [],
  );

  function onFrontFromButton() {
    console.log('onFront');
    if (!firstLoad) {
      if (onFront) {
        bounds.to({ position: [0, 0.25, 1.2  + positionY], target: [0, 0.25, 0] });
        cardApi.start({
          'position-y': 0.25,
          'rotation-x': 0,
          'position-z': 0,
        });
      } else {
        bounds.to({ position: [-2, 0.3, 2  + positionY], target: [0, 0, 0] });
        cardApi.start({
          'position-y': 0.016,
          'rotation-x': -0.1,
          'position-z': -0.02,
        });
      }
    }
    setFirstLoad(false);
  }
  // eslint-disable-next-line
  useEffect(onFrontFromButton, [onFront]);

  function onMeshClick(e) {
    /*setCamSettings({
      ...camSettings,
      controls: { ...camSettings.controls, polar: [-Math.PI / 10, Math.PI / 10] },
    });*/
    e.stopPropagation();
    if (onFront) {
      cardApi.start({
        'rotation-y': cardSpring['rotation-y'].animation.to ? 0 : Math.PI,
      });
    } else if (e.delta <= 2) {
      setOnFront(true);
    }
  }

  return (
    <a.group dispose={null} {...cardSpring} position={[0, 0.018, 0]}>
      <mesh
        onClick={(e) => onMeshClick(e)}
        geometry={nodes.Cube_low_1.geometry}
        material={materials.DefaultMaterial}
        castShadow
        receiveShadow
      />
      <LinkMesh
        position={{ x: -0.315, y: -0.21, z: 0.01 }}
        args={{ x: 0.18, y: 0.04, z: 0.01 }}
        link="tel:+79219260207"
        onFront={onFront}
      />
      <LinkMesh
        position={{ x: 0.27, y: -0.21, z: 0.01 }}
        args={{ x: 0.28, y: 0.04, z: 0.01 }}
        link="mailto:vash.lavashik@gmail.com"
        onFront={onFront}
      />
      <LinkMesh
        position={{ x: 0.21, y: -0.21, z: -0.01 }}
        args={{ x: 0.38, y: 0.04, z: 0.01 }}
        link="https://github.com/KotletoVM"
        onFront={onFront}
      />
      <LinkMesh
        position={{ x: -0.25, y: -0.21, z: -0.01 }}
        args={{ x: 0.3, y: 0.04, z: 0.01 }}
        link="https://t.me/kotlet_spb"
        onFront={onFront}
      />
    </a.group>
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
