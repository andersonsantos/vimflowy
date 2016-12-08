import keyDefinitions, { Motion } from '../keyDefinitions';

keyDefinitions.registerMotion(new Motion(
  'motion-left',
  'Move cursor left',
  async function(context) {
    return async (cursor, options) => { await cursor.left(); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-right',
  'Move cursor right',
  async function(context) {
    return async (cursor, options) => { await cursor.right(options); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-up',
  'Move cursor up',
  async function(context) {
    return async (cursor, options) => { await cursor.up(options); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-down',
  'Move cursor down',
  async function(context) {
    return async (cursor, options) => { await cursor.down(options); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-line-beginning',
  'Move cursor to beginning of line',
  async function(context) {
    return async (cursor, options) => { await cursor.home(); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-line-end',
  'Move cursor to end of line',
  async function(context) {
    return async (cursor, options) => { await cursor.end(options); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-word-beginning',
  'Move cursor to the first word-beginning before it',
  async function(context) {
    return async (cursor, options) => { await cursor.beginningWord({cursor: options}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-word-end',
  'Move cursor to the first word-ending after it',
  async function(context) {
    return async (cursor, options) => { await cursor.endWord({cursor: options}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-word-next',
  'Move cursor to the beginning of the next word',
  async function(context) {
    return async (cursor, options) => { await cursor.nextWord({cursor: options}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-Word-beginning',
  'Move cursor to the first Word-beginning before it',
  async function(context) {
    return async (cursor, options) => { await cursor.beginningWord({cursor: options, whitespaceWord: true}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-Word-end',
  'Move cursor to the first Word-ending after it',
  async function(context) {
    return async (cursor, options) => { await cursor.endWord({cursor: options, whitespaceWord: true}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-Word-next',
  'Move cursor to the beginning of the next Word',
  async function(context) {
    return async (cursor, options) => { await cursor.nextWord({cursor: options, whitespaceWord: true}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-find-next-char',
  'Move cursor to next occurrence of character in line',
  async function({ keyStream }) {
    const key = await keyStream.dequeue();
    return async (cursor, options) => { await cursor.findNextChar(key, {cursor: options}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-find-prev-char',
  'Move cursor to previous occurrence of character in line',
  async function({ keyStream }) {
    const key = await keyStream.dequeue();
    return async (cursor, options) => { await cursor.findPrevChar(key, {cursor: options}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-to-next-char',
  'Move cursor to just before next occurrence of character in line',
  async function({ keyStream }) {
    const key = await keyStream.dequeue();
    return async (cursor, options) => { await cursor.findNextChar(key, {cursor: options, beforeFound: true}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-to-prev-char',
  'Move cursor to just after previous occurrence of character in line',
  async function({ keyStream }) {
    const key = await keyStream.dequeue();
    return async (cursor, options) => { await cursor.findPrevChar(key, {cursor: options, beforeFound: true}); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-visible-beginning',
  'Go to the beginning of visible document',
  async function(context) {
    return async (cursor, options) => { await cursor.visibleHome(); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-visible-end',
  'Go to end of visible document',
  async function(context) {
    return async (cursor, options) => { await cursor.visibleEnd(); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-parent',
  'Go to the parent of current line',
  async function(context) {
    return async (cursor, options) => { await cursor.parent(options); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-next-clone',
  'Go to next copy of this clone',
  async function({ session }) {
    if (session.mode !== 'NORMAL') {
      // TODO fix this
      // doesn't work for visual_line mode due to zoomInto
      return;
    }
    return async (cursor, options) => {
      const newPath = await session.document.nextClone(cursor.path);
      await cursor.setPath(newPath);
      if (!(await session.isVisible(newPath))) {
        await session.zoomInto(newPath);
      }
    };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-next-sibling',
  'Move cursor to the next sibling of the current line',
  async function(context) {
    return async (cursor, options) => { await cursor.nextSibling(options); };
  },
));

keyDefinitions.registerMotion(new Motion(
  'motion-prev-sibling',
  'Move cursor to the previous sibling of the current line',
  async function(context) {
    return async (cursor, options) => { await cursor.prevSibling(options); };
  },
));
