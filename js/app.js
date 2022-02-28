const loadPhones = () => {
  const searchField = document.getElementById("phone-input");
  const searchValue = searchField.value;
  //   console.log(inputValue);
  searchField.value = "";

  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data));
};

const displayPhone = (phones) => {
  const searchResultField = document.getElementById("search-result");
  searchResultField.textContent = "";
  phones.slice(0, 20).forEach((phone) => {
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
};
