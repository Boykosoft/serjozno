document.addEventListener("DOMContentLoaded", function (event) {
  let currentUrl = window.location.pathname;
  let id = 1;

  loadTest(id);
});
let testPictures = "";
let testInputs = "";
function loadTest(testId) {
  fetch("https://serjozno-z5p2m.ondigitalocean.app/api/tests/1")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.data.pictures);

      let innerHTML = "";
      let test = data;
      document.getElementById("test__wrapper").innerHTML = `
      <div class="test__body" id='test__body'>
        <div class="test__pictures__body" id='test__pictures__body'>
        
        </div>
        <div class="test__inputs__body" id='test__inputs__body'>
        
        </div>
      </div>

      `;

      for (const [key, item] of Object.entries(data.data.pictures.Value)) {
        testPictures += `
               
                  <div class="test__pictures">
                    <img src=${item.Value} alt="picture" class="test__image" />
                  </div>
              
                `;

        document.getElementById("test__pictures__body").innerHTML =
          testPictures;
      }

      //   for (const [key, item] of Object.entries(data.data.pictures.Value)) {
      //     testPictures += `

      //               <input type="text" class="question__input" />

      //             `;

      //     document.getElementById("test__pictures__body").innerHTML =
      //       testPictures;
      //   }

      let inputsLength = parseInt(data.data.questionsNumber.Value, 10) + 1;
      console.log(inputsLength);

      for (let index = 1; index < inputsLength; index++) {
        testInputs += `
          <div class="test__input__item">
            <div class="input__label">${index}.</div>
            <input type="text" class="question__input" />
          </div>
        `;

        document.getElementById("test__inputs__body").innerHTML = testInputs;
      }
    })

    .catch(function (error) {
      console.log(error);
    });
}
