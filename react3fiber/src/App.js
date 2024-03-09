import { Canvas, useFrame } from '@react-three/fiber'
import './style.css'
import { useRef, useState } from 'react';

function App() {
  const [rotation, setRotation] = useState([0, 0, 0]); // Initial rotation values

  function Cube() {
    const cubeRef = useRef();

    useFrame(() => {
      if (!cubeRef.current) return;

      // Update rotation values
      setRotation([
        rotation[0] + 0.005, // Increment rotation around x-axis
        rotation[1] + 0.00, // Increment rotation around y-axis
        rotation[2] + 0.005, // Increment rotation around z-axis
      ]);
    });

    return (
      <mesh ref={cubeRef} scale={2} position={[0, 0, 0]} rotation={rotation}>
        <boxGeometry />
        <meshStandardMaterial color={'cyan'} />
      </mesh>
    )
  }

  return (
    <>
    <Canvas camera={{ fov: 50, near: 0.1, far: 1000 }}>
      <ambientLight intensity={1} />
      <pointLight position={[2, 2, 2]} intensity={6} />
      <Cube />
    </Canvas>
    </>
  );
}

export default App;
