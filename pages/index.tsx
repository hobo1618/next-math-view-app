import dynamic from "next/dynamic";

const App = dynamic(() => import('../components/MathViewNoSSR'), {
  ssr: false
})

export default App;
