const bleno = require('bleno');

// iBeacon parameters (these are the values you'll typically configure)
const beaconUuid = 'e2c56db5dffb48d2b060d0f5a71096e0'; // Example UUID
const major = 1; // Example Major
const minor = 1; // Example Minor
const measuredPower = -59; // Measured RSSI at 1 meter (in dBm) - Crucial for accurate distance estimation

// Function to construct the iBeacon advertisement data
function constructAdvertisementData() {
    // iBeacon prefix (fixed)
    const prefix = Buffer.from([
        0x4c, 0x00, // Apple Manufacturer ID (little-endian)
        0x02, 0x15  // iBeacon identifier
    ]);

    // UUID
    const uuidBuffer = Buffer.from(beaconUuid.replace(/-/g, ''), 'hex');

    // Major and Minor (big-endian)
    const majorBuffer = Buffer.alloc(2);
    majorBuffer.writeUInt16BE(major, 0);
    const minorBuffer = Buffer.alloc(2);
    minorBuffer.writeUInt16BE(minor, 0);

    // Measured Power (1 byte, signed)
    const powerBuffer = Buffer.alloc(1);
    powerBuffer.writeInt8(measuredPower, 0);

    // Combine the parts
    const advertisementData = Buffer.concat([
        prefix,
        uuidBuffer,
        majorBuffer,
        minorBuffer,
        powerBuffer
    ]);

    return advertisementData;
}

// Event handler for when bleno is ready
bleno.on('stateChange', (state) => {
    if (state === 'poweredOn') {
        console.log('Bluetooth adapter is powered on. Starting iBeacon advertisement...');
        startAdvertising();
    } else {
        console.log('Bluetooth adapter is not powered on or is in an unknown state: ' + state);
        if (state === 'unsupported' || state === 'unauthorized' || state === 'turningOff' || state === 'unknown') {
            console.log(`State is: ${state}.  Exiting...`);
            process.exit(1); // Exit if Bluetooth is not usable.

        }
        bleno.stopAdvertising(); // Stop advertising if poweredOff
    }
});

function startAdvertising() {
    const advertisementData = constructAdvertisementData();

    bleno.startAdvertisingIBeacon(beaconUuid, major, minor, measuredPower, (error) => {
        if (error) {
            console.error('Error starting iBeacon advertisement:', error);
             // Attempt to restart advertising after a delay
             setTimeout(() => {
                console.log('Attempting to restart advertising...');
                startAdvertising(); // Recursive call
            }, 5000); // 5 seconds
        } else {
            console.log(`Successfully started advertising as iBeacon:
  UUID: ${beaconUuid}
  Major: ${major}
  Minor: ${minor}
  Measured Power: ${measuredPower} dBm`);
        }
    });
}

// Optional:  Handle the 'advertisingStart' event (bleno v0.6.0 and later)
bleno.on('advertisingStart', (error) => {
  if (error) {
    console.error('Error on advertisingStart: ', error);
  } else {
    console.log('Started Advertising (advertisingStart event)');
  }
});

// Handle errors
bleno.on('error', (error) => {
    console.error('Bleno Error:', error);
});
