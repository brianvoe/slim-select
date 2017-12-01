# Build docs
DOCS=true vue-build prod

# Build minified
vue-build prod
mv ./dist/slimselect.js ./dist/slimselect.min.js
mv ./dist/slimselect.css ./dist/slimselect.min.css

# Build non minified
vue-build prod -u=false