// Get the modal
let modal = document.getElementsByClassName("data");

// Get the button that opens the modal
let btnModal = document.getElementsByClassName("myBtn");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close");

let modalChau = document.getElementsByClassName("modal-content");

for (let i = 0; i < modal.length; i++) {
    if (modal[i].style.display = "block") {
      span[i].onclick = () => {
        modal[i].style.display = "none";
      }
      document.addEventListener('mouseup', function(e) {
        if (!modalChau[i].contains(e.target)) {
          modal[i].style.display = 'none';
        }
      });

    }
  if ( modal[i].style.display = "none") {
      btnModal[i].onclick = function() {
        modal[i].style.display = "block";
      }
  }

}


let link = document.getElementsByClassName("breadcrumbs-link")[1];
let prevLink = document.referrer
let prevLinkArray = prevLink.split("/")

if (prevLinkArray.length == 0) {
  link.href = "/sneakers/OrderByReleaseDateDESC"
}
else if (prevLinkArray.includes("sneakers")) {
  link.href = document.referrer
}
else {
  link.href = "/sneakers/OrderByReleaseDateDESC"
}

