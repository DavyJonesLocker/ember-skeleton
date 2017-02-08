import Ember from 'ember';

const {
  set,
  get,
  addObserver,
  setProperties,
  getWithDefault,
  removeObserver,
  Component
} = Ember;

export default Component.extend({
  classNames: ['skeleton-img'],
  classNameBindings: ['loadState'],
  tagName: 'img',
  attributeBindings: ['src'],
  renderSrc: true,

  init() {
    this._super(...arguments);

    let renderSrc = get(this, 'renderSrc');

    set(this, 'imgBindings', {
      load: this.load.bind(this),
      error: this.error.bind(this),
      setup: this.setupActualImg.bind(this)
    });

    set(this, 'actualSrc', get(this, 'src'));
    set(this, 'src', get(this, 'tmpSrc'));
    set(this, 'loadState', 'loading');

    if (renderSrc) {
      this.setupActualImg();
    } else {
      addObserver(this, 'renderSrc', get(this, 'imgBindings.setup'));
    }
  },

  setupActualImg() {
    let img = new Image();
    img.addEventListener('load', get(this, 'imgBindings.load'));
    img.addEventListener('error', get(this, 'imgBindings.error'));
    removeObserver(this, 'renderSrc', get(this, 'imgBindings.setup'));
    img.src = get(this, 'actualSrc');
    set(this, 'actualImg', img);
  },

  load() {
    let { src } = get(this, 'actualImg');
    setProperties(this, { loadState: 'loaded', src });
  },

  error() {
    let src = get(this, 'src');
    let tmpSrc = get(this, 'tmpSrc');
    let errorSrc = getWithDefault(this, 'errorSrc', tmpSrc);

    if (errorSrc !== src) {
      set(this, 'src', errorSrc);
    }

    set(this, 'loadState', 'load-error');
  }
});
