import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, useGLTF, Center } from "@react-three/drei";

function App() {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <Canvas shadows camera={{ fov: 45, position: [0, 0, 3] }}>
        <Scene />
        <OrbitControls/>
        <GizmoHelper alignment="top-right" margin={[75, 75]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}

const Scene = () => {

  const { scene } = useGLTF("/Aphrodita.glb");

  return (
    <Center>
      <group>
        <primitive object={scene} />
      </group>
    </Center>
  )
}

export default App