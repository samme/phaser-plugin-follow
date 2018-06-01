Phaser 3 Follow Plugin
======================

```javascript
new Phaser.Game({
  plugins: {
    scene: [{ key: 'FollowPlugin', plugin: Phaser.Plugins.FollowPlugin, mapping: 'follow' }]
  }
});
```

In a scene:

```javascript
this.follow.add(obj1, {
  target: obj2, // Required.
  offsetX: 0,
  offsetY: 0,
  rotate: false,
  rotateOffset: false
});

this.follow.pause(obj1);

this.follow.resume(obj1);

this.follow.remove(obj1);
```
