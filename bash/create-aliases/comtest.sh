com="cb"
comstr="command -V ${com} &> /dev/null"
out=$( bash -ic "${comstr}"'; echo $?' )
echo $out