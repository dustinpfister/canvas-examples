#!/bin/bash

# get the pkg javascript

# dir of the build folder
forpost_folder_name="canvas-example-hyper-casual-space-shooter"
dir_build=$(realpath "../../forpost/${forpost_folder_name}/build")
pkg=""
for relpath in $(cat "${dir_build}/files.txt"); do
  echo "${relpath} from ${dir_build}"
  js=$(uglifyjs "${dir_build}/${relpath}")
  pkg="${pkg}${js}"
done

# $ ./get-pkg-js.sh ../../forpost/canvas-example-hyper-casual-space-shooter/build