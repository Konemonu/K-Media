async function populateLeadeboard(mediaList) {
  let leaderboard = document.getElementById("databaseTable");
  let content = `<thead>
                      <th class="nameHeader">Name</th>
                      <th class="typeHeader">Type</th>
                      <th class="tagsHeader">Tags</th>
                  </thead><tbody class="LeaderBody">`;
  specialSort(mediaList, "name");

  for (i = 0; i < mediaList.length; i++) {
    let currItem = mediaList.at(i);
    content += `<tr>
    <td><button type="button" onclick="deleteItem(${currItem.id})">&#10060</button>${currItem.name}</td>
    <td>${currItem.type}</td>
    <td>${currItem.tags}</td>
    `;
  }

  content += `</body>`;
  leaderboard.innerHTML = content;
}

async function populateWatchedLeadeboard(mediaList) {
  let leaderboard = document.getElementById("databaseTable");
  let content = `<thead>
                      <th class="nameHeader">Name</th>
                      <th class="authorHeader">Author</th>
                      <th class="artistHeader">Artist</th>
                      <th class="releaseHeader">Release status</th>
                      <th class="statusHeader">R/W status</th>
                      <th class="yearHeader">Year consumed</th>
                      <th class="ratingHeader">Rating</th>
                      <th class="timesHeader">Times consumed</th>
                      <th class="typeHeader">Type</th>
                      <th class="tagsHeader">Tags</th>
                  </thead><tbody class="LeaderBody">`;
  specialSort(mediaList, "name");

  for (i = 0; i < mediaList.length; i++) {
    let currItem = mediaList.at(i);
    content += `<tr>
    <td><button type="button" onclick="deleteWatchedItem(${currItem.id})">&#10060</button>${currItem.name}</td>
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

  content += `</body>`;
  leaderboard.innerHTML = content;
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
      populateLeadeboard(mediaList);
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
      populateWatchedLeadeboard(mediaList);
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
  populateLeadeboard(mediaList);

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
  populateWatchedLeadeboard(mediaList);

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
  populateLeadeboard(mediaList);
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
  populateWatchedLeadeboard(mediaList);
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
  populateWatchedLeadeboard(mediaList);
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
  populateLeadeboard(mediaList);
  document.getElementById("tagsSearch").addEventListener('input', searchDatabase);
  document.getElementById("nameSearch").addEventListener('input', searchDatabase);
  document.getElementById("typeSearch").addEventListener('input', searchDatabase);
  document.getElementById("watchSwitch").addEventListener('click', watchedSwitch);
  document.getElementById("addItemButton").addEventListener('click', addItem);
}

async function initialize() {
  let mediaList = await getMediaList();
  populateLeadeboard(mediaList);
  document.getElementById("tagsSearch").addEventListener('input', searchDatabase);
  document.getElementById("nameSearch").addEventListener('input', searchDatabase);
  document.getElementById("typeSearch").addEventListener('input', searchDatabase);
  document.getElementById("addItemButton").addEventListener('click', addItem);
  document.getElementById("watchSwitch").addEventListener('click', watchedSwitch);
}

document.addEventListener("DOMContentLoaded", initialize);