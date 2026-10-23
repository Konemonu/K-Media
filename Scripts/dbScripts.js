async function populateLeadeboard(mediaList, search) {
  let leaderboard = document.getElementById("databaseTable");
  if (search == 0) {
    document.getElementById("databaseTableHead").innerHTML = `
                      <th class="nameHeader"><button type="button" id="nameSortDown"class="name down activeButton">&#8595;</button>  Name  <button type="button" id="nameSortUp" class="name up">&#8593;</button></th>
                      <th class="typeHeader"><button type="button" id="typeSortDown" class="type down ">&#8595;</button>  Type  <button type="button" id="typeSortUp" class="type up ">&#8593;</button></th>
                      <th class="tagsHeader"><button type="button" id="tagsSortDown" class="tags down">&#8595;</button>  Tags  <button type="button" id="tagsSortUp" class="tags up">&#8593;</button></th>
                  `;
    
    let buttons = document.getElementById("databaseTableHead").getElementsByTagName("button");
    
    for (i = 0; i < buttons.length; i++) {
      let currButton = buttons[i];
      currButton.addEventListener('click', sortLeaderboard);
    }
    
  }
  let sortBy = document.getElementsByClassName("activeButton")[0].classList;

  specialSort(mediaList, sortBy[0], sortBy[1]);
  let content = "";
  for (i = 0; i < mediaList.length; i++) {
    let currItem = mediaList.at(i);
    content += `<tr>
    <td><button type="button" onclick="deleteItem(${currItem.id})">&#10060</button><button type="button" onclick="editWatchItem(${currItem.id})">&#x270E;</button>${currItem.name}</td>
    <td>${currItem.type}</td>
    <td>${currItem.tags}</td>
    `;
  }

  leaderboard.innerHTML = content;
}

async function populateWatchedLeadeboard(mediaList, search) {
  let leaderboard = document.getElementById("databaseTable");
  if (search == 0) {
    document.getElementById("databaseTableHead").innerHTML = `
                      <th class="nameHeader"><button type="button" id="nameSortDown"class="name down activeButton">&#8595;</button>  Name  <button type="button" id="nameSortUp" class="name up">&#8593;</button></th>
                      <th class="authorHeader"><button type="button" id="authorSortDown"class="author down ">&#8595;</button>  Author  <button type="button" id="authorSortUp" class="author up">&#8593;</button></th>
                      <th class="artistHeader"><button type="button" id="artistSortDown"class="artist down ">&#8595;</button>  Artist  <button type="button" id="artistSortUp" class="artist up">&#8593;</button></th>
                      <th class="releaseHeader"><button type="button" id="releaseStatusSortDown"class="releaseStatus down ">&#8595;</button>  Release status  <button type="button" id="releaseStatusSortUp" class="releaseStatus up">&#8593;</button></th>
                      <th class="statusHeader"><button type="button" id="readingStatusSortDown"class="readingStatus down ">&#8595;</button>  R/W status  <button type="button" id="readingStatusSortUp" class="readingStatus up">&#8593;</button></th>
                      <th class="yearHeader"><button type="button" id="yearConsumedSortDown"class="yearConsumed down ">&#8595;</button>  Year consumed  <button type="button" id="yearConsumedSortUp" class="yearConsumed up">&#8593;</button></th>
                      <th class="ratingHeader"><button type="button" id="ratingSortDown"class="rating down ">&#8595;</button>  Rating  <button type="button" id="ratingSortUp" class="rating up">&#8593;</button></th>
                      <th class="timesHeader"><button type="button" id="numberConsumedSortDown"class="numberConsumed down ">&#8595;</button>  Times consumed  <button type="button" id="numberConsumedSortUp" class="numberConsumed up">&#8593;</button></th>
                      <th class="typeHeader"><button type="button" id="typeSortDown" class="type down ">&#8595;</button>  Type  <button type="button" id="typeSortUp" class="type up ">&#8593;</button></th>
                      <th class="tagsHeader"><button type="button" id="tagsSortDown" class="tags down">&#8595;</button>  Tags  <button type="button" id="tagsSortUp" class="tags up">&#8593;</button> </th>
                  `;//</thead><tbody class="LeaderBody">
    let buttons = document.getElementById("databaseTableHead").getElementsByTagName("button");

    for (i = 0; i < buttons.length; i++) {
      let currButton = buttons[i];
      currButton.addEventListener('click', sortLeaderboard);
    }
  }
  let sortBy = document.getElementsByClassName("activeButton")[0].classList;

  specialSort(mediaList, sortBy[0], sortBy[1]);

  let content = "";
  for (i = 0; i < mediaList.length; i++) {
    let currItem = mediaList.at(i);
    content += `<tr>
    <td><button type="button" onclick="deleteWatchedItem(${currItem.id})">&#10060</button><button type="button" onclick="editWatchedItem(${currItem.id})">&#x270E;</button>${currItem.name}</td>
    <td>${currItem.author}</td>
    <td>${currItem.artist}</td>
    <td>${currItem.releaseStatus}</td>
    <td>${currItem.readingStatus}</td>
    <td>${currItem.yearConsumed}</td>
    <td>${currItem.rating}</td>
    <td>${currItem.numberConsumed}</td>
    <td>${currItem.type}</td>
    <td>${currItem.tags}</td>
    `;
  }

  leaderboard.innerHTML = content;
}

async function sortLeaderboard (event) {
  let activeButton = document.getElementsByClassName("activeButton")[0];
  if (activeButton == event.srcElement) {
    return
  }
  else {
    activeButton.classList.remove("activeButton");
    event.srcElement.classList.add("activeButton");
    searchDatabase();
  }
}

async function searchDatabase(){
  let pauseSearch = document.getElementById("pauseSearch").checked;
  if (!pauseSearch) {
    if (document.getElementById("releaseSearch") == null) {
      let nameSearch = document.getElementById("nameSearch").value;
      let tagsSearch = document.getElementById("tagsSearch").value;
      let typeSearch = document.getElementById("typeSearch").value;

      let search = {
        "name": `${nameSearch}`,
        "tags": `${tagsSearch}`,
        "type": `${typeSearch}`
      };
      
      let mediaList = await getMediaList(search);
      populateLeadeboard(mediaList, 1);
    }
    else {
      let nameSearch = document.getElementById("nameSearch").value;
      let tagsSearch = document.getElementById("tagsSearch").value;
      let typeSearch = document.getElementById("typeSearch").value;
      let authorSearch = document.getElementById("authorSearch").value;
      let artistSearch = document.getElementById("artistSearch").value;
      let releaseSearch = document.getElementById("releaseSearch").value;
      let statusSearch = document.getElementById("statusSearch").value;
      let yearSearch = document.getElementById("yearSearch").value;
      let ratingSearch = document.getElementById("ratingSearch").value;
      let timesSearch = document.getElementById("timesSearch").value;

      let search = {
        "name": `${nameSearch}`,
        "tags": `${tagsSearch}`,
        "type": `${typeSearch}`,
        "author": `${authorSearch}`,
        "artist": `${artistSearch}`,
        "releaseStatus": `${releaseSearch}`,
        "readingStatus": `${statusSearch}`,
        "yearConsumed": `${yearSearch}`,
        "rating": `${ratingSearch}`,
        "numberConsumed": `${timesSearch}`
      };

      let mediaList = await getWatchedMediaList(search);
      populateWatchedLeadeboard(mediaList, 1);
    }
  }
}

async function addItem(){
  let nameSearch = document.getElementById("nameSearch");
  let tagsSearch = document.getElementById("tagsSearch");
  let typeSearch = document.getElementById("typeSearch");
  let updateEntry = await getMediaList({"name": `${nameSearch.value}`, "tags": ``}, 1);
  
  
  if (updateEntry.at(0) != null) {
    if (updateEntry.at(0).name == nameSearch.value) {
      await fetch (MEDIA_URL, {
        method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: updateEntry.at(0).id,
                        name: nameSearch.value,
                        tags: tagsSearch.value,
                        type: typeSearch.value
                    })
                    
                });
    }
    
  }
  else {
    await fetch (MEDIA_URL, {
                 method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      name: nameSearch.value,
                      tags: tagsSearch.value,
                      type: typeSearch.value
                  })
              });
  }
  nameSearch.value = "";
  tagsSearch.value = "";
  typeSearch.value = "";
  document.getElementById("pauseSearch").checked = false;

  let mediaList = await getMediaList();
  populateLeadeboard(mediaList, 1);

}

async function addWatchedItem(){
  let nameSearch = document.getElementById("nameSearch");
  let tagsSearch = document.getElementById("tagsSearch");
  let typeSearch = document.getElementById("typeSearch");
  let authorSearch = document.getElementById("authorSearch");
  let artistSearch = document.getElementById("artistSearch");
  let releaseSearch = document.getElementById("releaseSearch");
  let statusSearch = document.getElementById("statusSearch");
  let yearSearch = document.getElementById("yearSearch");
  let ratingSearch = document.getElementById("ratingSearch");
  let timesSearch = document.getElementById("timesSearch");
  let updateEntry = await getWatchedMediaList({"name": `${nameSearch.value}`}, 1);
  
  
  if (updateEntry.at(0) != null) {
    if (updateEntry.at(0).name == nameSearch.value) {
      await fetch (WATCHED_URL, {
        method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: updateEntry.at(0).id,
                        name: nameSearch.value,
                        tags: tagsSearch.value,
                        type: typeSearch.value,
                        author: authorSearch.value,
                        artist: artistSearch.value,
                        releaseStatus: releaseSearch.value,
                        readingStatus: statusSearch.value,
                        yearConsumed: yearSearch.value,
                        rating: ratingSearch.value,
                        numberConsumed: timesSearch.value
                    })
                    
                });
    }
    
  }
  else {
    await fetch (WATCHED_URL, {
                 method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      name: nameSearch.value,
                      tags: tagsSearch.value,
                      type: typeSearch.value,
                      author: authorSearch.value,
                      artist: artistSearch.value,
                      releaseStatus: releaseSearch.value,
                      readingStatus: statusSearch.value,
                      yearConsumed: yearSearch.value,
                      rating: ratingSearch.value,
                      numberConsumed: timesSearch.value
                  })
              });
  }
  nameSearch.value = "";
  tagsSearch.value = "";
  typeSearch.value = "";
  authorSearch.value = "";
  artistSearch.value = "";
  releaseSearch.value = "";
  statusSearch.value = "";
  yearSearch.value = "";
  ratingSearch.value = "";
  timesSearch.value = "";
  document.getElementById("pauseSearch").checked = false;

  let mediaList = await getWatchedMediaList();
  populateWatchedLeadeboard(mediaList, "name", 0);

}

async function deleteItem(id) {
  await fetch (MEDIA_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: id
                })
            });
  let mediaList = await getMediaList();
  populateLeadeboard(mediaList, 1);
}
async function deleteWatchedItem(id) {
  await fetch (WATCHED_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: id
                })
            });
  let mediaList = await getWatchedMediaList();
  populateWatchedLeadeboard(mediaList, "name", 0);
}

async function editWatchItem(id) {
  let updateEntry = await getMediaList({"id": `${id}`});
  updateEntry = updateEntry.at(0);

  document.getElementById("pauseSearch").checked = true;
  document.getElementById("nameSearch").value = updateEntry.name;
  document.getElementById("tagsSearch").value = updateEntry.tags;
  document.getElementById("typeSearch").value = updateEntry.type;
}

async function editWatchedItem(id) {
  let updateEntry = await getWatchedMediaList({"id": `${id}`});
  updateEntry = updateEntry.at(0);

  document.getElementById("pauseSearch").checked = true;
  document.getElementById("nameSearch").value = updateEntry.name;
  document.getElementById("tagsSearch").value = updateEntry.tags;
  document.getElementById("typeSearch").value = updateEntry.type;
  document.getElementById("authorSearch").value = updateEntry.author;
  document.getElementById("artistSearch").value = updateEntry.artist;
  document.getElementById("releaseSearch").value = updateEntry.releaseStatus;
  document.getElementById("statusSearch").value = updateEntry.readingStatus;
  document.getElementById("yearSearch").value = updateEntry.yearConsumed;
  document.getElementById("ratingSearch").value = updateEntry.rating;
  document.getElementById("timesSearch").value = updateEntry.numberConsumed;
}

async function watchedSwitch() {
  let form = document.getElementById("leaderboardInput");
  document.getElementById("databaseTitle").innerHTML = "Watched list";

  form.innerHTML = `
    <label for="nameSearch">| Name</label>
    <input type="text" id="nameSearch">

    <label for="authorSearch">| Author</label>
    <input type="text" name="authorSearch" id="authorSearch">

    <label for="artistSearch">| Artist</label>
    <input type="text" name="artistSearch" id="artistSearch"> |
    
    <label for="pauseSearch">Pause search</label>
    <input type="checkbox" name="pauseSearch" id="pauseSearch">
    
    <button type="button" id="addItemButton">Add media</button>
    <button type="button" id="watchedSwitch">Switch to watch list</button>
    <br>

    <label for="releaseSearch">| Release status</label>
    <input type="text" name="releaseSearch" id="releaseSearch">

    <label for="statusSearch">| Reading/Watching status</label>
    <input type="text" name="statusSearch" id="statusSearch">

    <label for="yearSearch">| Year consumed</label>
    <input type="number" name="yearSearch" id="yearSearch"> |<br>

    <label for="ratingSearch">| Rating</label>
    <input type="number" name="ratingSearch" id="ratingSearch" min="0" max="10" step="0.1" placeholder="5.0">

    <label for="timesSearch">| Times consumed</label>
    <input type="number" name="timesSearch" id="timesSearch" min="0" step="1" placeholder="0"> |<br>

    <label for="typeSearch">| Type</label>
    <input type="text" name="typeSearch" id="typeSearch">

    <label for="tagsSearch">| Tags</label>
    <input type="text" id="tagsSearch" placeholder="Separate tags with a comma"> |<br>

    
  `;

  let mediaList = await getWatchedMediaList();
  populateWatchedLeadeboard(mediaList, 0);
  document.getElementById("tagsSearch").addEventListener('input', searchDatabase);
  document.getElementById("nameSearch").addEventListener('input', searchDatabase);
  document.getElementById("typeSearch").addEventListener('input', searchDatabase);
  document.getElementById("authorSearch").addEventListener('input', searchDatabase);
  document.getElementById("artistSearch").addEventListener('input', searchDatabase);
  document.getElementById("releaseSearch").addEventListener('input', searchDatabase);
  document.getElementById("statusSearch").addEventListener('input', searchDatabase);
  document.getElementById("yearSearch").addEventListener('input', searchDatabase);
  document.getElementById("ratingSearch").addEventListener('input', searchDatabase);
  document.getElementById("timesSearch").addEventListener('input', searchDatabase);
  document.getElementById("watchedSwitch").addEventListener('click', watchSwitch);
  document.getElementById("addItemButton").addEventListener('click', addWatchedItem);
}

async function watchSwitch() {
  let form = document.getElementById("leaderboardInput");
  document.getElementById("databaseTitle").innerHTML = "Watchlist";

  form.innerHTML = `
    <label for="nameSearch">| Name</label>
    <input type="text" id="nameSearch">

    <label for="typeSearch">| Type</label>
    <input type="text" name="typeSearch" id="typeSearch">

    <label for="tagsSearch">| Tags</label>
    <input type="text" id="tagsSearch" placeholder="Separate tags with a comma"> |

    <label for="pauseSearch">Pause search</label>
    <input type="checkbox" name="pauseSearch" id="pauseSearch">
    
    <button type="button" id="addItemButton">Add media</button>
    <button type="button" id="watchSwitch">Switch to watched list</button>
    <br>
  `;

  let mediaList = await getMediaList();
  populateLeadeboard(mediaList, 0);
  document.getElementById("tagsSearch").addEventListener('input', searchDatabase);
  document.getElementById("nameSearch").addEventListener('input', searchDatabase);
  document.getElementById("typeSearch").addEventListener('input', searchDatabase);
  document.getElementById("watchSwitch").addEventListener('click', watchedSwitch);
  document.getElementById("addItemButton").addEventListener('click', addItem);
}

async function initialize() {
  let mediaList = await getMediaList();
  populateLeadeboard(mediaList, 0);
  document.getElementById("tagsSearch").addEventListener('input', searchDatabase);
  document.getElementById("nameSearch").addEventListener('input', searchDatabase);
  document.getElementById("typeSearch").addEventListener('input', searchDatabase);
  document.getElementById("addItemButton").addEventListener('click', addItem);
  document.getElementById("watchSwitch").addEventListener('click', watchedSwitch);
}

document.addEventListener("DOMContentLoaded", initialize);