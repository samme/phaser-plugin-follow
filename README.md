Phaser 3 Follow Plugin
======================

```javascript
new Phaser.Game({
  plugins: {
    scene: [{ key: 'FollowPlugin', plugin: PhaserFollowPlugin, mapping: 'follow' }]
  }
});
```

`PhaserFollowPlugin` is a global reference to the plugin class. The package module exports the same value.

In a scene:

```javascript
this.follow.add(follower, {
  target: target, // Required.
  offsetX: 0,
  offsetY: 0,
  rotate: false,
  rotateOffset: false
});

this.follow.pause(follower);

this.follow.resume(follower);

this.follow.remove(follower);
```
