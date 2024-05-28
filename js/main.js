let sitesName = document.getElementById('siteName'),
    siteURL= document.getElementById('siteUrl'),
    btnSubmit = document.getElementById("submit"),
    btnUpdate = document.getElementById("update"),
    InputSearch = document.getElementById("searchInput"),
    modal = document.getElementById("modal"),
    indexSite = 0,
    sites = [];

if(localStorage.getItem("allSites")){
    sites = JSON.parse(localStorage.getItem("allSites"));
    displaySites();
}

// Click Submit To Add New Sites In Array And Save It In LocalStorage And Checked If Your Data Is Valid Or Not
btnSubmit.onclick =function(){
    if(validtionInputs(sitesName) && validtionInputs(siteURL)){
        siteData = {
            name : sitesName.value,
            url : siteURL.value,
        }

        sites.push(siteData);
        localStorage.setItem("allSites",JSON.stringify(sites));
        displaySites()
        clearInput()
    }
    if(sitesName.classList.contains("is-invalid") || siteURL.classList.contains("is-invalid")){
        modal.classList.replace('d-none','d-flex')
    } else{
        modal.classList.replace('d-flex','d-none')
    }
    
}

// Show Sites Data Site In Html File And Search By Name
function displaySites(){
    let inputSearchValue = searchInput.value,
        boxSites = ``;

    for (let i = 0; i < sites.length; i++) {
        if(sites[i].name.toLowerCase().includes(inputSearchValue.toLowerCase())){
            boxSites += `
            <tr class="tableContent">
                <td class="index-site">${i+1}</td>
                <td class="name-site">${sites[i].name}</td>
                <td><button onclick="visitSites(${i})" class="btn visit"><i class="fa-solid fa-eye"></i> Visit</button></td>
                <td><button onclick="deleteSites(${i})" class="btn delete"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                <td><button onclick="setSitesData(${i})" class="btn update"><i class="fa-solid fa-pen-to-square"></i> Update</button></td>
            </tr>
            `;
        }
    }

    document.getElementById('tableData').innerHTML = boxSites;
}

// Clear Input After Enter Your Data Sites
function clearInput(){
    sitesName.value= null;
    siteURL.value= null;
    sitesName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
}

// Delete Sites If You Need
function deleteSites(index){
    sites.splice(index,1)
    localStorage.setItem("allSites",JSON.stringify(sites))
    displaySites()
}

// Visit Sites
function visitSites(index){
    window.open(`https://${sites[index].url}`, '_black')
}

// Validation Sites Data
function validtionInputs(element){
    let inputValue = element.value,
        regex = {
            siteName : /^[A-Z][a-z]{3,}$/,
            siteUrl : /^www\.[a-z]{3,}\.com$/i,
        }

    if(regex[element.id].test(inputValue) == true){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    } else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        return false
    }
}

// Set And Update Data
function setSitesData(index){
    sitesName.value = sites[index].name
    siteURL.value = sites[index].url
    indexSite = index

    btnUpdate.classList.remove("d-none")
    btnSubmit.classList.add("d-none")
}
btnUpdate.onclick = function(){
    siteData = {
        name : sitesName.value,
        url : siteURL.value,
    }
    sites.splice(indexSite, 1 , siteData);
    localStorage.setItem("allSites",JSON.stringify(sites));
    displaySites()
    clearInput()
    btnUpdate.classList.add("d-none")
    btnSubmit.classList.remove("d-none")
}
// Close Modal
function closeMsg(){
    modal.classList.replace("d-flex", "d-none")
}