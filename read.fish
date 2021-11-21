#!/usr/bin/fish

set user "anonymousme7640"
set token "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"
set repo "online-geyser"
set file "datastore/geyser_state"

curl -i \
-X GET \
-u "$user:$token" \
-H "Accept: application/vnd.github.VERSION.json" \
https://api.github.com/repos/$user/$repo/contents/$file