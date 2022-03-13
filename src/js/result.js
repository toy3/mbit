const resultContainer = document.querySelector(".result-container");
const resultWrap = document.querySelector(".result-wrap");
const loadingContainer = document.querySelector(".loading-container");
const temporaryDiv = document.createElement("div");
let developerNum = window.location.href.split("/");
developerNum = developerNum[developerNum.length - 1] - 1;

(async () => {
  try {
    const data = await fetch("../data/result.json");
    const result = await data.json();

    // 로딩 숨기기
    loadingContainer.style.display = "none";

    resultWrap.innerHTML = `
    <div class="result-wrap">
        <div class="result-title">${result[developerNum].title}</div>
        <div class="result-name">${result[developerNum].name}</div>
        <div class="result-image">
            <img src="${result[developerNum].img}" alt="" />
        </div>
        <div class="result-features">
            <h3>나와 맞는 개발 유형은 ${result[developerNum].name}?!</h3>
            <ul>
                ${generateLi(developerNum)}
            </ul>
        </div>
    </div>
    `;

    // 결과 보이기
    resultContainer.style.display = "block";
    temporaryDiv.remove();

    function generateLi(developerNum) {
      for (let feature of result[developerNum].features) {
        temporaryDiv.innerHTML += `
              <li>
                  ${feature}
              </li>
          `;
      }
      return temporaryDiv.innerHTML;
    }
  } catch (e) {
    console.log(e);
  }
})();
