import React from 'react';

export default function LinkMesh({ position, args, link, onFront }) {
  function onLinkClick(e, link) {
    if (onFront) {
      e.stopPropagation();
      window.open(link, '_blank');
    }
  }
  return (
    <mesh
      position={[position.x, position.y, position.z]}
      onClick={(e) => onLinkClick(e, link)}
      onPointerOver={(e) => {
        if (onFront) document.getElementById('canvas').style.cursor = 'pointer';
      }}
      onPointerLeave={(e) => {
        document.getElementById('canvas').style.cursor = 'grab';
      }}>
      <boxGeometry args={[args.x, args.y, args.z]} />
      <meshPhongMaterial color="#ff0000" opacity={0} transparent />
    </mesh>
  );
}
