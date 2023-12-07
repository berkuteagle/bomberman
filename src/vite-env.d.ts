/// <reference types="vite/client" />

import type Bomberman from './game/Bomberman'

declare global {
  interface Window { bomberman: Bomberman }
}
