import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const islandLoadingPageProps = {
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '正在加载'
  },
  image: {
    type: String,
    default: ''
  },
  bgColor: {
    type: String,
    default: '#ffffff'
  },
  customColor: {
    type: String,
    default: '#c8c8c8'
  },
  fontSize: {
    type: [String, Number] as PropType<string | number>,
    default: 19
  },
  iconSize: {
    type: [String, Number] as PropType<string | number>,
    default: 28
  },
  loadingColor: {
    type: String,
    default: '#c8c8c8'
  },
  zIndex: {
    type: Number,
    default: 9999
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

export type IslandLoadingPageProps = ExtractPropTypes<typeof islandLoadingPageProps>
