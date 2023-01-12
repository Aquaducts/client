import '../styles/globals.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { AppProps } from 'next/app'

ChartJS.register(ArcElement, Tooltip, Legend);


export default function App({ Component, pageProps }: AppProps) {
  return <div className="h-screen w-screen bg-body-pink shadow-lg overflow-y-auto">
    <div className="w-full">
      <Component {...pageProps} />
    </div>
  </div>
}
