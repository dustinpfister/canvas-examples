#!/bin/bash

top=$(cat top.txt)
bottom=$(cat bottom.txt)
js=$(cat files.txt | xargs uglifyjs)
main=$(uglifyjs ../main.js)

echo "${top}${js}${main}${bottom}"