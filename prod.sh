# Build docs
DOCS=true vue-build prod

# Build minified
vue-build prod
mv ./dist/slimselect.js ./dist/slimselect.min.js
mv ./dist/slimselect.css ./dist/slimselect.min.css

# Build non minified
vue-build prod -u=false

# Delete index.js and index.css
rm ./dist/index.js
rm ./dist/index.css
rm ./dist/autotrack.js
rm ./dist/favicon.ico
rm ./dist/index.html