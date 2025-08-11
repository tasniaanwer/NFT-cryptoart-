"use client"

import Image from "next/image"
import { Wallet, Star, Shield, Zap, Users, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ConnectButton,useReadContract,MediaRenderer,TransactionButton,useActiveAccount} from "thirdweb/react"
import { createThirdwebClient, getContract } from "thirdweb"
import { sepolia } from "thirdweb/chains"
import { getContractMetadata } from "thirdweb/extensions/common";
import { claimTo } from "thirdweb/extensions/erc721";



const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})

// If you need a contract instance, set NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
// and create it where needed using getContract.
export default function NFTLanding() {
  const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  const contract = contractAddress
    ? getContract({ client, chain: sepolia, address: contractAddress })
    : undefined

 const account =useActiveAccount();
      
  const handleConnectWallet = () => {
    // For demo purposes, just show an alert
    // In production, you would implement actual wallet connection logic
    alert("Wallet connection feature coming soon! This is a demo page.")
  }

  const handleClaimNFT = () => {
    // For demo purposes, just show an alert
    alert("Please connect your wallet first to claim this NFT!")
  }
const {data : contractMetadata}= useReadContract(
  getContractMetadata,{
    contract:contract
  }
);
console.log(contractMetadata)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navbar */}
      <nav className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">CryptoArt</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Collection
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                About
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Roadmap
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Community
              </a>
            </div>
            {/* <Button
              onClick={handleConnectWallet}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
            >
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button> */}
            <ConnectButton client={client} />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* NFT Image */}
           <div className="flex justify-end">
      <div className="w-[500px] h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-1 backdrop-blur-sm border border-white/10">
        <MediaRenderer
          client={client}
          src={contractMetadata?.image}
          alt="NFT Preview"
          width="100%"
          height="100%"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Ensures full image is visible
            borderRadius: '0.65rem', // Slightly smaller to account for container
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'transparent' // Fallback for transparent images
          }}
        />
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Available</Badge>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-sm px-3 py-1">
                Limited Edition
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                {contractMetadata?.name}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  #001
                </span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                {contractMetadata?.description}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div>
                <p className="text-white/60 text-sm">Current Price</p>
                <p className="text-3xl font-bold text-white">2.5 ETH</p>
              </div>
              <div>
                <p className="text-white/60 text-sm">Remaining</p>
                <p className="text-3xl font-bold text-white">47/100</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleClaimNFT}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-8 py-6"
              >
                <Zap className="mr-2 h-5 w-5" />
                Claim NFT
              </Button>
              <TransactionButton
              transaction={()=>claimTo({
                contract: contract,
                to: account?.address as string,
                quantity:BigInt(1),
              })}
              onTransactionConfirmed={async()=>alert("CONFIRMED")}>
                CLAIM NFT
              </TransactionButton>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
              >
                View on OpenSea
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About This NFT Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-8 backdrop-blur-sm border border-white/10">
              <Image
                src="/nft-blockchain-visualization.png"
                alt="NFT Blockchain Visualization"
                width={500}
                height={400}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">About This NFT</h3>
            <p className="text-white/80 text-lg leading-relaxed">
              Cosmic Genesis represents the pinnacle of digital artistry, combining cutting-edge blockchain technology
              with stunning visual design. Each token is uniquely minted and stored permanently on the Ethereum
              blockchain.
            </p>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/60">Token Standard</span>
                    <span className="text-white">ERC-721</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Blockchain</span>
                    <span className="text-white">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Contract Address</span>
                    <span className="text-white text-sm">0x742d...4f2a</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Metadata</span>
                    <span className="text-white">IPFS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Royalties</span>
                    <span className="text-white">5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meet the Creator Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 lg:order-2">
            <h3 className="text-3xl font-bold text-white">Meet the Creator</h3>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <Image
                    src="/digital-artist-avatar.png"
                    alt="Creator Avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-white">Alex Chen</h4>
                    <p className="text-purple-400">@alexchen_art</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-white/80 text-sm">4.9 • 2.3k followers</span>
                    </div>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed mb-6">
                  Renowned digital artist with over 5 years of experience in creating stunning NFT collections. Known
                  for intricate details and cosmic themes that transport viewers to other dimensions.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-white">127</p>
                    <p className="text-white/60 text-sm">Artworks</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">2.3k</p>
                    <p className="text-white/60 text-sm">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">45.2</p>
                    <p className="text-white/60 text-sm">ETH Volume</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative lg:order-1">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-sm border border-white/10">
              <Image
                src="/artist-workspace-studio.png"
                alt="Artist Workspace"
                width={500}
                height={400}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Holder Benefits</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Owning this NFT grants you exclusive access to a world of benefits and opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Exclusive Community</h3>
              <p className="text-white/80">
                Join an elite Discord community with direct access to the creator and fellow collectors
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Early Access</h3>
              <p className="text-white/80">
                Get priority access to future drops and exclusive collections before public release
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Lifetime Royalties</h3>
              <p className="text-white/80">
                Earn passive income through our revenue sharing program for all secondary sales
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Physical Artwork</h3>
              <p className="text-white/80">
                Receive a limited edition physical print of your NFT delivered to your doorstep
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Metaverse Ready</h3>
              <p className="text-white/80">Display your NFT in popular metaverse platforms and virtual galleries</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Governance Rights</h3>
              <p className="text-white/80">
                Vote on future collection decisions and help shape the community's direction
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Future?</h2>
          <p className="text-white/80 mb-8">
            Don't miss your chance to own this exclusive piece of digital art and join our growing community
          </p>
          <Button
            onClick={handleConnectWallet}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 text-lg px-12 py-6"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet & Claim
          </Button>
        </div>
      </section>
    </div>
  )
}
