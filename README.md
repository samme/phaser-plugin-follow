Phaser 3 Follow Plugin
======================

```javascript
new Phaser.Game({
  plugins: {
    scene: [{ key: 'FollowPlugin', plugin: PhaserFollowPlugin, mapping: 'follow' }]
  }
});
```

If you're using ES6 modules, you can use the plugin's default export in place of `PhaserFollowPlugin`.

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
