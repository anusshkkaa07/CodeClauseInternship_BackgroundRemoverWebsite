function closePreview(){
    document.getElementById("overlay").style.display="none";
}
let imageURL;
function uploadFunction(){
    const inputFile=document.getElementById('inputFile');
    const image= inputFile.files[0];

    const formData= new FormData();
    formData.append("image_file",image);
    formData.append('size','auto')

    const apiKey= 'vRMBZhk8fCS2GynSR8j6EF3J'

    fetch('https://api.remove.bg/v1.0/removebg',{
        method:'POST',
        headers:{
            'X-Api-Key': apiKey,
        },
        body:formData
    })

    .then(function(response){
        return response.blob();
    })
    .then(function(blob){
        console.log(blob)

        const url= URL.createObjectURL(blob);
        const img= document.createElement('img');
        img.src= url;
        imageURL=url;
        document.getElementById('preview').appendChild(img);
    })
    .catch(); 
    
    

    setTimeout(()=>{
        document.getElementById("overlay").style.display="block";

        document.getElementById('selectedImage').style.display="block";
    },2000)
}

function downloadImage(){

    var anchor= document.createElement('a')
    anchor.href=imageURL;
    anchor.download= 'removed-bg.png'

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(a);
}

function getImagePreview(event){
    console.log(event.target.files[0])

    var selImg=URL.createObjectURL(event.target.files[0]);
    var imagediv=document.getElementById("selectedImage");
    var newimg=document.createElement('img')
    newimg.src=selImg;
    imagediv.appendChild(newimg)
}
