# Tic-Tac-Toe

## Static File Setup

The app is split into separate `index.html`, `style.css`, and `script.js` files. The HTML links the stylesheet and script directly, keeping the static page workflow simple without adding build tooling or dependencies.

## Game Markup

The placeholder page has been replaced with a minimal tic-tac-toe interface. The board contains nine indexed button cells for JavaScript to target, plus a restart button for resetting the game later.

## Turn Logic

The script now tracks the current player, board values, and whether the game has ended. Clicking an empty cell places the active player's mark, ignores repeat clicks on filled cells, and alternates valid moves between X and O.

## Win, Draw, and Restart

The game now checks the standard tic-tac-toe winning combinations after each valid move and stops accepting moves after a win or draw. The restart button clears the board, resets the first player to X, and starts a new game without reloading the page.

## Visual Foundation

The interface now uses a calm neutral palette, muted accent color, and system typography for a polished minimal tone. The layout adds deliberate spacing and simple surfaces so the game feels clean without becoming visually busy.

## Board Depth

The board now has a soft surface treatment with light padding, rounded edges, and a restrained shadow. Each cell keeps a quiet border and warm surface color so the grid feels tactile without becoming heavy.

## Drawn Marks

Played cells now render X and O with custom ink-like shapes instead of default text styling. The marks use muted accent colors and slightly organic proportions while staying simple enough to read quickly.
