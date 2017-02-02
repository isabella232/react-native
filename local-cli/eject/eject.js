/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
'use strict';

const copyProjectTemplateAndReplace = require('../generator/copyProjectTemplateAndReplace');
const path = require('path');
const fs = require('fs');

function eject() {

  const doesIOSExist = fs.existsSync(path.resolve('ios'));
  const doesAndroidExist = fs.existsSync(path.resolve('android'));
  if (doesIOSExist && doesAndroidExist) {
    console.error('Both the iOS and Android folders already exist! Please delete `ios` and/or `android` before ejecting.');
    process.exit();
  }

  let appConfig = null;
  try {
    appConfig = require(path.resolve('app.json'));
  } catch(e) {
    console.error('Eject requires an `app.json` config file to be located in your app root, and it must at least specify a `name` and a `displayName`.');
    process.exit();
  }

  const appName = appConfig.name;
  const displayName = appConfig.displayName;
  if (!appName || !displayName) {
    console.error('App `name` and `displayName` must be defined in the `app.json` config file.');
    process.exit();
  }

  const templateOptions = { displayName };

  if (!doesIOSExist) {
    console.log('Generating the iOS folder.');
    copyProjectTemplateAndReplace(
      path.resolve('node_modules', 'react-native', 'local-cli', 'templates', 'HelloWorld', 'ios'),
      path.resolve('ios'),
      appName,
      templateOptions
    );
  }

  if (!doesAndroidExist) {
    console.log('Generating the Android folder.');
    copyProjectTemplateAndReplace(
      path.resolve('node_modules', 'react-native', 'local-cli', 'templates', 'HelloWorld', 'android'),
      path.resolve('android'),
      appName,
      templateOptions
    );
  }

}

module.exports = {
  name: 'eject',
  description: 'Re-create the iOS and Android folders and native code',
  func: eject,
  options: [],
};
