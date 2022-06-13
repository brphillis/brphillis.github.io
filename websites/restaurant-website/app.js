const menu = [
  {
    id: 1,
    title: "buttermilk pancakes",
    category: "breakfast",
    price: 15.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-1.jpeg",
    desc: `these buttermilk pancakes are deliciously buttery and fluffy with golden, crisp edges and an irresistible buttermilk flavour. `,
  },
  {
    id: 2,
    title: "crispy maple bacon",
    category: "lunch",
    price: 13.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-2.jpeg",
    desc: `Grass-fed beef, maple syrup candied bacon, aged cheddar, hydroponic lettuce, tomato, Spanish onion, and our house-made sauce `,
  },
  {
    id: 4,
    title: "brisket pack",
    category: "dinner",
    price: 28.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-4.jpeg",
    desc: `Smoked brisket, pulled pork, bacon, topped with liquid cheese, mustard and bbq sauce `,
  },
  {
    id: 5,
    title: "poutine fries",
    category: "lunch",
    price: 12.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-5.jpeg",
    desc: `Double cooked fries loaded with cheese curds and smothered with rich gravy `,
  },
  {
    id: 6,
    title: "pulled pork brisket burger",
    category: "dinner",
    price: 18.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-6.jpeg",
    desc: `Served with coleslaw, cheese and topped with carolina gold sauce`,
  },
  {
    id: 7,
    title: "pork-belly pack",
    category: "dinner",
    price: 38.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-7.jpeg",
    desc: `Smoked pork belly, served with coleslaw & hot chips, sweet corn bread & bbq sauce `,
  },
  {
    id: 8,
    title: "onion rings",
    category: "lunch",
    price: 12.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-8.jpeg",
    desc: `crispy onion rings served with our in-house sauce  `,
  },
  {
    id: 9,
    title: "full/half beef ribs",
    category: "dinner",
    price: 38.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-9.jpeg",
    desc: `served with chips, coleslaw and our in house rib sauce`,
  },
  {
    id: 10,
    title: "10- pack of wings",
    category: "desert",
    price: 21.99,
    img: "https://brphillis.github.io/websites/restaurant-website/images/item-10.jpeg",
    desc: `generous pack of delicious wings, served with our in house sauce.`,
  },
];
const sectionCenter = document.querySelector(".section-center");
const container = document.querySelector(".btn-container");

//load menu items
window.addEventListener("DOMContentLoaded", function () {
  displayMenuItems(menu);
  displayMenuButtons();
});

function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    return `<article class="menu-item">
    <img src=${item.img} class="photo" alt=${item.title}/>
    <div class="item-info">
      <header>
        <h4>${item.title}</h4>
        <h4 class="price">$${item.price}</h4>
      </header>
      <p class="item-text">
      ${item.desc}
      </p>
    </div>
  </article>`;
  });
  displayMenu = displayMenu.join("");
  sectionCenter.innerHTML = displayMenu;
}

function displayMenuButtons() {
  const categories = menu.reduce(
    function (values, item) {
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["all"]
  );
  const categoryBtns = categories
    .map(function (category) {
      return `<button class="filter-btn" type="button" data-id=${category}>${category}</button>`;
    })
    .join("");
  container.innerHTML = categoryBtns;

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      const category = e.currentTarget.dataset.id;
      const menuCategory = menu.filter(function (menuItem) {
        if (menuItem.category === category) {
          return menuItem;
        }
      });
      if (category === "all") {
        displayMenuItems(menu);
      } else {
        displayMenuItems(menuCategory);
      }
    });
  });
}

// date updater
const date = document.getElementById("date");
date.innerHTML - new Date().getFullYear();

//links closer
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");
//fixed navbar for scrolling
window.addEventListener("scroll", function () {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  //return to top button
  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

//smooth scroll to correct section
const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    //prevent default
    e.preventDefault();
    //navigate to specific spot on page
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    // calc the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0;
  });
});
