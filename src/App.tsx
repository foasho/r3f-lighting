import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, useGLTF, Center, useHelper, PivotControls } from "@react-three/drei";
import { DoubleSide, Euler, RectAreaLight, Vector3 } from "three";
import { RectAreaLightHelper } from "three-stdlib";
import { useControls } from "leva";
import { LightingControls } from "./LightingControl";

function App() {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <Canvas shadows camera={{ fov: 45, position: [0, 0, 3] }}>
        <Scene />
        <OrbitControls
          makeDefault={true}
        />
        <GizmoHelper alignment="top-left" margin={[75, 75]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}

const Scene = () => {

  const { scene } = useGLTF("/Aphrodita.glb") as any;
  const { lighting } = useControls({ 
    lighting: {
      value: "Basic",
      options: [
        "Basic", 
        "Custom",
        "WhoAreYou",
        "Cyberpunk",
        "PhotoStudio",
        "Rembrandt",
        "Gendo",
        "TealOrange",
        "Suspect",
        "Alone",
        "Horror",
      ]
    }
  });

  return (
    <>
      <Center>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      {lighting === "Basic" && <BasicLighting />}
    </>
  )
}

/**
 * BasicLighting
 */
const BasicLighting = () => {

  const {
    helper
  } = useControls({
    helper: true
  });

  return (
    <>
      {/** FillLight */}
      <LightingControls
        name="FillLight"
        lightColor="#ffffff"
        lightIntensity={3}
        lightPos={[0.2, 1.5, 1.6]}
        lightRot={[-0.39, 0.07, -1.2]}
        lightWH={[3, 3]}
        helper={helper}
      />

      {/** KeyKick */}
      <LightingControls
        name="KeyKick"
        lightColor="#ffffff"
        lightIntensity={3}
        lightPos={[0.62, 1.02, -0.6]}
        lightRot={[0.31, -3.67, -1.2]}
        lightWH={[1, 1]}
        helper={helper}
      />

      {/** RimLight */}
      <LightingControls
        name="RimLight"
        lightColor="#ffffff"
        lightIntensity={3}
        lightPos={[-2.2, 1.5, -3.0]}
        lightRot={[-3.04, -0.69, -1.2]}
        lightWH={[2, 2]}
        helper={helper}
      />
    </>
  )
}

export default App