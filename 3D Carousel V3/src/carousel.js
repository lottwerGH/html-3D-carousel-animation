
let currentAngle = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const angleIncrement = 360 / totalItems;
const radius = 180;

//physics variables
let currentSpeed = 0;       //current speed (degrees/frame)
let targetSpeed = 1;        //target speed 
const lerp = 0.05;          //lerp (smooth slowing down/accelerating); 0.01 - 1 looks the same

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let animationId;

function speedInputIsValid(input){
    if (input === "" || Number(input) === NaN){return false}
    return true
}

//core animation loop
function animate() {
    //lerp current speed toward target speed
    currentSpeed += (targetSpeed - currentSpeed) * lerp;

    //stop animation when slowed down
    if (targetSpeed === 0 && Math.abs(currentSpeed) < 0.05 ) {
        currentSpeed = 0;
        cancelAnimationFrame(animationId);
        animationId = null;
        return;
    }

    currentAngle -= currentSpeed;  //rotates clockwise
    updateCarousel();
    animationId = requestAnimationFrame(animate);
}

//update carousel items
function updateCarousel() {
    items.forEach((item, index) => {
        const newAngle = currentAngle + (index * angleIncrement);
        item.style.transform = `rotateY(${newAngle}deg) translateZ(${radius}px)`;
    });
}

//start animation
function startCarousel() {
    console.log("Started")
    if (!animationId) {
        animate();
    }
}

const carousel = document.querySelector('.carousel-wrapper');

carousel.addEventListener('mouseenter', () => {
    targetSpeed = 0;        //decelerate to 0 on hover
});

carousel.addEventListener('mouseleave', () => {
    const val = document.getElementById("speedControl").value
    targetSpeed = speedInputIsValid(val) ? clamp(parseFloat(val), 0.1, 10) : 0.5;      //accelerate back to target speed
    startCarousel();
});

//control speed
document.getElementById("speedControl").addEventListener('input', (e) => {
    const val = e.target.value;
    if (!speedInputIsValid(val))return false
    targetSpeed = clamp(parseFloat(val), 0.1, 10);
});

//init
//document.addEventListener("DOMContentLoaded", startCarousel)
startCarousel();
