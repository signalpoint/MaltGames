## 1. Download Foundation 6:</p>

Use the <a href="https://get.foundation/" target="_blank">Foundation</a> website
to download the `Foundation-Sites-CSS.zip` file to your Desktop.

## 2. Upload Foundation 6 to your web server

```
scp ~/Desktop/Foundation-Sites-CSS.zip me@[my-server-ip]:~/
```

## 3. Unzip Foundation 6 on your web server

```
cd www
cd vendor
mkdir foundation-6
cd foundation-6
mv ~/Foundation-Sites-CSS.zip .
unzip -q Foundation-Sites-CSS.zip
rm Foundation-Sites-CSS.zip
cd ../..
```
