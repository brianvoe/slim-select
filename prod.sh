# Clear dist and docs folder
rm -r dist
rm -r docs

# Build docs
vue-cli-service build

# Build minified
# cd src/slim-select && webpack

# Build non minified
# vue-build prod -u=false