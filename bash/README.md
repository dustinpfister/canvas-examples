# canvas-examples bash folder

For my canvas-examples repo I want to make some bash scripts that will help me automate some work. Such as creating a package for a canvas example.

## Requried commands and software

It should go without saying that to run these scripts at all bash will need to be installed on the system. On all the Linux distros I have work with so far this is the case. However these scripts will also need to have a number of other commands at the ready. Many of these are common commands that should be on most systems, however others might need to be installed first.

* bash - The command needed to run any of these scripts to begin with
* echo - spit something out to the standard output
* ls - list the contents of a folder
* cat - read the contents of a file
* dirname - get the path portion of a URI ( /foo/bar.txt to /foo )
* realpath - resolve a relative path to an absolute path ( ~/../../etc to /etc )
* basename - get the file portion of a URI ( /foo/bar.txt to bar.txt )


## build-pkg

I want a tool that can be used to run over all canvas examples, and create a pkg.js file for a curent version number. These pkg files are then to be used to compose a public javaScript folder for my website.

In other words to create the files that will compose a resource that will be located at a URL such as this:

```
https://dustinpfister.github.io/js/canvas-examples/hyper-casual-space-shooter/0.11.0/pkg.js
```
