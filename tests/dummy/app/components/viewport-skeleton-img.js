import Ember from 'ember';
import SkeletonImg from 'ember-skeleton/components/skeleton-img';
import InViewportMixin from 'ember-in-viewport';

const {
  set,
  on
} = Ember;

export default SkeletonImg.extend(InViewportMixin, {
  renderSrc: false,
  didEnterViewport() {
    set(this, 'renderSrc', true);
  },
  classNames: ['viewport-skeleton'],
  viewportOptionsOverride: on('didInsertElement', function() {
    let half = this.element.getBoundingClientRect().height / 2;
    set(this, 'viewportTolerance', {
      top: half,
      bottom: half,
      left: 0,
      right: 0
    });
  })
});
