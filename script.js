// Tamaño de la raqueta y velocidad de movimiento
let paddleWidth = 10;
let paddleHeight = 100;
let playerY, computerY;
let playerSpeed = 5;
let computerSpeed = 3;

// Tamaño y posición de la pelota
let ballX, ballY;
let ballSize = 20;
let ballSpeedX = 4;
let ballSpeedY = 4;
let ballRotation = 0; // Variable para controlar la rotación de la pelota

// Altura del marco superior e inferior
let frameHeight = 40; // Aumentamos el marco a 40 píxeles de altura

// Puntajes de los jugadores
let playerScore = 0;
let computerScore = 0;

// Imágenes y sonidos
let fondo, barra1, barra2, bola;
let bounceSound; // Sonido para la colisión de la pelota
let gameOverSound; // Sonido para el fin de juego
let goalSound; // Sonido para el gol anotado

function preload() {
    // Cargar las imágenes y los sonidos antes de que el programa inicie
    fondo = loadImage('Sprites/fondo1.png');
    barra1 = loadImage('Sprites/barra1.png'); // Imagen para la raqueta del jugador
    barra2 = loadImage('Sprites/barra2.png'); // Imagen para la raqueta de la computadora
    bola = loadImage('Sprites/bola.png'); // Imagen para la pelota
    bounceSound = loadSound('Song/Bounce.mp3'); // Cargar el sonido de colisión
    gameOverSound = loadSound('Song/gameOver.mp3'); // Cargar el sonido de fin de juego
    goalSound = loadSound('Song/wooHoo.mp3'); // Cargar el sonido de gol anotado
}

function setup() {
    createCanvas(windowWidth, windowHeight); // Crear el canvas que ocupa toda la ventana
    // Posiciones iniciales
    playerY = height / 2 - paddleHeight / 2;
    computerY = height / 2 - paddleHeight / 2;
    ballX = width / 2;
    ballY = height / 2;
}

function draw() {
    // Dibujar la imagen de fondo en lugar de un color sólido
    image(fondo, 0, 0, width, height);

    // Dibujar marco superior e inferior
    fill(150); // Color gris para los marcos
    rect(0, 0, width, frameHeight); // Marco superior
    rect(0, height - frameHeight, width, frameHeight); // Marco inferior

    // Dibujar raqueta del jugador usando la imagen 'barra1.png'
    image(barra1, 20, playerY, paddleWidth, paddleHeight);

    // Dibujar raqueta de la computadora usando la imagen 'barra2.png'
    image(barra2, width - 30, computerY, paddleWidth, paddleHeight);

    // Aplicar rotación a la pelota en función de su velocidad
    push();
    translate(ballX, ballY);
    ballRotation += (abs(ballSpeedX) + abs(ballSpeedY)) * 0.05; // Ajusta el valor de 0.05 para controlar la velocidad de rotación
    rotate(ballRotation);
    imageMode(CENTER);
    image(bola, 0, 0, ballSize, ballSize);
    pop();

    // Dibujar el puntaje
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text(playerScore, width / 4, frameHeight / 2); // Puntaje del jugador
    text(computerScore, (3 * width) / 4, frameHeight / 2); // Puntaje de la computadora

    // Movimiento de la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisión con el marco superior
    if (ballY - ballSize / 2 < frameHeight) {
        ballSpeedY *= -1;
        ballY = frameHeight + ballSize / 2; // Ajuste para evitar que se quede pegada
    }

    // Colisión con el marco inferior
    if (ballY + ballSize / 2 > height - frameHeight) {
        ballSpeedY *= -1;
        ballY = height - frameHeight - ballSize / 2; // Ajuste para evitar que se quede pegada
    }

    // Colisión con la raqueta del jugador
    if (
        ballX - ballSize / 2 < 30 &&
        ballY > playerY &&
        ballY < playerY + paddleHeight
    ) {
        ballSpeedX *= -1;
        if (bounceSound.isPlaying() === false) { // Evitar que el sonido se superponga
            bounceSound.play(); // Reproducir el sonido al colisionar con la raqueta del jugador
        }
    }

    // Colisión con la raqueta de la computadora
    if (
        ballX + ballSize / 2 > width - 30 &&
        ballY > computerY &&
        ballY < computerY + paddleHeight
    ) {
        ballSpeedX *= -1;
        if (bounceSound.isPlaying() === false) { // Evitar que el sonido se superponga
            bounceSound.play(); // Reproducir el sonido al colisionar con la raqueta de la computadora
        }
    }

    // Reiniciar la pelota y actualizar el puntaje si sale de la pantalla
    if (ballX < 0) {
        computerScore++; // Puntaje para la computadora
        if (!goalSound.isPlaying()) { // Evitar que el sonido se superponga
            goalSound.play(); // Reproducir el sonido de gol
        }
        resetBall();
    } else if (ballX > width) {
        playerScore++; // Puntaje para el jugador
        if (!goalSound.isPlaying()) { // Evitar que el sonido se superponga
            goalSound.play(); // Reproducir el sonido de gol
        }
        resetBall();
    }

    // Verificar si algún jugador ha llegado a 10 puntos
    if (playerScore === 10 || computerScore === 10) {
        if (!gameOverSound.isPlaying()) { // Evitar que el sonido se superponga
            gameOverSound.play(); // Reproducir el sonido de fin de juego
        }
        noLoop(); // Detener el juego al llegar a 10 puntos
        // Puedes agregar un mensaje o reiniciar el juego aquí si lo deseas
    }

    // Movimiento de la raqueta del jugador con el mouse
    playerY = constrain(mouseY - paddleHeight / 2, frameHeight, height - frameHeight - paddleHeight);

    // Movimiento automático de la raqueta de la computadora
    if (ballY < computerY + paddleHeight / 2) {
        computerY -= computerSpeed;
    } else if (ballY > computerY + paddleHeight / 2) {
        computerY += computerSpeed;
    }
    computerY = constrain(computerY, frameHeight, height - frameHeight - paddleHeight);
}

// Función para reiniciar la posición de la pelota
function resetBall() {
    ballX = width / 2;
    ballY = height / 2;
    ballSpeedX *= -1; // Cambiar dirección para el siguiente saque
    ballRotation = 0; // Reiniciar rotación
}

// Función para ajustar el canvas al tamaño de la ventana
function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Ajustar el tamaño del canvas si se cambia el tamaño de la ventana
}





