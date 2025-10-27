import { createAppKit } from '@reown/appkit/react'
import { WagmiProvider } from 'wagmi'
import { 
  base, 
  baseSepolia,
  mainnet, 
  polygon, 
  arbitrum, 
  optimism
} from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 1. Get projectId from https://cloud.reown.com
const projectId = 'd5fda455224d288c347277e7a5e9ef28'

// 2. Create a metadata object - optional
const metadata = {
  name: 'Cookie Empire',
  description: 'Build your cookie empire on Base',
  url: 'https://cookie-empire.com', // origin must match your domain & subdomain
  icons: ['https://cookie-empire.com/icon.png']
}

// 3. Set the networks
const networks = [
  base,        // Base Network (Prioritário)
  baseSepolia, // Base Sepolia Testnet (Para desenvolvimento)
  mainnet,     // Ethereum Mainnet  
  polygon,     // Polygon
  arbitrum,    // Arbitrum One
  optimism     // Optimism
]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: networks as any,
  projectId,
  ssr: false // Set to false for client-side rendering
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export { wagmiAdapter }

// Setup queryClient
export const queryClient = new QueryClient()

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}