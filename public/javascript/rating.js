const ratingStars = document.getElementsByClassName("rating__star");

async function executeRating(stars){
    console.log(executeRating);

    let i; 
    stars.map((star) => {
        i = stars.indexOf(star);
        
            for (i; i>= 0; --i) {
                stars[i].classList.remove('far fa-star') 
                stars[i].classList.add("fas fa-star")
            }
    });
}

document.querySelector('rating').addEventListener('click', executeRating(ratingStars));