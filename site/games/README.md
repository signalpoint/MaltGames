## Creating a New Game

Go to your `www` folder.

```
cd www
```

Next, pick a name for your game. To do this, we're going to set a temporary
variable in your terminal.

For example, the name of our game could be `my-game`, which of course is a
great game name:

```
gameName=my-game
```

Don't worry, it's easy to change the name of your game later.

### Clone the Example Game

Next, let's create the code base for your new game. We do this by...

- cloning a copy of the `example` game
- renaming the clone to `my-game`

... with these commands:

```
cp -r site/games/example site/games/$gameName
sed -i "s/example/$gameName/g" site/games/$gameName/api/hello/get.inc
sed -i "s/example/$gameName/g" site/games/$gameName/js/*.js
```

### Download Game to Editor

Now download the `my-game` folder into your editor to start building your game!

#### Fix a Line of Code

**Important**, open `site/games/my-game/api/hello/get.inc` and change this
line...

```
function my-game_api_hello_get() {
```

to this:

```
function my_game_api_hello_get() {
```

TODO: Improve `sed` command above to replace hyphens with underscores as needed.

### Add the Game to the Site

Next we'll let the Site know about the Game by...

- declaring a unique `key` for the Game, e.g. `my-game`
- setting some basic properties about the Game
- tell the Site what `scripts` to add in the `<head></head>` of the Page
- declaring a basic Resource for the Game API

... with this code and adding it to `src/games.inc`:

```
'my-game' => [
  'name' => 'MyGame',
  'v' => '0.0.0',
  'slogan' => 'Best Game Ever',
  'description' => '...',
  'page' => [
    'head' => [
      'scripts' => [
        'main.js',
        'brain.js',
      ],
    ],
  ],
  'api' => [
    'stuff' => [
      'get' => [],
    ],
  ],
],
```
