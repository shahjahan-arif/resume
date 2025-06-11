"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles,
  Eye,
  Calendar,
  DollarSign
} from 'lucide-react';

interface NFT {
  mint: string;
  name: string;
  image: string;
  description?: string;
  collection?: string;
  attributes?: Array<{ trait_type: string; value: string | number }>;
  lastSale?: number;
  floorPrice?: number;
}

const NFTShowcase: React.FC = () => {
  const { publicKey, connected } = useWallet();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  // Mock NFT data for demonstration - memoized to prevent re-creation on every render
  const mockNFTs: NFT[] = useMemo(() => [
    {
      mint: 'DRiP2Pn2K6fuMLKQmt5rZWxa91TAGNSz',
      name: 'Solana Monkey #1337',
      image: 'https://cdn.magiceden.dev/rs:fill:640:640:0:0/plain/https://creator-hub-prod.s3.us-east-2.amazonaws.com/solana_monkey_business_pfp_1678114017220.png',
      description: 'One of the first NFT collections on Solana',
      collection: 'Solana Monkey Business',
      attributes: [
        { trait_type: 'Background', value: 'Blue' },
        { trait_type: 'Fur', value: 'Brown' },
        { trait_type: 'Eyes', value: 'Sunglasses' },
        { trait_type: 'Mouth', value: 'Smile' },
      ],
      lastSale: 12.5,
      floorPrice: 8.2
    },
    {
      mint: 'DeGod4pY1T6nt2zJhgHtEmBF4Q8RG',
      name: 'DeGod #420',
      image: 'https://metadata.degods.com/g/4829-dead.png',
      description: 'DeGods: A collection of degenerates',
      collection: 'DeGods',
      attributes: [
        { trait_type: 'Body', value: 'Dead' },
        { trait_type: 'Background', value: 'Gray' },
        { trait_type: 'Clothes', value: 'Hoodie' },
      ],
      lastSale: 85.0,
      floorPrice: 75.5
    },
    {
      mint: 'ABC123NFTMintAddress456789',
      name: 'Custom Development NFT',
      image: 'https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=DEV+NFT',
      description: 'NFT representing my blockchain development skills',
      collection: 'Developer Portfolio',
      attributes: [
        { trait_type: 'Skill Level', value: 'Expert' },
        { trait_type: 'Experience', value: '4+ Years' },
        { trait_type: 'Specialization', value: 'Solana & MERN' },
      ],
      lastSale: 5.0,
      floorPrice: 3.0
    },
    {
      mint: 'OKB123CertificationNFT789',
      name: 'Blockchain Certificate NFT',
      image: 'https://via.placeholder.com/400x400/10B981/FFFFFF?text=CERT',
      description: 'Certificate of completion for advanced blockchain development',
      collection: 'Certifications',
      attributes: [
        { trait_type: 'Course', value: 'Advanced Solana Development' },
        { trait_type: 'Grade', value: 'A+' },
        { trait_type: 'Year', value: 2023 },
      ],
      lastSale: 2.0,
      floorPrice: 1.5
    }
  ], []);

  useEffect(() => {
    if (!connected || !publicKey) {
      setNfts([]);
      return;
    }

    const fetchNFTs = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch actual NFTs from the wallet
        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setNfts(mockNFTs);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        setLoading(false);
      }
    };

    fetchNFTs();
  }, [connected, publicKey, mockNFTs]);

  const formatSOL = (amount: number) => {
    return `${amount.toFixed(2)} SOL`;
  };

  const totalValue = nfts.reduce((sum, nft) => sum + (nft.floorPrice || 0), 0);

  if (!connected) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2 font-[family-name:var(--font-orbitron)]">
          <ImageIcon className="text-black" size={16} />
          NFT Collection
        </h2>
        <div className="text-center py-6">
          <ImageIcon className="mx-auto text-gray-600 mb-3" size={32} />
          <p className="text-gray-700 text-sm">Connect your wallet to view your NFT collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* NFT Collection Header */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-lg font-bold text-black mb-3 md:mb-0 flex items-center gap-2 font-[family-name:var(--font-orbitron)]">
            <ImageIcon className="text-black" size={16} />
            NFT Collection
          </h2>
          <div className="flex gap-3 text-xs">
            <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <span className="text-gray-700">Total NFTs: </span>
              <span className="text-black font-semibold">{nfts.length}</span>
            </div>
            <div className="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
              <span className="text-gray-700">Est. Value: </span>
              <span className="text-black font-semibold">{formatSOL(totalValue)}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          </div>
        ) : nfts.length === 0 ? (
          <div className="text-center py-8">
            <ImageIcon className="mx-auto text-gray-600 mb-3" size={32} />
            <p className="text-gray-700 text-sm">No NFTs found in this wallet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-gray-400 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full p-1.5">
                      <Sparkles className="text-black" size={12} />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-black font-semibold mb-1 truncate text-sm">{nft.name}</h3>
                  <p className="text-gray-600 text-xs mb-2 truncate">{nft.collection}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Floor Price</p>
                      <p className="text-xs text-green-700 font-semibold">
                        {nft.floorPrice ? formatSOL(nft.floorPrice) : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Last Sale</p>
                      <p className="text-xs text-blue-700 font-semibold">
                        {nft.lastSale ? formatSOL(nft.lastSale) : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-black">{selectedNFT.name}</h3>
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="text-gray-600 hover:text-black transition-colors text-xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Image */}
                <div className="aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-black mb-1">Collection</h4>
                    <p className="text-gray-700 text-sm">{selectedNFT.collection}</p>
                  </div>

                  {selectedNFT.description && (
                    <div>
                      <h4 className="text-sm font-semibold text-black mb-1">Description</h4>
                      <p className="text-gray-700 leading-relaxed text-sm">{selectedNFT.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-1">
                        <DollarSign className="text-green-700" size={14} />
                        <span className="text-xs text-gray-600">Floor Price</span>
                      </div>
                      <p className="text-sm font-bold text-green-700">
                        {selectedNFT.floorPrice ? formatSOL(selectedNFT.floorPrice) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Calendar className="text-blue-700" size={14} />
                        <span className="text-xs text-gray-600">Last Sale</span>
                      </div>
                      <p className="text-sm font-bold text-blue-700">
                        {selectedNFT.lastSale ? formatSOL(selectedNFT.lastSale) : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {selectedNFT.attributes && selectedNFT.attributes.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-black mb-3">Attributes</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedNFT.attributes.map((attr, index) => (
                          <div key={index} className="bg-gray-50 border border-gray-200 p-2 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">
                              {attr.trait_type}
                            </p>
                            <p className="text-black font-medium text-xs">{attr.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm">
                      <Eye size={14} />
                      View on Explorer
                    </button>
                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-black py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 text-sm">
                      <ExternalLink size={14} />
                      View on Marketplace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTShowcase;
