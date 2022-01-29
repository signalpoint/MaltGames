<div class="container">

  <h2>Get Started Building a Site</h2>

  <p>1. on your web server, open your public html directory:</p>

<pre>
cd www
</pre>

  <p>2. download and unzip MaltGames to a folder:</p>

<pre>
wget -q https://github.com/signalpoint/MaltGames/archive/refs/heads/main.zip
unzip -q main.zip
mv MaltGames-main my-app
rm main.zip
</pre>

  <p>3. use composer to install:</p>

<pre>
cd my-app
composer install
</pre>

  <p>3. download font awesome 5:</p>

https://fontawesome.com/download

  <p>4. upload font awesome to your web server</p>

<pre>
scp fontawesome-free-5.15.4-web.zip me@[my-server-ip]:~/
</pre>

  <p>5. unzip font awesome on your web server</p>

<pre>
cd vendor
cp ~/fontawesome-free-5.15.4-web.zip
unzip fontawesome-free-5.15.4-web.zip
rm fontawesome-free-5.15.4-web.zip
</pre>

  <p>6. open your app in a browser</p>

https://example.com/my-app

  <p>Ok? Go!</p>

  <p>Next try, <a href="/docs/games">building a Game</a>.</p>

</div>
