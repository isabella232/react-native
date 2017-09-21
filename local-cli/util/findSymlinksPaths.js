const path = require('path');
const fs = require('fs');

/**
 * Find and resolve symlinks in `lookupFolder`.
 * Ignore any descendants of the paths in `ignoredRoots`.
 */
module.exports = function findSymlinksPaths(lookupFolder, ignoredRoots) {
  // Airbnb Edit:
  // We are making this function return an empty array in our fork because
  // we dont use this feature, and it ends up being problematic with the way
  // we check in some of our node_modules. This change should no longer be needed
  // if we ever get to a place where we *dont* check in any of our node_modules
  // so every build runs off of a clean `npm install` with an empty node_modules
  // folder. Until that day...
  return [];
};

function rootExists(roots, child) {
  return roots.some(root => isDescendant(root, child));
}

function isDescendant(root, child) {
  return root === child || child.startsWith(root + path.sep);
}
