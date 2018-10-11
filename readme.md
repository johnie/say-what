# saywhat [![Build Status](https://travis-ci.org/johnie/saywhat.svg?branch=master)](https://travis-ci.org/johnie/saywhat)

> Module for matching short, human-quality input to a list of possibilities.

## Install

```
$ npm install @johnie/saywhat
```

## Usage

```js
const sayWhat = require('saywhat');

sayWhat('unicrns', ['unicorns', 'rainbows']);
//=> 'unicorns'
```


## API

### sayWhat(input, list, [options])

#### input

Type: `string`

The string input to match.

#### list

Type: `array`

An array of strings or objects to match against.

#### options

Type: `Object`

Options are set on the sayWhat function object. You may change them at any time.

### Options

#### threshold

By default, the method will only return strings whose edit distance is less than 40% (0.4x) of their length.
For example, if a ten-letter string is five edits away from its nearest match, the method will return null.

You can control this by setting the "threshold" value on the sayWhat options. For example, to set the
edit distance threshold to 50% of the input string's length:

```js
sayWhat('unicrns', ['unicorns', 'rainbows'], {threshold: 0.5});
```

To return the nearest match no matter the threshold, set this value to null.

#### thresholdAbsolute

This option behaves the same as threshold, but instead takes an integer number of edit steps. For example,
if thresholdAbsolute is set to 20 (the default), then the method will only return strings whose edit distance
is less than 20. Both options apply.

#### caseSensitive

By default, the method will perform case-insensitive comparisons. If you wish to force case sensitivity, set
the "caseSensitive" value to true:

```js
sayWhat('unicrns', ['unicorns', 'rainbows'], {caseSensitive: true});
```

#### nullResultValue

By default, the method will return null if there is no sufficiently close match. You can change this value here.

#### returnWinningObject

By default, the method will return the winning string value (if any). If your list contains objects rather
than strings, you may set returnWinningObject to true.

```js
sayWhat('unicrns', ['unicorns', 'rainbows'], {returnWinningObject: true});
```

This option has no effect on lists of strings.

#### returnFirstMatch
  
By default, the method will search all values and return the closest match. If you're simply looking for a "good-
enough" match, you can set your thresholds appropriately and set returnFirstMatch to true to substantially speed
things up.

## License

MIT © [Johnie Hjelm](https://jh.je)
