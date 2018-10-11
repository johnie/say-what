import test from 'ava';
import sayWhat from '.';

const arrList = [
  'Beethoven',
  'Mozart',
  'Gould',
  'Bach',
  'Bartok',
  'Glass',
  'Bernstein',
  'Cage',
  'Kanawa'
];

const objList = [
  {
    name: 'Beethoven'
  },
  {
    name: 'Mozart'
  },
  {
    name: 'Gould'
  },
  {
    name: 'Bach'
  },
  {
    name: 'Bartok'
  },
  {
    name: 'Glass'
  },
  {
    name: 'Bernstein'
  },
  {
    name: 'Cage'
  },
  {
    name: 'Kanawa'
  }
];

test('sayWhat: should throw TypeError', t => {
  const err = t.throws(() => {
    sayWhat({}, arrList);
  }, TypeError);

  t.is(err.message, 'The `input` argument must be a string');
});

test('sayWhat: should return value from list', t => {
  const s = sayWhat('Bethoven', arrList);

  t.is(s, 'Beethoven');
});

test('sayWhat: should return value from list with key `name`', t => {
  const s = sayWhat('Bernstien', objList, {key: 'name'});

  t.is(s, 'Bernstein');
});

test('sayWhat: should return null from list', t => {
  const s = sayWhat('brn', arrList);

  t.is(s, null);
});

test('sayWhat: should return value from list with null threshold', t => {
  const s = sayWhat('brnste', arrList, {threshold: null});

  t.is(s, 'Bernstein');
});

test('sayWhat: should return object from list with null threshold', t => {
  const s = sayWhat('brnste', objList, {
    key: 'name',
    threshold: null,
    returnWinningObject: true
  });

  t.deepEqual(s, {name: 'Bernstein'});
});

test('sayWhat: should return case sensitive value from list', t => {
  const s = sayWhat('Bernste', arrList, {caseSensitive: true});

  t.is(s, 'Bernstein');
});

test('sayWhat: should return case sensitive value from list with key `name`', t => {
  const s = sayWhat('Bernste', objList, {
    key: 'name',
    caseSensitive: true
  });

  t.is(s, 'Bernstein');
});
