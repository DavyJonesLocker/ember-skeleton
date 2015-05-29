# Ember skeleton #

[![Build Status](https://secure.travis-ci.org/dockyard/ember-skeleton.svg?branch=master)](http://travis-ci.org/dockyard/ember-skeleton)

## About ##

Show fast-loading temporary images in place of an eventual slow-loading
image.

## Browser Compatability ##

This library relies on `addEventListener` and `removeEventListener`
which is
[IE9+](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Browser_compatibility)

## Building yourself ##

```bash
npm install && bower install
ember build
```

The builds will be in the `dist/` directory.

## Installing ##

`ember install ember-skeleton`

## Looking for help? ##

If it is a bug [please open an issue on GitHub](https://github.com/dockyard/ember-skeleton/issues).

## Usage ##

Use the component in your templates:

```hbs
{{skeleton-img src="/path/to/large/image.png" tmpSrc="/path/to/small/placeholder.png"}}
```

The workflow is thus:

1. The `tmpSrc` image will be loaded first
2. Once complete the `src` image will attempt to load
3. If the `src` completes successfully it will be displayed
4. If the `src` does not complete successfully the `tmpSrc` will stay
5. If an optional `errorSrc` is provided that image will be displayed in
   the even of `src` not completing successfully.

### Error Example ###

```hbs
{{skeleton-img src="/path/to/invalid/large/image.png" tmpSrc="/path/to/small/placeholder.png" errorSrc="/path/to/error/placeholder.png"}}
```

### Setting Defaults ###

If you'd like to set defaults instead of having to manually set `tmpSrc`
and `errorSrc` for each use of `{{skeleton-img}}` you can overwrite the
component in `app/components/skeleton-img.js`

```javascript
import SkeletonImg from 'ember-skeleton/components/skeleton-img';

export default SkeletonImg.extend({
  tmpSrc: "/default/path/to/placeholder.png",
  errorSrc: "/default/path/to/error/placeholder.png"
});
```

Now you can do:

```hbs
{{skeleton-img src="/path/to/large/image.png"}}
```

You can still override the defaults by passing those values into the
component from within the template.

## Styling ##

The component itself produced an `img` tag with a `skeleton-img` class.
The follow state-based classes are also available:

* `loading` used when the `src` image is still loading
* `loaded` used when `src` has successfully completed
* `load-error` used if `src` has not succesfully completed

Because the slow-loading images will likely be a different size than the
placeholders it is recommended that you normalize the `img` tag's
dimensions:

```css
.skeleton-img {
  width: 300px;
  height: 300px;
}
```

This example will ensure that the when `src` swaps our with `tmpSrc`
that there isn't any chnages in dimensions. This of course is optional
and the values should change based upon your needs.

## Defer Rendering ##

If you'd like to defer rendering you can override the `renderSrc` value
on the component. For example, you might want to change over to only
rendering the `src` once the element is in the viewport. This is easily
accomplished in combination with
[ember-in-viewport](https://github.com/dockyard/ember-in-viewport).
Override `app/components/skeleton-img.js`

```javascript
import SkeletonImg from 'ember-skeleton/components/skeleton-img';
import InViewportMixin from 'ember-in-viewport';

const {
  set
} = Ember;

export default SkeletonImg.extend(InViewportMixin, {
  renderSrc: false,
  didEnterViewport() {
    set(this, 'renderSrc', true);
  }
});
```

This is a great performance optimization for mobile applications.

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-skeleton/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this library. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-skeleton/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
