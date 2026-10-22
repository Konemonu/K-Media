const MEDIA_URL = "http://localhost:3000/toWatch/";
const WATCHED_URL = "http://localhost:3000/watched/";

async function getMediaList(body,exact){
    if (body == null){
        let list = await fetch(`${MEDIA_URL}get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": "",
                "tags": "",
                "type": ""
            })
        });
        list = await list.json();
        //console.log(list);
        
        return list;
    }
    else if (exact == 1) {
        let list = await fetch(`${MEDIA_URL}get/exact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        list = await list.json();
        return list;
    }
    else {
        let list = await fetch(`${MEDIA_URL}get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        list = await list.json();
        return list;
    }
}

async function getWatchedMediaList(body,exact){
    if (body == null){
        let list = await fetch(`${WATCHED_URL}get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": "",
                "tags": "",
                "type": "",
                "author": "",
                "artist": "",
                "releaseStatus": "",
                "readingStatus": "",
                "yearConsumed": "",
                "rating": "",
                "numberConsumed": ""
            })
        });
        list = await list.json();
        //console.log(list);
        
        return list;
    }
    else if (exact == 1) {
        let list = await fetch(`${WATCHED_URL}get/exact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        list = await list.json();
        return list;
    }
    else {
        let list = await fetch(`${WATCHED_URL}get`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        list = await list.json();
        return list;
    }
}

function active(){
    let title = getKeywords()[0];
    let factions = document.getElementsByClassName("navFaction");
    
    for(i = 0; i < factions.length; i++){
        if(title.search(factions[i].id) != -1){
            factions[i].className += " active";
        }
    }
     
}
function getKeywords(){
    const keywords = document.getElementsByTagName('meta')[0];
    return keywords.content.split(", ");
}
function getOrdinal(n) { //Dianne Pena
  let ord = n + 'th';

  if (n % 10 == 1 && n % 100 != 11)
  {
    ord = n + 'st';
  }
  else if (n % 10 == 2 && n % 100 != 12)
  {
    ord = n + 'nd';
  }
  else if (n % 10 == 3 && n % 100 != 13)
  {
    ord = n + 'rd';
  }

  return ord;
}

function specialSort(array, criteria, reverse){
    array.sort(function (a, b) {
            if (reverse == null){
                const a1st = -1;
                const b1st =  1;
                const equal = 0;

                if (b[criteria] < a[criteria]) {
                return b1st;
                }
                else if (a[criteria] < b[criteria]) {
                    return a1st;
                }
                else {
                    return equal;
                }
            }
            else if (reverse == "r") {
                const a1st =  1;
                const b1st = -1;
                const equal = 0;

                if (b[criteria] < a[criteria]) {
                    return b1st;
                }
                else if (a[criteria] < b[criteria]) {
                    return a1st;
                }
                else {
                    return equal;
            }
            }
        });

    return array
}

function modalFunction(modalButton, modalClose, modalBox) {
    // Get the modal
    var modal = document.getElementById(modalBox);

    // Get the button that opens the modal
    var btn = document.getElementById(modalButton);

    // Get the <span> element that closes the modal
    var span = document.getElementById(modalClose);

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}