import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, useGLTF, Center, SoftShadows } from "@react-three/drei";
import { useControls } from "leva";
import { Basic } from "./Lightings/Basic";
import { WhoAreYou } from "./Lightings/WhoAreYou";
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
      {lighting === "Basic" && <Basic />}
      {lighting === "WhoAreYou" && <WhoAreYou />}
    </>
  )
}

export default App