## sp-webpart

This is where you include your WebPart documentation.
So this first virsion is a bit qwerky.  The check box to show/hide the manage button must be re-checked every time the group name is changed.  The group ID on the button dose not updae otherwise. -dcp 20171201

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
