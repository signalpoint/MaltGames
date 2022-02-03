<div class="container">

  <h2>Font Awesome 5</h2>

  <p>1. Download Font Awesome 5:</p>

  <p>Use the <a href="https://fontawesome.com/download" target="_blank">Font Awesome 5 Download Page</a>
  to get the "Free for Web" version. Save it to your Desktop.</p>

  <p>2. Upload Font Awesome 5 to your web server</p>

<pre>
scp ~/Desktop/fontawesome-free-5.15.4-web.zip me@[my-server-ip]:~/
</pre>

<p>3. Unzip Font Awesome 5 on your web server</p>

<pre>
cd www
cd vendor
mv ~/fontawesome-free-5.15.4-web.zip .
unzip -q fontawesome-free-5.15.4-web.zip
rm fontawesome-free-5.15.4-web.zip
cd ..
</pre>


</div>
