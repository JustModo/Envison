const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("envision.db");
const { getCurrentTimestamp } = require("./utilHandler");
const bcrypt = require("bcrypt");

//----------------------------------------------------------------------- Dev Functions

db.run(`
  CREATE TABLE IF NOT EXISTS Users (
    UserID INTEGER PRIMARY KEY,
    UserName TEXT,
    Password TEXT
  )
`);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Posts (
    PostID INTEGER PRIMARY KEY,
    UserName TEXT,
    CreatedAt TEXT,
    FOREIGN KEY (UserName) REFERENCES Users(UserName)
  )
`;
db.run(createTableQuery, function (err) {
  if (err) {
    console.error("Error creating Posts table:", err.message);
  } else {
    console.log("Posts table created successfully");
  }
});

// const dropTableQuery = "DROP TABLE IF EXISTS Post_Tim";
// db.run(dropTableQuery, function (err) {
//   if (err) {
//     console.error("Error deleting Posts table:", err.message);
//   } else {
//     console.log("Posts table deleted successfully");
//   }
// });

// const tableName = "Posts";
// db.run(`DELETE FROM ${tableName}`, function (err) {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(`All rows deleted from ${tableName}`);
//   }
// });

async function createTableForUser(username) {
  const tableName = `Post_${username}`;
  db.run(
    `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      PostID INTEGER PRIMARY KEY,
      PostName TEXT,
      PostData TEXT,
      PostImage TEXT,
      PostComments TEXT,
      PostLikes TEXT,
      FOREIGN KEY (PostID) REFERENCES Posts(PostID)
    )
  `,
    (err) => {
      if (err) {
        console.error(
          `Error creating table for user ${username}:`,
          err.message
        );
      } else {
        console.log(`Table created for user ${username}`);
      }
    }
  );
}

function generateRandomID(callback) {
  let ran = Math.floor(Math.random() * 9000) + 1000;
  if (callback(ran)) {
    generateRandomID();
  } else return ran;
}

function isCustomerIDUnique(UserID) {
  db.get("SELECT UserID FROM Users WHERE UserID = ?", [UserID], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    return !row;
  });
}

function isPostIDUnique(PostID) {
  db.get("SELECT PostID FROM Posts WHERE PostID = ?", [PostID], (err, row) => {
    if (err) {
      console.error(err);
      return;
    }
    return !row;
  });
}

function isUsernameUnique(username, callback) {
  db.get(
    "SELECT UserName FROM Users WHERE UserName = ?",
    [username],
    (err, row) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, !row);
    }
  );
}

//-----------------------------------------------------------------------

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function addCustomer(username, password, callback) {
  isUsernameUnique(username, async (err, isUnique) => {
    if (err) {
      console.error(err);
      return callback(err);
    }
    if (!isUnique) {
      const error = `Username ${username} is Already in Use`;
      console.error(error);
      return callback(error);
    }

    const hashpass = await hashPassword(password);

    let randomCustomerID = generateRandomID(isCustomerIDUnique);

    db.run(
      `
      INSERT INTO Users (UserID, UserName, Password)
      VALUES (?, ?, ?)
    `,
      [randomCustomerID, username, hashpass],
      async function (err) {
        if (err) {
          console.error("Error adding customer:", err.message);
          return callback(err);
        } else {
          console.log(`${username} Registered!`);
          await createTableForUser(username);

          return callback(null); // No error, callback with null
        }
      }
    );
  });
}

async function authenticateUser(username, password, callback) {
  db.get(
    "SELECT UserName, Password FROM Users WHERE UserName = ?",
    [username],
    async (err, row) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }

      if (!row) {
        return callback(null, "Username not found");
      }

      const isPasswordCorrect = await bcrypt.compare(password, row.Password);

      if (isPasswordCorrect) {
        return callback(null, "Authentication successful");
      } else {
        return callback(null, "Incorrect password");
      }
    }
  );
}

// const testdata = {
//   "name":"hi",
//   "content":"test email",
//   "image":"uri",
//   "username": "username"
// }

async function addPost(postdata, callback) {
  try {
    const postname = postdata.postname;
    const content = postdata.content;
    const image = postdata.image;
    const username = postdata.username;
    const comments = JSON.stringify([]);
    const likes = JSON.stringify([]);
    if (!postname || !content || !image) {
      throw new Error(
        "Missing required parameters. Please provide postname, content, and image."
      );
    }
    const randomPostID = generateRandomID(isPostIDUnique);

    await createTableForUser(username);
    db.run(
      `
      INSERT INTO Post_${username} (PostID, PostName, PostData, PostImage, PostComments, PostLikes)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [randomPostID, postname, content, image, comments, likes],
      function (err) {
        if (err) {
          console.error("Error adding post:", err.message);
          return callback(err);
        } else {
          console.log("Post added successfully");
          return callback(null);
        }
      }
    );
    addToPostTable(randomPostID, username);
  } catch (err) {
    return callback(err);
  }
}

function deleteRowById(id) {
  const sql = `DELETE FROM Posts WHERE PostID = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return console.error(err.message);
    }

    if (this.changes > 0) {
      console.log(`Row ${id} in table Posts deleted successfully`);
    } else {
      console.log(`Row with ID ${id} in table Posts does not exist`);
    }
  });
}

function addToPostTable(postid, username) {
  const timestamp = getCurrentTimestamp();
  db.run(
    `
      INSERT INTO Posts (PostID, UserName, CreatedAt)
      VALUES (?, ?, ?)
      `,
    [postid, username, timestamp],
    function (err) {
      if (err) {
        console.error("Error adding post:", err.message);
        return;
      } else {
        console.log("Post added successfully");
        return;
      }
    }
  );
}

function getPost(postid, requsername) {
  console.log(`Starting from `, postid);

  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT CreatedAt 
      FROM Posts 
      WHERE PostID = ?
      `,
      [postid],
      (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
          return;
        }

        if (!row || row.length === 0) {
          db.all(
            `SELECT * FROM Posts ORDER BY CreatedAt DESC LIMIT 10`,
            [],
            (err, rows) => {
              if (err) {
                console.error(err.message);
                reject(err);
              } else {
                console.log("ID not Mentioned Sending Latest");
                const selectedRows = rows;
                const promiseArray = selectedRows.map((row) =>
                  postQuery(row.UserName, row.PostID, requsername)
                );

                Promise.all(promiseArray)
                  .then((sortedUsers) => {
                    const nonNullUsers = sortedUsers.filter(
                      (user) => user !== null
                    );
                    resolve(nonNullUsers);
                  })
                  .catch((err) => {
                    console.error(err);
                    reject(err);
                  });
              }
            }
          );
        } else {
          db.all(
            `SELECT * FROM Posts WHERE CreatedAt < ? ORDER BY CreatedAt DESC LIMIT 10`,
            [row[0].CreatedAt],
            (err, rows) => {
              if (err) {
                console.error(err.message);
                reject(err);
              } else {
                console.log(`Sent Posts After ${postid}`);
                const selectedRows = rows;
                const promiseArray = selectedRows.map((row) =>
                  postQuery(row.UserName, row.PostID, requsername)
                );

                Promise.all(promiseArray)
                  .then((sortedUsers) => {
                    const nonNullUsers = sortedUsers.filter(
                      (user) => user !== null
                    );
                    resolve(nonNullUsers);
                  })
                  .catch((err) => {
                    console.error(err);
                    reject(err);
                  });
              }
            }
          );
        }
      }
    );
  });
}

function postQuery(authorUsername, postid, reqUsername) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM Post_${authorUsername} WHERE PostId = ?`,
      [postid],
      (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (!row) {
          console.error({
            message: `Post not found, ID = ${postid}`,
            statusCode: 404,
          });
          deleteRowById(postid);
          // reject({ message: "Post not found", statusCode: 404 });
          resolve(null);
          return;
        }

        let isLiked = false;
        // console.log(row.PostLikes);
        // console.log(authorUsername);
        // console.log(JSON.parse(row.PostLikes));
        // console.log(JSON.parse(row.PostLikes).includes(authorUsername));
        if (JSON.parse(row.PostLikes).includes(reqUsername)) {
          isLiked = true;
        }

        const data = {
          UserName: authorUsername,
          PostID: row.PostID,
          PostName: row.PostName,
          PostData: row.PostData,
          PostImage: row.PostImage,
          PostComments: JSON.parse(row.PostComments),
          PostLikes: {
            Likes: JSON.parse(row.PostLikes).length,
            IsLiked: isLiked,
          },
        };
        resolve(data);
      }
    );
  });
}

async function addComment(postid, username, comment) {
  try {
    const sender = await getUserWithPostID(postid);

    return new Promise((resolve, reject) => {
      db.get(
        `SELECT PostComments FROM Post_${sender} WHERE PostId = ?`,
        [postid],
        (err, row) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          if (!row) {
            console.error({ message: "Post not found", statusCode: 404 });
            reject({ message: "Post not found", statusCode: 404 });
            return;
          }

          const commentArray = JSON.parse(row.PostComments);

          commentArray.push({ username, comment });

          const updatedComments = JSON.stringify(commentArray);

          db.run(
            `UPDATE Post_${sender} SET PostComments = ? WHERE PostId = ?`,
            [updatedComments, postid],
            (updateErr) => {
              if (updateErr) {
                console.error(updateErr);
                reject(updateErr);
                return;
              }

              console.log("Added");
              resolve("Comment Added!");
            }
          );
        }
      );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getComment(postid) {
  try {
    const sender = await getUserWithPostID(postid);
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT PostComments FROM Post_${sender} WHERE PostId = ?`,
        [postid],
        (err, row) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          if (!row) {
            console.error({ message: "Post not found", statusCode: 404 });
            reject({ message: "Post not found", statusCode: 404 });
            return;
          }

          const commentArray = JSON.parse(row.PostComments);
          // console.log(commentArray);
          resolve(commentArray);
        }
      );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function toggleLike(postid, username) {
  try {
    const sender = await getUserWithPostID(postid);

    return new Promise((resolve, reject) => {
      db.get(
        `SELECT PostLikes FROM Post_${sender} WHERE PostId = ?`,
        [postid],
        (err, row) => {
          if (err) {
            console.error(err);
            reject(err);
            return;
          }

          if (!row) {
            console.error({ message: "Post not found", statusCode: 404 });
            reject({ message: "Post not found", statusCode: 404 });
            return;
          }

          const likesArray = JSON.parse(row.PostLikes);
          let updatedLikes;
          console.log(likesArray);

          if (likesArray.includes(username)) {
            updatedLikes = likesArray.filter((name) => name !== username);
            updatedLikes = JSON.stringify(updatedLikes);
          } else {
            likesArray.push(username);
            updatedLikes = JSON.stringify(likesArray);
          }
          console.log(updatedLikes);

          db.run(
            `UPDATE Post_${sender} SET PostLikes = ? WHERE PostId = ?`,
            [updatedLikes, postid],
            (updateErr) => {
              if (updateErr) {
                console.error(updateErr);
                reject(updateErr);
                return;
              }

              console.log("Added");
              resolve("Like Added!");
            }
          );
        }
      );
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function getUserWithPostID(postid) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT UserName FROM Posts WHERE PostId = ?`,
      [postid],
      (err, row) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        if (!row) {
          console.error({ message: "Post not found", statusCode: 404 });
          reject({ message: "Post not found", statusCode: 404 });
          return;
        }
        const user = row.UserName;

        resolve(user);
      }
    );
  });
}

//---------------------------------------------------------------------- Dev Functions

function getPasswordByUsername(username, callback) {
  db.get(
    "SELECT UserName,Password FROM Users WHERE UserName = ?",
    [username],
    (err, row) => {
      if (err) {
        console.error(err);
        return callback(err, null);
      }

      if (!row) {
        return callback({ message: "User not found", statusCode: 404 }, null);
      }

      const userPassword = row.Password;
      callback(null, userPassword);
    }
  );
}

function getAllUsers(callback) {
  db.all("SELECT * FROM Posts ORDER BY CreatedAt DESC", (err, rows) => {
    if (err) {
      console.error("Error retrieving users:", err.message);
      callback(err, null);
      return;
    }

    callback(null, rows);
  });
}

module.exports = {
  addCustomer,
  getAllUsers,
  authenticateUser,
  getPasswordByUsername,
  addPost,
  getPost,
  addComment,
  toggleLike,
  getComment,
};

// function getAllUsers(callback) {
//   db.all("SELECT CreatedAt FROM Posts WHERE PostID = '9480'", (err, row) => {
//     if (err) {
//       console.error("Error retrieving users:", err.message);
//       callback(err, null);
//       return;
//     } else {
//       console.log(row[0].CreatedAt, "hi");
//       db.all(
//         `SELECT * FROM Posts WHERE CreatedAt < ? ORDER BY CreatedAt DESC LIMIT 10`,
//         [row[0].CreatedAt],
//         (err, rows) => {
//           if (err) {
//             console.error(err.message);
//           } else {
//             callback(null, rows);
//             console.log(rows);
//           }
//         }
//       );
//     }

//     // callback(null, rows);
//   });
// }
