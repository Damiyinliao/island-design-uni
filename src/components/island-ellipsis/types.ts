import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export type IslandEllipsisDirection = 'start' | 'end' | 'middle'
export type IslandEllipsisChangeValue = 'expand' | 'collapse'

export interface IslandEllipsisedValue {
  leading?: string
  tailing?: string
}

export const islandEllipsisProps = {
  content: {
    type: String,
    default: ''
  },
  direction: {
    type: String as PropType<IslandEllipsisDirection>,
    default: 'end'
  },
  rows: {
    type: [String, Number] as PropType<string | number>,
    default: 1
  },
  expandText: {
    type: String,
    default: ''
  },
  collapseText: {
    type: String,
    default: ''
  },
  symbol: {
    type: String,
    default: '...'
  },
  lineHeight: {
    type: [String, Number] as PropType<string | number>,
    default: 20
  },
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined
  }
}

export type IslandEllipsisProps = ExtractPropTypes<typeof islandEllipsisProps>
