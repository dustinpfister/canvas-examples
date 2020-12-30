#!/bin/bash

# dir vars from /bash/paths
dir_this_script=$(dirname $( realpath $0 ) )
dir_ce_root=$( realpath "${dir_this_script}/../.." )
dir_for_post=$( realpath "${dir_ce_root}/forpost" )
dir_js_target="~/js/canvas-examples/"

# make the target folder to create files first
# if it is not there
mkdir -p $dir_js_target
