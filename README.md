# Node.js BLE iBeacon Advertiser (using bleno)
Raspberry Pi Ble Device

## Setup:
Run the following commands once:

```
# installs the code
sudo curl https://raw.githubusercontent.com/qbalsdon/ble_location_rpi/main/scripts/install_pi.sh | sh

# sets up to run on boot
sudo curl https://raw.githubusercontent.com/qbalsdon/ble_location_rpi/main/scripts/init_service_pi.sh | sh
```


### Using a nodeenv
- install nodeenv 
```
sudo pip3 install nodeenv
nodeenv env
```

- start the environment `. env/bin/activate`
- install dependencies `npm install`

## Important Notes:
- This script needs to be run with `sudo` on Linux to access the Bluetooth adapter.
- The 'bleno' library has platform-specific dependencies. See its documentation: https://github.com/noble/bleno
- This code will only work on systems with a Bluetooth adapter and the necessary libraries.
- iBeacon advertising requires root/sudo privileges.