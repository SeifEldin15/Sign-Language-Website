// components/SignModel.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useAnimations } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Model({ url }) {
  const fbx = useLoader(FBXLoader, url);
  const { actions, names } = useAnimations(fbx.animations, fbx);

  React.useState(() => {
    if (names.length) {
      actions[names[0]].play();
    }
  }, [actions, names]);

  return <primitive object={fbx} scale={0.02} position={[0, -2, 0]} />;
}

const SignModel = ({ modelUrl }) => {
  return (
    <div className="relative h-[150px] w-[150px]">
      <Canvas 
        key={modelUrl}
        camera={{ 
          position: [0, 2, 3],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={null}>
          <Model url={modelUrl}/>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SignModel;