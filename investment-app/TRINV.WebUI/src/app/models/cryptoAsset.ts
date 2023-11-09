export  interface ICryptoAsset{
  id: string
  rank: number
  symbol: string
  name: string
  supply: number
  maxSupply?: number
  marketCapUsd: number
  volumeUsd24Hr: number
  priceUsd: number
  changePercent24Hr: number
}
