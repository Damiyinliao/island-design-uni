import type { ExtractPropTypes, PropType } from 'vue'

export const islandScrollProps = {
  resetKey: {
    type: [String, Number] as PropType<string | number>,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
  dataTotal: {
    type: Number,
    default: 0
  },
  height: {
    type: [String, Number] as PropType<string | number>,
    default: 300
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  background: {
    type: String,
    default: ''
  },
  padding: {
    type: String,
    default: '0'
  },
  loadDone: {
    type: Boolean,
    default: false
  },
  bottomOffset: {
    type: [String, Number] as PropType<string | number>,
    default: 0
  },
  upperThreshold: {
    type: Number,
    default: 0
  },
  lowerThreshold: {
    type: Number,
    default: 50
  },
  loadText: {
    type: String,
    default: 'Load more'
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  finishedText: {
    type: String,
    default: ''
  }
}

export type IslandScrollProps = ExtractPropTypes<typeof islandScrollProps>
