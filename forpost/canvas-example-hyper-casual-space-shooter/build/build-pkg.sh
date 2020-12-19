#!/bin/bash

bashdir=$(dirname "${0}")
pkgfile="${bashdir}/pkg.js"
pkg=""
for relpath in $(cat "${bashdir}/files.txt"); do
  echo "${relpath} from ${bashdir}"
  js=$(uglifyjs "${bashdir}/${relpath}")
  pkg="${pkg}${js}"
done

echo $pkg > ${pkgfile}