#!/bin/bash

# dirs
dir_this_script=$(dirname $0)
dir_ce_root=$(dirname "../${0}");
dir_for_post="${dir_ce_root}/forpost"

# loop examples folders
examples=$(ls $dir_for_post)
for folderName in $examples; do
   dir_build="${dir_for_post}/${folderName}/build"
   build=$( ls $dir_build 2> /dev/null)
   if [ $? -eq "0" ]
   then
      echo $dir_build
   fi
done