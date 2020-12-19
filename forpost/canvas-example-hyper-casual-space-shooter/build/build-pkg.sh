#!/bin/bash

# get the pkg javascript
bashdir=$(dirname "${0}")
pkg=""
for relpath in $(cat "${bashdir}/files.txt"); do
  echo "${relpath} from ${bashdir}"
  js=$(uglifyjs "${bashdir}/${relpath}")
  pkg="${pkg}${js}"
done

# create pkg.js
ver=$(cat "${bashdir}/ver.txt")
pkgfile="${bashdir}/../pkg/${ver}/pkg.js"
mkdir -p $(dirname $pkgfile)
echo $pkg > ${pkgfile}