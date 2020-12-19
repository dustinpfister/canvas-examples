#!/bin/bash

bashdir=$(dirname "${0}")
for i in $(cat "${bashdir}/files.txt"); do
  uglifyjs "${bashdir}/${i}"
done