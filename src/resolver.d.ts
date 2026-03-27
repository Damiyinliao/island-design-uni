export interface IslandComponentResolveResult {
  name: string
  from: string
}

export interface IslandComponentResolver {
  type: 'component'
  resolve: (name: string) => IslandComponentResolveResult | undefined
}

export declare function IslandResolver(): IslandComponentResolver
