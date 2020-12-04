if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => {
        console.log('Service worker registered.');
    })
    .catch(error => console.log ("Error with register service worker"));
}
 
window.addEventListener('load', () => {
    galleryFunctionality();

    if( 'mediaDevices' in navigator ) 
    {
        photoFunctionality();
    }
})

function galleryFunctionality() {
    const galleryImages = document.querySelectorAll('.gallery > div > img')
    const deleteButtons = document.querySelectorAll(".deleteBtn")

    galleryImages.forEach(img => {
        img.addEventListener("click", function() {
            
            galleryImages.forEach(img => img.classList.remove("gallery-active"))
            img.classList.add("gallery-active")

            galleryImages.forEach(img => img.style.opacity = 0.5)
            img.style.opacity = 1
        });
    });
    
    var btnsArr = Array.from(deleteButtons)
    btnsArr.forEach(btn => {
        btn.addEventListener("click", function() {
        btn.style.width = "100%"
        btn.innerText = "Click on image to delete"
        document.querySelector(".gallery-active").parentNode.remove()
         })
    })

}

function photoFunctionality() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    let lat;
    let lng;

    let stream;

    const takePhotoBtn = document.querySelector('.camera-area > #takePhoto');
    const startStreamBtn = document.querySelector('.camera-area > #startStream');
    const geoLocationBtn = document.querySelector('#locationBtn');
    const errorMessage = document.querySelector(".errorMessage")

    const gallery = document.querySelector('.gallery');    

    // Button for Geolocation API
    geoLocationBtn.addEventListener('click', () => {
        const geo = navigator.geolocation;
        geo.getCurrentPosition(
            pos => {
                lat = pos.coords.latitude;
                lng = pos.coords.longitude;

                if ( lat && lng ) 
                {
                geoLocationBtn.style.backgroundColor = "#5BC236"
                geoLocationBtn.innerText = "Location On"
                }
            })   
    })
   
        
    // Asynchronous, trying to get media from user
    startStreamBtn.addEventListener('click', async () => {
        errorMessage.innerHTML = "";
        
        try 
        {          
            const naviMediaDevices = navigator.mediaDevices;
            stream = await naviMediaDevices.getUserMedia({
                video:
                    {
                    width: { min: 320, ideal: 420, max: 520 },
                    height: { min: 320, ideal: 420, max: 520 }
                }
            })
         
            const video = document.querySelector('.camera-area > video');
            video.srcObject = stream; 

            if ( video ) 
            {
                startStreamBtn.style.backgroundColor = "#5BC236"
                startStreamBtn.innerText = "Camera On"
            }
        } 
        catch (e) 
        {
            errorMessage.innerHTML = 'Could not show camera window.';
        }      
    })
  
    takePhotoBtn.addEventListener('click', async () => {
        errorMessage.innerHTML = '';

        if( !stream ) {
            errorMessage.innerHTML = 'Enable camera access.';
            return;
        }

        let tracks = stream.getTracks();
        let videoTrack = tracks[0];
        let capture = new ImageCapture(videoTrack);
        let blob = await capture.takePhoto();
        let imgUrl = URL.createObjectURL(blob);

        let divTag = document.createElement("div")

        let newImg = document.createElement("img")
        newImg.src = imgUrl
        divTag.appendChild(newImg)

        let imgTime = document.createElement("p")
        imgTime.className = "gallery-highlight"
        imgTime.innerText = time 
        divTag.appendChild(imgTime)
        
        let imgLocation = document.createElement("span")
        imgTime.append(imgLocation)
       
        let downloadLink = document.createElement("a")
        downloadLink.innerText = "Download"
        downloadLink.href = imgUrl;
        downloadLink.download = 'photo.jpg';
        divTag.appendChild(downloadLink)

        let deleteBtn = document.createElement("button")
        deleteBtn.setAttribute("class", "deleteBtn")
        deleteBtn.innerText = "Delete photo"
        divTag.appendChild(deleteBtn)

        let errorMsg = document.createElement("p")
        errorMsg.innerText = ""
        errorMsg.style.color = "#FF0D00"
        divTag.appendChild(errorMsg)

        gallery.appendChild(divTag)

        // Try getting city via lat & lng if user allowed Geolocation
        if (lat && lng) {
            
        try 
            {
            // This API will fail if others are using it at the same time
            const response = await fetch(`https://geocode.xyz/${lat},${lng}?json=1`);
            const data = await response.json();
    
            if( data.error ) 
            {
                errorMsg.innerText = "Could not get location information at this time."
            } 
            else 
            {
                imgLocation.innerText = ` ${data.city}`
            }
        } 
        catch (e) 
        {
            errorMsg.innerText = "Could not find your city."
        }
    }
    galleryFunctionality()

})
}