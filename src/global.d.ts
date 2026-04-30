declare module 'vue' {
  export interface GlobalComponents {
    AnimateModal: typeof import('./components/animate-modal')['default']
    IslandEllipsis: typeof import('./components/island-ellipsis')['default']
    IslandIcon: typeof import('./components/island-icon')['default']
    IslandImage: typeof import('./components/island-image')['default']
    IslandLoadingPage: typeof import('./components/island-loading-page')['default']
    IslandModal: typeof import('./components/island-modal')['default']
    IslandNavbar: typeof import('./components/island-navbar')['default']
    IslandPopup: typeof import('./components/island-popup')['default']
    IslandScroll: typeof import('./components/island-scroll')['default']
    IslandText: typeof import('./components/island-text')['default']
    IslandTransition: typeof import('./components/island-transition')['default']
  }
}

export {}
