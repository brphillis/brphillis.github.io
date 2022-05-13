const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', function ()  {
 this.classList.toggle('is-active');

});


const characterthumbnail = document.querySelector(".characterthumbnail");
		  characterthumbnail.addEventListener( 'click', function() {
 			characterthumbnail.classList.toggle('is-clicked');

		});


function toggleText() {
      var text = document.getElementById("hiddentext");
      if (text.style.display === "none") {
        text.style.display = "inline-block";
      } else {
        text.style.display = "none";
      }
    }
