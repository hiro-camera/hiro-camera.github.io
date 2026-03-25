const images = [
    "images/photo30.jpg",
    "images/photo31.jpg",
    "images/photo32.jpg",
    "images/photo33.jpg",
    "images/photo34.jpg",
    "images/photo35.jpg",
    "images/photo36.jpg",
    "images/photo37.jpg",
    "images/photo38.jpg",
    "images/photo39.jpg",
    "images/photo40.jpg",
    "images/photo41.jpg",
    "images/photo42.jpg",
    "images/photo43.jpg",
    "images/photo44.jpg",
    "images/photo45.jpg",
    "images/photo46.jpg",
    "images/photo47.jpg",
    "images/photo49.jpg",
    "images/photo50.jpg",
    "images/photo51.jpg",
    "images/photo52.jpg",
    "images/photo53.jpg",
    "images/photo54.jpg",
    "images/photo55.jpg",
    "images/photo56.jpg",
    "images/photo57.jpg",
    "images/photo58.jpg",
    "images/photo59.jpg",
    "images/photo60.jpg",
    "images/photo61.jpg",
    "images/photo62.jpg",
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
            hero.style.width = isLandscape ? "85%" : "90%"
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
            hero.src = images[index]
            hero.style.opacity = 1
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
            }, i * 100) // 順番にずらす
        }
    })
}, { threshold: 0.1 })

galleryImgs.forEach(img => observer.observe(img))
