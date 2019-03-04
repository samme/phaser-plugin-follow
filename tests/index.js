console.assert(Phaser, 'Phaser');

console.assert(PhaserFollowPlugin, 'PhaserFollowPlugin');

var scene = {

  create: function () {
    var target = this.add.star(200, 150, 5, 25, 50, 0xff6600);
    var follower = this.add.rectangle(0, 0, 25, 50, 0x00ff66);

    this.follow.add(follower, {
      target: target,
      offsetX: 100,
      offsetY: 75,
      rotateOffset: true
    });

    this.tweens.add({ targets: target, x: 600, y: 450, rotation: Phaser.Math.PI2, duration: 4000, repeat: -1, yoyo: true, ease: 'Quad.easeInOut' });

    this.input.on('pointerdown', function () {
      this.follow.pause(follower);
    }, this);

    this.input.on('pointerup', function () {
      this.follow.resume(follower);
    }, this);

    // this.follow.remove(follower);
  },

  followPointer: function () {
    var target = new Phaser.Math.Vector2;
    var follower = this.add.circle(0, 0, 50, 0x00ccff);

    this.follow.add(follower, {
      target: target,
      offsetX: 64,
      offsetY: 32
    });

    this.input.on('pointermove', function (pointer) {
      target.copy(pointer);
    });
  }

};

var config = {
  width: 800,
  height: 600,
  scene: scene,
  plugins: {
    scene: [{ key: 'FollowPlugin', plugin: PhaserFollowPlugin, mapping: 'follow' }]
  }
};

window.game = new Phaser.Game(config);
