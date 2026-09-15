import type { Category, NavItem } from "../types";

export const CATEGORIES: Category[] = [
  {
    id: "wt",
    name: "Web3 & Trading",
    description:
      "Wallets, exchanges, on-chain ecosystems, and blockchain tools",
    iconName: "Coins",
    subcategories: [
      { id: "wt-be", name: "Blockchain & Explorer" },
      { id: "wt-wcd", name: "Wallets & CEX & DEX" },
      { id: "wt-e", name: "Ecosystem" },
      { id: "wt-ad", name: "Analytics & Data" },
    ],
  },
  // {
  //   id: "frontend",
  //   name: "Frontend",
  //   description: "Core frameworks, modern build tools, and Web standards",
  //   iconName: "Layout",
  //   subcategories: [
  //     { id: "fe-frameworks", name: "Frameworks" },
  //     { id: "fe-standards", name: "Standards & Languages" },
  //     { id: "fe-tooling", name: "Build & Tooling" },
  //   ],
  // },
  // {
  //   id: "backend",
  //   name: "Backend",
  //   description:
  //     "Backend languages, high-performance service frameworks, and runtimes",
  //   iconName: "Server",
  //   subcategories: [
  //     { id: "be-languages", name: "Runtimes & Languages" },
  //     { id: "be-frameworks", name: "Web Frameworks" },
  //   ],
  // },
  // {
  //   id: "database",
  //   name: "Database",
  //   description:
  //     "Relational and key-value databases, ORMs, and cloud data platforms",
  //   iconName: "Database",
  //   subcategories: [
  //     { id: "db-engines", name: "Database Engines" },
  //     { id: "db-orm-baas", name: "ORM & BaaS" },
  //   ],
  // },
  // {
  //   id: "tools",
  //   name: "Dev Tools",
  //   description:
  //     "Online parsers, regex testers, code converters, and daily debugging tools",
  //   iconName: "Wrench",
  //   subcategories: [
  //     { id: "tool-dev", name: "Docs & Git" },
  //     {
  //       id: "tool-efficiency",
  //       name: "Debug & Utilities",
  //     },
  //   ],
  // },
  // {
  //   id: "devops",
  //   name: "DevOps & Cloud",
  //   description:
  //     "Container orchestration, continuous delivery, edge networks, and cloud deployment",
  //   iconName: "Cloud",
  //   subcategories: [
  //     { id: "ops-cloud", name: "Cloud & Edge" },
  //     { id: "ops-container", name: "Containers & Linux" },
  //   ],
  // },
  // {
  //   id: "community",
  //   name: "Community",
  //   description:
  //     "Technology trends, developer communities, current events, and source exploration",
  //   iconName: "Compass",
  //   subcategories: [
  //     { id: "com-trending", name: "Trending" },
  //     { id: "com-forums", name: "Forums & Blogs" },
  //   ],
  // },
];

export const NAV_ITEMS: NavItem[] = [
  // ----- Web3 & Trading -----

  // Blockchain & Explorer

  {
    id: "bitcoin.org",
    title: "Bitcoin",
    description:
      "Bitcoin is an innovative payment network and a new kind of money. Find all you need to know and get started with Bitcoin on bitcoin.org.",
    url: "https://bitcoin.org",
    category: "wt",
    subCategory: "wt-be",
    tags: ["Blockchain", "L1", "BTC"],
    featured: true,
  },
  {
    id: "ethereum.org",
    title: "Ethereum",
    description:
      "Ethereum is a decentralized platform for resilient apps and infrastructure. Control your money, data, and identity, with no bank or middleman needed.",
    url: "https://ethereum.org",
    category: "wt",
    subCategory: "wt-be",
    tags: ["Blockchain", "L1", "ETH"],
    featured: true,
  },
  {
    id: "www.bnbchain.org",
    title: "BNB Chain",
    description:
      "BNB Chain is a community-driven and decentralized blockchain ecosystem for Web3 dApps, powered by BNB. Join us for massive Web3 access and a future full of opportunity!",
    url: "https://www.bnbchain.org",
    category: "wt",
    subCategory: "wt-be",
    tags: ["Blockchain", "L1", "BNB"],
    featured: true,
  },
  {
    id: "dogecoin.com",
    title: "Dogecoin",
    description:
      " An open-source peer-to-peer digital currency, favoured by Shiba Inus worldwide ",
    url: "https://dogecoin.com",
    category: "wt",
    subCategory: "wt-be",
    tags: ["Blockchain", "L1", "DOGE"],
  },
  {
    id: "www.oklink.com",
    title: "OKLink",
    description:
      "OKLink is the world's leading multi-chain blockchain explorer which provides data information of Bitcoin, Ethereum, Litecoin as well as BTC block,  BTC Halving, ETH burning info and so on, aiming to be the best  blockchain explorer worldwide.",
    url: "https://www.oklink.com",
    category: "wt",
    subCategory: "wt-be",
    tags: ["Explorer"],
  },
  {
    id: "www.blockscout.com",
    title: "Blockscout",
    description:
      "Explore crypto activities with Blockscout's multichain search. Find transactions, addresses, tokens, and dapps across top blockchain networks — your go-to explorer for cross-chain blockchain data",
    url: "https://www.blockscout.com",
    category: "wt",
    subCategory: "wt-be",
    tags: ["Explorer"],
  },

  // Wallets & CEX & DEX
  {
    id: "www.binance.com",
    title: "Binance",
    description:
      "Buy and trade BTC, ETH, XRP and more on Binance. Enjoy low fees, fast payments, and a trusted platform for crypto trading. Sign up or log in today.",
    url: "https://www.binance.com",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["Wallet", "CEX", "Trading"],
    featured: true,
  },
  {
    id: "www.okx.com",
    title: "OKX",
    description:
      "OKX United States - Buy and trade BTC, ETH, XRP and more on OKX. Explore crypto, Web3 and DeFi on one global trading platform.",
    url: "https://www.okx.com",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["Wallet", "CEX", "Trading"],
  },
  {
    id: "hyperliquid.xyz",
    title: "Hyperliquid",
    description:
      "Trade crypto, commodities, indices, FX, and real-world assets onchain, 24/7, without intermediaries.",
    url: "https://hyperliquid.xyz",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["DEX", "L1", "Trading"],
  },
  {
    id: "www.asterdex.com",
    title: "Aster",
    description:
      "Trade perpetuals on Aster, the top DEX with low fees, deep liquidity, multichain support, high leverage and yield. Use Simple or Pro mode. Secure and non-custodial.",
    url: "https://www.asterdex.com",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["DEX", "L1", "Trading"],
  },
  {
    id: "app.uniswap.org",
    title: "Uniswap",
    description:
      "Instantly buy and sell crypto on Ethereum, Base, Arbitrum, Polygon, Unichain and more. The DeFi platform trusted by millions.",
    url: "https://app.uniswap.org",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["DEX", "Swap", "L1", "Wallet", "DeFi"],
    featured: true,
  },
  {
    id: "pancakeswap.finance",
    title: "PancakeSwap",
    description: "Trade, earn, and own crypto on the all-in-one multichain DEX",
    url: "https://pancakeswap.finance",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["DEX", "Swap", "DeFi"],
  },
  {
    id: "swap.defillama.com",
    title: "LlamaSwap",
    description: "DeFi Meta-DEX Aggregator: Best Swap Rates",
    url: "https://swap.defillama.com",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["Aggregator", "Swap", "DeFi"],
  },
  {
    id: "jumper.xyz",
    title: "Jumper",
    description:
      "Move, deploy and manage your capital with Jumper. Fast swaps, capital deployment, and portfolio management in one smart app.",
    url: "https://jumper.xyz",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["Aggregator", "Swap", "Bridge", "CrossChain", "DeFi"],
  },

  {
    id: "www.bungee.exchange",
    title: "Bungee",
    description:
      "Bungee is the liquidity marketplace for onchain swaps. Swap any token, on any chain, through the best available route in one simple transaction.",
    url: "https://www.bungee.exchange",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["Aggregator", "Swap", "Bridge", "CrossChain", "DeFi"],
  },

  {
    id: "matcha.xyz",
    title: "Matcha",
    description:
      "Matcha DEX aggregator | Search and trade over +9 million tokens across +100 exchanges on 18 chains. Trade now.",
    url: "https://matcha.xyz",
    category: "wt",
    subCategory: "wt-wcd",
    tags: ["Aggregator", "Swap", "Bridge", "CrossChain", "DeFi"],
  },

  // Ecosystem
  {
    id: "www.pendle.finance",
    title: "Pendle",
    description:
      "The world's largest crypto yield trading platform. Trade spot yield, earn fixed yield, or long yield with leverage — no lockups, no liquidation risk.",
    url: "https://www.pendle.finance",
    category: "wt",
    subCategory: "wt-e",
    tags: ["Yield", "DeFi"],
  },
  {
    id: "ether.fi",
    title: "ether.fi",
    description:
      "ether.fi is one account for your money. Hold, earn, borrow, spend, trade, and send crypto, tokenized stocks, and metals from the assets you already own.",
    url: "https://ether.fi",
    category: "wt",
    subCategory: "wt-e",
    tags: ["Staking", "ETH", "LSD", "DeFi"],
  },
  {
    id: "ethena.fi",
    title: "Ethena",
    description:
      "Ethena is a synthetic dollar protocol built on crypto rails, issuing USDe - a fully backed, dollar-denominated digital asset - alongside sUSDe, the protocol's autonomously and permissionlessly created globally accessible savings asset.",
    url: "https://ethena.fi",
    category: "wt",
    subCategory: "wt-e",
    tags: ["Stablecoin", "Yield", "DeFi", "Finance"],
  },

  // Analytics & Data
  {
    id: "www.tradingview.com",
    title: "TradingView",
    description:
      "Where the world charts, chats, and trades markets. We're a supercharged super-charting platform and social network for traders and investors. Free to sign up.",
    url: "https://www.tradingview.com",
    category: "wt",
    subCategory: "wt-ad",
    tags: ["Analytics", "Data", "Trading"],
  },
  {
    id: "defillama.com",
    title: "DeFiLlama",
    description:
      "Track Total Value Locked (TVL), revenue, fees, volume, and yields across 7000+ DeFi protocols on 500+ chains. Real-time DeFi analytics including protocol earnings, profit metrics, DEX volume, and transparent crypto data without ads.",
    url: "https://defillama.com",
    category: "wt",
    subCategory: "wt-ad",
    tags: ["DeFi", "Analytics", "TVL", "Data"],
  },
  {
    id: "coinmarketcap.com",
    title: "CoinMarketCap",
    description:
      "Top cryptocurrency prices and charts, listed by market capitalization. Free access to current and historic data for Bitcoin and thousands of altcoins.",
    url: "https://coinmarketcap.com",
    category: "wt",
    subCategory: "wt-ad",
    tags: ["MarketCap", "Crypto", "Prices", "Analytics", "Data"],
  },
  {
    id: "www.coingecko.com",
    title: "CoinGecko",
    description:
      "View top cryptocurrency prices live, crypto charts, market cap, and trading volume. Discover today’s new and trending coins, top crypto gainers and losers in the market.",
    url: "https://www.coingecko.com",
    category: "wt",
    subCategory: "wt-ad",
    tags: ["MarketCap", "Crypto", "Prices", "Analytics", "Data", "Candy"],
  },
  {
    id: "www.coinglass.com",
    title: "CoinGlass",
    description:
      "CoinGlass provides professional crypto market data and analytics across derivatives, options and spot markets, combining order flow with L2 and L3 order book depth, liquidity, liquidation heatmaps, open interest, funding rates and historical data with advanced indicators and visualized analysis, while offering professional APIs for traders, quantitative traders and institutions.",
    url: "https://www.coinglass.com",
    category: "wt",
    subCategory: "wt-ad",
    tags: ["Crypto", "Prices", "Analytics", "Data", "liquidation"],
  },
  {
    id: "dune.com",
    title: "Dune",
    description:
      "Normalized blockchain datasets across stablecoins, tokenized assets, payments, trading, and lending. Delivered anywhere you work — warehouse, MCP, Data Hub, API, and connectors.",
    url: "https://dune.com",
    category: "wt",
    subCategory: "wt-ad",
    tags: ["Analytics", "Blockchains", "Data"],
  },

  // // --- Frontend ---
  // {
  //   id: "fe-react",
  //   title: "React",
  //   description:
  //     "A declarative library for building Web and native user interfaces",
  //   url: "https://react.dev",
  //   category: "frontend",
  //   subCategory: "fe-frameworks",
  //   tags: ["UI", "Component", "Framework", "Frontend"],
  //   featured: true,
  // },
  // {
  //   id: "fe-vue",
  //   title: "Vue.js",
  //   description:
  //     "A progressive JavaScript framework that is approachable and performant",
  //   url: "https://vuejs.org",
  //   category: "frontend",
  //   subCategory: "fe-frameworks",
  //   tags: ["UI", "Vue3", "Frontend", "Reactivity"],
  //   featured: true,
  // },
  // {
  //   id: "fe-svelte",
  //   title: "Svelte",
  //   description:
  //     "A compile-time framework with no virtual DOM, designed for simplicity and speed",
  //   url: "https://svelte.dev",
  //   category: "frontend",
  //   subCategory: "fe-frameworks",
  //   tags: ["UI", "Compiler", "Reactive"],
  // },
  // {
  //   id: "fe-ts",
  //   title: "TypeScript",
  //   description:
  //     "A typed superset of JavaScript that improves code reliability and tooling",
  //   url: "https://www.typescriptlang.org/zh/",
  //   category: "frontend",
  //   subCategory: "fe-standards",
  //   tags: ["Language", "JavaScript", "TypeSafe"],
  //   featured: true,
  // },
  // {
  //   id: "fe-mdn",
  //   title: "MDN Web Docs",
  //   description:
  //     "Authoritative open documentation and API references for Web developers",
  //   url: "https://developer.mozilla.org/zh-CN/",
  //   category: "frontend",
  //   subCategory: "fe-standards",
  //   tags: ["Docs", "HTML", "CSS", "JavaScript", "Standard"],
  //   featured: true,
  // },
  // {
  //   id: "fe-caniuse",
  //   title: "Can I use",
  //   description:
  //     "Check browser support for HTML5, CSS3, and JavaScript features",
  //   url: "https://caniuse.com",
  //   category: "frontend",
  //   subCategory: "fe-standards",
  //   tags: ["Compatibility", "Browser", "CSS", "HTML"],
  // },
  // {
  //   id: "fe-nextjs",
  //   title: "Next.js",
  //   description:
  //     "A React full-stack Web framework with SSR, SSG, and edge rendering",
  //   url: "https://nextjs.org",
  //   category: "frontend",
  //   subCategory: "fe-tooling",
  //   tags: ["React", "SSR", "Fullstack", "Vercel"],
  // },
  // {
  //   id: "fe-vite",
  //   title: "Vite",
  //   description:
  //     "A next-generation frontend toolchain with a fast dev server and optimized builds",
  //   url: "https://vitejs.dev",
  //   category: "frontend",
  //   subCategory: "fe-tooling",
  //   tags: ["Build", "Bundler", "ESM", "Tooling"],
  // },
  // {
  //   id: "fe-tailwind",
  //   title: "Tailwind CSS",
  //   description:
  //     "A utility-first CSS framework for rapidly building modern responsive interfaces",
  //   url: "https://tailwindcss.com",
  //   category: "frontend",
  //   subCategory: "fe-tooling",
  //   tags: ["CSS", "Utility", "Styling", "UI"],
  // },

  // // --- Backend ---
  // {
  //   id: "be-nodejs",
  //   title: "Node.js",
  //   description: "A cross-platform JavaScript runtime built on the V8 engine",
  //   url: "https://nodejs.org",
  //   category: "backend",
  //   subCategory: "be-languages",
  //   tags: ["Runtime", "JavaScript", "Server"],
  //   featured: true,
  // },
  // {
  //   id: "be-golang",
  //   title: "Go (Golang)",
  //   description:
  //     "An open-source, statically typed language from Google built for concurrency",
  //   url: "https://go.dev",
  //   category: "backend",
  //   subCategory: "be-languages",
  //   tags: ["Language", "Concurrency", "Microservices"],
  //   featured: true,
  // },
  // {
  //   id: "be-python",
  //   title: "Python",
  //   description:
  //     "A powerful, elegant language widely used for backend work, automation, and AI",
  //   url: "https://www.python.org",
  //   category: "backend",
  //   subCategory: "be-languages",
  //   tags: ["Language", "AI", "Backend", "Scripting"],
  // },
  // {
  //   id: "be-rust",
  //   title: "Rust",
  //   description:
  //     "A systems language for building reliable and efficient software",
  //   url: "https://www.rust-lang.org/zh-CN",
  //   category: "backend",
  //   subCategory: "be-languages",
  //   tags: ["Systems", "Safety", "HighPerformance", "Language"],
  // },
  // {
  //   id: "be-nestjs",
  //   title: "NestJS",
  //   description:
  //     "A framework for building efficient, reliable, and scalable Node.js servers",
  //   url: "https://nestjs.com",
  //   category: "backend",
  //   subCategory: "be-frameworks",
  //   tags: ["Node.js", "TypeScript", "Architecture", "Enterprise"],
  // },
  // {
  //   id: "be-fastapi",
  //   title: "FastAPI",
  //   description:
  //     "A high-performance, lightweight Web API framework based on Python type hints",
  //   url: "https://fastapi.tiangolo.com/zh/",
  //   category: "backend",
  //   subCategory: "be-frameworks",
  //   tags: ["Python", "API", "Async", "Performance"],
  // },
  // {
  //   id: "be-express",
  //   title: "Express.js",
  //   description: "A fast, open, and minimalist Web framework for Node.js",
  //   url: "https://expressjs.com",
  //   category: "backend",
  //   subCategory: "be-frameworks",
  //   tags: ["Node.js", "Web", "Middleware"],
  // },

  // // --- Database ---
  // {
  //   id: "db-postgres",
  //   title: "PostgreSQL",
  //   description:
  //     "A powerful open-source relational database focused on extensibility and SQL standards",
  //   url: "https://www.postgresql.org",
  //   category: "database",
  //   subCategory: "db-engines",
  //   tags: ["SQL", "Relational", "ACID", "OpenSource"],
  //   featured: true,
  // },
  // {
  //   id: "db-redis",
  //   title: "Redis",
  //   description:
  //     "A fast in-memory data store used as a database, cache, and streaming engine",
  //   url: "https://redis.io",
  //   category: "database",
  //   subCategory: "db-engines",
  //   tags: ["Cache", "NoSQL", "InMemory", "HighPerformance"],
  // },
  // {
  //   id: "db-mongodb",
  //   title: "MongoDB",
  //   description:
  //     "A popular document NoSQL database with flexible modeling and horizontal scaling",
  //   url: "https://www.mongodb.com",
  //   category: "database",
  //   subCategory: "db-engines",
  //   tags: ["NoSQL", "Document", "Database", "Cloud"],
  // },
  // {
  //   id: "db-supabase",
  //   title: "Supabase",
  //   description:
  //     "An open-source Firebase alternative built on Postgres with instant APIs and auth",
  //   url: "https://supabase.com",
  //   category: "database",
  //   subCategory: "db-orm-baas",
  //   tags: ["PostgreSQL", "BaaS", "Auth", "Realtime"],
  //   featured: true,
  // },
  // {
  //   id: "db-prisma",
  //   title: "Prisma",
  //   description:
  //     "A next-generation, type-safe database ORM for Node.js and TypeScript",
  //   url: "https://www.prisma.io",
  //   category: "database",
  //   subCategory: "db-orm-baas",
  //   tags: ["ORM", "TypeScript", "SQL", "Schema"],
  // },
  // {
  //   id: "db-drizzle",
  //   title: "Drizzle ORM",
  //   description:
  //     "A lightweight, zero-dependency TypeScript ORM with a SQL-like experience",
  //   url: "https://orm.drizzle.team",
  //   category: "database",
  //   subCategory: "db-orm-baas",
  //   tags: ["ORM", "TypeScript", "Lightweight"],
  // },

  // // --- Dev Tools ---
  // {
  //   id: "tool-github",
  //   title: "GitHub",
  //   description:
  //     "A home for code hosting, version control, collaboration, and open source",
  //   url: "https://github.com",
  //   category: "tools",
  //   subCategory: "tool-dev",
  //   tags: ["Git", "Collaboration", "OpenSource", "CI/CD"],
  //   featured: true,
  // },
  // {
  //   id: "tool-devdocs",
  //   title: "DevDocs",
  //   description:
  //     "A fast offline reference and search tool with 100+ popular technology docs",
  //   url: "https://devdocs.io",
  //   category: "tools",
  //   subCategory: "tool-dev",
  //   tags: ["Docs", "Offline", "Search", "API"],
  //   featured: true,
  // },
  // {
  //   id: "tool-hoppscotch",
  //   title: "Hoppscotch",
  //   description:
  //     "An open-source, lightweight, and fast tool for testing and debugging APIs online",
  //   url: "https://hoppscotch.io",
  //   category: "tools",
  //   subCategory: "tool-efficiency",
  //   tags: ["API", "HTTP", "Testing", "PostmanAlternative"],
  // },
  // {
  //   id: "tool-regex101",
  //   title: "Regex101",
  //   description:
  //     "A powerful regex tester with real-time highlighting, explanation, and debugging",
  //   url: "https://regex101.com",
  //   category: "tools",
  //   subCategory: "tool-efficiency",
  //   tags: ["Regex", "Debugging", "Testing", "Utility"],
  //   featured: true,
  // },
  // {
  //   id: "tool-transform",
  //   title: "transform.tools",
  //   description: "Convert JSON to TS, SVG to JSX, CSS to Tailwind, and more",
  //   url: "https://transform.tools",
  //   category: "tools",
  //   subCategory: "tool-efficiency",
  //   tags: ["Converter", "JSON", "TypeScript", "SVG"],
  // },
  // {
  //   id: "tool-bundlephobia",
  //   title: "Bundlephobia",
  //   description:
  //     "Quickly check NPM package size, loading time, and dependency cost",
  //   url: "https://bundlephobia.com",
  //   category: "tools",
  //   subCategory: "tool-efficiency",
  //   tags: ["NPM", "Size", "Performance", "Web"],
  // },
  // {
  //   id: "tool-jsoncrack",
  //   title: "JSON Crack",
  //   description:
  //     "Visualize complex JSON, YAML, and XML data as intuitive tree diagrams",
  //   url: "https://jsoncrack.com",
  //   category: "tools",
  //   subCategory: "tool-efficiency",
  //   tags: ["JSON", "Visualization", "Tree", "Debug"],
  // },
  // {
  //   id: "tool-carbon",
  //   title: "Carbon",
  //   description:
  //     "Create and share beautiful, high-resolution images of code snippets",
  //   url: "https://carbon.now.sh",
  //   category: "tools",
  //   subCategory: "tool-efficiency",
  //   tags: ["Snippet", "Image", "Share", "Design"],
  // },

  // // --- DevOps & Cloud ---
  // {
  //   id: "ops-vercel",
  //   title: "Vercel",
  //   description:
  //     "An automated global hosting and deployment platform for frontend and full-stack developers",
  //   url: "https://vercel.com",
  //   category: "devops",
  //   subCategory: "ops-cloud",
  //   tags: ["Deploy", "Serverless", "Edge", "CI/CD"],
  //   featured: true,
  // },
  // {
  //   id: "ops-cloudflare",
  //   title: "Cloudflare",
  //   description:
  //     "Global CDN, security, accelerated DNS, and edge computing with Workers",
  //   url: "https://www.cloudflare.com/zh-cn/",
  //   category: "devops",
  //   subCategory: "ops-cloud",
  //   tags: ["CDN", "DNS", "Workers", "Security"],
  // },
  // {
  //   id: "ops-docker",
  //   title: "Docker",
  //   description:
  //     "An application container platform that unifies development, testing, and production",
  //   url: "https://www.docker.com",
  //   category: "devops",
  //   subCategory: "ops-container",
  //   tags: ["Container", "DevOps", "Virtualization"],
  //   featured: true,
  // },
  // {
  //   id: "ops-k8s",
  //   title: "Kubernetes",
  //   description:
  //     "An open-source system for automating deployment, scaling, and management of containers",
  //   url: "https://kubernetes.io/zh-cn/",
  //   category: "devops",
  //   subCategory: "ops-container",
  //   tags: ["Container", "Orchestration", "CloudNative"],
  // },
  // {
  //   id: "ops-linuxcommand",
  //   title: "Linux Command Cheatsheet",
  //   description:
  //     "A comprehensive, concise reference of common Linux commands and options",
  //   url: "https://wangchujiang.com/linux-command/",
  //   category: "devops",
  //   subCategory: "ops-container",
  //   tags: ["Linux", "Shell", "Cheatsheet", "Bash"],
  // },

  // // --- Community ---
  // {
  //   id: "com-ghtrending",
  //   title: "GitHub Trending",
  //   description:
  //     "Explore GitHub open-source projects trending daily and weekly",
  //   url: "https://github.com/trending",
  //   category: "community",
  //   subCategory: "com-trending",
  //   tags: ["OpenSource", "Trending", "Hot", "Explore"],
  //   featured: true,
  // },
  // {
  //   id: "com-hackernews",
  //   title: "Hacker News",
  //   description:
  //     "A geek-focused source for tech startups, deep discussion, and news from Y Combinator",
  //   url: "https://news.ycombinator.com",
  //   category: "community",
  //   subCategory: "com-forums",
  //   tags: ["News", "Tech", "Startup", "Global"],
  //   featured: true,
  // },
  // {
  //   id: "com-v2ex",
  //   title: "V2EX",
  //   description:
  //     "A focused community for programmers, designers, and creative makers",
  //   url: "https://www.v2ex.com",
  //   category: "community",
  //   subCategory: "com-forums",
  //   tags: ["Community", "Forum", "Discussion", "China"],
  // },
  // {
  //   id: "com-juejin",
  //   title: "Juejin",
  //   description:
  //     "A Chinese community for quality technical content and developer growth",
  //   url: "https://juejin.cn",
  //   category: "community",
  //   subCategory: "com-forums",
  //   tags: ["Articles", "Frontend", "Backend", "China"],
  // },
  // {
  //   id: "com-devto",
  //   title: "DEV Community",
  //   description:
  //     "An open, friendly community for software developers to publish articles and share experience",
  //   url: "https://dev.to",
  //   category: "community",
  //   subCategory: "com-forums",
  //   tags: ["Blog", "Global", "WebDev", "Tutorials"],
  // },
];
