const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const scan = document.getElementById('scan');

const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearScr();
    
    const url = document.getElementById('url').value;   
    const size = document.getElementById('size').value;   

    if(url == ''){
        alert('Please Enter a URL')
    }else{
            showScan();
            showSpinner();

            setTimeout(() => {
                hideSpinner();
                generateQRCode(url,size);
                setTimeout(() => {
                    // Get save url
                    const saveUrl = qr.querySelector("canvas").toDataURL();
                    // Create save button
                    createSaveBtn(saveUrl);
                  }, 50);
            }, 1000);
    }
};

const generateQRCode = (url, size) => {
    qr.innerHTML = ''; // Clear previous QR code
    new QRCode(qr, {
        text: url,
        width: size,
        height: size
    });
};

    const showSpinner = () => {
        document.getElementById('spinner').style.display = 'block';
    }
    
    const hideSpinner = () => {
        document.getElementById('spinner').style.display = 'none';
    }

        
    const showScan = () => {
        scan.innerHTML = 'Scan Now!';
    }
    

    const clearScr = () => {
        qr.innerHTML = "";
        const saveBtn = document.getElementById("save-link");
        if (saveBtn) {
          saveBtn.remove();
        }
      };
    


    const createSaveBtn = (saveUrl) => {
        const link = document.createElement("a");
        link.id = "save-link";
        link.classList =
          'bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
        link.innerHTML = "Save Image";
      
        link.href = saveUrl;
        link.download = "qrcode.png";
      
        document.getElementById("generated").appendChild(link);
      };

    hideSpinner();



form.addEventListener('submit', onGenerateSubmit);


