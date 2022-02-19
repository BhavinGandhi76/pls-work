song = "";
leftwristx = 0;
leftwristy = 0;
scoreleft = 0;
scoreright = 0;
rightwristx = 0;
rightwristy = 0;

 function setup(){
     canvas = createCanvas(500,500);
     canvas.position(710,200);
     video = createCapture(VIDEO);
     video.hide();

     poseNet = ml5.poseNet(video, modelloaded);
     poseNet.on("pose", gotPoses);
 }

 function modelloaded(){
     console.log("PoseNet is Initialised");
 }

 function gotPoses(results){
     if(results.length>0){
     console.log(results);
     leftwristx = results[0].pose.leftWrist.x;
     rightwristx = results[0].pose.rightWrist.x;
     rightwristy = results[0].pose.rightWrist.y;
     leftwristy = results[0].pose.leftWrist.y;
     console.log("Left wrist X = " + leftwristx + ", Left wrist Y = " + leftwristy + " and Right wrist x = " + rightwristx + "Right wrist Y = " + rightwristy);
 }
}

 function preload(){
    song = loadSound("music.mp3");
  }
 
  function draw(){
      image(video, 0, 0, 600, 500);

      fill("red");
      stroke("red");

      if(scoreleft>0.2){
        circle(leftwristx ,leftwristy, 20);
        leftwristy = Number(leftwristy);
        remove_decimal = floor(leftwristy);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
      }

      if(scoreright>0.2){
          circle(rightwristx ,rightwristy ,20);
          if(rightwristy>0 && rightwristy<=100){
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristy>100 && rightwristy<=200){
            document.getElementById("speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightwristy>200 && rightwristy<=300){
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightwristy>300 && rightwristy<=400){
            document.getElementById("speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightwristy>400){
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
      }
  }
 
  function Play(){
      song.play();
      song.setVolume(1);
      song.rate(1);
  }