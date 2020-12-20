#!/bin/bash

# dirs
dir_this_script=$(dirname $( realpath $0 ) )
dir_ce_root=$( realpath "${dir_this_script}/../.." )
dir_for_post=$( realpath "${dir_ce_root}/forpost" )

# loop examples folders
examples=$(ls $dir_for_post)
for folderName in $examples; do
  ./pkg-make.sh  $folderName
#   dir_build="${dir_for_post}/${folderName}/build"
#   build=$( ls $dir_build 2> /dev/null)
#   if [ $? -eq "0" ]; then
#      FILE="${dir_build}/build-pkg.sh"
#      #echo $FILE
#      if [ -f $FILE ]; then
#          echo ""
#          echo "build script found at: $dir_build"
#          ./$FILE
#      fi
#   fi
done