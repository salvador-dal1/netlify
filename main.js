const btn = document.querySelectorAll('.btn');

function adjust_sz() {
   if(window.innerWidth > window.innerHeight && window.innerHeight > 230){
      let sz = (window.innerHeight) / 4
      document.getElementById('grid').style.gridTemplateRows = `${sz}px ${sz}px ${sz}px`
      document.getElementById('grid').style.gridTemplateColumns = `${sz}px ${sz}px ${sz}px`

      btn.forEach(btn =>{
         btn.style.borderRadius = `${window.innerHeight/20}px`
         btn.style.fontSize = `${window.innerHeight/4}px`
      })
   }
   else if(window.innerWidth < window.innerHeight && window.innerWidth > 230){
      let sz = (window.innerWidth) / 4
      document.getElementById('grid').style.gridTemplateRows = `${sz}px ${sz}px ${sz}px`
      document.getElementById('grid').style.gridTemplateColumns = `${sz}px ${sz}px ${sz}px`

      btn.forEach(btn =>{
         btn.style.borderRadius = `${window.innerWidth/20}px`
         btn.style.fontSize = `${window.innerWidth/4}px`
      })
   }

}

window.addEventListener('resize', adjust_sz);

board = [
   [' '], [' '], [' '],
   [' '], [' '], [' '],
   [' '], [' '], [' ']
]


function log_board(){
   console.log(`[${board[0]}][${board[1]}][${board[2]}]`);
   console.log(`[${board[3]}][${board[4]}][${board[5]}]`);
   console.log(`[${board[6]}][${board[7]}][${board[8]}]`);
}

function isEmpty(pos){
   if(board[pos] == ' '){return true;}
   else{return false;}
}

function gameLogic_Win(isMark, mark=undefined){
   if(!isMark){
      if(board[0] == board[1] && board[1] == board[2] && board[2] != ' '){
         return true;
      } else if(board[3] == board[4] && board[4] == board[5] && board[5] != ' '){
         return true;
      } else if(board[6] == board[7] && board[7] == board[8] && board[8] != ' '){
         return true;
      } else if(board[0] == board[3] && board[3] == board[6] && board[6] != ' '){
         return true;
      } else if(board[1] == board[4] && board[4] == board[7] && board[7] != ' '){
         return true;
      } else if(board[2] == board[5] && board[5] == board[8] && board[8] != ' '){
         return true;
      } else if(board[0] == board[4] && board[4] == board[8] && board[8] != ' '){
         return true;
      } else if(board[2] == board[4] && board[4] == board[6] && board[6] != ' '){
         return true;
      }
   } else if(isMark){
      if(board[0] == board[1] && board[1] == board[2] && board[2] == mark){
         return true;
      } else if(board[3] == board[4] && board[4] == board[5] && board[5] == mark){
         return true;
      } else if(board[6] == board[7] && board[7] == board[8] && board[8] == mark){
         return true;
      } else if(board[0] == board[3] && board[3] == board[6] && board[6] == mark){
         return true;
      } else if(board[1] == board[4] && board[4] == board[7] && board[7] == mark){
         return true;
      } else if(board[2] == board[5] && board[5] == board[8] && board[8] == mark){
         return true;
      } else if(board[0] == board[4] && board[4] == board[8] && board[8] == mark){
         return true;
      } else if(board[2] == board[4] && board[4] == board[6] && board[6] == mark){
         return true;
      }
   }
}

function gameLogic_Draw(){
   for(let i=0;i<board.length;i++){
      if(isEmpty(i)){return false}
   }; return true;
}

function input(pos, mark) {
   document.getElementById(`btn${pos}`).disabled = true;
   if(mark == 'X'){
      document.getElementById(`btn${pos}`).innerHTML = 'X'
      board[pos - 1] = 'X';
      process();
   } else if(mark == 'O'){
      document.getElementById(`btn${pos}`).innerHTML = 'O'
      board[pos - 1] = 'O';
   }
}

function AI(){
   let bestMove = undefined;
   let bestScore = -Infinity;
   for(let i=0;i<board.length;i++){
      if(board[i] == ' '){
         board[i] = 'O';
         let score = MINIMAX(board, false, 0);
         board[i] = ' ';
         log_board();
         if(score > bestScore){
            bestScore = score;
            bestMove = i;
         }
      }
   }
   console.log(bestMove+1);
   input(bestMove+1, 'O');
}

function MINIMAX(board, isMaximising, depth){
   if(gameLogic_Win(true, 'X')){return -1;};
   if(gameLogic_Win(true, 'O')){return 1;};
   if(gameLogic_Draw()){return 0;};


   if (isMaximising){
      let bestScore = -Infinity
      for(let i=0;i<board.length;i++){
         if(board[i] == ' '){
            board[i] = 'O';
            let score = MINIMAX(board, false, depth+1);
            board[i] = ' ';
            if(score > bestScore){
               bestScore = score;
            }
         }
      }
      return bestScore;
   } else{
      let bestScore = Infinity
      for(let i=0;i<board.length;i++){
         if(board[i] == ' '){
            board[i] = 'X';
            let score = MINIMAX(board, true, depth+1);
            board[i] = ' ';
            if(score < bestScore){
               bestScore = score;
            }
         }
      }
      return bestScore;
   }
}

function process(){
   
   if(gameLogic_Win(false)){end('X');return;}
   if(gameLogic_Draw()){end('draw');return;}
   AI();
   if(gameLogic_Win(false)){end('O');return;}
   if(gameLogic_Draw()){end('draw');return;}
}

function css_end(msg){
   for(let i=1;i<=9;i++){
      document.getElementById(`btn${i}`).disabled = true;
      log_board();
      console.log(`btn${i}: disabled`);
   }
   window.setTimeout(function(){
      btn.forEach(btn =>{
         btn.style.backgroundColor = 'brown';
         document.getElementById('end').innerHTML = msg;
      })
   }, 1000)
   window.setTimeout(function(){
      location.reload();
   }, 2000);
}

function end(game_state){
   if(game_state == 'draw'){css_end('DRAW')} 
   else if(game_state == 'X'){css_end('X WON')} 
   else if(game_state == 'O'){css_end('O WON')}
}

adjust_sz();
window.setTimeout(function(){
   process();
}, 2000);

