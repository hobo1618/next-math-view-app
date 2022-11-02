import { useRef, useEffect, useState } from "react";
import MathView, { MathViewRef } from "react-math-view";
import { makeSharedVirtualKeyboard } from "mathlive";
import { HIGH_SCHOOL_KEYBOARD, HIGH_SCHOOL_KEYBOARD_LAYER } from "../keyboard";

makeSharedVirtualKeyboard()

const MathViewNoSSR = () => {
  const ref1 = useRef<MathViewRef>(null);
  const ref2 = useRef<MathViewRef>(null);
  const [mf1, setMf1] = useState("");
  const [mf2, setMf2] = useState("");

  useEffect(() => {
    ref1.current?.setOptions({
      customVirtualKeyboardLayers: HIGH_SCHOOL_KEYBOARD_LAYER,
      customVirtualKeyboards: HIGH_SCHOOL_KEYBOARD,
      virtualKeyboards: "high-school-keyboard",
    });

    // add this if you want both keyboards to be the same.
    // ref2.current?.setOptions({
    //   customVirtualKeyboardLayers: HIGH_SCHOOL_KEYBOARD_LAYER,
    //   customVirtualKeyboards: HIGH_SCHOOL_KEYBOARD,
    //   virtualKeyboards: "high-school-keyboard",
    // });

  }, []);

  return (
    <div>
      <MathView
        value={mf1}
        ref={ref1}
        useSharedVirtualKeyboard
        virtualKeyboardMode="onfocus"
        onInput={() => setMf1(ref1.current?.getValue() || "")}
      />
      <MathView
        value={mf2}
        ref={ref2}
        useSharedVirtualKeyboard
        virtualKeyboardMode="onfocus"
        onInput={() => setMf2(ref2.current?.getValue() || "")}
      />
    </div>
  );
}
export default MathViewNoSSR