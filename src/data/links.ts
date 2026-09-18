import { Bitcoin, Cloud, EyeDashed } from "lucide-react"

import { flattenCategoryTree } from "../lib/utils"

import type { Category, NavItem } from "../types"

export const CATEGORIES: Category[] = [
  {
    title: "Web3 & Trading",
    description:
      "Wallets, exchanges, on-chain ecosystems, and blockchain tools",
    icon: Bitcoin,
    subcategories: [
      {
        title: "Blockchain & Explorer",
        description:
          "Blockchain explorers, networks, and on-chain infrastructure",
        items: [
          {
            title: "Bitcoin",
            description:
              "Bitcoin is an innovative payment network and a new kind of money. Find all you need to know and get started with Bitcoin on bitcoin.org.",
            url: "https://bitcoin.org",
            tags: ["Blockchain", "L1", "BTC"],
            featured: true,
          },
          {
            title: "Ethereum",
            description:
              "Ethereum is a decentralized platform for resilient apps and infrastructure. Control your money, data, and identity, with no bank or middleman needed.",
            url: "https://ethereum.org",
            tags: ["Blockchain", "L1", "ETH"],
            featured: true,
          },
          {
            title: "BNB Chain",
            description:
              "BNB Chain is a community-driven and decentralized blockchain ecosystem for Web3 dApps, powered by BNB. Join us for massive Web3 access and a future full of opportunity!",
            url: "https://www.bnbchain.org",
            tags: ["Blockchain", "L1", "BNB"],
            featured: true,
          },
          {
            title: "Dogecoin",
            description:
              "An open-source peer-to-peer digital currency, favoured by Shiba Inus worldwide.",
            url: "https://dogecoin.com",
            tags: ["Blockchain", "L1", "DOGE"],
          },
          {
            title: "OKLink",
            description:
              "OKLink is the world's leading multi-chain blockchain explorer which provides data information of Bitcoin, Ethereum, Litecoin as well as BTC block, BTC Halving, ETH burning info and so on, aiming to be the best blockchain explorer worldwide.",
            url: "https://www.oklink.com",
            tags: ["Explorer"],
          },
          {
            title: "Blockscout",
            description:
              "Explore crypto activities with Blockscout's multichain search. Find transactions, addresses, tokens, and dapps across top blockchain networks — your go-to explorer for cross-chain blockchain data.",
            url: "https://www.blockscout.com",
            tags: ["Explorer"],
          },
        ],
      },
      {
        title: "Wallets & CEX & DEX",
        description:
          "Trading, wallets, and decentralized exchange infrastructure",
        items: [
          {
            title: "Binance",
            description:
              "Buy and trade BTC, ETH, XRP and more on Binance. Enjoy low fees, fast payments, and a trusted platform for crypto trading.",
            url: "https://www.binance.com",
            tags: ["Wallet", "CEX", "Trading"],
            featured: true,
          },
          {
            title: "OKX",
            description:
              "OKX United States - Buy and trade BTC, ETH, XRP and more on OKX. Explore crypto, Web3 and DeFi on one global trading platform.",
            url: "https://www.okx.com",
            tags: ["Wallet", "CEX", "Trading"],
          },
          {
            title: "Hyperliquid",
            description:
              "Trade crypto, commodities, indices, FX, and real-world assets onchain, 24/7, without intermediaries.",
            url: "https://hyperliquid.xyz",
            tags: ["DEX", "L1", "Trading"],
          },
          {
            title: "Aster",
            description:
              "Trade perpetuals on Aster, the top DEX with low fees, deep liquidity, multichain support, high leverage and yield.",
            url: "https://www.asterdex.com",
            tags: ["DEX", "L1", "Trading"],
          },
          {
            title: "Uniswap",
            description:
              "Instantly buy and sell crypto on Ethereum, Base, Arbitrum, Polygon, Unichain and more. The DeFi platform trusted by millions.",
            url: "https://app.uniswap.org",
            tags: ["DEX", "Swap", "L1", "Wallet", "DeFi"],
            featured: true,
          },
          {
            title: "PancakeSwap",
            description:
              "Trade, earn, and own crypto on the all-in-one multichain DEX",
            url: "https://pancakeswap.finance",
            tags: ["DEX", "Swap", "DeFi"],
          },
          {
            title: "LlamaSwap",
            description: "DeFi Meta-DEX Aggregator: Best Swap Rates",
            url: "https://swap.defillama.com",
            tags: ["Aggregator", "Swap", "DeFi"],
          },
          {
            title: "Jumper",
            description:
              "Move, deploy and manage your capital with Jumper. Fast swaps, capital deployment, and portfolio management in one smart app.",
            url: "https://jumper.xyz",
            tags: ["Aggregator", "Swap", "Bridge", "CrossChain", "DeFi"],
          },
          {
            title: "Bungee",
            description:
              "Bungee is the liquidity marketplace for onchain swaps. Swap any token, on any chain, through the best available route in one simple transaction.",
            url: "https://www.bungee.exchange",
            tags: ["Aggregator", "Swap", "Bridge", "CrossChain", "DeFi"],
          },
          {
            title: "Matcha",
            description:
              "Matcha DEX aggregator | Search and trade over +9 million tokens across +100 exchanges on 18 chains.",
            url: "https://matcha.xyz",
            tags: ["Aggregator", "Swap", "Bridge", "CrossChain", "DeFi"],
          },
        ],
      },
      {
        title: "Ecosystem",
        description: "DeFi and broader ecosystem tools",
        items: [
          {
            title: "Pendle",
            description:
              "The world's largest crypto yield trading platform. Trade spot yield, earn fixed yield, or long yield with leverage.",
            url: "https://www.pendle.finance",
            tags: ["Yield", "DeFi"],
          },
          {
            title: "ether.fi",
            description:
              "ether.fi is one account for your money. Hold, earn, borrow, spend, trade, and send crypto, tokenized stocks, and metals from the assets you already own.",
            url: "https://ether.fi",
            tags: ["Staking", "ETH", "LSD", "DeFi"],
          },
          {
            title: "Ethena",
            description:
              "Ethena is a synthetic dollar protocol built on crypto rails, issuing USDe - a fully backed, dollar-denominated digital asset.",
            url: "https://ethena.fi",
            tags: ["Stablecoin", "Yield", "DeFi", "Finance"],
          },
        ],
      },
      {
        title: "Analytics & Data",
        description: "Market analysis and blockchain data tools",
        items: [
          {
            title: "TradingView",
            description: "Where the world charts, chats, and trades markets.",
            url: "https://www.tradingview.com",
            tags: ["Analytics", "Data", "Trading"],
          },
          {
            title: "DeFiLlama",
            description:
              "Track Total Value Locked (TVL), revenue, fees, volume, and yields across 7000+ DeFi protocols on 500+ chains.",
            url: "https://defillama.com",
            tags: ["DeFi", "Analytics", "TVL", "Data"],
          },
          {
            title: "CoinMarketCap",
            description:
              "Top cryptocurrency prices and charts, listed by market capitalization.",
            url: "https://coinmarketcap.com",
            tags: ["MarketCap", "Crypto", "Prices", "Analytics", "Data"],
          },
          {
            title: "CoinGecko",
            description:
              "View top cryptocurrency prices live, crypto charts, market cap, and trading volume.",
            url: "https://www.coingecko.com",
            tags: [
              "MarketCap",
              "Crypto",
              "Prices",
              "Analytics",
              "Data",
              "Candy",
            ],
          },
          {
            title: "CoinGlass",
            description:
              "CoinGlass provides professional crypto market data and analytics across derivatives, options and spot markets.",
            url: "https://www.coinglass.com",
            tags: ["Crypto", "Prices", "Analytics", "Data", "liquidation"],
          },
          {
            title: "Dune",
            description:
              "Normalized blockchain datasets across stablecoins, tokenized assets, payments, trading, and lending.",
            url: "https://dune.com",
            tags: ["Analytics", "Blockchains", "Data"],
          },
        ],
      },
      {
        title: "Mining",
        description: "Become a crypto miner",
        items: [
          {
            title: "NiceHash",
            description:
              "NiceHash is the leading cryptocurrency platform for mining. Sell or buy computing power and support the digital ledger technology revolution.",
            url: "https://www.nicehash.com",
            tags: ["Miner"],
          },
          {
            title: "unMineable",
            description:
              "Mine with your PC or ASIC and get paid in popular coins like BTC, DOGE, SOL, and USDT. Use unMiner or your preferred mining software with unMineable.",
            url: "https://unmineable.com",
            tags: ["Miner"],
          },
        ],
      },
    ],
  },
  {
    title: "Cloud Service",
    description: "Cloud Computing, IP, Domain, CDN, and more",
    icon: Cloud,
    subcategories: [
      {
        title: "Cloud Service Providers",
        description: "CDN, DNS, and hosting providers",
        items: [
          {
            title: "Cloudflare",
            description:
              "Welcome to Cloudflare - Powering the next generation of applications",
            url: "https://www.cloudflare.com",
            tags: ["Domain", "CDN", "Edge", "Storage"],
          },
          {
            title: "AWS",
            description:
              "Amazon Web Services offers reliable, scalable, and inexpensive cloud computing services.",
            url: "https://aws.amazon.com",
            tags: ["Cloud Computing", "Storage", "Edge"],
            featured: true,
          },
        ],
      },
      {
        title: "VPS",
        description: "VPS and hosting communities",
        items: [
          {
            title: "LowEndTalk",
            description:
              "LowEndTalk is a leading community forum for hosting professionals and enthusiasts.",
            url: "https://lowendtalk.com",
            tags: ["VPS", "Community"],
          },
          {
            title: "RackNerd",
            description:
              "RackNerd - Global Dedicated Servers. Introducing Infrastructure Stability",
            url: "https://www.racknerd.com",
            tags: ["VPS"],
          },
        ],
      },
    ],
  },
  {
    title: "Anonymous",
    description: "Anonymous",
    icon: EyeDashed,
    subcategories: [
      {
        title: "Tools",
        description: "Privacy and anonymity tools",
        items: [
          {
            title: "Tor",
            description:
              "Defend yourself against tracking and surveillance. Circumvent censorship.",
            url: "https://www.torproject.org",
            tags: ["Anonymous", "Browser"],
          },
          {
            title: "Proton",
            description:
              "Over 100 million people use Proton to stay private and secure online. Get a free Proton account and take back your privacy.",
            url: "https://proton.me",
            tags: ["Anonymous", "Mail"],
          },
          {
            title: "HeroSMS",
            description:
              "Receive SMS online for WhatsApp, Telegram, Instagram, Gmail, TikTok and more. Get temporary phone numbers from 180+ countries. Instant OTP verification, anonymous and reliable",
            url: "https://hero-sms.com",
            tags: ["Anonymous", "SMS"],
          },
        ],
      },
    ],
  },
]
export const NAV_ITEMS: NavItem[] = flattenCategoryTree(CATEGORIES)
