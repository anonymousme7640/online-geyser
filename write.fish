#!/usr/bin/fish

set token ""
# set file "datastore/geyser_state"
set file "datastore/geyser_temperature"
set repo "online-geyser"
set user "SalmanFarooqShiekh"
set msg "it works"
set content (echo (random) | base64) 

set sha	(\
	curl --silent \
	-X GET \
	-u "$user:$token" \
	-H "Accept: application/vnd.github.v3+json" \
	https://api.github.com/repos/$user/$repo/contents/$file \
	| grep -o '"sha".*"' | grep -o '"[0-9a-f]*"' | grep -o '[0-9a-f]*' \
)

echo $sha

curl \
-X PUT \
-u "$user:$token" \
-H "Accept: application/vnd.github.v3+json" \
https://api.github.com/repos/$user/$repo/contents/$file \
-d "{\"message\":\"$msg\",\"content\":\"$content\",\"sha\":\"$sha\"}" \
