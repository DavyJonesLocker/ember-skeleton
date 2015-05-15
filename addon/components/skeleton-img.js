import Ember from 'ember';

const {
  set,
  get,
  on
} = Ember;

export default Ember.Component.extend({
  setup: on('init', function() {
    set(this, 'imgBindings', {
      load: this.load.bind(this),
      error: this.error.bind(this)
    });

    this.setupActualImg();

    set(this, 'src', get(this, 'tmpSrc'));
    set(this, 'loadState', 'loading');
  }),
  setupActualImg() {
    let img = new Image();
    img.addEventListener('load', get(this, 'imgBindings.load'));
    img.addEventListener('error', get(this, 'imgBindings.error'));
    img.src = get(this, 'src');
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
