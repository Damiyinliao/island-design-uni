const picUrlPrefix = 'https://whwebasset.oss-cn-hangzhou.aliyuncs.com/island-miniprogram/'

export const islandIconMap = {
  zhi: `${picUrlPrefix}zhi.png`,
  fu: `${picUrlPrefix}fu.png`,
  'island-store': `${picUrlPrefix}island-store.png`,
  'langhua-coin-second': `${picUrlPrefix}langhuacoin.png`,
  'culture-series-1': `${picUrlPrefix}culture-series-4.png`,
  'culture-series-2': `${picUrlPrefix}culture-series-1.png`,
  'culture-series-3': `${picUrlPrefix}culture-series-3.png`,
  'culture-series-4': `${picUrlPrefix}culture-series-2.png`,
  outdate: `${picUrlPrefix}outdate.png`,
  used: `${picUrlPrefix}used.png`,
  'anzai-customer': `${picUrlPrefix}anzai-customer.png`,
  integral: `${picUrlPrefix}integral.png`,
  'goods-box': `${picUrlPrefix}goods-box.png`,
  'anzai-naked': `${picUrlPrefix}anzai-naked.png`,
  'gradient-btn': `${picUrlPrefix}gradient-btn.png`,
  'grey-langhuacoin': `${picUrlPrefix}grey-langhuacoin.png`,
  'morning-singin': `${picUrlPrefix}morning-singin.png`,
  'try-signin': `${picUrlPrefix}try-signin.png`,
  'langhua-coin-third': `${picUrlPrefix}new-langhua-coin.png`,
  'an-island-font-white': `${picUrlPrefix}an-island-font-white.png`,
  'free-welfare-font': `${picUrlPrefix}free-welfare-font.png`,
  'free-welfare-font-company': `${picUrlPrefix}free-welfare-font-company.png`,
  'free-welfare-font-year': `${picUrlPrefix}free-welfare-font-year.png`,
  'point-mall-font': `${picUrlPrefix}point-mall-font-blue.png`,
  'an-island-font-blue': `${picUrlPrefix}an-island-font-blue.png`,
  'an-island-font-shallow-blue': `${picUrlPrefix}an-island-font-shallow-blue.png`,
  'island-font-icon': `${picUrlPrefix}an-island-font&icon.png`,
  'point-mall-font-white': `${picUrlPrefix}point-mall-font-white.png`,
  'coffee-cup-blue': `${picUrlPrefix}coffee-cup-blue.png`,
  'langhua-coin': `${picUrlPrefix}langhua-coin.png`,
  'white-island': `${picUrlPrefix}white-island-brand.png`
} as const

export type IslandIconName = keyof typeof islandIconMap
