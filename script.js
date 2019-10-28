let app = new Vue({
   el: '#app',
   data: {
        inputBreed: '',
        currentBreeds: [],
        currentImages: [],
        currentBreed: '',
        currentImage: '',
        number: 0,
   },
   created() {
        this.dogFetch();
   },
   methods: {
        dogFetch() {
            try {
                var url = "https://dog.ceo/api/breeds/list/all";
                fetch(url)
                    .then((data) => {
                        return (data.json());
                    })
                    .then((doglist) => {
                       console.log(doglist);
                       console.log(this.currentImages);
                       this.currentBreeds = Object.keys(doglist.message);
                    });
                
            } catch(error){
                console.log(error);    
            }
        },
        listBreeds() {
            var allBreeds = "<p></p>";
            var x;
            for(x in this.currentBreeds) {
                allBreeds += "<p>" + this.currentBreeds[x] + "</p>";
            }
            document.getElementById("breeds").innerHTML = allBreeds;
        },
        getImage(name) {
            try {
                var url = "https://dog.ceo/api/breed/" + name + "/images";
                fetch(url)
                    .then((data) => {
                        return (data.json());
                    })
                    .then((dogImages) => {
                        this.currentImages = dogImages.message;
                        this.currentImage = this.currentImages[0];
                        this.number = 0;
                        document.getElementById("next").hidden = false;
                    });
                
            } catch(error){
                console.log(error);    
            }
        },
        findBreed() {
            var x;
            for (x in this.currentBreeds) {
                if(this.currentBreeds[x] === this.inputBreed) {
                    console.log(this.inputBreed);
                    this.getImage(this.inputBreed);
                    this.currentBreed = this.currentBreeds[x];
                    
                }
            }
        },
        nextPicture() {
            console.log(this.number);
            this.number += 1;
            if(this.number === this.currentImages.length) {
                this.number = 0;
            }
            this.currentImage = this.currentImages[this.number];
        }
   },
   
});