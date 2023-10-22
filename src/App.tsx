import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, useGLTF, Center, SoftShadows } from "@react-three/drei";
import { useControls } from "leva";
import { AreaLightingControls } from "./AreaLightingControl";

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
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const { 
    lighting,
    isBackground,
    background
  } = useControls({ 
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
    },
    isBackground: true,
    background: "#100e0e",
  });

  return (
    <>
      <Center>
        <group>
          <primitive object={scene} />
        </group>
      </Center>
      <color attach="background" args={[
        isBackground ? background : "transparent"
      ]} />
      <fog attach="fog" args={['black', 0, 20]} />
      <SoftShadows samples={3} />
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
    helper: false
  });

  return (
    <>
      {/** FillLight */}
      <AreaLightingControls
        name="FillLight"
        lightColor="#ffffff"
        lightIntensity={0.3}
        lightPos={[0.2, 0.92, 3.25]}
        lightRot={[-0.39, 0.07, -1.2]}
        lightWH={[2.6, 2.6]}
        helper={helper}
      />

      {/** KeyKick */}
      <AreaLightingControls
        name="KeyKick"
        lightColor="#ffffff"
        lightIntensity={12}
        lightPos={[0.62, 1.02, -0.53]}
        lightRot={[1.11, -3.97, -1.35]}
        lightWH={[0.8, 0.8]}
        helper={helper}
      />

      {/** RimLight */}
      <AreaLightingControls
        name="RimLight"
        lightColor="#ffffff"
        lightIntensity={4.9}
        lightPos={[-1.39, 1.13, -0.55]}
        lightRot={[-0.6, -1.9, 1.0]}
        lightWH={[0.6, 0.6]}
        helper={helper}
      />
    </>
  )
}

export default App