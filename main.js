
img = "";
status = "";
objects = [];

function preload()
{
    
    img = loadImage("dog_cat.jpg");

}

function setup()
{

    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded()
{

    console.log("Model/CoCoSSD Loaded");
    status ="true";

}


function gotResult(error, results)
{

    if (error)
    {

        console.log(error);

    }

    console.log(results);
    objects = results;

}

function draw()
{

    image(video, 0, 0, 380, 380);

    if (status != "" )
    {

        objectDetector.detect(video, gotResult);

        r = random(255);
        b = random(255);
        g = random(255);
        

        for (i = 0; i < objects.length; i++)
        {

            document.getElementById("no_of_objects").innerHTML = "No. of Objects Detected : " + objects.length;

            document.getElementById("status").innerHTML = "Object Detected";
            percent = floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }

    }

}