console.assert(Phaser, 'Phaser');

console.assert(Phaser.Plugins.FollowPlugin, 'Phaser.Plugins.FollowPlugin');

var scene = {

  create: function () {
    var target = this.add.image(200, 150, '__missing');
    var follower = this.add.image(0, 0, '__missing');

    this.follow.add(follower, {
      target: target,
      offsetX: 64,
      offsetY: 32,
      rotateOffset: true
    });

    this.tweens.add({ targets: target, x: 600, y: 450, rotation: Phaser.Math.PI2, duration: 4000 });

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
    var follower = this.add.image(0, 0, '__missing');

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
  type: Phaser.AUTO,
  roundPixels: true,
  width: 800,
  height: 600,
  scene: scene,
  plugins: {
    scene: [{ key: 'FollowPlugin', plugin: Phaser.Plugins.FollowPlugin, mapping: 'follow' }]
  }
};

window.game = new Phaser.Game(config);
