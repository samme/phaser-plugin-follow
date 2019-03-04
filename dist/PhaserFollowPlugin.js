(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('phaser-plugin-follow', ['exports', 'phaser'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('phaser'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Phaser);
    global.phaserPluginFollow = mod.exports;
  }
})(this, function (exports, _phaser) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _phaser2 = _interopRequireDefault(_phaser);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DATA_KEY = '_follow';
  var GetFastValue = _phaser2.default.Utils.Objects.GetFastValue;
  var RotateAround = _phaser2.default.Math.RotateAround;

  var FollowPlugin = function (_Phaser$Plugins$Scene) {
    _inherits(FollowPlugin, _Phaser$Plugins$Scene);

    function FollowPlugin() {
      _classCallCheck(this, FollowPlugin);

      return _possibleConstructorReturn(this, (FollowPlugin.__proto__ || Object.getPrototypeOf(FollowPlugin)).apply(this, arguments));
    }

    _createClass(FollowPlugin, [{
      key: 'boot',
      value: function boot() {
        this.gameObjects = new _phaser2.default.Structs.Set();

        this.systems.events.on('postupdate', this.sceneUpdate, this).on('shutdown', this.sceneShutdown, this).once('destroy', this.sceneDestroy, this);
      }
    }, {
      key: 'sceneUpdate',
      value: function sceneUpdate() {
        this.gameObjects.iterate(this.updateObject, this);
      }
    }, {
      key: 'sceneShutdown',
      value: function sceneShutdown() {
        this.gameObjects.clear();
      }
    }, {
      key: 'sceneDestroy',
      value: function sceneDestroy() {
        this.systems.events.off('postupdate', this.scenePostUpdate, this).off('shutdown', this.sceneShutdown, this).off('destroy', this.sceneDestroy, this);

        this.gameObjects = null;
        this.scene = null;
        this.systems = null;
      }
    }, {
      key: 'updateObject',
      value: function updateObject(obj) {
        var data = obj.getData(DATA_KEY);
        var target = data.target;

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
    }, {
      key: 'add',
      value: function add(obj, options) {
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
    }, {
      key: 'remove',
      value: function remove(obj) {
        obj.data.remove(DATA_KEY);
        this.gameObjects.delete(obj);
      }
    }, {
      key: 'pause',
      value: function pause(obj) {
        obj.getData(DATA_KEY).active = false;
      }
    }, {
      key: 'resume',
      value: function resume(obj) {
        obj.getData(DATA_KEY).active = true;
      }
    }]);

    return FollowPlugin;
  }(_phaser2.default.Plugins.ScenePlugin);

  exports.default = FollowPlugin;


  if (typeof window !== 'undefined') {
    window.PhaserFollowPlugin = FollowPlugin;
  }
});
