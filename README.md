# IP Info
Displays information about an IP address in a neat window!
![ip-info-banner](https://user-images.githubusercontent.com/45981228/215349605-8b9d7172-4212-4db7-8e4f-dcd0d001f6eb.png)

# Features
* Opens through the command line `ip [ip address]`
* Fetches basic info about the IP address using the <a href="https://ipwho.is/">ipwho.is</a> API, such as ISP, ASN, and approximate location
* Sets the background of the window to a Google Maps Street View preview of the approximate location
* Includes a hyperlink to launch the system's maps app with a pinpoint dropped at the approximate location
* ~~Fetches and displays a vector image of the located country's flag from <a href="https://countryflagsapi.com">countryflagsapi.com</a>~~
    * This domain is no longer serving its original purpose. All vector flag images are stored locally now.
* Displays the local time of the located timezone along with a unicode clock emoji that is closest to that time

# Notes
* IPv6 is not currently supported.
* Google Maps frontend changes may prevent the hiding of unnecessary elements in the street view background.
* This was designed for use on macOS systems, but since it's just an Electron app, it could be improved to work elegantly on other operating systems as well with minimal changes.
