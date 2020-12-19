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
sig=$(cat "${bashdir}/sig.txt")
pkgfile="${bashdir}/../pkg/${ver}/pkg.js"
mkdir -p $(dirname $pkgfile)
echo -e "$sig\n$pkg" > ${pkgfile}

# cp index.html file to pkg path
pkgdir=$(dirname $pkgfile)
cp "${bashdir}/index.html" "${pkgdir}/index.html"
