import { installComponent } from '@bluepha-ui-plus/utils'

import Card from './card.vue'

export const BlCard = installComponent(Card)
export default BlCard

export * from './card'
export type { CardInstance } from './instance'
