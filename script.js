
const birthdayPage = document.getElementById("birthdayPage");
const memoriesPage = document.getElementById("memoriesPage");

const openLetterButton = document.getElementById("openLetter");
const welcomeScreen = document.getElementById("welcomeScreen");
const letterScreen = document.getElementById("letterScreen");

const backgroundMusic = document.getElementById("backgroundMusic");

function animatePage(element) {
    element.classList.remove("page-transition");

    void element.offsetWidth;

    element.classList.add("page-transition");
}

function createPetalWave() {
    const wave = document.createElement("div");
    wave.id = "petalWave";

    document.body.appendChild(wave);

    const petalCount = 65;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("span");
        petal.classList.add("wave-petal");

        // Spread petals across the screen vertically
        petal.style.top = Math.random() * 100 + "vh";

        // Vary petal sizes
        const size = 18 + Math.random() * 25;
        petal.style.width = size + "px";
        petal.style.height = size * 1.5 + "px";

        // Stagger their movement
        petal.style.animationDelay = Math.random() * 0.7 + "s";

        wave.appendChild(petal);
    }

    setTimeout(() => {
        wave.remove();
    }, 2500);
}

let isTransitioning = false;

function transitionToPage(currentPage, nextPage, callback) {
    if (isTransitioning) return;

    isTransitioning = true;

    // Start the petal wave
    createPetalWave();

    // Move the current page away
    currentPage.classList.add("page-sweep-out");

    setTimeout(() => {
        // Hide the current page
        currentPage.classList.add("hidden");
        currentPage.classList.remove("page-sweep-out");

        // Show the next page
        nextPage.classList.remove("hidden");
        nextPage.classList.add("page-sweep-in");

        // Run additional page setup
        if (callback) callback();

        window.scrollTo(0, 0);
    }, 400);

    // Finish the transition
    setTimeout(() => {
        nextPage.classList.remove("page-sweep-in");
        isTransitioning = false;
    }, 1200);
}


// Show birthday letter
function showLetter() {
    if (isTransitioning) return;

    // First visit: Welcome screen to Letter screen
    if (!welcomeScreen.classList.contains("hidden")) {
        isTransitioning = true;

        createPetalWave();

        welcomeScreen.classList.add("page-sweep-out");

        setTimeout(() => {
            welcomeScreen.classList.add("hidden");
            welcomeScreen.classList.remove("page-sweep-out");

            letterScreen.classList.remove("hidden");
            letterScreen.classList.add("page-sweep-in");

            window.scrollTo(0, 0);
        }, 400);

        setTimeout(() => {
            letterScreen.classList.remove("page-sweep-in");
            isTransitioning = false;
        }, 1200);

        return;
    }

    // Returning from Memories to Letter
    transitionToPage(memoriesPage, birthdayPage, () => {
        welcomeScreen.classList.add("hidden");
        letterScreen.classList.remove("hidden");
    });
}


// Show family memories
function showMemories() {
    transitionToPage(
        birthdayPage,
        memoriesPage
    );
}

// Open birthday surprise and start music
if (openLetterButton) {
    openLetterButton.addEventListener("click", () => {
        showLetter();

        if (backgroundMusic) {
            backgroundMusic.play().catch(error => {
                console.log("Music could not play:", error);
            });
        }
    });
}

// Navigate between letter and memories without reloading
document.querySelectorAll("[data-page]").forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();

        if (link.dataset.page === "memories") {
            showMemories();
            history.replaceState(null, "", "#memories");
        }

        if (link.dataset.page === "letter") {
            showLetter();
            history.replaceState(null, "", "#letter");
        }
    });
});

// Always start at the welcome screen when the page loads
window.history.replaceState(null, "", window.location.pathname);

// Falling flower petals
function createPetal() {
    const petal = document.createElement("span");

    petal.classList.add("falling-petal");
    petal.textContent = Math.random() > 0.5 ? "🌸" : "🌷";

    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (6 + Math.random() * 6) + "s";
    petal.style.fontSize = (12 + Math.random() * 12) + "px";

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}

setInterval(createPetal, 900);
