A tool box for learning modern coding technologies and building your own custom
applications, for all devices.

# Get Started Building an App

```
1. on your web server, open your public html directory

cd www

2. download and unzip MaltGames to a folder

wget -q https://github.com/signalpoint/MaltGames/archive/refs/heads/main.zip
unzip -q main.zip
mv MaltGames-main my-app
rm main.zip

3. use composer to install

cd my-app
composer install

3. download font awesome 5

https://fontawesome.com/download

4. upload font awesome to your web server

scp fontawesome-free-5.15.4-web.zip me@[my-server-ip]:~/

5. unzip font awesome on your web server

cd vendor
cp ~/fontawesome-free-5.15.4-web.zip
unzip fontawesome-free-5.15.4-web.zip
rm fontawesome-free-5.15.4-web.zip

6. open your app in a browser

https://example.com/my-app

```

Ok? Go!
