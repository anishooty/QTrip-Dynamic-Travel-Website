import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search)
  const parameter1 = new URLSearchParams(search);
  let adventureId;
  for(let i of parameter1.values()){
    adventureId = i;
  }

  // Place holder for functionality to work in the Stubs
  console.log(adventureId);
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{                                                  
    const result = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await result.json();
    console.log(data);
    return data;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  var head = document.getElementById("adventure-name");
  head.innerHTML = adventure.name;

  var subhead = document.getElementById("adventure-subtitle");
  subhead.innerHTML = adventure.subtitle;
  const photogallery = document.getElementById("photo-gallery");
  const images= adventure.images;
  images.forEach(element => {
    const divimg = document.createElement("div");
    divimg.classList.add("col-lg-12");
    divimg.innerHTML = `<img src=${element} class="activity-card-image img-fluid"  />`;
    photogallery.appendChild(divimg);

  });
  document.getElementById("adventure-content").innerText = adventure.content;
  document.getElementById("reservation-person-cost").innerText =adventure.costPerHead;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery = document.querySelector("#photo-gallery");
  gallery.innerHTML = `
  

  <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${images[0]}" class="d-block w-100" alt="...">
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  
  `;
  let inner = document.querySelector(".carousel-inner");
  let ol = document.querySelector(".carousel-indicators");
  for (let i = 1; i < images.length; i++) {
    let li = document.createElement("LI");
    li.setAttribute("data-target", "#carouselExampleIndicators");
    li.setAttribute("data-slide-to", `${i}`);
    ol.appendChild(li);

    let item = document.createElement("DIV");
    item.className = "carousel-item";
    let image = document.createElement("IMG");
    image.className = "activity-card-image d-block w-100";
    image.setAttribute("src", images[i]);
    item.appendChild(image);
    inner.appendChild(item);
  }
// var div = document.getElementById("photo-gallery");
//   var inner_div = document.createElement("div");
//   inner_div.setAttribute("class","carousel-inner");
  
//   //console.log(images);
//   //console.log(div.childNodes.length);
//   var n = div.childNodes.length;
//   for(var i=0; i<n; i++){
//     var gallery = document.getElementById("photo-gallery").firstChild;
//     gallery.remove();
//   }

//   var f=0;
//   for(var i=0; i<images.length; i++){
//     var div_in = document.createElement("div");
//     var image = document.createElement("img");
//     if(i == 0)  image.setAttribute("id", "img_1");
//     image.setAttribute("src", images[i]);
//     image.setAttribute("class", "activity-card-image");
//     div_in.appendChild(image);
//     if(f == 0)  div_in.setAttribute("class","carousel-item active");
//     else  div_in.setAttribute("class","carousel-item");
//     f=1;
//     inner_div.appendChild(div_in);
//   }

//   inner_div.firstChild.setAttribute("class","carousel-item active");
//   div.appendChild(inner_div);
  
//   var div = document.getElementById("photo-gallery");
//   div.setAttribute("class", "row mb-3 carousel slide");
//   div.setAttribute("data-ride", "carousel");
  
//   var a1 = document.createElement("a");
//   a1.setAttribute("class", "carousel-control-prev");
//   a1.setAttribute("href", "#photo-gallery");
//   a1.setAttribute("data-slide", "prev");

//   var span1 = document.createElement("span");
//   span1.setAttribute("class", "carousel-control-prev-icon");
//   a1.appendChild(span1);

//   var a2 = document.createElement("a");
//   a2.setAttribute("class", "carousel-control-next");
//   a2.setAttribute("href", "#photo-gallery");
//   a2.setAttribute("data-slide", "next");

//   var span2 = document.createElement("span");
//   span2.setAttribute("class", "carousel-control-next-icon");
//   a2.appendChild(span2);

//   div.appendChild(a1);
//   div.appendChild(a2);

//   var ul = document.createElement("ul");
//   ul.setAttribute("class", "carousel-indicators");
//   for(var i=0; i<images.length; i++){
//     var li = document.createElement("li");
//     li.setAttribute("data-target", "#photo-gallery");
//     li.setAttribute("data-slide-to", i);
//     if(i == 0)  li.setAttribute("class", "active");
//     ul.appendChild(li);
//   }
//   div.appendChild(ul);
//   var ul = document.createElement("p");
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display="none";
    document.getElementById("reservation-panel-available").style.display="block";
    document.getElementById("reservation-person-cost").innerHTML=adventure["costPerHead"];
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display="block";
    document.getElementById("reservation-panel-available").style.display="none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(adventure);
  console.log(persons);
  const totalamount = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML =  String(totalamount);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // function captureFormSubmit(adventure) {
  //   const form = document.getElementById('reservation-form');
    
  //   form.addEventListener('submit', async (event) => {
  //     event.preventDefault();
  
  //     // Get the form data
  //     const formData = new FormData(form);
  //     const formProps = Object.fromEntries(formData);
  //     formProps.adventure = adventure.id;
  
  //     // Make a POST API call to make the reservation
  //     const url = `${config.backendEndpoint}/reservations/new`;
  //     const data = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formProps)
  //     };
  
  //     try {
  //       const response = await fetch(url, data);
  //       if (response.ok) {
  //         // Reservation successful, show success message and refresh page
  //         alert('Success!');
  //         window.location.reload();
  //       } else {
  //         // Reservation failed, show error message
  //         alert('Failed!');
  //       }
  //     } catch (error) {
  //       console.error('Error making reservation:', error);
  //       alert('Failed!');
  //     }
  //   });
  // }
  let mainform=document.getElementById("myForm");
  
  
  mainform.addEventListener('submit',async(e)=>{
  e.preventDefault();
  let url = config.backendEndpoint + "/reservations/new";
  let formData = mainform.elements;
 
  try {
    const postData = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        "name": formData.name.value,
        "date": formData.date.value,
        "person": formData.person.value,
        "adventure": adventure.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await postData.json();
    alert("sucess!");
    } 
    
    catch (err) {
    alert("failed!")
  }

  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
