function jogar (){
    document.getElementById("jogar")


    let canvas = document.getElementById("snake");
    let context = canvas.getContext("2d");
    let box = 32;

    let snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }

    let direction = "right"

    let comida = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }

    // Criar funções para campo, cobra e comida

    function criarBG() {
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    }

    function criarCobrinha(){
        for(i=0; i < snake.length; i++){
            context.fillStyle = "green";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        }
    }

    function comidinha(){
        context.fillStyle = "red";
        context.fillRect(comida.x, comida.y, box, box);
    }

    // Fazer a cobrinha se movimentar evitando duplicar a cabeça

    document.addEventListener('keydown', update);

    function update (event){
        if(event.keyCode == 37 && direction != "right") direction = "left";
        if(event.keyCode == 38 && direction != "down") direction = "up";
        if(event.keyCode == 39 && direction != "left") direction = "right";
        if(event.keyCode == 40 && direction != "up") direction = "down";
    }

    function iniciarJogo() {

        //Fazer a cobrinha dar a volta no cenário
        
        if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
        if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
        
        //Fazer o jogo parar caso aconteça a colisão

        for(i=1; i< snake.length; i++){
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                clearInterval(jogo);
                alert("Game Over \uD83D\uDE2D Aperte em Jogar para tentar de novo!");
            }
        }


        // iniciar as funções e fazer a cobra começar a se mover
        
        criarBG();
        criarCobrinha();
        comidinha();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if(direction == "right") snakeX += box;
        if(direction == "left") snakeX -= box;
        if(direction == "up") snakeY -= box;
        if(direction == "down") snakeY += box;

        //Fazer a cobrinha crescer

        if(snakeX != comida.x || snakeY != comida.y){
            snake.pop();
        }
        else{
            comida.x = Math.floor(Math.random() * 15 + 1) * box;
            comida.y = Math.floor(Math.random() * 15 + 1) * box;
        }

        

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        snake.unshift(newHead);

    }
        

    let jogo = setInterval(iniciarJogo, 100);

}