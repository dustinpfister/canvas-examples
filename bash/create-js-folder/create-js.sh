#!/bin/bash

# dir vars from /bash/paths
dir_this_script=$(dirname $( realpath $0 ) )
dir_ce_root=$( realpath "${dir_this_script}/../.." )
dir_for_post=$( realpath "${dir_ce_root}/forpost" )
dir_js_target="~/js/canvas-examples/"
dir_home=$( realpath ~ )
dir_js_target="${dir_home}/js/canvas-examples"

# make the target folder to create files first
# if it is not there
mkdir -p $dir_js_target

# loop examples folders
examples=$(ls $dir_for_post)
for folderName in $examples; do
  dir_pkg="${dir_for_post}/${folderName}/pkg"
  # if an example has a pkg folder
  if [ -d $dir_pkg ]; then
    # just copy for now
    cp -r $dir_pkg ${dir_js_target}/${folderName}
    echo $dir_pkg
  fi
done