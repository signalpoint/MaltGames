<div class="container">

  <h2>Get Started Building a Site</h2>

  <p>1. On your web server, create a directory for your Site:</p>

<pre>
mkdir www
</pre>

  <p>2. Download and unzip MaltKit in the directory:</p>

<pre>
cd www
wget -q https://github.com/signalpoint/MaltGames/archive/refs/heads/main.zip
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

  <p>3. Download Font Awesome 5:</p>

  <p>Use the <a href="https://fontawesome.com/download" target="_blank">Font Awesome 5 Download Page</a>
  to get the "Free for Web" version.</p>

  <p>4. Upload Font Awesome 5 to your web server</p>

<pre>
scp ~/Desktop/fontawesome-free-5.15.4-web.zip me@[my-server-ip]:~/
</pre>

  <p>5. Unzip Font Awesome 5 on your web server</p>

<pre>
cd vendor
cp ~/fontawesome-free-5.15.4-web.zip .
unzip -q fontawesome-free-5.15.4-web.zip
rm fontawesome-free-5.15.4-web.zip
cd ..
</pre>

  <p>6. Open your Site in a browser</p>

  <pre>https://example.com/my-app</pre>

  <p>Next, try...</p>

  <ul>
    <li><a href="/docs/sites">Creating a Mod</a></li>
    <li><a href="/docs/games">Building a Game</a></li>
  </ul>

</div>
