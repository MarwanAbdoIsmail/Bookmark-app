var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var btn = document.getElementById("btn-submit");
var tableBody = document.getElementById("tableBody");
var bookmarks = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  display(bookmarks);
}

btn.onclick = function () {
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      siteUrl.value
    ) &&
    /^([0-9]*[a-zA-Z]){3,}[0-9]*$/i.test(siteName.value)
  ) {
    addBookmarks(bookmarks);
  } else {
    alert(
      "Site name must contain at least 3 characters and Site URL must be a valid one"
    );
  }
  display(bookmarks);
  clear();
};

function addBookmarks(arr) {
  var site = {
    name: siteName.value,
    url: siteUrl.value,
  };

  arr.push(site);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function display(arr) {
  var box = "";
  for (let i = 0; i < arr.length; i++) {
    box += `
            <tr>
             <td>${i + 1}</td>
            <td>${arr[i].name}</td>
            <td
              ><button class="btn btn-danger" id="btn-visit" onclick="visit(${i})">
                <i class="fa-solid fa-eye pe-2"></i> Visit</button
              ></td
            >
            <td
              ><button class="btn btn-danger" id="btn-delete" onclick="Delete(${i})">
                <i class="fa-solid fa-trash-can"></i> Delete</button
              ></td
            >
            </tr>
        `;
  }
  tableBody.innerHTML = box;
}

function Delete(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  display(bookmarks);
}

function visit(index) {
  window.open(bookmarks[index].url);
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

// ^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$
