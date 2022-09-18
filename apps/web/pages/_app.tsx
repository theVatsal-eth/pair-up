import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Layout from './layout';

const activeChainId = ChainId.Mumbai;


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>

      <Layout>
        <Component {...pageProps} />
      </Layout>

    </ThirdwebProvider>

  )
}

export default App