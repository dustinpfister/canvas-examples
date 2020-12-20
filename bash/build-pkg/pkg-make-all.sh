#!/bin/bash

# dirs
dir_this_script=$(dirname $( realpath $0 ) )
dir_ce_root=$( realpath "${dir_this_script}/../.." )
dir_for_post=$( realpath "${dir_ce_root}/forpost" )

# loop examples folders
examples=$(ls $dir_for_post)
for folderName in $examples; do
  ${dir_this_script}/pkg-make.sh  $folderName
done