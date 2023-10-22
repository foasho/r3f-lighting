import { useControls } from "leva";
import { RectAreaLight, DoubleSide, Vector2, Vector3, Euler, Matrix4 } from "three";
import { useRef, useState } from "react";
import { PivotControls } from "@react-three/drei";
import { toEuler, toVector2, toVector3 } from "../../utils/ThreeCommons";

type AreaLightingControlsProps = {
  name: string;
  helper: boolean;
  lightColor: string;
  lightPos: Vector3 | [number, number, number];
  lightRot: Euler| [number, number, number];
  lightIntensity: number;
  lightWH: Vector2 | [number, number];
}
export const AreaLightingControls = (
  { 
    name, 
    helper,
    lightColor,
    lightPos,
    lightRot,
    lightIntensity,
    lightWH,
  }: AreaLightingControlsProps
) => {

  const _lp = toVector3(lightPos);
  const _lr = toEuler(lightRot);
  const _wh = toVector2(lightWH);

  const {
    color,
    intensity,
    lightPosition,
    lightRotation,
    lightWidthHeight,
    visible
  } = useControls(name, {
    color: lightColor,
    intensity: {
      value: lightIntensity,
      min: 0,
      max: 30,
      step: 0.1
    },
    lightPosition: {
      x: _lp.x,
      y: _lp.y,
      z: _lp.z
    },
    lightRotation: {
      x: _lr.x,
      y: _lr.y,
      z: _lr.z
    },
    lightWidthHeight: {
      x: _wh.x,
      y: _wh.y
    },
    visible: true
  });

  const light = useRef<RectAreaLight>(null);
  const pivotLight = useRef<any>(null);
  const [selectedLight, setSelectedLight] = useState<boolean>(false);

  const onDrag = (e: Matrix4) => {
    const pos = new Vector3().setFromMatrixPosition(e);
    const rot = new Euler().setFromRotationMatrix(e);
    console.log("pos: ", pos.x, pos.y, pos.z);
    console.log("rot: ", rot.x, rot.y, rot.z);
  }

  return (
    <>
      {/** FillLight */}
      <PivotControls
        ref={pivotLight}
        depthTest={false}
        lineWidth={2}
        anchor={[0, 0, 0]}
        onDrag={(e) => onDrag(e)}
        scale={2}
        visible={selectedLight}
      >
        <group
          position={[
            lightPosition.x,
            lightPosition.y,
            lightPosition.z
          ]}
          rotation={[
            lightRotation.x,
            lightRotation.y,
            lightRotation.z
          ]}
        >
          <rectAreaLight
            ref={light}
            width={lightWidthHeight.x}
            height={lightWidthHeight.y}
            intensity={intensity}
            color={color}
            visible={visible}
            castShadow
          />
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              if (helper){
                setSelectedLight(true);
              }
            }}
            onPointerMissed={(e) => {
              if (e.type === "click") {
                setSelectedLight(false);
              }
            }}
            visible={helper}
          >
            <boxGeometry args={[lightWidthHeight.x, lightWidthHeight.y, 0.1]} />
            <meshBasicMaterial 
              color={color} 
              side={DoubleSide} 
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      </PivotControls>
    </>
  )
}