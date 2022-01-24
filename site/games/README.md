## Creating a New Game

Go to your `www` folder.

```
cd www
```

Next, pick a name for your game. To do this, we're going to set a temporary
variable in your terminal.

For example, the name of our game is `my-game`:

```
gameName=my-game
```

Don't worry, it's easy to change the name of your game later.

Next, let's create the code base for your new game. We do this by starting with
a copy of the `example` game and then renaming it to `my-game` with these
commands:

```

cp -r games/example games/$gameName
sed -i "s/example/$gameName/g" games/$gameName/api/hello/get.inc
sed -i "s/example/$gameName/g" games/$gameName/js/*.js
```

Now download the `my-game` folder into your editor to start building your game!

**Important**, open `games/my-game/api/hello/get.inc` and change this line...

```
function number-pad_api_hello_get() {
```

to this:

```
function number_pad_api_hello_get() {
```

TODO: Improve `sed` command above to replace hyphens with underscores as needed.
