//load phones
const loadPhones = () => {
  const searchField = document.getElementById("phone-input");
  const searchValue = searchField.value;
  //   console.log(inputValue);
  searchField.value = "";

  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data))
    .catch((error) => console.log(error));
};

//display phones
const displayPhone = (phones) => {
  if (phones.length == 0) {
    alert("No data Found");
  }
  // console.log(phones);
  else {
    const searchResultField = document.getElementById("search-result");
    searchResultField.textContent = "";
    phones?.slice(0, 15).forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card p-1" >
      <div class="d-flex align-items-center justify-content-center">
          <img src="${phone.image}" class="card-img-top w-75" alt="..." />
      </div>
    
      <div class="card-body">
        <h5 class="card-title text-center">${phone.slug}</h5>
      
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">phone Name:${phone.phone_name}</li>
        <li class="list-group-item text-center">Brand:${phone.brand}</li>
        <li class="list-group-item text-center">
           <button onclick="phoneDetailsBySlug('${phone.slug}')" class="btn btn-success">Details</button>
        </li>
       
      </ul>
    </div>
      `;

      searchResultField.appendChild(div);
    });
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
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
    <div class="d-flex align-items-center justify-content-center">
        <img src="${phone.image}" class="card-img-top w-50" alt="..." />
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">${phone.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item text-center">Relase Date:${
        phone.releaseDate ? phone.releaseDate : "Not Found"
      }</li>
      <li class="list-group-item text-center">Brand:${phone.brand}</li>
      <li class="list-group-item text-center">Main Features: ${
        phone.mainFeatures.storage
      },${phone.mainFeatures.displaySize},${phone.mainFeatures.chipSet},${
    phone.mainFeatures.memory
  }</li>
     
      <li class="list-group-item text-center">sensors:${
        phone.mainFeatures.sensors
      }</li>
      <li class="list-group-item text-center">${
        phone.others
          ? `others=> WLAN: ${phone.others.WLAN} 
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
