const storySlides = [
    "In a world of ancient spells and midnight mysteries...",
    "I found a magic more powerful and healing than any legend has ever known.",
    "It wasn’t in a book or a wand, but in the way you look at me with your beautiful, addictive eyes filled with love.",
    "Tonight, let the stars whisper what's in my heart..."
];

let currentSlide = 0;
const canvas = document.getElementById('magicCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: 0, y: 0 };

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
    animate();
}

function createStars() {
    const starfield = document.getElementById('starfield');
    for(let i=0; i<150; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        let size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
        starfield.appendChild(star);
    }
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    const wand = document.getElementById('wand');
    wand.style.left = mouse.x + 'px';
    wand.style.top = mouse.y + 'px';
    
    for(let i=0; i<4; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

class Particle {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = `hsla(${Math.random() * 40 + 35}, 100%, 70%, ${Math.random()})`;
        this.life = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 0.015;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particles.length; i++){
        particles[i].update();
        particles[i].draw();
        if(particles[i].life <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

// SYNCED START TRANSITION
function startExperience() {
    const startScreen = document.getElementById('startScreen');
    const storyScreen = document.getElementById('storyScreen');
    
    startScreen.style.opacity = '0';
    
    setTimeout(() => {
        startScreen.classList.add('hidden');
        storyScreen.classList.remove('hidden');
        storyScreen.style.opacity = '1';
        
        document.getElementById('bgMusic').play();
        showSlide();
    }, 1500); 
}

function showSlide() {
    const content = document.getElementById('storyContent');
    const nextBtn = document.getElementById('nextBtn');
    
    content.style.opacity = 0;
    content.style.transform = "translateY(10px)";
    nextBtn.classList.remove('show');

    setTimeout(() => {
        content.innerHTML = storySlides[currentSlide];
        content.style.opacity = 1;
        content.style.transform = "translateY(0)";
        nextBtn.classList.add('show');
    }, 500);
}

function nextSlide() {
    currentSlide++;
    if(currentSlide < storySlides.length) {
        showSlide();
    } else {
        startSpellMode();
    }
}

function startSpellMode() {
    const storyScreen = document.getElementById('storyScreen');
    storyScreen.style.opacity = 0;
    
    setTimeout(() => {
        storyScreen.classList.add('hidden');
        const teddyScreen = document.getElementById('teddyScreen');
        teddyScreen.classList.remove('hidden');
        teddyScreen.style.opacity = '1';
        
        const spellText = document.getElementById('spellText');
        spellText.innerText = "Move your wand and summon the magic...";
        
        const summonBtn = document.createElement('button');
        summonBtn.id = "summonBtn";
        summonBtn.className = "magic-btn pulse";
        summonBtn.innerText = "ACCIO TEDDY! ✨";
        summonBtn.onclick = handleSummonClick;
        
        teddyScreen.appendChild(summonBtn);
    }, 1500);
}

function handleSummonClick() {
    const btn = document.getElementById('summonBtn');
    btn.style.opacity = '0';
    setTimeout(() => btn.remove(), 500);
    
    document.getElementById('spellText').innerText = "A gift from my heart to yours...";
    summonTeddy();
}

function summonTeddy() {
    const container = document.getElementById('teddyContainer');
    container.style.transform = 'scale(1)';
    setTimeout(() => {
        document.getElementById('interactionHint').innerText = "Give the teddy a magical hug (Click it)";
    }, 2000);
}

function hugTeddy() {
    const teddy = document.querySelector('.teddy-svg');
    teddy.style.filter = "drop-shadow(0 0 40px gold) brightness(1.3)";
    document.getElementById('interactionHint').innerText = "You've unlocked a secret message...";
    document.getElementById('letterBtn').classList.remove('hidden');
    document.getElementById('letterBtn').style.opacity = 1;
}

// CHANGED: Infinite Star Fall
function createStarFall() {
    const starfield = document.getElementById('starfield');
    
    // Using setInterval instead of loop to make it infinite
    setInterval(() => {
        let star = document.createElement('div');
        star.className = 'falling-star';
        star.style.left = Math.random() * 100 + 'vw';
        let size = Math.random() * 4 + 2; 
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.setProperty('--fall-duration', (Math.random() * 1.5 + 2) + 's');
        starfield.appendChild(star);
        
        // Remove star after it falls to prevent memory leaks
        setTimeout(() => star.remove(), 4000);
    }, 50); // Generates a new star every 50ms forever
}

function openLetter() {
    const teddyScreen = document.getElementById('teddyScreen');
    teddyScreen.style.opacity = 0;
    
    setTimeout(() => {
        teddyScreen.classList.add('hidden');
        const letterScreen = document.getElementById('letterScreen');
        letterScreen.classList.remove('hidden');
        letterScreen.style.opacity = '1';
        
        createStarFall();
        setTimeout(() => {
            document.getElementById('letter').style.transform = "translateY(0)";
        }, 100);
    }, 1500);
}

function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');
    if(music.paused) { music.play(); icon.innerText = "🎵"; }
    else { music.pause(); icon.innerText = "🔇"; }
}

window.onload = init;
window.onresize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };