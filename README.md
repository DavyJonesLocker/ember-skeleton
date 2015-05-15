# Ember skeleton #

[![Build Status](https://secure.travis-ci.org/dockyard/ember-skeleton.svg?branch=master)](http://travis-ci.org/dockyard/ember-skeleton)

## About ##

Show fast-loading temporary images in place of an eventual slow-loading
image.

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

Simply use the component in your templates:

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

[DockYard](http://dockyard.com), Inc &copy; 2015

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
