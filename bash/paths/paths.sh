#!/bin/bash
# This is a simple script to get paths that is absolute paths to the location of this 
# script as well as other locations of interest. These will need to be ajusted if you 
# move the script to another location

# this should resolve to the location of THIS SCRIPT
dir_this_script=$(dirname $( realpath $0 ) )

# this should resolve to the location of the canvas-examples root
# name space
dir_ce_root=$( realpath "${dir_this_script}/../.." )

# this should resolve to the forpost folder
dir_for_post=$( realpath "${dir_ce_root}/forpost" )

# echo the results
echo $dir_this_script
echo $dir_ce_root
echo $dir_for_post