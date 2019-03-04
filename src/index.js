import Phaser from 'phaser';

const DATA_KEY = '_follow';
const GetFastValue = Phaser.Utils.Objects.GetFastValue;
const RotateAround = Phaser.Math.RotateAround;

export default class FollowPlugin extends Phaser.Plugins.ScenePlugin {

  boot () {
    this.gameObjects = new Phaser.Structs.Set();

    this.systems.events
      .on('postupdate', this.sceneUpdate, this)
      .on('shutdown', this.sceneShutdown, this)
      .once('destroy', this.sceneDestroy, this);
  }

  sceneUpdate () {
    this.gameObjects.iterate(this.updateObject, this);
  }

  sceneShutdown () {
    this.gameObjects.clear();
  }

  sceneDestroy () {
    this.systems.events
      .off('postupdate', this.scenePostUpdate, this)
      .off('shutdown', this.sceneShutdown, this)
      .off('destroy', this.sceneDestroy, this);

    this.gameObjects = null;
    this.scene = null;
    this.systems = null;
  }

  updateObject (obj) {
    const data = obj.getData(DATA_KEY);
    const target = data.target;

    if (!data.active) {
      return;
    }

    obj.setPosition(target.x + data.offsetX, target.y + data.offsetY);

    if (data.rotate) {
      obj.rotation = target.rotation;
    }

    if (data.rotateOffset) {
      RotateAround(obj, target.x, target.y, target.rotation);
    }
  }

  add (obj, options) {
    obj.setData(DATA_KEY, {
      target: GetFastValue(options, 'target'),
      offsetX: GetFastValue(options, 'offsetX', 0),
      offsetY: GetFastValue(options, 'offsetY', 0),
      rotate: GetFastValue(options, 'rotate', false),
      rotateOffset: GetFastValue(options, 'rotateOffset', false),
      active: true
    });

    this.gameObjects.set(obj);
  }

  remove (obj) {
    obj.data.remove(DATA_KEY);
    this.gameObjects.delete(obj);
  }

  pause (obj) {
    obj.getData(DATA_KEY).active = false;
  }

  resume (obj) {
    obj.getData(DATA_KEY).active = true;
  }

}

if (typeof window !== 'undefined') {
  window.PhaserFollowPlugin = FollowPlugin;
}
