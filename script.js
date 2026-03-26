const images = [
    "images/wedding/photo1.jpg",
    "images/wedding/photo2.jpg",
    "images/wedding/photo3.jpg",
    "images/portrait/photo1.jpg",
    "images/portrait/photo2.jpg",
    "images/portrait/photo3.jpg",
    "images/portrait/photo4.jpg",
    "images/portrait/photo5.jpg",
    "images/live/photo1.jpg",
    "images/live/photo2.jpg",
    "images/live/photo3.jpg",
    "images/live/photo4.jpg",
    "images/live/photo5.jpg",
]

let index = Math.floor(Math.random() * images.length)
const hero = document.getElementById("hero-image")

if (hero) {
    hero.src = images[index]

    function isMobile() {
        return window.innerWidth <= 768
    }

    function updateSize() {
        const isLandscape = hero.naturalWidth > hero.naturalHeight
        if (isMobile()) {
            hero.style.width = isLandscape ? "85%" : "65%"
        } else {
            hero.style.width = isLandscape ? "70%" : "40%"
        }
    }

    hero.addEventListener("load", updateSize)
    updateSize()

    setInterval(function () {
        hero.style.opacity = 0
        setTimeout(function () {
            index++
            if (index >= images.length) index = 0
            hero.onload = function () {
                updateSize()
                hero.style.opacity = 1
            }
            hero.src = images[index]
        }, 1100)
    }, 4000)
}

// ライトボックス
const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightbox-img")

if (lightbox) {
    document.querySelectorAll(".gallery img").forEach(img => {
        img.style.cursor = "pointer"
        img.addEventListener("click", () => {
            lightboxImg.src = img.src
            lightbox.classList.add("active")
        })
    })

    document.querySelector(".lightbox-close").addEventListener("click", () => {
        lightbox.classList.remove("active")
    })

    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active")
        }
    })
}

// スクロールアニメーション
const galleryImgs = document.querySelectorAll(".gallery img")

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const imgs = Array.from(galleryImgs)
            const i = imgs.indexOf(entry.target)
            setTimeout(() => {
                entry.target.classList.add("visible")
            }, i * 100)
        }
    })
}, { threshold: 0.1, rootMargin: "0px 0px -10px 0px" })

// ページ読み込み時にすでに見えている画像を即表示
galleryImgs.forEach((img, i) => {
    const rect = img.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
        setTimeout(() => {
            img.classList.add("visible")
        }, i * 100)
    }
})

galleryImgs.forEach(img => observer.observe(img))
