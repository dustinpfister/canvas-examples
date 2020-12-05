# build sh script for canvas-example-game-mr-sun

This is a bash script that makes use of uglifyjs, and bash, to create a package file for this canvas example. I can also maybe be adapted to be used with any canvas example actually, but for now I am parking it here.

## Must have bash, node/npm, and uglifyjs

This is an sh script so it should go without saying that it can only be used in a POSIX command line shell that makes use of bash. On top of that I must have nodejs, and uglifyjs installed as a global package.

```
$ sudo npm install uglify-js -g
```

## Using the script to build a package

Make sure the build.js script is executable, or use with bash to create a package

```
$ bash build.sh > ../pkg/pkg_0_1_0.html
```

## top.txt, bottom.txt, and files.txt

Just the names of the files should say it, just take a look at them and make any changes that might be needed.