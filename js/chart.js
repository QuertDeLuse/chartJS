document.addEventListener('DOMContentLoaded', () => {
    let funcBtn = document.getElementById('funcSubmit');
    let args = document.getElementsByClassName('args')[0];
    let select = document.getElementById('selectFunc');
    let resetBtn = document.getElementById('funcReset');
    
    
    select.addEventListener('change', () => {     
        let selectedOption = select.options[select.selectedIndex];

        if(!selectedOption.classList.contains('disabled')) {
            args.classList.add('display');  
        } else {
            args.classList.remove('display');
        }
    });
    
    resetBtn.addEventListener('click', () => {
        args.classList.remove('display');
    });
    
    
    funcBtn.addEventListener("click", (e) => {
        e.preventDefault();  
    
        var canvas = document.getElementById("Canvas");
        var ctx = canvas.getContext("2d");
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    
        //Coord System
        ctx.beginPath();
        ctx.moveTo(canvas.width - (canvas.width-10), canvas.height/2);
        ctx.lineTo(canvas.width-10, canvas.height/2);    
        ctx.stroke();
    
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, canvas.height - (canvas.height - 10));
        ctx.lineTo(canvas.width/2, canvas.height - 10);    
        ctx.stroke();
      
    
        //вертикальные деления
    
        let piDegree = 314;
        let degreePositionVert = canvas.width/6 + 54 - piDegree;
        for(let i = 0; i < 7; i++) {    
            
            if(i == 3) {
                degreePositionVert +=  piDegree;
                continue;
            }
    
            ctx.beginPath();
                ctx.moveTo(degreePositionVert, canvas.height/2-20);
                ctx.lineTo(degreePositionVert, canvas.height/2+20);
            ctx.stroke();
    
            degreePositionVert +=  piDegree;
        }
    
        //Горизонтальные подписи
        let textHoriz = {
            x: canvas.width/6 + 54 - piDegree*2 - 10,
            y: canvas.height/2 + 70,
            color: ctx.fillStyle = "#000",
            font: ctx.font = "30pt Arial"
        }     
      
        for(let i = 0, j = -4; i < 9; i++) {
            if(j == -1) {
                j++;
                textHoriz.x += piDegree;
                continue;
            }
    
            ctx.fillText(j+1 + "P", textHoriz.x += piDegree, textHoriz.y);
            j++;
        }
    
    
        // Горизонтальные деления
        let degreePositionHor = 112;
        for(let i = 0; i < 9; i++) {    
            
            if(i == 4) {
                degreePositionHor +=  100;
                continue;
            }
    
            ctx.beginPath();
                ctx.moveTo(canvas.width/2-20, degreePositionHor);
                ctx.lineTo(canvas.width/2+20, degreePositionHor);
            ctx.stroke();
    
            degreePositionHor +=  100;
        }
    
        //вертикальные подписи
        let textVert = {
            x: canvas.width/2 + 40,
            y: 30,
            color: ctx.fillStyle = "#000",
            font: ctx.font = "30pt Arial"
        }     
      
        for(let i = 0, j = 4; i < 9; i++) {
            ctx.fillText(j, textVert.x, textVert.y += 99);
            j--;
        }
    
       
    
        
        
    
    
    
    
        let a = document.getElementById('func-a') == null ? 1 : parseFloat(document.getElementById('func-a').value) ? document.getElementById('func-a').value : 1;
        let b = document.getElementById('func-b') == null ? 1 : parseFloat(document.getElementById('func-b').value) ? document.getElementById('func-b').value : 1;
        let c = document.getElementById('func-c') == null ? 0 : parseFloat(document.getElementById('func-c').value) ? document.getElementById('func-c').value : 0;
        let d = document.getElementById('func-d') == null ? 0 : parseFloat(document.getElementById('func-d').value) ? document.getElementById('func-d').value : 0;
        let graphLenght = 3140;
    
        // console.log('a = ' + a);
        // console.log('b = ' + b);
        // console.log('c = ' + c);
        // console.log('d = ' + d);
    
    
        //Chart
        var funcID = document.getElementById('selectFunc').selectedIndex; // 1- sin, 2 - cos
    
        var pointPosition = {
            width: 3,
            x: 0,
            y: 0,
    
            drawChart: function (x, y, width) {
                ctx.beginPath();
                ctx.arc(x, y, width, 0, Math.PI * 2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        };
    
        function draw() {
            pointPosition.x += 0.01;
    
            if (funcID == 1) {
                pointPosition.y = a * Math.sin(pointPosition.x);
            } else if (funcID == 2) {
                pointPosition.y = a * Math.cos(pointPosition.x);
            } else {
                clearInterval(intervalID);
                return 0;
            } 
    
            pointPosition.x *= 100 / b;
            pointPosition.y *= 100;
    
            pointPosition.drawChart(pointPosition.x + 80 + c*100, pointPosition.y + canvas.height/2 - d *100, pointPosition.width );
    
            pointPosition.x /= 100 / b;
            pointPosition.y /= 100;
            // console.log(pointPosition.x + " " + pointPosition.y);
    
        }
    
    
    
        for(let i = 0; i < graphLenght*b; i++) {
            draw();
        }
    });
});











