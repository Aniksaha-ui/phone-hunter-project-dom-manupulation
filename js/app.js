//spinner
const spinner = (showStatus) => {
  document.getElementById("spinner").style.display = showStatus;
};

//Display an error
const displayError = (displayStatus) => {
  document.getElementById("error").style.display = displayStatus;
};

//display selected phone title
const showTitle = (id, displayStatus) => {
  document.getElementById(id).style.display = displayStatus;
};

//load phones
const loadPhones = () => {
  const searchField = document.getElementById("phone-input");
  const searchValue = searchField.value.toLowerCase();

  searchField.value = "";

  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data))
    .catch((error) => console.log(error));
  //spinner show
  spinner("block");
  //spinner show end
};

//display phones
const displayPhone = (phones) => {
  if (phones.length == 0) {
    //clear previous selected phone details area
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    //clear previous selected phone details area

    //get search-result field and clear previous data
    const searchResultField = document.getElementById("search-result");
    searchResultField.textContent = "";
    //get search-result field and clear previous data end

    //display error message
    displayError("block");
    //display error message

    //hide titles and spinner off
    showTitle("search-result-title", "none");
    showTitle("selected-phone-title", "none");
    spinner("none");
    //hide titles and spinner off
  } else {
    //hide previous error message and show and hide titles
    displayError("none");
    showTitle("search-result-title", "block");
    showTitle("selected-phone-title", "none");
    //hide previous error message and show and hide titles

    //clear previous selected phone details area
    const phoneDetails = document.getElementById("phone-details");
    phoneDetails.textContent = "";
    //clear previous selected phone details area end
    //get search-result field and clear previous data
    const searchResultField = document.getElementById("search-result");
    searchResultField.textContent = "";
    //get search-result field and clear previous data end

    // load data into UI
    phones?.slice(0, 15).forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card border border-3 bg-white" >
      <div class="d-flex align-items-center justify-content-center">
          <img src="${phone.image}" class="card-img-top w-50" alt="..." />
      </div>
    
      <div class="card-body">
        <h5 class="card-title text-center">${phone.slug}</h5>
      
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">phone Name : ${phone.phone_name}</li>
        <li class="list-group-item text-center">Brand : ${phone.brand}</li>
        <li class="list-group-item text-center">
           <button onclick="phoneDetailsBySlug('${phone.slug}')" class="btn btn-success w-75 rounded-3">Details</button>
        </li>
        <li class="list-group-item text-center"></li>
       
      </ul>
    </div>
      `;

      searchResultField.appendChild(div);
    });
    // load data into UI
    //spinner off
    spinner("none");
    //spinner off end
  }
};

//selected phone details load
const phoneDetailsBySlug = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data))
    .catch((error) => console.log(error));
};

//selected phone details show
const displayPhoneDetails = (phone) => {
  showTitle("selected-phone-title", "block");
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add("p-4");

  div.innerHTML = `
    <div class="d-flex align-items-center justify-content-center">
        <img src="${phone.image}" class="card-img-top w-25" alt="..." />
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">${phone.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">Relase Date:${
        phone.releaseDate ? phone.releaseDate : "Not Found"
      }</li>
      <li class="list-group-item text-center">Brand:${phone.brand}</li>
      <li class="list-group-item text-center"><h4>Main Features</h4>
      <p>storage: ${phone.mainFeatures.storage} </p>
      <p>Display: ${phone.mainFeatures.displaySize} </p> 
      <p>ChipSet : ${phone.mainFeatures.chipSet}</p>
      Memory: ${phone.mainFeatures.memory}
      </li>
      <li class="list-group-item text-center">sensors:${
        phone.mainFeatures.sensors
      }</li>
      <li class="list-group-item text-center">${
        phone.others
          ? `<h4>Others</h4> 
          WLAN: ${phone.others.WLAN} 
          Bluetooth:${phone.others.Bluetooth},
          GPS:${phone.others.GPS},
          NFC:${phone.others.NFC},
          Radio:${phone.others.Radio},
          USB:${phone.others.USB} `
          : "others: Not Found"
      } </li>

    </ul>
  `;

  phoneDetails.appendChild(div);
};
