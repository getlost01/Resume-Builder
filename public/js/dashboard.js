const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light mode";
  } else {
    modeText.innerText = "Dark mode";
  }
});

var sectionArr = ["formSection","analyticSection","notificationSection","settingSection"];

sectionArr.forEach((ele,i) => {
    var sidebarEle = `dash${i}`;
    document.querySelector(`#${sidebarEle}`).addEventListener('click',()=>{
       sectionArr.forEach(id=>{
            document.querySelector(`#${id}`).classList.add('hidden');
       })
       document.querySelector(`#${ele}`).classList.remove('hidden');
    })
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
