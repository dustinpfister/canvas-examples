#!/bin/bash

bashdir=$(dirname "${0}")
pkgfile="${bashdir}/../pkg2/pkg.js"
pkg=""
for relpath in $(cat "${bashdir}/files.txt"); do
  echo "${relpath} from ${bashdir}"
  js=$(uglifyjs "${bashdir}/${relpath}")
  pkg="${pkg}${js}"
done

mkdir -p $(dirname $pkgfile)
echo $pkg > ${pkgfile}