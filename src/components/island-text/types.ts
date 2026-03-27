import type { ExtractPropTypes, PropType } from 'vue'

export const islandTextProps = {
  size: {
    type: Number,
    default: 14
  },
  weight: {
    type: Number,
    default: 400,
  },
  color: {
    type: String,
    default: undefined,
  },
  lineCount: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  activeColor: {
    type: String,
    default: undefined,
  },
  text: {
    type: String,
    default: undefined,
  }
}

export type IslandTextProps = ExtractPropTypes<typeof islandTextProps>