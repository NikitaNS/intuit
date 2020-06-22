//Прокомментировать исходник. Функция Конструктор Объекта Модал.
function Popup(options) {
  this.modal = document.querySelector(options.modal);
  this.overlay = document.querySelector(options.overlay);

  var popup = this;

  this.open = function (content) {
    popup.modal.innerHTML = content;
    popup.overlay.classList.add("open");
    popup.modal.classList.add("open");
  };

  this.close = function () {
    popup.overlay.classList.remove("open");
    popup.modal.classList.remove("open");
  };

  this.overlay.onclick = this.close;
}

function tradePopUp() {
  var p = new Popup({ modal: ".modal", overlay: ".overlay" });
  //setTimeout(()=>{p.open('1235465768')}, 5000)

  //один объект попапа позволяет подставлять разные данные

  document.querySelector(".button_down").onclick = function () {
    var stat = document.querySelector(".statistic_window");
    p.open(stat.innerHTML);
  };

  document.querySelector(".button_up").onclick = function () {
    var stat = document.querySelector(".statistic_window");
    p.open(stat.innerHTML);
  };
};
