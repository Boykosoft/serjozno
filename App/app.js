const animItems = document.querySelectorAll("._animation");

if (animItems.length > 0) {
  window.addEventListener("scroll", animScroll);
  function animScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("active");
      } else {
        if (!animItem.classList.contains("hide_anim")) {
          animItem.classList.remove("active");
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }

  setTimeout(() => {
    animScroll();
  }, 500);
}

document.addEventListener("DOMContentLoaded", function (event) {
  //loadTests();
});

// function loadTests() {
//   fetch("https://serjozno-z5p2m.ondigitalocean.app/api/tests")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       let innerHTML = "";
//       let tests = data.data;
//       for (const [key, item] of Object.entries(tests)) {
//         innerHTML += `

//                   <div class="test__item__col">
//                     <a href="1.html" class="test__link">
//                       <div class="test__item__body">
//                         <div class="test__name">${item.name.Value}</div>
//                       </div>
//                     </a>
//                   </div>

//                 `;
//         testId = item.id.Value;

//         document.getElementById("tests__wrapper").innerHTML = innerHTML;
//       }
//     })

//     .catch(function (error) {
//       console.log(error);
//     });
// }


(function () {
  'use strict';

  function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
      goTopBtn.classList.remove('back_to_top-show');
    }
  }

  function backToTop() {
    if (window.pageYOffset > 0) {
      window.scrollBy(0, -80);
      setTimeout(backToTop, 0);
    }
  }

  var goTopBtn = document.querySelector('.back_to_top');

  window.addEventListener('scroll', trackScroll);
  goTopBtn.addEventListener('click', backToTop);
})();


const myForm = document.getElementById('myForm')
const formMail = document.getElementById('form__mail')
const formName = document.getElementById('form__name')
const formPhone = document.getElementById('form__phone')
const formText = document.getElementById('form__area')

myForm.addEventListener('submit', function (e) {

  if (formMail.value != '') {
    formMail.classList.remove('error')
    e.preventDefault()

    const formData = new FormData(this)


    fetch("https://serjozno-z5p2m.ondigitalocean.app/send-contact", {
      method: 'POST',
      body: formData
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        console.log(text)
        formName.value = ''
        formMail.value = ''
        formPhone.value = ''
        formText.value = ''
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  else {
    formMail.classList.add('error')
  }


})