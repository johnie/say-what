'use strict';

/**
 * Get and compare edit distance
 * @param {string} input guessing value
 * @param {string} candidate candidate to match against
 * @param {number} max threshold limit
 * @return {string} final matrix value
 */
const getEditDistance = (input, candidate, max) => {
  const MAX_INT = Math.pow(2, 32) - 1;

  max = max || max === 0 ? max : MAX_INT;

  const inputLength = input.length;
  const candidateLength = candidate.length;

  if (inputLength === 0) {
    return Math.min(max + 1, candidateLength);
  }

  if (candidateLength === 0) {
    return Math.min(max + 1, inputLength);
  }

  if (Math.abs(inputLength - candidateLength) > max) {
    return max + 1;
  }

  const matrix = [];
  let colMin = MAX_INT;

  let i = 0;
  let j = 0;

  let minJ = 1;
  let maxJ = 1;

  for (; i <= candidateLength; i++) {
    matrix[i] = [i];
  }

  for (; j <= inputLength; j++) {
    matrix[0][j] = j;
  }

  for (i = 1; i <= candidateLength; i++) {
    if (i > max) {
      minJ = i - max;
    }

    maxJ = candidateLength + 1;

    if (maxJ > max + i) {
      maxJ = max + i;
    }

    for (j = 1; j <= inputLength; j++) {
      if (j < minJ || j > maxJ) {
        matrix[i][j] = max + 1;
      } else if (candidate.charAt(i - 1) === input.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }

      if (matrix[i][j] < colMin) {
        colMin = matrix[i][j];
      }
    }

    if (colMin > max) {
      return max + 1;
    }
  }

  return matrix[candidateLength][inputLength];
};

/**
 * Matching against a list of strings
 * @param {string} input The string input to match
 * @param {array} list array of strings or objects to match against
 * @param {object} options pptions are set on the sayWhat function object
 * @return {string} matching value
 */
const sayWhat = (input, list, options) => {
  const _options = {
    key: null,
    threshold: 0.4,
    thresholdAbsolute: 20,
    caseSensitive: false,
    nullResultValue: null,
    returnWinningObject: null,
    returnFirstMatch: false,
    ...options
  };

  let _input = input;
  const _list = list;

  if (typeof _input !== 'string') {
    throw new TypeError('The `input` argument must be a string');
  }

  if (!_options.caseSensitive) {
    _input = _input.toLowerCase();
  }

  const thresholdRelative =
    _options.threshold === null ? null : _options.threshold * _input.length;

  const {thresholdAbsolute} = _options;
  let winningVal;

  if (thresholdRelative !== null && thresholdAbsolute !== null) {
    winningVal = Math.min(thresholdRelative, thresholdAbsolute);
  } else if (thresholdRelative !== null) {
    winningVal = thresholdRelative;
  } else if (thresholdAbsolute !== null) {
    winningVal = thresholdAbsolute;
  } else {
    winningVal = null;
  }

  const len = _list.length;
  let i = 0;

  let candidate;
  let testCandidate;
  let val;
  let winner;

  for (; i < len; i++) {
    candidate = _list[i];

    if (_options.key) {
      candidate = candidate[_options.key];
    }

    if (!candidate) {
      continue;
    }

    if (!_options.caseSensitive) {
      testCandidate = candidate.toLowerCase();
    } else {
      testCandidate = candidate;
    }

    val = getEditDistance(input, testCandidate, winningVal);

    if (winningVal === null || val < winningVal) {
      winningVal = val;

      if (_options.key && _options.returnWinningObject) {
        winner = list[i];
      } else {
        winner = candidate;
      }

      if (_options.returnFirstMatch) {
        return winner;
      }
    }
  }

  return winner || _options.nullResultValue;
};

(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root = factory;
  }
})(this, sayWhat);
