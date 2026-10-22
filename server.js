/////////////////////////////////////////////////////////////////////////////
////                               Init                                  ////
/////////////////////////////////////////////////////////////////////////////

const sqlite = require("sqlite3").verbose();
//let db = Azenor_database("./data/Azenor.db");
//let eloDB = Elo_database("./data/elo.db");

let db = media_database("./data/media.db");

const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.static("public"));

/////////////////////////////////////////////////////////////////////////////
////                                Elo                                  ////
/////////////////////////////////////////////////////////////////////////////

app.post("/toWatch/get", function (req, res) {
    const body = cleanUp(req.body);
    let nameSearch = req.body.name.trim().replaceAll("'", "_");
    let tagsList = body.tags;
    let typeSearch = body.type;

    
    
      db.all(`SELECT * FROM watchList 
        WHERE name LIKE '%${nameSearch}%' 
        AND tags LIKE '%${tagsList}%'
        AND type LIKE '%${typeSearch}%'`,
        [],
        function (err, rows) {
            if (err) return res.status(500).json({error: err.message});
            return res.status(200).json(rows);
        }
      );
      console.log(`${timeStamp()}>>>> Requested all watchList with 
          >> name containing ${nameSearch}
          >> tags containing ${tagsList.replaceAll("%", ",")}
          >> type containing ${typeSearch}\n`);
    
    
});
app.post("/toWatch/get/exact", function (req, res) {
    let nameSearch = req.body.name.trim().replaceAll("'", "_");

    
      db.all(`SELECT * FROM watchList WHERE name ="${nameSearch}"`,
        [],
        function (err, rows) {
            if (err) return res.status(500).json({error: err.message});
            return res.status(200).json(rows);
        }
      );
      console.log(`${timeStamp()}>>>> Requested exact watchList\n`);
    
    
    
});

app.post("/toWatch/",function (req, res) {
  const body = cleanUp(req.body);
  let tagsList = body.tags.replaceAll("%", ", ");
  let typeList = body.type.replaceAll("%", ", ");

  db.run(
    `INSERT INTO watchList (name, tags, type) 
    VALUES ("${body.name}", "${tagsList}", "${typeList}")`,
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get(`SELECT * FROM watchList WHERE id=?`, [this.lastID], function (err2, row) {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.status(201).json(row);
      });
      console.log(`${timeStamp()}>>>> Posted watchList item
          >> Name: ${body.name}
          >> Tags: ${tagsList}
          >> Type: ${typeList}
      `);
    }
  );
  
});
app.put("/toWatch/",function (req, res) {
  const body = cleanUp(req.body);
  let tagsList = body.tags.replaceAll("%", ", ");
  let typeList = body.type.replaceAll("%", ", ");

  let missing = requireFields(body, ["name"]);
    if (missing.length > 0) {
      return res.status(400).json({ error: "Missing required field(s)", missing });
    }

  db.run(
    `UPDATE watchList SET
      name = "${body.name}",
      tags = "${tagsList}",
      type = "${typeList}"
    WHERE id = "${body.id}"
    `,
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get(`SELECT * FROM watchList WHERE id = ${body.id}`, function (err2, row) {
          if (err2) return res.status(500).json({ error: err2.message });
          return res.status(201).json(row);
      });
      console.log(`${timeStamp()}>>>> Updated watchList item with id: ${body.id}
          >> Name: ${body.name}
          >> Tags: ${tagsList}
          >> Type: ${body.type}
      `);
    }
  );
});
app.delete("/toWatch/", function (req, res) {
  const id = Number(req.body.id);

  if (!Number.isInteger(id)) {
    console.log(`${timeStamp()}>>>> id must be an integer`);
    return res.status(400).json({ error: `${timeStamp()}>>>> id must be an integer` });
  }

  db.run(`DELETE FROM watchList WHERE id=${id}`, function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      console.log(`${timeStamp()}>>>> Item already absent (nothing to delete)`);
      return res.status(200).json({ message: `${timeStamp()}>>>> Item already absent (nothing to delete)`, deleted: 0 });
    }
    console.log(`${timeStamp()}>>>> Item deleted`);
    return res.status(200).json({ message: `${timeStamp()}>>>> Item deleted`, deleted: 1 });
  });
});


app.post("/watched/get", function (req, res) {
    let body = cleanUp(req.body);
    let nameSearch = body.name.trim().replaceAll('"', "_");
    let tagsSearch = body.tags
    let typeSearch = body.type
    let authorSearch = body.author
    let artistSearch = body.artist
    let releaseSearch = body.releaseStatus;
    let statusSearch = body.readingStatus;
    let yearSearch = body.yearConsumed;
    let ratingSearch = body.rating;
    let timesSearch = body.numberConsumed;
    let tagsList;
    if (tagsSearch != null) {
      tagsList = tagTrim(tagsSearch);
    }

    

    
    db.all(`SELECT * FROM watchedList 
      WHERE name LIKE "%${nameSearch}%"
      AND tags LIKE '%${tagsList}%'
      AND type LIKE '%${typeSearch}%'
      AND author LIKE '%${authorSearch}%'
      AND artist LIKE '%${artistSearch}%'
      AND releaseStatus LIKE '%${releaseSearch}%'
      AND readingStatus LIKE '%${statusSearch}%'
      AND yearConsumed LIKE '%${yearSearch}%'
      AND rating LIKE '%${ratingSearch}%'
      AND numberConsumed LIKE '%${timesSearch}%'
      `,
      [],
      function (err, rows) {
          if (err) return res.status(500).json({error: err.message});
          return res.status(200).json(rows);
      }
    );
    console.log(`${timeStamp()}>>>> Requested all watchedList with 
        >> name containing ${nameSearch}
        >> author containing ${authorSearch}
        >> artist containing ${artistSearch}
        >> releaseStatus containing ${releaseSearch}
        >> readingStatus containing ${statusSearch}
        >> yearConsumed containing ${yearSearch}
        >> rating containing ${ratingSearch}
        >> numberConsumed containing ${timesSearch}
        >> tags containing ${tagsList.replaceAll("%", ",")}
        >> type containing ${typeSearch}
        \n`);

});
app.post("/watched/get/exact", function (req, res) {
    let nameSearch = req.body.name.trim().replaceAll("'", "_");

    
      db.all(`SELECT * FROM watchedList WHERE name ="${nameSearch}"`,
        [],
        function (err, rows) {
            if (err) return res.status(500).json({error: err.message});
            return res.status(200).json(rows);
        }
      );
      console.log(`${timeStamp()}>>>> Requested exact watchedList\n`);
    
    
    
});

app.post("/watched/",function (req, res) {
  const body = cleanUp(req.body);
  let tagsList = body.tags.replaceAll("%", ", ");
  let typeList = body.type.replaceAll("%", ", ");
  let authorList = body.author.replaceAll("%", ", ");
  let artistList = body.artist.replaceAll("%", ", ");
  

  db.run(
    `INSERT INTO watchedList (name, tags, type, author, artist, releaseStatus, readingStatus, yearConsumed, rating, numberConsumed) 
    VALUES ("${body.name}", "${tagsList}", "${typeList}", "${authorList}", "${artistList}", "${body.releaseStatus}", "${body.readingStatus}", "${body.yearConsumed}", "${body.rating}", "${body.numberConsumed}")`,
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      
      db.get(`SELECT * FROM watchedList WHERE id=?`, [this.lastID], function (err2, row) {
        if (err2) return res.status(500).json({ error: err2.message });
        return res.status(201).json(row);
      });
      console.log(`${timeStamp()}>>>> Posted watchedList item
          >> Name: ${body.name}
          >> Tags: ${tagsList}
          >> Type: ${body.type}
      `);
    }
  );
  
});
app.put("/watched/",function (req, res) {
  const body = cleanUp(req.body);
  let tagsList = body.tags.replaceAll("%", ", ");
  let typeList = body.type.replaceAll("%", ", ");
  let authorList = body.author.replaceAll("%", ", ");
  let artistList = body.artist.replaceAll("%", ", ");


  let missing = requireFields(body, ["name"]);
    if (missing.length > 0) {
      return res.status(400).json({ error: "Missing required field(s)", missing });
    }

  db.run(
    `UPDATE watchedList SET
      name = "${body.name}",
      tags = "${tagsList}",
      type = "${typeList}",
      author = "${authorList}",
      artist = "${artistList}",
      releaseStatus =  "${body.releaseStatus}",
      readingStatus = "${body.readingStatus}",
      yearConsumed = "${body.yearConsumed}",
      rating = "${body.rating}",
      numberConsumed = "${body.numberConsumed}"
    WHERE id = "${body.id}"
    `,
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get(`SELECT * FROM watchedList WHERE id = ${body.id}`, function (err2, row) {
          if (err2) return res.status(500).json({ error: err2.message });
          return res.status(201).json(row);
      });
      console.log(`${timeStamp()}>>>> Updated watchedList item with id: ${body.id}
          >> Name: ${body.name}
          >> Tags: ${tagsList}
          >> Type: ${body.type}
      `);
    }
  );
});
app.delete("/watched/", function (req, res) {
  const id = Number(req.body.id);

  if (!Number.isInteger(id)) {
    console.log(`${timeStamp()}>>>> id must be an integer`);
    return res.status(400).json({ error: `${timeStamp()}>>>> id must be an integer` });
  }

  db.run(`DELETE FROM watchedList WHERE id=${id}`, function (err) {
    if (err) return res.status(500).json({ error: err.message });

    if (this.changes === 0) {
      console.log(`${timeStamp()}>>>> Item already absent (nothing to delete)`);
      return res.status(200).json({ message: `${timeStamp()}>>>> Item already absent (nothing to delete)`, deleted: 0 });
    }
    console.log(`${timeStamp()}>>>> Item deleted`);
    return res.status(200).json({ message: `${timeStamp()}>>>> Item deleted`, deleted: 1 });
  });
});



/////////////////////////////////////////////////////////////////////////////
////                             Functions                               ////
/////////////////////////////////////////////////////////////////////////////

function tagTrim(tagsSearch){
  let tagsList = tagsSearch.split(",");
  let tagsListTrimmed = [];
  for (i = 0; i < tagsList.length; i++) {
    tagsListTrimmed.push(tagsList.at(i).trim());
  }
  tagsListTrimmed = bubbleSort(tagsListTrimmed);
  tagsList = tagsListTrimmed.join("%");
  console.log(tagsList);
  return tagsList;
}

function requireFields(obj, fields) {
  if (!obj || typeof obj !== "object") {
    return fields;
  }

  const missing = [];

  for (const f of fields) {
    if (obj[f] === undefined || obj[f] === null || obj[f] === "") {
      missing.push(f);
    }
  }

  return missing;
}

function timeStamp(){
  const now = new Date();
  const currentTime = `[${now.toLocaleTimeString({ hour: "2-digit", minute: "2-digit", second: "2-digit"})}]`;
  return currentTime
}

function bubbleSort(wordsArray) {
    
    // Getting size of array
    const length = wordsArray.length;
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            if (
                wordsArray[j]
                    .localeCompare(wordsArray[j + 1], undefined, {
                    sensitivity: "base",
                }) > 0
            ) {
                // Swaping word in the array
                const temp = wordsArray[j];
                wordsArray[j] = wordsArray[j + 1];
                wordsArray[j + 1] = temp;
            }
        }
    }
    return wordsArray;
}

function cleanUp(body) {
  if (body.tags == null) {body.tags = ""}
  else {body.tags = tagTrim(body.tags)}
  if (body.type == null) {body.type = ""}
  else {body.type = tagTrim(body.type)}
  if (body.author == null) {body.author = ""}
  else {body.author = tagTrim(body.author)}
  if (body.artist == null) {body.artist = ""}
  else {body.artist = tagTrim(body.artist)}
  if (body.releaseStatus == null) {body.releaseStatus = ""}
  if (body.readingStatus == null) {body.readingStatus = ""}
  if (body.yearConsumed == null) {body.yearConsumed = ""}
  if (body.rating == null) {body.rating = ""}
  if (body.numberConsumed == null) {body.numberConsumed = ""}

  return body
}

/////////////////////////////////////////////////////////////////////////////
////                               Start                                 ////
/////////////////////////////////////////////////////////////////////////////

app.listen(3000, () => {
  console.log(`\n${timeStamp()} Server running:`);
  console.log("  Site: http://localhost:3000/\n");
});

/////////////////////////////////////////////////////////////////////////////
////                               Setup                                 ////
/////////////////////////////////////////////////////////////////////////////

function media_database(filename) {
  const db = new sqlite.Database(filename, (err) => {
    if (err) console.error(err.message);
    console.log(`${timeStamp()} Connected to the media database.`);
  });

  console.log(`${timeStamp()} Initializing media database.`);

  db.serialize(() => {

    //watch list
    db.run(`
        CREATE TABLE IF NOT EXISTS watchList
        (
            id INTEGER PRIMARY KEY,
            name STRING NOT NULL,
            type STRING,
            tags STRING
        )
    `);
    //watched list
    db.run(`
        CREATE TABLE IF NOT EXISTS watchedList
        (
            id INTEGER PRIMARY KEY,
            name STRING NOT NULL,
            author STRING,
            artist STRING,
            releaseStatus STRING,
            readingStatus STRING,
            yearConsumed INTEGER,
            rating INTEGER,
            numberConsumed INTEGER,
            type STRING,
            tags STRING
        )
    `);
    
    db.all(`select count(*) as count from watchList`, function (err, result) {
      if (err) {
        console.error("Watchlist count query failed:", err.message);
        return;
      }
      console.log(
        "[K-Media] Watchlist database contains",
        result[0].count,
        "item(s) at startup."
      );
    });

    db.all(`select count(*) as count from watchedList`, function (err, result) {
      if (err) {
        console.error("Watchedlist count query failed:", err.message);
        return;
      }
      console.log(
        "[K-Media] Watchedlist database contains",
        result[0].count,
        "item(s) at startup."
      );
    });
    
    
  });

  console.log(`${timeStamp()} Finished initializing media database.`);

  return db;
}