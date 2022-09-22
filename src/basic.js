var dataTable = document.getElementById("data-table");

getUsers();
async function getUsers() {
  //Municipality and population data source
  const url1 =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";

  //Employment data source
  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";

  const usersPromise1 = await fetch(url1);
  const usersPromise2 = await fetch(url2);
  const userJSON1 = await usersPromise1.json();
  const userJSON2 = await usersPromise2.json();

  var mun = userJSON1.dataset.dimension.Alue.category.label;
  var pop = userJSON1.dataset.value;
  var emp = userJSON2.dataset.value;

  let i = 0;
  for (var key in mun) {
    //Skip first row
    if (i > 0) {
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      let td2 = document.createElement("td");
      let td3 = document.createElement("td");
      let td4 = document.createElement("td");
      td1.appendChild(document.createTextNode(mun[key]));
      td2.appendChild(document.createTextNode(pop[i]));
      td3.appendChild(document.createTextNode(emp[i]));

      //Calculcate employment pct
      let empPct = ((100.0 * emp[i]) / pop[i]).toFixed(2);

      td4.appendChild(document.createTextNode(empPct));
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);

      //Set the background color based on employment pct levels
      if (empPct < 25) {
        tr.style.backgroundColor = "#ff9e9e";
      } else if (empPct > 45) {
        tr.style.backgroundColor = "#abffbd";
      }

      //Add rows to table > tbody
      dataTable.children[1].appendChild(tr);
    }
    i++;
  }
}
