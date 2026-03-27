export interface IslandComponentResolveResult {
  name: string
  from: string
}

export interface IslandComponentResolver {
  type: 'component'
  resolve: (name: string) => IslandComponentResolveResult | undefined
}

function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

export function IslandResolver(): IslandComponentResolver {
  return {
    type: 'component',
    resolve: (name) => {
      if (name.match(/^Island[A-Z]/)) {
        const componentName = kebabCase(name)

        return {
          name,
          from: `island-design-uni/components/${componentName}/${componentName}.vue`
        }
      }
    }
  }
}
