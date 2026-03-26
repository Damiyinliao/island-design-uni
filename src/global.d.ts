declare module 'vue' {
  export interface GlobalComponents {
    IslandScroll: typeof import('./components/island-scroll')['default']
  }
}

export {}
