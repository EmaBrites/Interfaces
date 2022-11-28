let features = document.querySelectorAll(".feature-card");

features.forEach(feature => {
    window.addEventListener("scroll",() => {
        if (inView(feature)) {
            let title = feature.querySelector("h1");
            let description = feature.querySelector("p");

            let windowBottom = window.innerHeight + window.scrollY;
            let featureTop = feature.getBoundingClientRect().top + window.scrollY;
            let featureBottom = feature.getBoundingClientRect().bottom + window.scrollY;
            
            let percentage = (windowBottom - featureTop) / (featureBottom - featureTop);
            console.log(percentage);
            if(percentage < 1){
                title.style.opacity = percentage;
                description.style.opacity = percentage;
                if (percentage > 0) {
                    description.style.transform = `translateY(${(1-percentage)*100}px)`;                
                }
            }
    }
    });
});