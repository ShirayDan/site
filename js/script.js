!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.ssm = e());
})(this, function () {
  "use strict";
  function t(t, e) {
    t.forEach(function (t) {
      return t(e);
    });
  }
  var e = function (t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    },
    n = (function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          (i.enumerable = i.enumerable || !1),
            (i.configurable = !0),
            "value" in i && (i.writable = !0),
            Object.defineProperty(t, i.key, i);
        }
      }
      return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
      };
    })(),
    i = [],
    o = function () {},
    s = (function () {
      function s(t) {
        e(this, s),
          (this.id = t.id || Math.random().toString(36).substr(2, 9)),
          (this.query = t.query || "all");
        if (
          ((this.options = Object.assign(
            {},
            { onEnter: [], onLeave: [], onResize: [], onFirstRun: [] },
            t
          )),
          "function" == typeof this.options.onEnter &&
            (this.options.onEnter = [this.options.onEnter]),
          "function" == typeof this.options.onLeave &&
            (this.options.onLeave = [this.options.onLeave]),
          "function" == typeof this.options.onResize &&
            (this.options.onResize = [this.options.onResize]),
          "function" == typeof this.options.onFirstRun &&
            (this.options.onFirstRun = [this.options.onFirstRun]),
          !1 === this.testConfigOptions("once"))
        )
          return (this.valid = !1), !1;
        (this.valid = !0), (this.active = !1), this.init();
      }
      return (
        n(
          s,
          [
            {
              key: "init",
              value: function () {
                var t = this;
                (this.test = window.matchMedia(this.query)),
                  this.test.matches &&
                    this.testConfigOptions("match") &&
                    this.enterState(),
                  (this.listener = function (e) {
                    var n = !1;
                    e.matches
                      ? t.testConfigOptions("match") &&
                        (t.enterState(), (n = !0))
                      : (t.leaveState(), (n = !0)),
                      n && o();
                  }),
                  this.test.addListener(this.listener);
              },
            },
            {
              key: "enterState",
              value: function () {
                t(this.options.onFirstRun, this.eventData("firstRun")),
                  t(this.options.onEnter, this.eventData("enter")),
                  (this.options.onFirstRun = []),
                  (this.active = !0);
              },
            },
            {
              key: "leaveState",
              value: function () {
                t(this.options.onLeave, this.eventData("leave")),
                  (this.active = !1);
              },
            },
            {
              key: "resizeState",
              value: function () {
                this.testConfigOptions("resize") &&
                  t(this.options.onResize, this.eventData("resize"));
              },
            },
            {
              key: "destroy",
              value: function () {
                this.test.removeListener(this.listener);
              },
            },
            {
              key: "attachCallback",
              value: function (t, e, n) {
                switch (t) {
                  case "enter":
                    this.options.onEnter.push(e);
                    break;
                  case "leave":
                    this.options.onLeave.push(e);
                    break;
                  case "resize":
                    this.options.onResize.push(e);
                }
                "enter" === t && n && this.active && e(this.eventData(t));
              },
            },
            {
              key: "testConfigOptions",
              value: function (t) {
                var e = this,
                  n = !0;
                return (
                  i.forEach(function (i) {
                    void 0 !== e.options[i.name] &&
                      i.when === t &&
                      !1 === i.test.bind(e)() &&
                      (n = !1);
                  }),
                  n
                );
              },
            },
            {
              key: "eventData",
              value: function (t) {
                return { eventType: t, state: this };
              },
            },
          ],
          [
            {
              key: "addConfigOption",
              value: function (t) {
                i.push(t);
              },
            },
            {
              key: "getConfigOptions",
              value: function () {
                return i;
              },
            },
            {
              key: "removeConfigOption",
              value: function (t) {
                i.forEach(function (e, n) {
                  e.name === t && i.splice(n, 1);
                });
              },
            },
            {
              key: "setStateChangeMethod",
              value: function (t) {
                if ("function" != typeof t) throw new Error("Not a function");
                o = t;
              },
            },
          ]
        ),
        s
      );
    })();
  return new ((function () {
    function t() {
      e(this, t),
        (this.states = []),
        (this.resizeTimer = null),
        (this.configOptions = []),
        window.addEventListener(
          "resize",
          (function (t) {
            var e = this,
              n = void 0;
            return function () {
              for (var i = arguments.length, o = Array(i), s = 0; s < i; s++)
                o[s] = arguments[s];
              n && window.cancelAnimationFrame(n),
                (n = window.requestAnimationFrame(function () {
                  (n = null), t.apply(e, o);
                }));
            };
          })(this.resizeBrowser.bind(this)),
          !0
        );
    }
    return (
      n(t, [
        {
          key: "addState",
          value: function (t) {
            var e = new s(t);
            return e.valid && this.states.push(e), e;
          },
        },
        {
          key: "addStates",
          value: function (t) {
            var e = this;
            t.forEach(function (t) {
              return e.addState(t);
            });
          },
        },
        {
          key: "getState",
          value: function (t) {
            return (
              this.states.filter(function (e) {
                return e.id === t;
              })[0] || !1
            );
          },
        },
        {
          key: "isActive",
          value: function (t) {
            return (this.getState(t) || {}).active || !1;
          },
        },
        {
          key: "getStates",
          value: function (t) {
            var e = this;
            return void 0 === t
              ? this.states
              : t.map(function (t) {
                  return e.getState(t);
                });
          },
        },
        {
          key: "removeState",
          value: function (t) {
            var e = this;
            this.states.forEach(function (n, i) {
              n.id === t && (n.destroy(), e.states.splice(i, 1));
            });
          },
        },
        {
          key: "removeStates",
          value: function (t) {
            var e = this;
            t.forEach(function (t) {
              return e.removeState(t);
            });
          },
        },
        {
          key: "removeAllStates",
          value: function () {
            this.states.forEach(function (t) {
              return t.destroy();
            }),
              (this.states = []);
          },
        },
        {
          key: "addConfigOption",
          value: function (t) {
            var e = t.name,
              n = void 0 === e ? "" : e,
              i = t.test,
              o = void 0 === i ? null : i,
              a = t.when,
              r = void 0 === a ? "resize" : a;
            "" !== n &&
              null !== o &&
              s.addConfigOption({ name: n, test: o, when: r });
          },
        },
        {
          key: "removeConfigOption",
          value: function (t) {
            s.removeConfigOption(t);
          },
        },
        {
          key: "getConfigOptions",
          value: function (t) {
            var e = s.getConfigOptions();
            return "string" == typeof t
              ? e.filter(function (e) {
                  return e.name === t;
                })
              : e;
          },
        },
        {
          key: "resizeBrowser",
          value: function () {
            var t, e, n;
            ((t = this.states),
            (e = "active"),
            (n = !0),
            t.filter(function (t) {
              return t[e] && t[e] === n;
            })).forEach(function (t) {
              t.resizeState();
            });
          },
        },
        {
          key: "stateChange",
          value: function (t) {
            s.setStateChangeMethod(t);
          },
        },
      ]),
      t
    );
  })())();
});

$(document).ready(function () {
  $(".slider").slick({
    arrows: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    pauseOnFocus: true,
    pauseOnHover: true,
    rows: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});

$(document).ready(function () {
  $(".slider-top").slick({
    arrows: false,
    slidesToShow: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    pauseOnFocus: true,
    pauseOnHover: true,
    rows: 1,
  });
});

// anim
// top-anim

let anim = document.querySelectorAll(".animation");

if (anim.length > 0) {
  window.addEventListener("scroll", animScroll);
  function animScroll() {
    for (let i = 0; i < anim.length; i++) {
      const animItem = anim[i];
      const animHeight = animItem.offsetHeight;
      const animPosition = offset(animItem).top;
      const animStart = 10000;

      let animItemPoint = window.innerHeight - animHeight / animStart;

      if (animHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animPosition - animItemPoint &&
        pageYOffset < animPosition + animHeight
      ) {
        animItem.classList.add("active-animation");
      } else {
        animItem.classList.remove("active-animation");
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.top + scrollLeft };
  }
  animScroll();
}
// burger
$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger,.header__menu-left").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

document.querySelectorAll(".header__sub-link").forEach((el) => {
  el.addEventListener("click", () => {});
});
// burger-right
$(document).ready(function () {
  $(".header__burger-right").click(function (event) {
    $(".header__burger-right,.burger-right").toggleClass("active");
    $("body").toggleClass("lock");
  });
});

document.querySelectorAll(".burger-right__sub-link").forEach((el) => {
  el.addEventListener("click", () => {
    let content = el.nextElementSibling;

    if (content.style.maxHeight) {
      document
        .querySelectorAll(".acordeon")
        .forEach((el) => (el.style.maxHeight = null));
    } else {
      document
        .querySelectorAll(".acordeon")
        .forEach((el) => (el.style.maxHeight = null));
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// animation header

window.addEventListener("scroll", (e) => {
  let headerFixed = document.querySelector(".header_fixed");
  let scrolledHeader = "scrolled";

  if (pageYOffset > 400) {
    headerFixed.classList.add(scrolledHeader);
  } else {
    headerFixed.classList.remove(scrolledHeader);
  }
});
// acordeon triangle
let links = document.querySelectorAll(".burger-right__sub-link");
for (let i = 0; i < links.length; i++) {
  links[i].onclick = function () {
    links[i].classList.toggle("rotate");
  };
}

// popular categories btns

const saleBtn = document.getElementById("sale-items");
const latestBtn = document.getElementById("latest-items");
const topRateBtn = document.getElementById("top-rate");
const innerDiv = document.querySelector(".part-four__goods");
let sorting = document.querySelectorAll(".filter__item");
let goods = [
  {
    name: "Macheta Motor",
    date: "01 13 2022",
    rating: 9.4,
    price: "45.00",
    sale: 4,
    id: 1,
  },
  {
    name: "Scientific Tango",
    date: "01 14 2022",
    rating: 9.3,
    price: "45.00",
    sale: 3,
    id: 2,
  },
  {
    name: "Delinte Tires",
    date: "01 15 2022",
    rating: 9.2,
    price: "45.00",
    sale: 1,
    id: 3,
  },
  {
    name: "Stem Gatling",
    date: "01 16 2022",
    rating: 9.0,
    price: "45.00",
    sale: 2,
    id: 4,
  },
  {
    name: "Steerling Wheel",
    date: "01 17 2022",
    rating: 10,
    price: "45.00",
    sale: 5,
    id: 5,
  },
  {
    name: "Sparco Shift knob",
    date: "01 18 2022",
    rating: 9.9,
    price: "45.00",
    sale: 6,
    id: 6,
  },
  {
    name: "Engine Oil",
    date: "11 19 2021",
    rating: 7.8,
    price: "45.00",
    sale: 7,
    id: 7,
  },
  {
    name: "Ohlins Shock",
    date: "02 18 2022",
    rating: 8.5,
    price: "45.00",
    sale: 8,
    id: 8,
  },
];
function toContainer(arr) {
  return goods.map(
    (el) => `<div class="part-four__item">
  <div class="part-four__img-container">
    <img src="i/image-${el.id}.jpg" class="part-four__photo">
  </div>
  <div class="part-four__bottom">
    <h4 class="part-four__subtitle">${el.name}</h4>
    <p class="part-four__price">$${el.price}</p>
  </div>
</div>`
  );
}

function onScreen(arr) {
  innerDiv.innerHTML = arr.join("");
}

function sortGoods(st) {
  return function () {
    sorting.forEach((el) => el.classList.remove("filter__item_red"));
    st === "sales"
      ? addClass(saleBtn)
      : st === "rate"
      ? addClass(topRateBtn)
      : addClass(latestBtn);
    const sortedItems = goods.sort((a, b) => {
      return st === "sales"
        ? b.sale - a.sale
        : st === "rate"
        ? b.rating - a.rating
        : Date.parse(a.date) - Date.parse(b.date);
    });
    onScreen(toContainer(sortedItems));
  };
}
onScreen(toContainer(goods));

saleBtn.onclick = sortGoods("sales");
latestBtn.onclick = sortGoods("");
topRateBtn.onclick = sortGoods("rate");

function addClass(el) {
  el.classList.add("filter__item_red");
}
// latest blog users
let usersBlog = document.querySelectorAll(".part-eight__subtitle");
fetch("https://jsonplaceholder.typicode.com/users")
  .then((r) => r.json())
  .then(render);

function render(users) {
  usersBlog.forEach((el, i) => (el.innerHTML = users[i].name));
}

// selects part-two
const selects = document.querySelectorAll(".part-two__select");
const carBrends = {
  0: ["Hyundai", "Jeep", "Toyota"],
  1: ["Cherokee", "Compass"],
  2: ["2015", "2018", "2022"],
};
const params = ["Choose brend", "Choose model", "Choose Year"];

selects.forEach(
  (el, i) =>
    (el.innerHTML =
      `<option value="-1">${params[i]}</option>` +
      carBrends[i].map((el) => `<option value="${el}">${el}</option>`).join(""))
);

// search
let searchList = document.querySelector(".header__res");
let search = document.querySelector(".header__input");

search.oninput = function () {
  let val = this.value;
  let st = "";
  let searchItems = [
    "Macheta Motor",
    "Scientific Tango",
    "Delinte Tires",
    "Stem Gatling",
    "Steerling Wheel",
    "Sparco Shift knob",
    "Engine Oil",
    "Ohlins Shock",
    "Brake Caliper",
    "Motorcycle helmets",
    "AZA-506 Wheels",
  ];
  if (!val) {
    st = "";
    searchList.innerHTML = st;
    return;
  }
  searchItems.forEach((el) => {
    if (el.toLocaleLowerCase().search(val.toLocaleLowerCase()) != -1) {
      st += `<li class="search__item"><a href="" class="search__link">${el}</a></li>`;
    }
  });
  searchList.innerHTML = st;
};
search.onblur = function () {
  setTimeout(closeSearch, 100);
};
function closeSearch() {
  searchList.innerHTML = "";
}
