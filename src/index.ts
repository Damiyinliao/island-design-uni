import type { App, Plugin } from 'vue'
import { components } from './components'

export { default as IslandScroll } from './components/island-scroll'
export type { IslandScrollProps } from './components/island-scroll'

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
