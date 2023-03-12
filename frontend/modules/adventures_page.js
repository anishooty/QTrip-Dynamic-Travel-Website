
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  console.log(search);
  const URLParameters = new URLSearchParams(search);
  console.log(URLParameters);
  console.log(URLParameters.get("city"));
  // console.log(location.search);//This is already there is search itself passed in parameter.
  return URLParameters.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const data = await fetch(config.backendEndpoint+"/adventures/?city="+city);
    console.log(data);
    // const data= await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
    // await console.log(data.json());
    return await data.json();

  }
  catch{
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  // adventures.forEach((adventure) =>  {
  //   let divEle = document.createElement("div");
  //   divEle.className = "col-12 col-sm-6 col-lg-3 mb-4 d-flex align-content-stretch flex-wrap";
  //   divEle.innerHTML = `
  //                         <a href="detail/?adventure=${adventures[adventure].id}" id=${adventures[adventure].id}>
  //                         <div class="activity-card">
  //                           <div class="category-banner">
  //                             <img
  //                               class="img-responsive"
  //                               src=${adventures[adventure].image}
  //                               alt="adventure image"
  //                             />
  //                             <div class="activity-card-text text-md-center w-100 mt-3">
  //                               <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
  //                                 <h5 class="text-left">${adventures[adventure].name}</h5>
  //                                 <p>₹${adventures[adventure].costPerHead}</p>
  //                               </div>
  //                                 <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
  //                                 <h5 class="text-left">Duration</h5>
  //                                 <p>${adventures[adventure].duration} Hours</p>
  //                               </div>
  //                             </div>
  //                           </div>
  //                           </div>
  //                         </div>
  //                       </a>
  //   `;
  //   document.getElementById("data").appendChild(divEle);
    
  // });
  const divEle = document.getElementById("data");
   

  for (let adventure of adventures) {
    const cardEle = document.createElement("div");
    cardEle.classList.add("col", "col-md-6", "col-lg-4", "mb-4");
    const card = `<div class="card tile" style="width: 18rem;">
    <a href="detail/?adventure=${adventure.id}" id=${adventure.id}>
    <img class="card-img-top activity-card-image" style="height: 400px; width: 300px" src="${adventure.image}" alt="Card image cap">
    <div class="category-banner">${adventure.category}</div>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <p>${adventure.name}</p>
        <p> &#8377; ${adventure.costPerHead}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p>Duration</p>
        <p>${adventure.duration} Hour</p>
      </div>
     </div></a>
    </div>`;
    cardEle.innerHTML = card;
    divEle.appendChild(cardEle);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((key)=> key.duration>low && key.duration<=high)
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const Categoryfilter = []
  categoryList.forEach((key) => {
    for (let i=0 ; i<list.length ; i++){
      if(list[i].category === key){
        Categoryfilter.push(list[i])
      }
    }
  })
  return Categoryfilter;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let arr = filters.duration.split("-")
  if(filters.duration.length > 0 && filters.category.length>0){
    list = filterByDuration(list,arr[0], arr[1]); + filterByCategory(list, filters.category);
  }else if (filters.duration.length >0 && filters.category.length === 0){
    list = filterByDuration(list,arr[0], arr[1]);
  }else if (filters.duration.length === 0 && filters.category.length > 0){
    list = filterByCategory(list, filters.category);
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  const sto = window.localStorage.setItem("filters",JSON.stringify(filters))
  return sto;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const loc = JSON.parse(window.localStorage.getItem('filters'));
  return loc;

}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filterDom = document.getElementById("category-list");
  
      if(filters.category){
        if(filters.category.length >= 0){
          for(let i=0 ;i<filters.category.length;i++){
            let div02 = document.createElement("div")
            div02.className = "category-filter"
            div02.innerText = `${filters.category[i]}`
            filterDom.appendChild(div02)
          }   
      }
      }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
