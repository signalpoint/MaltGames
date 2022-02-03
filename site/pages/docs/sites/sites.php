<div class="container">

  <h2>Get Started Building a Site</h2>

  <p>1. On your web server, create a directory for your Site:</p>

<pre>
mkdir www
</pre>

  <p>2. Download and unzip MaltKit in the directory:</p>

<pre>
cd www
mkZipUrl=https://github.com/signalpoint/MaltGames/archive/refs/heads/main.zip
wget -q $mkZipUrl || curl -OL $mkZipUrl
unzip -q main.zip
cd MaltGames-main/
mv * .gitignore .htaccess ../
cd ..
rmdir MaltGames-main/
rm main.zip
</pre>

  <p>3. Use Composer to install:</p>

<pre>
composer install
</pre>

  <p>4. Open your Site in a browser</p>

  <pre>https://example.com</pre>

  <p>Next, try...</p>

  <ul>
    <li><a href="/docs/sites">Creating a Mod</a></li>
    <li><a href="/docs/games">Building a Game</a></li>
  </ul>

</div>
