import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport, useGLTF, Center, useHelper, PivotControls } from "@react-three/drei";
import { DoubleSide, Euler, RectAreaLight, Vector3 } from "three";
import { RectAreaLightHelper } from "three-stdlib";
import { useControls } from "leva";

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
    helper,
    fillLightPosition,
    fillLightRotation,
    fillLightWidthHeight,
    fillColor,
    keyKickPosition,
    keyKickRotation,
    keyKickWidthHeight,
    keyKickColor,
    rimLightPosition,
    rimLightRotation,
    rimLightWidthHeight,
    rimLightColor,
  } = useControls({
    helper: false,
    fillColor: "#ffffff",
    fillLightPosition: {
      x: 0.2,
      y: 1.5,
      z: 1.6
    },
    fillLightRotation: {
      x: -0.39,
      y: 0.07,
      z: -1.2
    },
    fillLightWidthHeight: {
      x: 3,
      y: 3
    },
    keyKickPosition: {
      x: 0.62,
      y: 1.02,
      z: -0.6
    },
    keyKickRotation: {
      x: 0.31,
      y: -3.67,
      z: -1.2
    },
    keyKickWidthHeight: {
      x: 1,
      y: 1
    },
    keyKickColor: "#ffffff",
    rimLightPosition: {
      x: 0.2,
      y: 1.5,
      z: 1.6
    },
    rimLightRotation: {
      x: -0.39,
      y: 0.07,
      z: -1.2
    },
    rimLightWidthHeight: {
      x: 3,
      y: 3
    },
    rimLightColor: "#ffffff",
  });

  const fillLight = useRef<RectAreaLight>(null);
  const pivotFillLight = useRef<any>(null);
  const [selectedFillLight, setSelectedFillLight] = useState<boolean>(false);

  const keyKick = useRef<RectAreaLight>(null);
  const pivotKeyKick = useRef<any>(null);
  const [selectedKeyKick, setSelectedKeyKick] = useState<boolean>(false);

  const rimLight = useRef<RectAreaLight>(null);
  const pivotRimLight = useRef<any>(null);
  const [selectedRimLight, setSelectedRimLight] = useState<boolean>(false);

  // @ts-ignore
  useHelper(helper && fillLight, RectAreaLightHelper, fillColor);
  // @ts-ignore
  useHelper(helper && keyKick, RectAreaLightHelper, keyKickColor);
  // @ts-ignore
  useHelper(helper && rimLight, RectAreaLightHelper, rimLightColor);

  const onDrag = (e: any) => {
    console.log(e);
  }

  return (
    <>
      {/** FillLight */}
      <PivotControls
        ref={pivotFillLight}
        depthTest={false}
        lineWidth={2}
        anchor={[0, 0, 0]}
        onDrag={(e) => onDrag(e)}
        scale={2}
        visible={selectedFillLight}
      >
        <group
          position={[
            fillLightPosition.x,
            fillLightPosition.y,
            fillLightPosition.z
          ]}
          rotation={[
            fillLightRotation.x,
            fillLightRotation.y,
            fillLightRotation.z
          ]}
        >
          <rectAreaLight
            ref={fillLight}
            width={fillLightWidthHeight.x}
            height={fillLightWidthHeight.y}
            intensity={3}
            color={fillColor}
          />
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              setSelectedFillLight(true);
            }}
            onPointerMissed={(e) => {
              if (e.type === "click") {
                setSelectedFillLight(false);
              }
            }}
            visible={false}
          >
            <boxGeometry args={[fillLightWidthHeight.x, fillLightWidthHeight.y, 0.1]} />
            <meshBasicMaterial color={fillColor} side={DoubleSide} wireframe />
          </mesh>
        </group>
      </PivotControls>

      {/** KeyKick */}
      <PivotControls
        ref={pivotKeyKick}
        depthTest={false}
        lineWidth={2}
        anchor={[0, 0, 0]}
        onDrag={(e) => onDrag(e)}
        scale={2}
        visible={selectedKeyKick}
      >
        <group
          position={[
            keyKickPosition.x,
            keyKickPosition.y,
            keyKickPosition.z
          ]}
          rotation={[
            keyKickRotation.x,
            keyKickRotation.y,
            keyKickRotation.z
          ]}
        >
          <rectAreaLight
            ref={keyKick}
            width={keyKickWidthHeight.x}
            height={keyKickWidthHeight.y}
            intensity={3}
            color={keyKickColor}
          />
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              setSelectedKeyKick(true);
            }}
            onPointerMissed={(e) => {
              if (e.type === "click") {
                setSelectedKeyKick(false);
              }
            }}
            visible={false}
          >
            <boxGeometry args={[keyKickWidthHeight.x, keyKickWidthHeight.y, 0.1]} />
            <meshBasicMaterial color={keyKickColor} side={DoubleSide} wireframe />
          </mesh>
        </group>
      </PivotControls>

      {/** RimLight */}
      <PivotControls
        ref={pivotRimLight}
        depthTest={false}
        lineWidth={2}
        anchor={[0, 0, 0]}
        onDrag={(e) => onDrag(e)}
        scale={2}
        visible={selectedRimLight}
      >
        <group
          position={[
            rimLightPosition.x,
            rimLightPosition.y,
            rimLightPosition.z
          ]}
          rotation={[
            rimLightRotation.x,
            rimLightRotation.y,
            rimLightRotation.z
          ]}
        >
          <rectAreaLight
            ref={rimLight}
            width={rimLightWidthHeight.x}
            height={rimLightWidthHeight.y}
            intensity={3}
            color={rimLightColor}
          />
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRimLight(true);
            }}
            onPointerMissed={(e) => {
              if (e.type === "click") {
                setSelectedRimLight(false);
              }
            }}
            visible={false}
          >
            <boxGeometry args={[rimLightWidthHeight.x, rimLightWidthHeight.y, 0.1]} />
            <meshBasicMaterial color={rimLightColor} side={DoubleSide} wireframe />
          </mesh>
        </group>
      </PivotControls>

    </>
  )
}

export default App