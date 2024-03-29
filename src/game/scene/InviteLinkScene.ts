import { Scene } from 'phaser'
import { create } from 'qrcode'

import type { GamePlugin as PeerjsGamePlugin } from '../peerjs'

export default class InviteLinkScene extends Scene {
  peerjs!: PeerjsGamePlugin

  constructor() {
    super({
      key: 'InviteLink',
    })
  }

  preload() {
    this.load.image('nine', 'assets/ui/nine.png')
    this.load.image('nineLight', 'assets/ui/nineLight.png')
  }

  create() {
    const remote = new URL(location.href).searchParams.get('r')
    let green: string
    let red: string

    if (remote) {
      green = remote
      red = this.peerjs.id!
      this.peerjs.connectRemote(remote)
    }
    else {
      const url = `${location.origin}${location.pathname}?r=${this.peerjs.id}`

      // eslint-disable-next-line no-console
      console.log(url)

      green = this.peerjs.id!

      this.add.nineslice(
        this.scale.width / 2,
        this.scale.height / 2,
        'nineLight',
        'nineLight',
        340,
        340,
        16,
        16,
        16,
        16,
      )

      const { modules: { size, data } } = create(url)
      const layout = Array.from(
        { length: size },
        (_, i) => Array
          .from(data.subarray(size * i, size * (i + 1)))
          .map(v => 45 - v),
      )
      const map = this.make.tilemap({ data: layout, tileWidth: 16, tileHeight: 16 })
      map.createLayer(0, [map.addTilesetImage('TilesetDungeon')!], 92, 92)!.setScale(0.5)
    }

    this.peerjs.connect.then((remote: string) => {
      this.scene.start('Game', { mode: 'vs', green, red: red || remote })
    })
  }
}
