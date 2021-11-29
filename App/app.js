const animItems = document.querySelectorAll("._animation");

if (animItems.length > 0) {
  function animScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
    }
  }

  function offser(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return {
      top: ReadableStreamDefaultController.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  loadTests();
});

function loadTests() {
  fetch("https://serjozno-z5p2m.ondigitalocean.app/api/tests")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let innerHTML = "";
      let tests = data.data;
      for (const [key, item] of Object.entries(tests)) {
        innerHTML += `
               
                  <div class="test__item__col">
                    <a href="1.html" class="test__link">
                      <div class="test__item__body">
                        <div class="test__name">${item.name.Value}</div>
                      </div>
                    </a>
                  </div>
              
                `;
        testId = item.id.Value;

        document.getElementById("tests__wrapper").innerHTML = innerHTML;
      }
    })

    .catch(function (error) {
      console.log(error);
    });
}
