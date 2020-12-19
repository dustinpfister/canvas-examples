#!/bin/bash
# simple script to get paths

dir_this_script=$(dirname $0)
dir_ce_root=$(dirname "../${0}");
dir_for_post="${dir_ce_root}/forpost"

echo $dir_this_script
echo $dir_ce_root
ls $dir_for_post