# Simple Example
# Change later to be more robust

#!/bin/bash

# PreChecks
echo "Running PreRun Checks !!"

echo "####### Checking for openssl #######"
command -v openssl >> /dev/null
if [ $? -eq 0 ]; then
        echo "openssl is installed......\nContinuing"
else
        echo "openssl is not installed......\nInstalling openssl"
        # Assumed we are running on Ubuntu/Debian
        apk add openssl
        echo "openssl is now installed......\nContinuing"

fi

echo "####### Checking Directory Structure #######"
if [ -d "./Keys" ] 
then
    echo "Directory ./Keys exists." 
else
    echo "Directory ./Keys does not exists."
    echo "Creating Directory"
    mkdir ./Keys
fi

echo "Generating OpenRSA Key Now !!"
# Generate the Key into a PEM
# Change to 4096 or stringer after main functional testing
openssl genrsa -out ./Keys/rsa_2048_priv.pem 2048

# Get the public key from the Private PEM
openssl rsa -in ./Keys/rsa_2048_priv.pem -out ./Keys/rsa_2048_pub.pem -outform PEM -pubout

echo "OpenRSA Key has been Generated !!"