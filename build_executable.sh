
#!/bin/bash

cp update-android_template update-android
cat ./target/uberjar/*-standalone.jar >> update-android
chmod +x update-android