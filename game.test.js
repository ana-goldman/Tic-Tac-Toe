const assert = require('node:assert/strict');
const { readFileSync, existsSync } = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

test('index.html links separate stylesheet and script files', () => {
  const html = readFileSync('index.html', 'utf8');

  assert.equal(existsSync('style.css'), true);
  assert.equal(existsSync('script.js'), true);
  assert.match(html, /<link\s+[^>]*rel=["']stylesheet["'][^>]*href=["']style\.css["'][^>]*>/);
  assert.match(html, /<script\s+[^>]*src=["']script\.js["'][^>]*><\/script>/);
});

test('index.html contains a minimal tic-tac-toe board and restart button', () => {
  const html = readFileSync('index.html', 'utf8');
  const cells = html.match(/<button\s+[^>]*data-cell-index=["'][0-8]["'][^>]*><\/button>/g) || [];

  assert.doesNotMatch(html, /Hello,\s*world!/);
  assert.match(html, /<div\s+[^>]*id=["']board["'][^>]*>/);
  assert.equal(cells.length, 9);
  assert.match(html, /<button\s+[^>]*id=["']restart["'][^>]*>Restart<\/button>/);
});

test('script handles valid turns and ignores filled cells', () => {
  const script = readFileSync('script.js', 'utf8');
  const listeners = [];
  const cells = Array.from({ length: 9 }, (_, index) => ({
    dataset: { cellIndex: String(index) },
    textContent: '',
    addEventListener(eventName, handler) {
      if (eventName === 'click') {
        listeners[index] = handler;
      }
    },
  }));
  const context = {
    document: {
      querySelectorAll(selector) {
        assert.equal(selector, '[data-cell-index]');
        return cells;
      },
    },
  };

  assert.match(script, /function\s+handleCellClick\s*\(/);
  vm.runInNewContext(script, context);

  listeners[0]({ target: cells[0] });
  listeners[0]({ target: cells[0] });
  listeners[1]({ target: cells[1] });

  assert.equal(cells[0].textContent, 'X');
  assert.equal(cells[1].textContent, 'O');
});

test('script detects wins and draws and restarts the game', () => {
  const script = readFileSync('script.js', 'utf8');
  const cellListeners = [];
  let restartListener;
  const cells = Array.from({ length: 9 }, (_, index) => ({
    dataset: { cellIndex: String(index) },
    textContent: '',
    addEventListener(eventName, handler) {
      if (eventName === 'click') {
        cellListeners[index] = handler;
      }
    },
  }));
  const restartButton = {
    addEventListener(eventName, handler) {
      if (eventName === 'click') {
        restartListener = handler;
      }
    },
  };
  const context = {
    document: {
      querySelectorAll(selector) {
        assert.equal(selector, '[data-cell-index]');
        return cells;
      },
      getElementById(id) {
        assert.equal(id, 'restart');
        return restartButton;
      },
    },
  };

  vm.runInNewContext(script, context);

  [0, 3, 1, 4, 2].forEach((index) => {
    cellListeners[index]({ target: cells[index] });
  });
  cellListeners[5]({ target: cells[5] });

  assert.equal(cells[2].textContent, 'X');
  assert.equal(cells[5].textContent, '');

  restartListener();
  [0, 1, 2, 4, 3, 5, 7, 6, 8].forEach((index) => {
    cellListeners[index]({ target: cells[index] });
  });
  restartListener();
  cellListeners[5]({ target: cells[5] });

  assert.equal(cells[0].textContent, '');
  assert.equal(cells[5].textContent, 'X');
});
