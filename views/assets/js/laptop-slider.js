const imageTrack = document.querySelector(".list-slider-images")
const slides = Array.from(imageTrack.children)
const contentTrack = document.querySelector(".list-slider-content")
const contents = Array.from(contentTrack.children)
const prevBtn = document.querySelector(".btn-slider.btn-prev")
const nextBtn = document.querySelector(".btn-slider.btn-next")
const dotsNav = document.querySelector(".dot-navigation")
const dots = Array.from(dotsNav.children)
const slideWidth = slides[0].getBoundingClientRect().width

// History Slider preparations
prevBtn.classList.add("hidden")
slides[0].classList.add("current-slide")
contents[0].classList.add("current-slide")
dots[0].classList.add("current-slide")

// Set the slide positions
const setSlidePosition = (slide, index) => {
	slide.style.left = slideWidth * index + "px"
}
slides.forEach(setSlidePosition)
// Set paragraph opacity of first paragraph to 1
contents[0].style.opacity = "1"

const moveToSlide = (imageTrack, currentSlide, targetSlide) => {
	imageTrack.style.transform = "translateX(-" + targetSlide.style.left + ")"
	currentSlide.classList.remove("current-slide")
	targetSlide.classList.add("current-slide")
}

const updateDots = (currentDot, targetDot) => {
	currentDot.classList.remove("current-slide")
	targetDot.classList.add("current-slide")
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
	if (targetIndex === 0) {
		prevBtn.classList.add("d-none")
		nextBtn.classList.remove("d-none")
	} else if (targetIndex === slides.length - 1) {
		prevBtn.classList.remove("d-none")
		nextBtn.classList.add("d-none")
	} else {
		prevBtn.classList.remove("d-none")
		nextBtn.classList.remove("d-none")
	}
}

const fadeParagraph = (currentPara, targetPara) => {
	currentPara.style.opacity = "0"
	targetPara.style.opacity = "1"
	currentPara.classList.remove("current-slide")
	targetPara.classList.add("current-slide")
}

const resizeContentBox = () => {
	if (window.innerWidth < 768) {
		if (contents[3].classList.contains("current-slide")) {
			jQuery(".list-slider-content").css("height", "350px")
		} else if (contents[4].classList.contains("current-slide")) {
			jQuery(".list-slider-content").css("height", "400px")
		} else if (contents[5].classList.contains("current-slide") || contents[6].classList.contains("current-slide")) {
			jQuery(".list-slider-content").css("height", "450px")
		} else {
			jQuery(".list-slider-content").css("height", "300px")
		}
	}
}

// Prev button
prevBtn.addEventListener("click", e => {
	const currentSlide = imageTrack.querySelector(".current-slide")
	const currentPara = contentTrack.querySelector(".current-slide")
	const prevSlide = currentSlide.previousElementSibling
	const prevPara = currentPara.previousElementSibling
	const currentDot = dotsNav.querySelector(".current-slide")
	const prevDot = currentDot.previousElementSibling
	const prevIndex = slides.findIndex(slide => slide === prevSlide)
	moveToSlide(imageTrack, currentSlide, prevSlide)
	updateDots(currentDot, prevDot)
	hideShowArrows(slides, prevBtn, nextBtn, prevIndex)
	fadeParagraph(currentPara, prevPara)
	resizeContentBox()
})

// Next button
nextBtn.addEventListener("click", e => {
	const currentSlide = imageTrack.querySelector(".current-slide")
	const currentPara = contentTrack.querySelector(".current-slide")
	const nextSlide = currentSlide.nextElementSibling
	const nextPara = currentPara.nextElementSibling
	const currentDot = dotsNav.querySelector(".current-slide")
	const nextDot = currentDot.nextElementSibling
	const nextIndex = slides.findIndex(slide => slide === nextSlide)
	moveToSlide(imageTrack, currentSlide, nextSlide)
	updateDots(currentDot, nextDot)
	hideShowArrows(slides, prevBtn, nextBtn, nextIndex)
	fadeParagraph(currentPara, nextPara)
	resizeContentBox()
})

// Dot navigation
dotsNav.addEventListener("click", e => {
	//What indicator was clicked on
	const targetDot = e.target.closest("button")
	if (!targetDot) return

	const currentSlide = imageTrack.querySelector(".current-slide")
	const currentPara = contentTrack.querySelector(".current-slide")

	const currentDot = dotsNav.querySelector(".current-slide")
	const targetIndex = dots.findIndex(dot => dot === targetDot)

	const targetSlide = slides[targetIndex]
	const targetPara = contents[targetIndex]

	moveToSlide(imageTrack, currentSlide, targetSlide)
	fadeParagraph(currentPara, targetPara)

	updateDots(currentDot, targetDot)
	hideShowArrows(slides, prevBtn, nextBtn, targetIndex)
	resizeContentBox()
})
