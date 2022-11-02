import dynamic from "next/dynamic";
import { useRef, useEffect, useState } from "react";
// import MathView, { MathViewRef } from "react-math-view";
// import { makeSharedVirtualKeyboard } from "mathlive";
import { HIGH_SCHOOL_KEYBOARD, HIGH_SCHOOL_KEYBOARD_LAYER } from "../keyboard";


// makeSharedVirtualKeyboard();

const App = dynamic(() => import('../components/MathViewNoSSR'), {
  ssr: false
})

export default App;
