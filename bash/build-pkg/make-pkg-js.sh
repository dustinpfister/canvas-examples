#!/bin/bash

# get the pkg javascript
# $ ./get-pkg-js.sh canvas-example-hyper-casual-space-shooter

# params
forpost_folder_name=$1  # The forpost folder such as "canvas-example-hyper-casual-space-shooter"

# vars
dir_here=$( dirname $( realpath $0 ) )
dir_build=$( realpath "../../forpost/${forpost_folder_name}/build" )
dir_target_folder=$( realpath "${dir_build}/../pkg" )
ver=$(cat "${dir_build}/ver.txt") # version file
sig=$(cat "${dir_build}/sig.txt") # sig file
dir_pkg="${dir_target_folder}/${ver}"
pkgfile="${dir_pkg}/pkg.js"

# the pkg var that will hold the finished package
pkg=""

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
cp "${dir_here}/index.html" "${dir_pkg}/index.html"
