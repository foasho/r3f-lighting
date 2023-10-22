import { useControls } from "leva";
import { AreaLightingControls } from "./controls/AreaLightingControl";


/**
 * 
 */
export const WhoAreYou = () => {

  const {
    helper
  } = useControls({
    helper: false
  });

  return (
    <>
      {/** BackLight */}
      <AreaLightingControls
        name="BackLight"
        lightColor="#ffffff"
        lightIntensity={50}
        lightPos={[0, 1.9, -3]}
        lightRot={[-0.2, 3.14, 0]}
        lightWH={[1.5, 1.5]}
        helper={helper}
      />
    </>
  )
};