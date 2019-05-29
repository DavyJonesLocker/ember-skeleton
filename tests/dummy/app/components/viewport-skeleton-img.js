import { set } from '@ember/object';
import InViewportMixin from 'ember-in-viewport';
import SkeletonImg from 'ember-skeleton/components/skeleton-img';

export default SkeletonImg.extend(InViewportMixin, {
  renderSrc: false,
  classNames: ['viewport-skeleton'],
  didEnterViewport() {
    console.log('here');
    set(this, 'renderSrc', true);
  },
  didInsertElement() {
    let half = this.element.getBoundingClientRect().height / 2;
    set(this, 'viewportTolerance', {
      top: half,
      bottom: half,
      left: 0,
      right: 0
    });
  }
});
