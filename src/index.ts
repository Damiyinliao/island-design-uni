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
