#!/usr/bin/fish

set user "anonymousme7640"
set token ""
set repo "online-geyser"
set file "datastore/geyser_state"

curl -i \
-X GET \
-u "$user:$token" \
-H "Accept: application/vnd.github.VERSION.json" \
https://api.github.com/repos/$user/$repo/contents/$file