$(document).ready(function(){
    //variable to increment level number 
    let level = 1;
    //targetting the above message
    const the_above_message = $("#level-title"); 
    //doc will be considred as document
    const doc = $(document); 
    //creating array of boxes 
    const boxes = [document.getElementById("red"),document.getElementById("green")
                   ,document.getElementById("blue"),document.getElementById("yellow")];
    //creating array of Sounds
    const sounds = [new Audio("sounds/sound0.mp3"),new Audio("sounds/sound1.mp3")
                    ,new Audio("sounds/sound2.mp3"),new Audio("sounds/sound3.mp3")]
    //gamer over sound
    const game_over_sound = new Audio("sounds/wrong.mp3");
    //creating a mp so for checking the sound and box
    var mp = new Array();
   
    // detecting which key was pressed 
    doc.keypress(function(event){
        if(event.key=="A"||event.key=="a"){
            if(the_above_message.text()=="Press A Key to Start"){
                start();
            }
        }
     });
     //when button is  clicked , after A was pressed
        let i=0;
        $(".btn").click(function(){

                    if(this != boxes[mp[i][0]]&&(the_above_message.text()!="Game Over")){
                            //game over codition
                            document.body.classList = "game-over";//adding class for animations
                            game_over_sound.play();//game over sound play
                            //reomoving the sound after 2 seconds
                            setTimeout(function(){
                                document.body.classList.remove("game-over");
                            },300);
                            //changing the above message
                            the_above_message.text("Game Over");
                    }else if((the_above_message.text()!="Game Over")){
                        //adding class to the pressed button
                        boxes[mp[i][0]].classList.add("pressed");
                        sounds[mp[i][1]].play();
                        /* 
                            here I have created variable scoped_i,
                            I have not used i inside setTimeout 
                            I have used scoped_i instead. because
                            if I had use i,then control will go in the
                            next in the next 2ms and will do i++,
                            so setTimeout will remove pressed class
                            from the i+1 boxes though there is not
                            any.
                         */
                        let scoped_i =i;
                        setTimeout(function(){
                            boxes[mp[scoped_i][0]].classList.remove("pressed");  
                        },300);                     
                    }
                    if((the_above_message.text()!="Game Over")){
                        i++;
                        setTimeout(function(){
                            if(i==mp.length){
                                level++;
                                start();
                            } 
                        },600);
                    }   
                              
     });
    function start(){
        the_above_message.text("Level-"+level);
        const random_song = Math.floor(Math.random()*4);
        const random_box = Math.floor(Math.random()*4);
        boxes[random_box].classList.add("pressed");
        sounds[random_song].play();
        setTimeout(function(){
            boxes[random_box].classList.remove("pressed");
        },400);
        mp.push([random_box,random_song]);
        console.log(mp);
        i=0;
    }
});
