import type { ExtractPropTypes, PropType } from 'vue'
import type { IslandIconName } from './icons'

export const islandIconProps = {
  name: {
    type: String as PropType<IslandIconName>,
    required: true
  },
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 30
  },
  radius: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  mode: {
    type: String,
    default: 'scaleToFill'
  },
  lazyLoad: {
    type: Boolean,
    default: false
  }
}

export type IslandIconProps = ExtractPropTypes<typeof islandIconProps>
