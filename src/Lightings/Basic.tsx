import { useControls } from "leva";
import { AreaLightingControls } from "./controls/AreaLightingControl";


/**
 * BasicLighting
 */
export const Basic = () => {

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