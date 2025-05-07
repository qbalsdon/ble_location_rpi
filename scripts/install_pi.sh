#!/bin/sh

DIR=$(pwd)

cleanup () {
    cd $DIR
} 
trap cleanup EXIT

cd ~
echo "=== Setup: NPM ==="
sudo apt-get -y install npm

echo "=== Setup: Code ==="
mkdir repo
cd repo
git clone https://github.com/qbalsdon/ble_location_rpi.git
cd ble_location_rpi
echo "======="
sudo npm install

echo "System is ready to be rebooted"