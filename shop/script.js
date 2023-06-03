const mainContent = document.getElementById("main-tag");
const productEndpoint = `https://fakestoreapi.com/products`;
var rawData = [];
//catagory buttons
const allBtn = document.getElementById("all-btn")
const menBtn = document.getElementById("men-btn")
const womenBtn = document.getElementById("women-btn")
const jewelBtn = document.getElementById("jewellery-btn")
const electBtn = document.getElementById("elect-btn")
//search input
const searchInput = document.getElementById("search-inp");
//rating input
const rangeInput = document.getElementById("range");

const logout = document.querySelector('.logout');

logout.addEventListener("click", () => {
  localStorage.removeItem('currentUser');
  window.location.href = "../login";
});

(async function getData() {
  const response = await fetch(productEndpoint);
  rawData = await response.json();
  const colours = ["Red", "Blue", "Black", "Green", "White"];
  const sizes = ["S", "M", "L", "XL"];
  rawData.forEach((element) => {
    element.colours = colours[Math.floor(Math.random() * 5)];

    element.sizes = sizes[Math.floor(Math.random() * 4)];
  })
  displayData(rawData);
})()

function displayData(data) {
  var categoryArray = ["men's clothing", "women's clothing", "jewelery", "electronics"]
  categoryArray.forEach((element) => {
    let category = element;
    var categories = data.filter((element) => {
      return element.category == category;
    })
    try {
      const sectionTag = document.createElement("section");
      sectionTag.className="all-products";
      const titleTag = document.createElement("title");
      titleTag.innerText = capitalizeWord(categories[0].category);
      sectionTag.appendChild(titleTag);
      mainContent.appendChild(sectionTag);
      const divItems = document.createElement("div");
      divItems.className = "items"
      data.forEach((element) => {
        if (element.category == category) {
          const divItem = document.createElement("div");
          divItem.className = "item";
          const imageTag = document.createElement("img");
          imageTag.src = element.image;
          const divInfo = document.createElement("div");
          divInfo.className = "info";
          //information
          divRow = document.createElement("div");;
          divRow.className = "row";
          divPrice = document.createElement("div");;
          divPrice.className = "price";
          divPrice.innerText = `$${element.price}`
          divRow.appendChild(divPrice);
          divSize = document.createElement("div");
          divSize.className = "sized";
          divSize.innerText = element.sizes;
          divRow.appendChild(divSize);
          divInfo.appendChild(divRow);
          //colors
          divColors = document.createElement("div");
          divColors.className = "colors";
          divColors.innerText = "Colors:";
          divColorsRow = document.createElement("div");
          divColorsRow.className = "row";
          divColorCircle = document.createElement("div");
          divColorCircle.className = "circle";
          divColorCircle.style.backgroundColor = element.colours
          divColorsRow.appendChild(divColorCircle)
          divColors.appendChild(divColorsRow);
          divInfo.appendChild(divColors);
          //ratings
          divRatings = document.createElement("div");
          divRatings.className = "row";
          divRatings.innerText = "Rating:"
          divInfo.appendChild(divRatings);
          //
          const cartButton = document.createElement("button");
          cartButton.id =`${element.id}`;
          cartButton.className="addCart";
          cartButton.setAttribute("onClick","clickFunction(this)")
          cartButton.innerText = "Add to Cart"
          
          //
          divItem.appendChild(imageTag);
          divItem.appendChild(divInfo)
          divItem.appendChild(cartButton);
          //
          divItems.appendChild(divItem);
        }
      })
      sectionTag.appendChild(divItems)
      mainContent.appendChild(sectionTag)
    } catch (e) {

    }
  })
}

function capitalizeWord(sentence) {
  const words = sentence.split(' ');
  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
}

//catagory functions
allBtn.addEventListener("click", () => {
  const section = document.querySelectorAll("#main-tag > section")
  section.forEach((element) => {
    element.innerHTML = "";
  })
  
    displayData(rawData);
  
  allBtn.className = "filter active";
  womenBtn.className = "filter";
  jewelBtn.className = "filter";
  electBtn.className = "filter";
  menBtn.className = "filter"
})
menBtn.addEventListener("click", () => {
  const section = document.querySelectorAll("#main-tag > section")
  section.forEach((element) => {
    element.innerHTML = "";
  })
  var filteredArray= rawData.filter((element)=>{
    return element.category=="men's clothing"
  })
  
  displayData(filteredArray)
  allBtn.className = "filter";
  womenBtn.className = "filter";
  jewelBtn.className = "filter";
  electBtn.className = "filter";
  menBtn.className = "filter active"
})
womenBtn.addEventListener("click", () => {
  const section = document.querySelectorAll("#main-tag > section")
  section.forEach((element) => {
    element.innerHTML = "";
  })
  var filteredArray= rawData.filter((element)=>{
    return element.category=="women's clothing"
  })
  
  displayData(filteredArray)
  allBtn.className = "filter";
  womenBtn.className = "filter active";
  jewelBtn.className = "filter";
  electBtn.className = "filter"
  menBtn.className = "filter"
})
jewelBtn.addEventListener("click", () => {
  const section = document.querySelectorAll("#main-tag > section")
  section.forEach((element) => {
    element.innerHTML = "";
  })
  var filteredArray= rawData.filter((element)=>{
    return element.category=="jewelery"
  })
  
  displayData(filteredArray)
  allBtn.className = "filter";
  womenBtn.className = "filter";
  jewelBtn.className = "filter active";
  electBtn.className = "filter"
  menBtn.className = "filter"
})
electBtn.addEventListener("click", () => {
  const section = document.querySelectorAll("#main-tag > section")
  section.forEach((element) => {
    element.innerHTML = "";
  })
  var filteredArray= rawData.filter((element)=>{
    return element.category=="electronics"
  })
  
  displayData(filteredArray)
  allBtn.className = "filter";
  womenBtn.className = "filter";
  jewelBtn.className = "filter";
  electBtn.className = "filter active"
  menBtn.className = "filter"
})

//input function with debouncing
let timerId = undefined;
searchInput.addEventListener("keyup", (event) => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    var value = (event.target.value).toLowerCase()
    let filteredData = rawData.filter((element) => {
      return element.title.toLowerCase().includes(value);
    })
    var section = document.querySelectorAll("#main-tag > section")
    section.forEach((element) => {
      element.remove();
    })
    displayData(filteredData);
    var sec2 = document.querySelectorAll("#main-tag > section")
    if(sec2.length==0){
      document.getElementsByClassName("error-message")[0].style.display="block";
    }else{
      document.getElementsByClassName("error-message")[0].style.display="none";
    }
    allBtn.className = "filter active";
    womenBtn.className = "filter";
    jewelBtn.className = "filter";
    electBtn.className = "filter";
    menBtn.className = "filter"

    timerId = undefined;
  }, 1000)
})

//colors chackboxes functions
const checkboxList = document.getElementById('checkboxList');
const checkboxes = checkboxList.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    const section = document.querySelectorAll("#main-tag > section")
    section.forEach((element) => {
      element.innerHTML = "";
    })
    const checkedCheckboxes = checkboxList.querySelectorAll('input[type="checkbox"]:checked');
    checkedCheckboxes.forEach(function (checkedCheckbox) {
      let filteredData = rawData.filter((element) => {
        return element.colours == checkedCheckbox.parentElement.textContent.trim();
      })
      displayData(filteredData);
    });
  });
});

//sizes chackboxes functions
const sizeCheckBoxList = document.getElementById('sizesCheckBoxList');
const sizeCheckBox = sizeCheckBoxList.querySelectorAll('input[type="checkbox"]');
sizeCheckBox.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    const section = document.querySelectorAll("#main-tag > section")
    section.forEach((element) => {
      element.innerHTML = "";
    })
    const checkedsizeCheckBox = sizeCheckBoxList.querySelectorAll('input[type="checkbox"]:checked');
    checkedsizeCheckBox.forEach(function (checkedCheckbox) {
      let filteredData = rawData.filter((element) => {
        return element.sizes == checkedCheckbox.parentElement.textContent.trim();
      })
      displayData(filteredData);
    });
  });
});

//rating input function
rangeInput.addEventListener("change", (event) => {
  let value = event.target.value;
  let filteredRatingsArray = rawData.filter((element) => {
    return parseInt(element.rating.rate) == value;
  })
  const section = document.querySelectorAll("#main-tag > section")
  section.forEach((element) => {
    element.innerHTML = "";
  })
  if (value == 0) {
    displayData(rawData)
  } else {
    displayData(filteredRatingsArray);
  }
})

//price range Function
const priceRangeList = document.getElementById('price-range-ul');
const pricerangeCheck = priceRangeList.querySelectorAll('input[type="checkbox"]');
pricerangeCheck.forEach(function (checkbox) {
  checkbox.addEventListener('change', function () {
    const section = document.querySelectorAll("#main-tag > section")
    section.forEach((element) => {
      element.innerHTML = "";
    })
    const checkedsizeCheckBox = priceRangeList.querySelectorAll('input[type="checkbox"]:checked');
    checkedsizeCheckBox.forEach(function (checkedCheckbox) {
      const str = checkedCheckbox.parentElement.textContent.trim();
      const regex = /\d+/g;
      const matches = str.match(regex);
      var [lower, upper] = [];
      if (matches) {
        [lower, upper] = matches.map(Number);
      }
      if (lower !== undefined && upper !== undefined) {
        const filteredData = rawData.filter(item => item.price >= lower && item.price <= upper);
        displayData(filteredData);
      }
      if (lower !== undefined && upper == undefined) {
        const filteredData = rawData.filter(item => item.price >= lower);
        displayData(filteredData);
      }
    });
  });
});

var cartItems=[];
if(localStorage.cartItems==null){
  cartItems=[];
}

function clickFunction(element){
  rawData.forEach((e)=>{
    if(e.id==element.id){
      cartItems.push(e)
    }
  })
  console.log(cartItems)
  cartItems.forEach((item)=>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  })
  
  
}
