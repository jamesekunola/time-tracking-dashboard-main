// selectors
const cardStyle = [
  { id: 1, bgColor: "--Light-red-work", bgImg: "/images/icon-work.svg" },
  { id: 2, bgColor: "--Soft-blue-play", bgImg: "/images/icon-play.svg" },
  { id: 3, bgColor: " --Light-red-study", bgImg: "/images/icon-study.svg" },
  {
    id: 4,
    bgColor: "--Lime-green-exercise",
    bgImg: "/images/icon-exercise.svg",
  },
  { id: 5, bgColor: "--Violet-social", bgImg: "/images/icon-social.svg" },
  {
    id: 6,
    bgColor: "--Soft-orange-self-care",
    bgImg: "/images/icon-self-care.svg",
  },
];
const cardContainer = document.querySelector(".card-container");
let times = "weekly"; // set initial time to weekly
// functions

// function to fetch data from backend
function fetchData() {
  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => {
      renderCards(data);
      renderSelectedFrequency(data);
    });
}

//function to set daily, monthy, or weekly frequency
function setFrequency(item) {
  return times == "weekly"
    ? `<h1>${item.timeframes.weekly.current}hrs</h1>
      <p>Last week - ${item.timeframes.weekly.previous}hrs</p>`
    : times == "monthly"
    ? `<h1>${item.timeframes.monthly.current}hrs</h1>
      <p>Last month - ${item.timeframes.monthly.previous}hrs</p>`
    : `<h1>${item.timeframes.daily.current}hrs</h1>
      <p>Today - ${item.timeframes.daily.previous}hrs</p>`;
}

// function to set the background color and background image of cards header
function setCardsHeaderBackground() {
  const cards = cardContainer.querySelectorAll(".card"); // select all cards
  // loop through all card and set specific background for all cards
  cards.forEach((card, index) => {
    card.style.background = `var(${cardStyle[index].bgColor}) url(${cardStyle[index].bgImg}) no-repeat top right / 60px`;
  });
}

// function to render all cards on user interface
function renderCards(cards) {
  // Append all remain cards to card container element
  cardContainer.innerHTML += cards
    .map(
      (item) => `
  <div class="card">
    <div class="card-content">
      <div class="flex card-title">
        <h5>${item.title}</h5>
        <a href="#"><svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
               fill-rule="evenodd" />
          </svg></a>
      </div>
      <!-- hours -->
      <div class="flex hours">
     ${setFrequency(item)}
      </div>
    </div>
  </div>
`
    )
    .join("");
  setCardsHeaderBackground();
}

// function to display user selected frequency
function renderSelectedFrequency(data) {
  cardContainer.addEventListener("click", (e) => {
    const activeBtn = cardContainer.querySelector(".btn.active"); // select a button that has the classname of active
    const cards = document.querySelectorAll(".card"); // selete all cards
    const selected = e.target;
    const validBtn = selected.closest(".btn");
    //if user clicks on a valid btn
    if (validBtn) {
      activeBtn.classList.remove("active"); //remove the classname of active from the previously selected btn
      selected.classList.add("active"); // add active to the currently selected button
      const selectedFreq = selected.dataset.cat; // get dataset attribute for the selected btn.
      times = selectedFreq;

      // delete all previously rendered cards
      cards.forEach((card) => cardContainer.removeChild(card));

      // update user interface with new frequency
      renderCards(data);
    }
  });
}

//Event listeners
window.addEventListener("DOMContentLoaded", () => {
  fetchData();
});
