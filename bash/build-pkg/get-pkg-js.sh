#!/bin/bash

# get the pkg javascript
# $ ./get-pkg-js.sh canvas-example-hyper-casual-space-shooter

# dir of the build folder
forpost_folder_name=$1  # "canvas-example-hyper-casual-space-shooter"
dir_build=$( realpath "../../forpost/${forpost_folder_name}/build" )

# the pkg var that will hold the finished package
pkg=""

for relpath in $( cat "${dir_build}/files.txt" ); do
  dir_filepath=$( realpath "${dir_build}/${relpath}" )
  echo "${dir_filepath}"
  js=$( uglifyjs ${dir_filepath} )
  pkg="${pkg}${js}"
done

