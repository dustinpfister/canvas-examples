#!/bin/bash

# get the pkg javascript
# $ ./get-pkg-js.sh canvas-example-hyper-casual-space-shooter

# params
forpost_folder_name=$1  # The forpost folder such as "canvas-example-hyper-casual-space-shooter"
dir_target_folder=$2    # The target folder to place the pkg.js file

# dir of the build folder
dir_build=$( realpath "../../forpost/${forpost_folder_name}/build" )

# the pkg var that will hold the finished package
pkg=""

for relpath in $( cat "${dir_build}/files.txt" ); do
  dir_filepath=$( realpath "${dir_build}/${relpath}" )
  echo "${dir_filepath}"
  js=$( uglifyjs ${dir_filepath} )
  pkg="${pkg}${js}"
done

