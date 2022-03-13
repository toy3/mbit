const questionForm = document.querySelector("#question-form");

(async () => {
  try {
    const data = await fetch("../data/data.json");
    const { questions, answers } = await data.json();
    let developerNum = 0;

    for (let i = 0; i < questions.length; i++) {
      questionForm.innerHTML += `
        <div class="question-item">
        <div class="status-box">
          <span> ${i + 1}/10 </span>
          <div class="status-bar" style="width:${i + 1}0%"></div>
        </div>
        <div class="question-box">
          <h2>Q. ${questions[i].content}</h2>
          <ol class="answer-list">
            ${Array(5)
              .join(0)
              .split(0)
              .map(
                (item, j) => `
                <li class="answer-item">
                <input type="radio" id="answer-${(developerNum += 1)}" name="question-${
                  i + 1
                }" value="${answers[developerNum - 1].developer}" />
                <label for="answer-${developerNum}">${j + 1}. ${
                  answers[developerNum - 1].content
                }</label>
                </li>
            `
              )
              .join("")}
          </ol>
        </div>
        <div class="button-box">
          <button type="button" class="previous-btn">이전</button>
          <button type="button" class="next-btn">다음</button>
        </div>
      </div>
        `;
    }

    const questionItems = document.querySelectorAll(".question-item");
    // 처음, 마지막 버튼 변경
    questionItems[0].querySelector(".button-box").classList.add("style-center");
    questionItems[0].querySelector(
      ".button-box"
    ).innerHTML = `<button type="button" class="next-btn">다음</button>`;

    questionItems[questions.length - 1].querySelector(
      ".button-box"
    ).innerHTML = `
    <button type="button" class="previous-btn">이전</button>
    <button type="submit" class="next-btn ">제출</button>`;

    // 첫번째 보이기
    questionItems[0].classList.add("on");

    const prevButtons = document.querySelectorAll(".previous-btn");
    const nextButtons = document.querySelectorAll(".next-btn");
    // 다음 버튼
    for (let nextButton of nextButtons) {
      nextButton.addEventListener("click", () => {
        const current = document.querySelector(".question-item.on");
        const inputs = current.querySelectorAll("input");
        let isChecked = false;

        for (let input of inputs) {
          if (input.checked) {
            current.classList.remove("on");
            current.nextElementSibling.classList.add("on");
            isChecked = true;
          }
        }

        if (!isChecked) alert("항목에 체크해주세요");
      });
    }
    // 이전버튼
    for (prevButton of prevButtons) {
      prevButton.addEventListener("click", () => {
        const current = document.querySelector(".question-item.on");
        current.classList.remove("on");
        current.previousElementSibling.classList.add("on");
      });
    }
  } catch (e) {
    console.log(e);
  }
})();
