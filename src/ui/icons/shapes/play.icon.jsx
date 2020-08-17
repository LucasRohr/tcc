import React from 'react'
import { IconContainer } from '../icon-container.component'

export const PlayIcon = IconContainer(
  <svg width="35" height="42" viewBox="0 0 35 42" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d)">
      <path d="M25.4947 18.2388L11.526 8.67584C10.8809 8.2339 10.2309 8 9.69062 8C8.64612 8 8 8.83829 8 10.2415V30.9098C8 32.3114 8.64531 33.148 9.68736 33.148C10.2284 33.148 10.8681 32.9139 11.5146 32.4707L25.4898 22.908C26.3886 22.292 26.8863 21.4631 26.8863 20.5729C26.8865 19.6833 26.3945 18.8546 25.4947 18.2388Z" />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="0"
        y="0"
        width="34.8863"
        height="41.148"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0.15 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
)
