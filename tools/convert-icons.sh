#!/bin/bash
CONVERT=convert
ICONS_DIR=src/icons

for size in 16 48 128
do
  ${CONVERT} ${ICONS_DIR}/icon.png -resize ${size}x  -unsharp 1.5x1+0.7+0.02 ${ICONS_DIR}/icon-${size}.png
done