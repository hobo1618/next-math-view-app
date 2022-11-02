import '../styles/globals.css'
import '../styles/mathlive-fonts.css';
import '../styles/mathlive-static.css';
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
