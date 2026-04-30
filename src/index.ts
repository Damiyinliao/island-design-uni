import type { App, Plugin } from 'vue'
import { components } from './components'

export { default as IslandScroll } from './components/island-scroll'
export type { IslandScrollProps } from './components/island-scroll'
export { default as IslandText } from './components/island-text'
export type { IslandTextProps } from './components/island-text'
export { default as IslandImage } from './components/island-image'
export type { IslandImageMode, IslandImageProps } from './components/island-image'
export { default as IslandModal } from './components/island-modal'
export type { IslandModalProps } from './components/island-modal'
export { default as AnimateModal } from './components/animate-modal'
export type { AnimateModalProps } from './components/animate-modal'
export { default as IslandNavbar } from './components/island-navbar'
export type { IslandNavbarProps } from './components/island-navbar'
export { default as IslandPopup } from './components/island-popup'
export type {
  IslandPopupCloseIconPosition,
  IslandPopupPosition,
  IslandPopupProps,
  IslandPopupTransitionName
} from './components/island-popup'
export { default as IslandEllipsis } from './components/island-ellipsis'
export type {
  IslandEllipsisedValue,
  IslandEllipsisChangeValue,
  IslandEllipsisDirection,
  IslandEllipsisProps
} from './components/island-ellipsis'
export { default as IslandTransition } from './components/island-transition'
export type { IslandTransitionName, IslandTransitionProps, IslandTransitionTimingFunction } from './components/island-transition'
export { default as IslandLoadingPage } from './components/island-loading-page'
export type { IslandLoadingPageProps } from './components/island-loading-page'

const IslandDesignUni: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      const componentName = (component as { name?: string }).name

      if (componentName) {
        app.component(componentName, component)
      }
    })
  }
}

export default IslandDesignUni
