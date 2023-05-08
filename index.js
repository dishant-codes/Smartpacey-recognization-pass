let name = document.getElementById('name');
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    let credentialUser = Math.ceil(Math.random()*10000);
    let str = "TSStudetn2020"+credentialUser.toString();
    generetPdf(name.value,str);
    name.value = '';
})


const inputImg = document.getElementById('imgInput')
const img = document.getElementById('img')

let photoUrl;

function getImg(event){

     const file = event.target.files[0]; // 0 = get the first file

     // console.log(file);

     let url = window.URL.createObjectURL(file);

     // console.log(url)

//      img.src = url;

     photoUrl = url;

}

inputImg?.addEventListener('change', getImg)



const generetPdf = async (name,cr)=>{
    const {PDFDocument,rgb} = PDFLib;

    const exBytes = await fetch("./Certificate.pdf").then((res)=>{
        return res.arrayBuffer()
    });

    const exFont = await fetch('./Roboto_Slab/RobotoSlab-VariableFont_wght.ttf').then((res)=>{
        return res.arrayBuffer();
    })


    
    
    const pdfDoc = await PDFDocument.load(exBytes)
    
    pdfDoc.registerFontkit(fontkit);
    const myFont = await pdfDoc.embedFont(exFont);

    const pages = pdfDoc.getPages();
    const firstP = pages[0];
   
   
     // Fetch JPEG image
  const jpgUrl = photoUrl;
  const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
    
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
  const jpgDims = jpgImage.scale(0.25);
   

  
  // Get the width and height of the first page
  const { width, height } = firstP.getSize();


    firstP.drawImage(jpgImage, {
        x: 35,
        y: 120,
        width: 150,
        height: 165,
    });


   
    firstP.drawText(name,{
        x:270,
        y:200,
        size:25,
        font:myFont,
        color: rgb(0, 0, 0)
    })

    firstP.drawText(cr,{
        x:600,
        y:45,
        size:15,
        font:myFont,
        color: rgb(0, 0.76, 0.8)
    })


    const uri = await pdfDoc.saveAsBase64({dataUri: true});
    saveAs(uri,name+".pdf",{autoBom:true})
    // document.querySelector("#myPDF").src = uri;
};
