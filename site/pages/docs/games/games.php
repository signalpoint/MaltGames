<div class="container">

  <h1 class="visually-hidden">Documentation</h1>

  <h2>Creating a New Game</h2>

  <p>For starters, pick a name for your game. For example, the name of your game
    could be <code>my-game</code>, which of course is a great game name.</p>

  <p>Don't worry, it's easy to change the name of your game later.</p>

  <h3>1. Clone the Example Game</h3>

  <p>Next, use the following terminal commands to create the code base for
    <code>my-game</code>.</p>

<pre>
cd www
gameName=my-game
cp -r site/games/example site/games/$gameName
sed -i "s/example/$gameName/g" site/games/$gameName/js/*.js
</pre>

  <p>The above commands roughly translate to...</p>

  <ol>
    <li>go to <code>www</code> folder</li>
    <li>set game name</li>
    <li>clone a copy of the <code>example</code> game</li>
    <li>rename the clone to <code>my-game</code></li>
  </ol>

  <h3>2. Download Game to Editor</h3>

  <p>Now download the <code>my-game</code> folder into your editor to start building your game!</p>

  <h3>3. Add the Game to the Site</h3>

  <p>Next we'll let the Site know about the Game...</p>

  <ul>
    <li>by declaring a unique <code>key</code> for the Game, e.g. <code>my-game</code></li>
    <li>setting some basic properties about the Game</li>
    <li>tell the Site what <code>scripts</code> to add in the <code>&lt;head&gt;&lt;/head&gt;</code> of the Page</li>
    <li>declaring a basic Resource for the Game API</li>
  </ul>

  <p>... with this code and adding it to <code>core/games.inc</code>:</p>

<pre>
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
</pre>

</div>
