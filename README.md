# Battleship

This is the final project in the Javascript section of The Odin Project. The project is an iteration of the popular board game
'Battleship'. The current version is played Player Vs AI. To play the game players must drag and drop their ships onto their gameboard,
after that players will take turns to attempt to sink the opposing player's ships. The winner is determined by whoever sinks their opponent's entire fleet first.

This project was created to practice TDD (test driven development), the idea of writing tests to test code behaves as expected before writing the code itself.
There are many benefits to TDD such as:

- Spending less time creating bugs and therefore less time wasted in the debugger
- Improves design by loosening coupling
- Encourages refactoring (red, green, refactor)
- Builds a safety net around your code, and other developers
- Forces you to slow down and think about what you're making
- Improves productivity
- Improves communication

The test runner used in this project is Jest.

The project meets the project specification in the lesson and implements extra credit features of 'drag and drop' and smarter AI attacks.

Improvements that could be made to this project specifically and future projects going forward:

- UI: Display visual when a player/AI sinks a ship
- UI: Display the current players turn on the screen
- Code structure and design: Break the game controller module into smaller more readable/manageable modules
- Code structure and design: Better code structure to avoid module scoped variables
- Code structure and design: Avoid using nested for loops to search with multiple arrays
- Testing: Writing better tests
- Testing: Using fewer expect statements in test blocks
- Testing: Maintain TDD principle of writing tests before any implementation code
- Planning: Spending more time in the planning and pseudocode stage to create better structured code
