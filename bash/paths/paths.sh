#!/bin/bash
# simple script to get paths

# these will need to be ajusted if you move the script to nother location
dir_this_script=$(dirname $( realpath $0 ) )
dir_ce_root=$( realpath "${dir_this_script}/../.." )
dir_for_post=$( realpath "${dir_ce_root}/forpost" )

echo $dir_this_script
echo $dir_ce_root
echo $dir_for_post