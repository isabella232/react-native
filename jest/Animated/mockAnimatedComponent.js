import React from 'react';
var ViewStylePropTypes = require('ViewStylePropTypes');

module.exports = name => {
  const React = require('react');

  const AnimatedComponent = class extends React.Component {
    render() {
      if (global.__JSDOM_MOUNTABLE__) {
        return React.createElement(
          name.replace(/^(RCT|RK)/,''),
          { children: this.props.children },
        );
      }

      return React.createElement(
        name.replace(/^(RCT|RK)/,''),
        this.props,
        this.props.children,
      );
    }
  };
  // from Animated/AnimatedImplemenatation
  AnimatedComponent.propTypes = {
    style: function(props, propName, componentName) {
      if (!propTypes) {
        return;
      }

      for (var key in ViewStylePropTypes) {
        if (!propTypes[key] && props[key] !== undefined) {
          console.warn(
            'You are setting the style `{ ' + key + ': ... }` as a prop. You ' +
            'should nest it in a style object. ' +
            'E.g. `{ style: { ' + key + ': ... } }`'
          );
        }
      }
    },
  };
  return AnimatedComponent;
};
