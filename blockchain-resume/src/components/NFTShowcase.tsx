"use client";

import React, { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { 
  Image as ImageIcon, 
  ExternalLink, 
  Sparkles,
  Eye,
  Calendar,
  DollarSign
} from 'lucide-react';
import Image from 'next/image';

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
  const { connection } = useConnection();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  // Mock NFT data for demonstration
  const mockNFTs: NFT[] = [
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
  ];

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
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
          <ImageIcon className="text-pink-400" />
          NFT Collection
        </h2>
        <div className="text-center py-8">
          <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
          <p className="text-gray-300">Connect your wallet to view your NFT collection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* NFT Collection Header */}
      <div className="bg-black backdrop-blur-sm rounded-xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-white mb-4 md:mb-0 flex items-center gap-3 font-[family-name:var(--font-orbitron)]">
            <ImageIcon className="text-pink-400" />
            NFT Collection
          </h2>
          <div className="flex gap-4 text-sm">
            <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
              <span className="text-gray-300">Total NFTs: </span>
              <span className="text-white font-semibold">{nfts.length}</span>
            </div>
            <div className="bg-gray-700/50 px-4 py-2 rounded-lg">
              <span className="text-gray-300">Est. Value: </span>
              <span className="text-white font-semibold">{formatSOL(totalValue)}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
          </div>
        ) : nfts.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-300">No NFTs found in this wallet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 hover:border-pink-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                      <Sparkles className="text-pink-400" size={16} />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-1 truncate">{nft.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 truncate">{nft.collection}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Floor Price</p>
                      <p className="text-sm text-green-400 font-semibold">
                        {nft.floorPrice ? formatSOL(nft.floorPrice) : 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Last Sale</p>
                      <p className="text-sm text-blue-400 font-semibold">
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
          <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedNFT.name}</h3>
                <button
                  onClick={() => setSelectedNFT(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={selectedNFT.image}
                    alt={selectedNFT.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Collection</h4>
                    <p className="text-pink-400">{selectedNFT.collection}</p>
                  </div>

                  {selectedNFT.description && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                      <p className="text-gray-300 leading-relaxed">{selectedNFT.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="text-green-400" size={16} />
                        <span className="text-sm text-gray-400">Floor Price</span>
                      </div>
                      <p className="text-lg font-bold text-green-400">
                        {selectedNFT.floorPrice ? formatSOL(selectedNFT.floorPrice) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="text-blue-400" size={16} />
                        <span className="text-sm text-gray-400">Last Sale</span>
                      </div>
                      <p className="text-lg font-bold text-blue-400">
                        {selectedNFT.lastSale ? formatSOL(selectedNFT.lastSale) : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {selectedNFT.attributes && selectedNFT.attributes.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Attributes</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedNFT.attributes.map((attr, index) => (
                          <div key={index} className="bg-gray-800/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                              {attr.trait_type}
                            </p>
                            <p className="text-white font-medium">{attr.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button className="flex-1 bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Eye size={16} />
                      View on Explorer
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <ExternalLink size={16} />
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
