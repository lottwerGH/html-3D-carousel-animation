const carouselPos = document.getElementById("carousel-position")

function posInputIsValid(input){
    if (input === "" || Number(input) === NaN){return false}
    return true
}

function getXAndYPosPercent(transformValue){
    if (transformValue.includes("translate")) {
        const parts = transformValue.split(",");
        const xPercent = parts[0].split("(")[1].trim();
        const yPercent = parts[1].split(")")[0].trim();
        console.log(xPercent, yPercent)
        return [xPercent, yPercent];
    }
}

document.getElementById("xPosControl").addEventListener('input', (e) => {
    const val = e.target.value;
    if (!posInputIsValid(val))return false
    const xPercent = `${clamp(Number(val), -100, 100)}%`;
    const [_, yPercent] = getXAndYPosPercent(carouselPos.style.transform);

    console.log(`translate(${xPercent}, ${yPercent})`);
    carouselPos.style.transform = `translate(${xPercent}, ${yPercent})`;
    console.log(carouselPos.style.transform)
});

document.getElementById("yPosControl").addEventListener('input', (e) => {
    const val = e.target.value;
    if (!posInputIsValid(val))return false
    const yPercent = `${clamp(Number(val), -100, 100)}%`;
    const [xPercent, _] = getXAndYPosPercent(carouselPos.style.transform);

    console.log(`translate(${xPercent}, ${yPercent})`);
    carouselPos.style.transform = `translate(${xPercent}, ${yPercent})`;
    console.log(carouselPos.style.transform)
});