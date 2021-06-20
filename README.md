#### URL
https://acrid-water.surge.sh

###
* Github repository: https://github.com/jensengbg-sanel-jasarevic/instablam-pwa-assignment/
* Domain name: acrid-water.surge.sh

Appen har byggts med två grundläggande funktioner, en funktions kod som hanterar galleriet och en som hanterar photo knappen.
Gallery funktionskoden körs igång när hela webbsidan har laddat, photo funktionen körs bara om MediaDevice finns på webbläsaren.

När man klickar på photo knappen skapas en DIV element med img, tid, plats, download, delete knapp och läggs till i en 'gallery sektion'. Delete knappen tar bort samma DIV element från dens parent node (gallery sektion). 

Webbläsare frågar endast om access till camera och geolocation när användare själv trycker på knapparna för att dela det. Under photo knapp kommer det visa error om man klickar men väljer att inte dela kamera. Photo knapp kan fungera utan geolocation. Användare får själv välja om man vill dela sin location till webbläsare.

#### Testa din app - Lighthouse

|Kategori |Poäng |
|-|-|
|Fast and reliable | 3 / 3 |
|Installable | 3 / 3 |
|PWA Optimized | 7 / 8 |

#### Testa din app - webbläsare
Desktop: Windows 
Mobile: iOS

|Webbläsare      |Geolocation |MediaDevices |Notification |Offline |Push |
|----------------|--------|-|-|-|-|
|Desktop Chrome  |✔️| ✔️ |❔ |✔️ |❔ |
|Mobil Chrome    |✔️ |⛔ |❔ |✔️ |❔ |
|Desktop Firefox |✔️ |⛔ |❔ |✔️ |❔ |
|Mobil   Firefox |✔️ |⛔ |❔ |✔️ |❔ |
|Desktop Safari  |❔ |❔ |❔ |❔ |❔ |
|Mobil   Safari  |⛔ |✔️ |❔ |✔️ |❔ |
|Desktop Edge    |✔️ |✔️ |❔ |✔️ |❔ |
|Mobil   Edge    |✔️ |⛔ |❔ |✔️ |❔ |

Mediadevice funkade på Android på Chrome, men inte på iOS Chrome. På tabellen har jag bara test resultat från iOS + windows.
