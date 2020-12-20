#!/bin/bash

# make a pkg file for a canvas example
# $ ./pkg-make.sh canvas-example-hyper-casual-space-shooter

# params
forpost_folder_name=$1  # The forpost folder such as "canvas-example-hyper-casual-space-shooter"

# vars
dir_this_script=$(dirname $( realpath $0 ) )
dir_ce_root=$( realpath "${dir_this_script}/../.." )
dir_for_post=$( realpath "${dir_ce_root}/forpost" )

dir_build=$( realpath "${dir_for_post}/${forpost_folder_name}/build" )
dir_target_folder=$( realpath "${dir_build}/../pkg" )
dir_filepath=""
ver=$(cat "${dir_build}/ver.txt") # version file
sig=$(cat "${dir_build}/sig.txt") # sig file
dir_pkg="${dir_target_folder}/${ver}"
pkgfile="${dir_pkg}/pkg.js"
js=""
pkg="" # the pkg var that will hold the finished package

buildpkg(){
  if [ -f $pkgfile ]; then
    echo "There is all ready a build for version ${ver} of ${forpost_folder_name}"
  else
    for relpath in $( cat "${dir_build}/files.txt" ); do
      dir_filepath=$( realpath "${dir_build}/${relpath}" )
      echo "${dir_filepath}"
      js=$( uglifyjs ${dir_filepath} )
      pkg="${pkg}${js}"
    done
    # create base folder for pkg.js if it is not there
    mkdir -p $dir_pkg
    # echo mess that we are writing the file, and write the file
    echo "Writing pkg file: ${pkgfile}"
    echo -e "$sig\n$pkg" > ${pkgfile}
    # copy an index.html file for the pkg
    cp "${dir_this_script}/index.html" "${dir_pkg}/index.html"
  fi
}

buildpkg