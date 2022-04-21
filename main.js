song = "";
leftwristX = 0;
leftwristY = 0;

rightWristX = 0;
rightWristY = 0;
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);
}
function draw(){
    image(video,0,0,600,500);
    fill("#700a02");
    stroke("#700a02");
    circle(rightWristX,rightWristY,20);
    if(scorerightwrist>0.2){
        if(rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML="Speed: 0.5x";
            song.rate(0.5);
            }
        
        
            else if(rightWristY > 100 && rightWristY <= 200){
                document.getElementById("speed").innerHTML="Speed: 1x";
                song.rate(1);
                }
        
        
                else if(rightWristY > 200 && rightWristY <= 300){
                    document.getElementById("speed").innerHTML="Speed: 1.5x";
                    song.rate(1.5);
                    }
        
                    else if(rightWristY > 300 && rightWristY <= 400){
                        document.getElementById("speed").innerHTML="Speed: 2x";
                        song.rate(2);
                        }
        
                        else if(rightWristY > 400 && rightWristY <= 500){
                            document.getElementById("speed").innerHTML="Speed: 2.5x";
                            song.rate(2.5);
                            }
    }

    
                    
    
    if(scoreleftwrist > 0.2){

    circle(leftwristX,leftwristY,20);
    innuberleftwristy = Number(leftwristY);


    removedeci = floor(innuberleftwristy);
    leftwristY_divide_1000 = removedeci/1000;
    volume = leftwristY_divide_1000*2;
    document.getElementById("volume").innerHTML = "Volume: "+volume;
    song.setVolume(volume);
    }

}
function preload(){
    song = loadSound("Music.mp3");
    song.rate(1);

}
function play(){
    song.play();
}
function stop(){
    song.stop();
}
function modelLoaded(){
    console.log("Pose net is now working");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWrist "+"X: "+leftwristX+" Y: "+leftwristY);
        console.log("scoreleftwrist = "+scoreleftwrist + "scorerightwrist = "+scorerightwrist);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist "+"X: " +rightWristX+"Y: "+rightWristY);
        
    
    }
}
