import Ember from 'ember';

const {
  set,
  get,
  on,
  addObserver,
  removeObserver
} = Ember;

export default Ember.Component.extend({
  renderSrc: true,
  setup: on('init', function() {
    set(this, 'imgBindings', {
      load: this.load.bind(this),
      error: this.error.bind(this),
      setup: this.setupActualImg.bind(this)
    });

    set(this, 'actualSrc', get(this, 'src'));
    set(this, 'src', get(this, 'tmpSrc'));
    set(this, 'loadState', 'loading');

    if(get(this, 'renderSrc')) {
      this.setupActualImg();
    } else {
      addObserver(this, 'renderSrc', get(this, 'imgBindings.setup'));
    }
  }),
  setupActualImg() {
    let img = new Image();
    img.addEventListener('load', get(this, 'imgBindings.load'));
    img.addEventListener('error', get(this, 'imgBindings.error'));
    removeObserver(this, 'renderSrc', get(this, 'imgBindings.setup'));
    img.src = get(this, 'actualSrc');
    set(this, 'actualImg', img);
  },
  classNames: ['skeleton-img'],
  classNameBindings: ['loadState'],
  tagName: 'img',
  attributeBindings: [
    'src'
  ],
  load() {
    let actualImg = get(this, 'actualImg');
    set(this, 'loadState', 'loaded');
    set(this, 'src', actualImg.src);
  },
  error() {
    let errorSrc = get(this, 'errorSrc') || get(this, 'tmpSrc');

    if (errorSrc !== get(this, 'src')) {
      set(this, 'src', errorSrc);
    }

    set(this, 'loadState', 'load-error');
  },
});
