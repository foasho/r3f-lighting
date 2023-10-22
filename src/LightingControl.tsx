import { useControls } from "leva";
import { RectAreaLight, DoubleSide, Vector2, Vector3, Euler } from "three";
import { RectAreaLightHelper } from "three-stdlib";
import { useRef, useState } from "react";
import { PivotControls, useHelper } from "@react-three/drei";
import { toEuler, toVector2, toVector3 } from "./utils/ThreeCommons";

type LightingControlsProps = {
  name: string;
  helper: boolean;
  lightColor: string;
  lightPos: Vector3 | [number, number, number];
  lightRot: Euler| [number, number, number];
  lightIntensity: number;
  lightWH: Vector2 | [number, number];
}
export const LightingControls = (
  { 
    name, 
    helper,
    lightColor,
    lightPos,
    lightRot,
    lightIntensity,
    lightWH,
  }: LightingControlsProps
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
      max: 10,
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

  // @ts-ignore
  useHelper(helper && light, RectAreaLightHelper, color);

  const onDrag = (e: any) => {
    console.log(e);
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
          />
          <mesh
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLight(true);
            }}
            onPointerMissed={(e) => {
              if (e.type === "click") {
                setSelectedLight(false);
              }
            }}
            visible={false}
          >
            <boxGeometry args={[lightWidthHeight.x, lightWidthHeight.y, 0.1]} />
            <meshBasicMaterial color={color} side={DoubleSide} wireframe />
          </mesh>
        </group>
      </PivotControls>
    </>
  )
}