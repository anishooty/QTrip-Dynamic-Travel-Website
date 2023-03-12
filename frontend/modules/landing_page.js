import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  let cities = await fetchCities();
  console.log(config.backendEndpoint+"/cities");
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data


  // let response = await fetch(config.backendEndpoint);
  // let data = await response.json();
  // console.log(data);
  // return data;

  try {
    const response = await fetch(config.backendEndpoint+"/cities");  
    console.log(response);  
    const data = await response.json();
    console.log(data);
    return data;
  } catch(e) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // let getEle = document.getElementById(data);
  // console.log(getEle);
  // let container = document.createElement("div");
  // container.classList.add("container");
  // // let childClass1 = document.createElement("div");
  // // childClass1.classList.add("content text-white");


  let divEle = document.createElement("div");
  divEle.className="col-12 col-sm-6 col-lg-3 mb-4 d-flex align-content-stretch flex-wrap";
  divEle.innerHTML=`
    <a href="pages/adventures/?city=${id}" id="${id}">
      <div class="tile">
        <div class="tile-text text-center">
          <h5>${city}</h5>
          <p>${description}</p>
        </div>
        <img class="img-responsive" src="${image}">
        <br>
      </div>
      </a>
  `;
  document.getElementById("data").appendChild(divEle);

  // getEle.append(container);
  // let divElement = document.createElement("div");
  // divElement.className = "col-12 col-md-3  col-sm-6 mb-4";
  // divElement.innerHTML = `
  //   <a href="pages/adventures/?city=${id}" id="${id}">
  //     <div class="tile">
  //       <div class="tile-text text-center">
  //         <h5>${city}</h5>
  //         <p>${description}</p>
  //       </div>
  //     <img class="img-responsive" src="${image}">
  //     <br>
  //     </div>
  //   </a>
  // `;
  // document.getElementById("data").appendChild(divElement);
  
}

export { init, fetchCities, addCityToDOM };
