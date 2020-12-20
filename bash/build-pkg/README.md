# build-pkg

Make pkg files for canvas examples

## pkg-make.sh

This is a shell script that will create a pkg folder for a canvas example that has a build folder and the required files in that build folder. There is just one parameter that is given to the script that is the folder name to build for.

```
$ ./pkg-make.sh "canvas-example-hyper-casual-space-shooter"
```

The build folder in the canvas example folder should have the following files

* files.txt - a list of relative paths to the files that are to be part of pkg.js
* ver.txt - the current version number
* sig.txt - text to place at the top of the pkg.js file