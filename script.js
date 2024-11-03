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

// Altura del marco superior e inferior
let frameHeight = 40; // Aumentamos el marco a 40 píxeles de altura

// Puntajes de los jugadores
let playerScore = 0;
let computerScore = 0;

function setup() {
    createCanvas(800, 400); // Crear el canvas de 800x400 px
    // Posiciones iniciales
    playerY = height / 2 - paddleHeight / 2;
    computerY = height / 2 - paddleHeight / 2;
    ballX = width / 2;
    ballY = height / 2;
}

function draw() {
    background(0); // Fondo negro

    // Dibujar marco superior e inferior
    fill(150); // Color gris para los marcos
    rect(0, 0, width, frameHeight); // Marco superior
    rect(0, height - frameHeight, width, frameHeight); // Marco inferior

    // Dibujar raqueta del jugador
    fill(255);
    rect(20, playerY, paddleWidth, paddleHeight);

    // Dibujar raqueta de la computadora
    fill(255, 0, 0);
    rect(width - 30, computerY, paddleWidth, paddleHeight);

    // Dibujar la pelota
    fill(255);
    ellipse(ballX, ballY, ballSize);

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
    }

    // Colisión con la raqueta de la computadora
    if (
        ballX + ballSize / 2 > width - 30 &&
        ballY > computerY &&
        ballY < computerY + paddleHeight
    ) {
        ballSpeedX *= -1;
    }

    // Reiniciar la pelota y actualizar el puntaje si sale de la pantalla
    if (ballX < 0) {
        computerScore++; // Puntaje para la computadora
        resetBall();
    } else if (ballX > width) {
        playerScore++; // Puntaje para el jugador
        resetBall();
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
}



