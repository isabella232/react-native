/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} = ReactNative;
var UIExplorerButton = require('./UIExplorerButton');

var Tester = React.createClass({
  current: 0,
  getInitialState() {
    return {
      native: new Animated.Value(0),
      js: new Animated.Value(0),
    };
  },

  onPress() {
    this.current = this.current ? 0 : 1;
    const config = {
      ...this.props.config,
      toValue: this.current,
    };
    try {
      Animated[this.props.type](this.state.native, { ...config, useNativeDriver: true }).start();
    } catch (e) {
      // uncomment this if you want to get the redbox errors!
      //throw e;
    }
    Animated[this.props.type](this.state.js, { ...config, useNativeDriver: false }).start();
  },

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View>
          <View>
            <Text>Native:</Text>
          </View>
          <View style={styles.row}>
            {this.props.children(this.state.native)}
          </View>
          <View>
            <Text>JavaScript:</Text>
          </View>
          <View style={styles.row}>
            {this.props.children(this.state.js)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },
});

const styles = StyleSheet.create({
  row: {
    padding: 10,
  },
  block: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
  },
});

exports.framework = 'React';
exports.title = 'Native Animated Example';
exports.description = 'Test out Native Animations';

exports.examples = [
  {
    title: 'translateX => Animated.timing',
    description: 'description',
    render: function() {
      return (
          <Tester
            type="timing"
            config={{ duration: 1000 }}
          >
            {anim => (
              <Animated.View
                style={[
                  styles.block,
                  {
                    transform: [
                      {
                        translateX: anim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 100],
                        })
                      }
                    ],
                  }
                ]}
              />
            )}
          </Tester>
      );
    },
  },
  {
    title: 'scale => Animated.timing',
    description: 'description',
    render: function() {
      return (
        <Tester
          type="timing"
          config={{ duration: 1000 }}
        >
          {anim => (
            <Animated.View
              style={[
                styles.block,
                {
                  transform: [
                    {
                      scale: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.4],
                      })
                    }
                  ],
                }
              ]}
            />
          )}
        </Tester>
      );
    },
  },
  {
    title: 'opacity => Animated.timing',
    description: 'description',
    render: function() {
      return (
        <Tester
          type="timing"
          config={{ duration: 1000 }}
        >
          {anim => (
            <Animated.View
              style={[
                styles.block,
                {
                  opacity: anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  })
                }
              ]}
            />
          )}
        </Tester>
      );
    },
  },
  {
    title: 'translateX => Animated.spring',
    description: 'description',
    render: function() {
      return (
        <Tester
          type="spring"
          config={{ bounciness: 0 }}
        >
          {anim => (
            <Animated.View
              style={[
                styles.block,
                {
                  transform: [
                    {
                      translateX: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100],
                      })
                    }
                  ],
                }
              ]}
            />
          )}
        </Tester>
      );
    },
  },
];
