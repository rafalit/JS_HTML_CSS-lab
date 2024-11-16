const canvas = document.getElementById('zombieCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const highscoresButton = document.getElementById('highscoresButton');
const resumeButton = document.getElementById('resumeButton');
const restartButton = document.getElementById('restartButton');
const menuButton = document.getElementById('menuButton');
const backToMenuButton = document.getElementById('backToMenuButton');
const nicknameInput = document.getElementById('nickname');
const gameScreen = document.getElementById('gameScreen');
const startScreen = document.getElementById('startScreen');
const highscoresScreen = document.getElementById('highscoresScreen');
const pauseMenu = document.getElementById('pauseMenu');
const gameStats = document.getElementById('gameStats');

let score = 0;
let killedZombies = 0;
let shotsFired = 0;
let missedShots = 0;
let zombies = [];
let gameRunning = false;
let animationActive = true;
let nickname = '';
let gameInterval;
let zombieSpawnInterval;
let lives = 3;
let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

// Tło gry
const background = new Image();
background.src = 'board-bg.jpg'; // Musisz mieć plik tła (board-bg.jpg)

// Zmieniamy obrazek na sprite sheet z zombie
let zombieImage = new Image();
zombieImage.src = 'walkingdead.png';  // Załaduj sprite sheet z 10 klatkami animacji zombie

// Obrazki serduszek
const heartImage = new Image();
heartImage.src = 'heart.png';

// Funkcja do rysowania zombie
function Zombie() {
    this.x = canvas.width;
    this.y = canvas.height - Math.random() * 100 - 280;  // Losowa pozycja w dolnej części ekranu
    this.size = Math.random() * (100 - 10) + 60; // Losowa wielkość między 60 a 100
    this.speed = Math.random() * (2 - 1) + 2.5;  // Losowa prędkość
    this.image = zombieImage;
    this.width = 80; // Szerokość jednego zombie
    this.height = 180; // Większa wysokość
    this.currentFrame = 0;  // Klatka animacji
    this.frameCount = 10;   // Liczba klatek animacji (np. 10 klatek)
    this.frameWidth = zombieImage.width / this.frameCount;  // Obliczamy szerokość jednej klatki w sprite sheet
    this.frameHeight = zombieImage.height;  // Wysokość jednej klatki animacji

    this.move = () => {
        this.x -= this.speed;  // Poruszanie w lewo
    };

    this.draw = () => {
        ctx.drawImage(
            this.image,
            this.currentFrame * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.size,
            this.size * 2
        );
        this.currentFrame = (this.currentFrame + 1) % this.frameCount;  // Zmieniamy klatkę animacji
    };
}

// Funkcja do rozpoczęcia gry
// Funkcja do rozpoczęcia gry
function startGame() {
    console.log("Rozpoczynanie gry...");
    
    // Sprawdzenie, czy użytkownik podał nick
    if (!nicknameInput.value) {
        alert("Podaj nick, aby rozpocząć!");
        return;
    }

    // Resetowanie zmiennych przed rozpoczęciem gry
    nickname = nicknameInput.value;
    score = 0;
    killedZombies = 0;
    shotsFired = 0;
    zombies = [];
    lives = 3;  // Ustawiamy liczbę żyć na 3
    gameRunning = true;

    // Ukrywanie ekranu startowego, pokazywanie ekranu gry
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    // Ustawienia gry
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Uruchomienie interwałów gry
    gameInterval = setInterval(updateGame, 1000 / 60);
    zombieSpawnInterval = setInterval(spawnZombie, 500);
}

// Funkcja do aktualizacji gry
function updateGame() {
    if (!animationActive) return;

    // Tło gry
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // Sortowanie zombie według pozycji stóp w odwrotnej kolejności
    zombies.sort((a, b) => (a.y + a.size * 2) - (b.y + b.size * 2));

    // Rysowanie zombie i sprawdzanie, czy uciekły
    zombies.forEach(zombie => {
        zombie.move();
        zombie.draw();

        // Jeśli zombie opuściło ekran
        if (zombie.x + zombie.size <= 0) {
            // Utrata życia
            lives--;
            // Odjęcie punktów
            // Sprawdzenie, czy gra się kończy
            if (lives <= 0) {
                endGame();
            }
            // Usuwanie zombie z ekranu
            zombies = zombies.filter(z => z !== zombie);
        }
    });

    // Usuwanie zombie, które zniknęły z ekranu
    zombies = zombies.filter(zombie => zombie.x + zombie.size > 0);

    // Rysowanie celownika
    drawCrosshair();

    // Wyświetlanie statystyk w prawym górnym rogu
    drawStats();
}

// Funkcja do rysowania statystyk (w tym serduszek)
function drawStats() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Punkty: ${score}`, canvas.width - 150, 30);
    ctx.fillText(`Zabici: ${killedZombies}`, canvas.width - 150, 60);

    // Wyświetlanie liczby niecelnych strzałów
    ctx.fillText(`Nietrafione: ${missedShots}`, canvas.width - 150, 90);

    // Wyświetlanie serduszek
    for (let i = 0; i < lives; i++) {
        ctx.drawImage(heartImage, canvas.width - 73 - i * 40, 100, 40, 40);
    }
}

// Funkcja kończąca grę
function endGame() {
    animationActive = false;
    clearInterval(gameInterval);
    clearInterval(zombieSpawnInterval);
    // Pokazanie menu końca gry (np. zapisanie wyniku, wyświetlenie komunikatu)
    alert("Koniec gry! Twoje punkty: " + score);
    saveHighscore(); // Zapisanie wyniku
    restartGame();  // Restart gry
}


// Funkcja do rysowania celownika
function drawCrosshair() {
    const crosshairX = mouseX;
    const crosshairY = mouseY;

    // Czerwone kółko z białą obramówką
    ctx.beginPath();
    ctx.arc(crosshairX, crosshairY, 10, 0, Math.PI * 2);  // Mniejsze czerwone kółko
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

// Funkcja do dodawania zombie
function spawnZombie() {
    zombies.push(new Zombie());
}

// Funkcja do zabicia zombie
function killZombie(zombie) {
    zombies = zombies.filter(z => z !== zombie);  // Usuwamy zombie z tablicy
    killedZombies++;
    score += 12;  // Za każde zabite zombie 10 punktów
}

// Funkcja pauzująca grę
function pauseGame() {
    clearInterval(gameInterval);
    clearInterval(zombieSpawnInterval);
    animationActive = false;
    pauseMenu.style.display = 'block';
    document.getElementById('currentScore').innerText = score;
}

// Funkcja wznawiająca grę
function resumeGame() {
    animationActive = true;
    pauseMenu.style.display = 'none';
    gameInterval = setInterval(updateGame, 1000 / 60);
    zombieSpawnInterval = setInterval(spawnZombie, 2000);
}

// Funkcja restartująca grę
function restartGame() {
    animationActive = false;
    score = 0;
    killedZombies = 0;
    shotsFired = 0;
    zombies = [];
    lives = 3;
    gameRunning = false;
    startScreen.style.display = 'block';
    nicknameInput.value = '';
    gameScreen.style.display = 'none';
    pauseMenu.style.display = 'none';
}

// Funkcja zapisująca wynik do rankingu
function saveHighscore() {
    highscores.push({ nickname, score });
    highscores = highscores.sort((a, b) => b.score - a.score).slice(0, 7);
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

// Funkcja wyświetlająca ranking
function showHighscores() {
    highscoresScreen.style.display = 'block';
    startScreen.style.display = 'none';
    highscoresList.innerHTML = highscores
        .map((entry, index) => `<li>${index + 1}. ${entry.nickname} - ${entry.score}</li>`)
        .join('');
}

// Funkcja do powrotu do menu
function backToMenu() {
    highscoresScreen.style.display = 'none';
    startScreen.style.display = 'block';
    
    // Resetowanie wartości pola nicku
    nicknameInput.value = '';

    // Możesz również zresetować stan gry, aby upewnić się, że nic nie zostało w pamięci
    gameRunning = false;
    animationActive = true;
}

// Funkcja do kliknięcia w zombie
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

canvas.addEventListener('click', (event) => {
    // Iteracja po wszystkich zombie
    for (let i = 0; i < zombies.length; i++) {
        const zombie = zombies[i];

        // Sprawdzamy, czy kliknięcie znajduje się w obrębie tego zombie
        if (mouseX > zombie.x && mouseX < zombie.x + zombie.size &&
            mouseY > zombie.y && mouseY < zombie.y + zombie.size * 2) {
            
            // Zabijamy tylko pierwsze trafione zombie
            killZombie(zombie);
            return; // Po zabiciu jednego zombie, przerywamy dalsze sprawdzanie
        }
    }

    // Jeśli nie trafiono w żadnego zombie, zwiększamy liczbę nietrafionych strzałów
    missedShots++;
    score -= 6;  // Odejmowanie punktów za nietrafienie
});



// Eventy
startButton.addEventListener('click', startGame);
highscoresButton.addEventListener('click', showHighscores);
resumeButton.addEventListener('click', resumeGame);
restartButton.addEventListener('click', restartGame);
menuButton.addEventListener('click', backToMenu);
backToMenuButton.addEventListener('click', backToMenu); 


