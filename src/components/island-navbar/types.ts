import type { ExtractPropTypes, PropType } from 'vue'

export const islandNavbarProps = {
  title: {
    type: String,
    default: ''
  },
  backFunc: {
    type: Function as PropType<() => void>,
    default: undefined
  },
  backIcon: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    default: 'transparent'
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  homePath: {
    type: String,
    default: ''
  }
}

export type IslandNavbarProps = ExtractPropTypes<typeof islandNavbarProps>
