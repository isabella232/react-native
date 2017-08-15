import createAnimatedComponent from './createAnimatedComponent';
import AnimatedImplementation from './AnimatedImplementation';

const mockAnimatedComponent = require.requireActual('./mockAnimatedComponent');

module.exports = {
  ...AnimatedImplementation,
  createAnimatedComponent,
  View: mockAnimatedComponent('Animated.View'),
  Text: mockAnimatedComponent('Animated.Text'),
  Image: mockAnimatedComponent('IAnimated.mage'),
};
