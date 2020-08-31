import React from 'react'
import { IconContainer } from '../icon-container.component'

export const ArrowRightIcon = IconContainer(
  <svg width="35" height="34" viewBox="0 0 35 34" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4167 7.74626L13.3935 5.66666L24.1667 17L13.3935 28.3333L11.4167 26.2537L20.213 17L11.4167 7.74626Z" />
    <mask id="mask-right" mask-type="alpha" maskUnits="userSpaceOnUse" x="11" y="5" width="14" height="24">
      <path d="M11.4167 7.74626L13.3935 5.66666L24.1667 17L13.3935 28.3333L11.4167 26.2537L20.213 17L11.4167 7.74626Z" />
    </mask>
    <g mask="url(#mask-right)">
      <rect width="34" height="34" />
    </g>
  </svg>
)
