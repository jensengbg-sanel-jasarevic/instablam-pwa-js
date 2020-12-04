self.addEventListener('install', function(event) {
    console.log('SW installed ', new Date().toLocaleTimeString());
    // SW kan ibland stängas av innan dem är färdiga, därför körs waitUntil
    event.waitUntil(
        caches.open('v1').then( cache => {
            return cache.addAll([
                "/index.html", // Sökväg till alla
                "/css/style.css", // filer som ska cachas
                "/manifest.webmanifest",
                "/img/512-512.png"
            ]);
        })
    )
});

self.addEventListener('activate', function(event) {
    console.log('SW activated ', new Date().toLocaleTimeString());
});

// Look for cached files and handle AJAX failures due to being offline

// Innan webbläsaren gör fetch triggas fetch event i service worker
self.addEventListener('fetch', event => {
    console.log('SW fetch ', event.request.url);
    // Om vi är online, gör ett vanligt request
    // Om vi är offline, leta efter ett sparat response

    // Leta i cachen om vi har gjort requestet tidigare (svara med response från gamla requestet)
    if ( navigator.onLine ) {
        console.log("Fetch online");
        // Gör det vanliga requestet
        event.respondWith(fetch(event.request).then(response => {
            // Innan vi skickar tillbaka, gör en kopia i cache
            let clone = response.clone();
            caches.open("v2").then(cache => {
 
            // key = event.request, value = clone
            cache.put(event.request, clone);               
            })
            return response;
        }) )                           
    } 
    else {
        console.log("Fetch offline, req url is ", event.request.url);
        event.respondWith( 
        caches.match(event.request).then(maybeResponse => 
            {
            if ( maybeResponse !== undefined ) {
                return maybeResponse;
            }
            else 
                console.log("Fetch returns new response");
                // Använder här response object
                return new Response("<h1> No internet </h1>", { headers: {"Content-Type": "text/html" }} );           
        }))

    }
});
 


/*
self.addEventListener('fetch', event => {
 event.respondWith(fetch(event.request));
});

respondWith ersätter webbläsarens inbyggda fetch
*/