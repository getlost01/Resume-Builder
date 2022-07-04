document.getElementById("printPage").addEventListener("click", function() {
	html2canvas(document.getElementById("template"),{
        allowTaint: true,
        useCORS: true
    }).then(function (canvas) {
        var anchorTag = document.createElement("a");
        document.body.appendChild(anchorTag);			
        anchorTag.download = "filename.png";
        anchorTag.href = canvas.toDataURL();
        anchorTag.target = '_blank';
        anchorTag.click();
    });
 });

 window.addEventListener("scroll", function(event) {
    var top = this.scrollY,
        left =this.scrollX;
    if(top <= 30){
        document.getElementById("printPage").innerHTML = `<i class="fa-solid fa-download"></i> Download`;
    }
    else{
        document.getElementById("printPage").innerHTML = `<i class="fa-solid fa-download"></i> `;
    }

}, false);
