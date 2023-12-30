const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  addCustomer,
  getAllUsers,
  authenticateUser,
  getPasswordByUsername,
  addPost,
  getPost,
  addComment,
  toggleLike,
  getComment,
} = require("./dbHandler");
const { authenticateToken, generateToken } = require("./sessionHandler");
const { upload, getImage } = require("./utilHandler");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  addCustomer(username, password, (error) => {
    if (error) {
      return res.status(400).send(error);
    }

    res.status(201).send(`${username} has been Registered!`);
  });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  await authenticateUser(username, password, (err, errorMessage) => {
    if (err) {
      console.error("Authentication error:", err);
      return res.status(500).send("Internal Server Error");
    }

    if (errorMessage === "Authentication successful") {
      const token = generateToken(username);
      res.status(200).json({
        username,
        token,
      });
    } else {
      res.status(401).send(errorMessage);
    }
  });
});

//------------------------------------------------

app.post(
  "/upload-image",
  authenticateToken,
  upload.single("image"),
  (req, res) => {
    if (req.file.path) {
      const imagePath = req.file.path;
      res.json({ imagePath });
    }
  }
);

app.post("/post", authenticateToken, (req, res) => {
  const { postname, content, image } = req.body;
  const username = req.username;
  if (!username || !postname || !content || !image) {
    const missingParams = [];
    if (!username) missingParams.push("username");
    if (!postname) missingParams.push("postname");
    if (!content) missingParams.push("content");
    if (!image) missingParams.push("image");

    const errorMessage = `Missing required parameters: ${missingParams.join(
      ", "
    )}`;
    return res.status(400).send(errorMessage);
  }
  const data = {
    username: username,
    postname: postname,
    content: content,
    image: image,
  };

  addPost(data, (err) => {
    if (err) {
      console.error(err);
      if (err.statusCode) {
        return res.status(err.statusCode).send(err.message);
      } else {
        return res.status(500).send("Internal Server Error");
      }
    }
    res.status(200).send("Posted Sucessfully!");
  });
});

app.post("/getpost", authenticateToken, async (req, res) => {
  const { postid } = req.body;
  const id = postid;
  const requsername = req.username;
  try {
    const data = await getPost(id, requsername);
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.use(express.static("uploads"));

app.get("/fetchimage", async (req, res) => {
  const imagePath = req.query.path;
  // console.log(imagePath);

  if (!imagePath) {
    return res.status(400).send("Image path not provided");
  }
  try {
    const data = getImage(imagePath);
    res.setHeader("Content-Type", "image/png");
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addcomment", authenticateToken, async (req, res) => {
  const postid = req.body.postid;
  const username = req.username;
  const comment = req.body.comment;
  if (!postid || !username || !comment) {
    const missingParams = [];
    if (!postid) missingParams.push("postid");
    if (!username) missingParams.push("username");
    if (!comment) missingParams.push("comment");

    const errorMessage = `Missing required parameters: ${missingParams.join(
      ", "
    )}`;
    return res.status(400).send(errorMessage);
  }

  try {
    const response = await addComment(postid, username, comment);
    res.status(200).send(response);
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/getcomment", authenticateToken, async (req, res) => {
  const postid = req.body.postid;
  if (!postid) {
    const missingParams = [];
    if (!postid) missingParams.push("postid");

    const errorMessage = `Missing required parameters: ${missingParams.join(
      ", "
    )}`;
    return res.status(400).send(errorMessage);
  }

  try {
    const response = await getComment(postid);
    console.log(`Comment for ${postid} Queried!`);
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.post("/togglelike", authenticateToken, async (req, res) => {
  const postid = req.body.postid;
  const username = req.username;
  if (!postid || !username) {
    const missingParams = [];
    if (!postid) missingParams.push("postid");
    if (!username) missingParams.push("username");

    const errorMessage = `Missing required parameters: ${missingParams.join(
      ", "
    )}`;
    return res.status(400).send(errorMessage);
  }

  try {
    const response = await toggleLike(postid, username);
    res.status(200).send(response);
  } catch (err) {
    console.error(err);
    if (err.statusCode) {
      res.status(err.statusCode).send(err.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
});

app.get("/ping", async (req, res) => {
  try {
    res.status(200).send("Connected to Envision Server!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//----------------------------------------------------------------------- Dev Routes

app.post("/getdata", (req, res) => {
  getAllUsers((err, users) => {
    if (err) {
      console.error("Error fetching users:", err.message);
      return;
    }

    console.log("All Users:");
    console.table(users);
  });
  res.send("Data Displayed");
});

// app.post("/getPassword", authenticateToken, (req, res) => {
//   const username = req.username;

//   getPasswordByUsername(username, (err, userPassword) => {
//     if (err) {
//       console.error(err);
//       if (err.statusCode) {
//         return res.status(err.statusCode).send(err.message);
//       } else {
//         return res.status(500).send("Internal Server Error");
//       }
//     }
//     res.status(200).json({ password: userPassword });
//   });
// });

//------------------------------------

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
