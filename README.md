## Sanel Jasarevic
Domain: https://acrid-water.surge.sh
Github: https://github.com/jensengbg-sanel-jasarevic/instablam-pwa-js

Appen har byggts med två grundläggande funktioner, en funktions kod som hanterar galleriet och en som hanterar photo knappen.
Gallery funktionskoden fungerar när DOM element har laddats upp, photo funktionen fungerar bara om MediaDevice finns på webbläsaren.

När man klickar på photo knapp skapas en DIV element med img, tid, plats, download, delete knapp och läggs till i gallery sektionen. Delete knappen tar bort DIV elementet från parent node (gallery section). 

Webbläsare frågar endast om access till camera och geolocation när användare själv trycker på knapparna för att dela det. Photo knapp kommer visa en error text på html om klickar men inte delar camera. Photo knapp kan fungera utan geolocation. Användare får välja om man vill dela sin location till webbläsare.

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