import type { ExtractPropTypes, PropType } from 'vue'

export type IslandImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

export const islandImageProps = {
  size: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  radius: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  src: {
    type: String,
    default: ''
  },
  mode: {
    type: String as PropType<IslandImageMode>,
    default: 'widthFix'
  },
  preview: {
    type: Boolean,
    default: false
  },
  lazyLoad: {
    type: Boolean,
    default: true
  },
  showSkeleton: {
    type: Boolean,
    default: true
  }
}

export type IslandImageProps = ExtractPropTypes<typeof islandImageProps>
