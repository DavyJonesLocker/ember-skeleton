import Ember from 'ember';

const {
  set,
  get,
  on
} = Ember;

export default Ember.Component.extend({
  setupSrcs: on('init', function() {
    set(this, 'actualSrc', get(this, 'src'));
    set(this, 'src', get(this, 'tmpSrc'));
    set(this, 'loadState', 'loading');
  }),
  setupImgBindings: on('init', function() {
    set(this, 'imgBindings', {
      loadTmp: this.loadTmp.bind(this),
      loadActual: this.loadActual.bind(this),
      errorActual: this.errorActual.bind(this)
    });
  }),
  classNames: ['skeleton-img'],
  classNameBindings: ['loadState'],
  tagName: 'img',
  attributeBindings: [
    'src'
  ],
  didInsertElement() {
    let target = this.element;
    let loadTmp = get(this, 'imgBindings.loadTmp');
    target.addEventListener('load', loadTmp);
  },
  loadTmp(event) {
    let target = event.target;
    let loadTmp = get(this, 'imgBindings.loadTmp');
    let loadActual = get(this, 'imgBindings.loadActual');
    let errorActual = get(this, 'imgBindings.errorActual');
    target.removeEventListener('load', loadTmp);
    target.addEventListener('load', loadActual);
    target.addEventListener('error', errorActual);
    set(this, 'src', get(this, 'actualSrc'));
  },
  loadActual(event) {
    set(this, 'loadState', 'loaded');
    this.removeEvents(event.target);
  },
  errorActual(event) {
    let errorSrc = get(this, 'errorSrc') || get(this, 'tmpSrc');
    this.removeEvents(event.target);
    set(this, 'src', errorSrc);
    set(this, 'loadState', 'load-error');
  },
  removeEvents(target) {
    let loadActual = get(this, 'imgBindings.loadActual');
    let errorActual = get(this, 'imgBindings.errorActual');
    target.removeEventListener('load', loadActual);
    target.removeEventListener('error', errorActual);
  }
});
