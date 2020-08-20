import React from 'react'
import { IconContainer } from '../icon-container.component'

export const ArrowLeftIcon = IconContainer(
  <svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.6667 7.74626L20.6898 5.66666L9.91667 17L20.6898 28.3333L22.6667 26.2537L13.8703 17L22.6667 7.74626Z" />
    <mask id="mask-left" mask-type="alpha" maskUnits="userSpaceOnUse" x="9" y="5" width="14" height="24">
      <path d="M22.6667 7.74626L20.6898 5.66666L9.91667 17L20.6898 28.3333L22.6667 26.2537L13.8703 17L22.6667 7.74626Z" />
    </mask>
    <g mask="url(#mask-left)">
      <rect width="34" height="34" />
    </g>
  </svg>
)
