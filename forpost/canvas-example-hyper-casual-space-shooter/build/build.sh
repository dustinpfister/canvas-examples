#!/bin/bash

bashdir=$(dirname "${0}")
top=$(cat "${bashdir}/top.txt")
bottom=$(cat "${bashdir}/bottom.txt")
js=$(cat "${bashdir}/files.txt" | xargs uglifyjs)
#main=$(uglifyjs "${bashdir}/../main.js")

echo "${top}${js}${main}${bottom}"