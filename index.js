const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const User = require("./Models/User.js");
const fs = require("fs");
const Tutor = require("./Models/Tutor.js");
const Event = require("./Models/Event.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-Downloader");
const app = express();
const wifi = require("node-wifi");
const cron = require("node-cron");
const { error } = require("console");

const bycrptSalt = bcrypt.genSaltSync(10);
const jwtSecret =
  "fjsojfefofeferferfefeeferferferfjwqefo9724592747522-0523tp34tgfwrgwrgergerg";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
mongoose.connect(process.env.MONGO_URL);

//...........................................................................

app.get("/test", (req, res) => {
  res.json("test is worked");
});
//register
app.post("/register", async (req, res) => {
  const { name, address, mob, date, post, type, desc, email, pwd, photos } =
    req.body;

  try {
    if (req.body.type === "User") {
      const userDoc = await User.create({
        name,
        address,
        mob,
        date,
        post,
        type,
        desc,
        email,
        pwd: bcrypt.hashSync(pwd, bycrptSalt),
        photos,
      });
      res.json(userDoc);
    }
    if (req.body.type === "Tutor") {
      const tutorDoc = await Tutor.create({
        name,
        address,
        mob,
        date,
        post,
        type,
        desc,
        email,
        pwd: bcrypt.hashSync(pwd, bycrptSalt),
        photos,
      });
      res.json(tutorDoc);
    }
  } catch (error) {
    // Log any errors that occur
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ........................................................................//
app.post("/update", async (req, res) => {
  const { id, type, name, address, mob, date, post, desc, photos } = req.body;
  if (type == "Tutor") {
    try {
      const user = await Tutor.findByIdAndUpdate(
        id,
        {
          name,
          address,
          mob,
          date,
          post,
          desc,
          photos,
        },
        { new: true }
      ); // Set { new: true } to return the updated document

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (type == "User") {
    try {
      if (!name || !address || !mob || !date || !post || !desc || !photos) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const user = await User.findByIdAndUpdate(
        id,
        {
          name,
          address,
          mob,
          date,
          post,
          desc,
          photos,
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// ........................................................................//

app.post("/login", async (req, res) => {
  const { email, pwd, type } = req.body;
  if (type === "User") {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(pwd, userDoc.pwd);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id, type: userDoc.type },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              res.status(500).json({ error: "Internal server error" });
            } else {
              res.cookie("token", token).json(userDoc);
            }
          }
        );
      } else {
        res.status(422).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } else if (type === "Tutor") {
    const tutorDoc = await Tutor.findOne({ email });
    if (tutorDoc) {
      const passOk = bcrypt.compareSync(pwd, tutorDoc.pwd);
      if (passOk) {
        jwt.sign(
          { email: tutorDoc.email, id: tutorDoc._id, type: tutorDoc.type },
          jwtSecret,
          {},
          (err, token) => {
            if (err) {
              res.status(500).json({ error: "Internal server error" });
            } else {
              res.cookie("token", token).json(tutorDoc);
            }
          }
        );
      } else {
        res.status(422).json({ error: "Incorrect password" });
      }
    } else {
      res.status(404).json({ error: "Tutor not found" });
    }
  } else {
    res.status(400).json({ error: "Invalid user type" });
  }
});

//............................................................................
app.post("/eventCreate", async (req, res) => {
  const {
    name,
    category,
    max,
    date,
    time,
    address,
    post,
    desc,
    addedPhotos,
    coordinates,
    price,
  } = req.body;
  const token = req.cookies.token;
  const decodedToken = jwt.verify(token, jwtSecret);
  const Tutor_id = decodedToken.id;
  try {
    const eventDoc = await Event.create({
      name,
      category,
      max,
      date,
      time,
      address,
      post,
      desc,
      addedPhotos,
      coordinates,
      Tutor_id,
      price,
    });
    res.json(eventDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});
// ............................................................................
app.post("/upload-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = "photo" + Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: __dirname + "/uploads/" + newName,
    });

    res.json(newName);
  } catch (error) {
    // Handle errors here
    console.error("Error uploading photo:", error);
    res.status(500).json({ error: "Failed to upload photo" });
  }
});
// ............................................................................
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      if (userData.type === "User") {
        const { name, email, _id, mob, photos, type } = await User.findById(
          userData.id
        );
        res.json({ name, email, _id, mob, photos, type });
      }
      if (userData.type === "Tutor") {
        const { name, email, _id, mob, photos, type } = await Tutor.findById(
          userData.id
        );
        res.json({ name, email, _id, mob, photos, type });
      }
    });
  } else {
    res.json(null);
  }
});
//............................................................................

app.post("/registerEvent", async (req, res) => {
  const { id, user } = req.body;

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const alreadyRegistered = event.Registrations.some(
      (registration) => registration.id === user._id
    );
    if (alreadyRegistered) {
      return res.status(400).json({ message: "User already registered" });
    }
    event.Registrations.push({
      id: user._id,
      image: user.photos[0],
      name: user.name,
      mobile: user.mob,
    });
    await event.save();
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// ............................................................................
app.put("/updateEventList/:userId", async (req, res) => {
  const { userType, eventId, image, name, post } = req.body;
  const userId = req.params.userId;

  try {
    let user;
    if (userType === "User") {
      user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            eventlist: {
              eventId,
              image,
              name,
              post,
            },
          },
        },
        { new: true }
      );
    } else if (userType === "Tutor") {
      user = await Tutor.findByIdAndUpdate(
        userId,
        {
          $push: {
            eventlist: {
              eventId,
              image,
              name,
              post,
            },
          },
        },
        { new: true }
      );
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Event list updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ............................................................................

const photosMiddleware = multer({ dest: "uploads/" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});
//............................................................................
app.get("/countByType", async (req, res) => {
  const categories = req.query.categories.split(",");
  console.log(categories);
  try {
    const list = await Promise.all(
      categories.map((category) => {
        return Event.countDocuments({ category: category });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.data(err);
  }
});
//............................................................................
app.get("/getEvent/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const eventDoc = await Event.findById(id);
    if (!eventDoc) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(eventDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ...........................................................................

app.get("/getTutor/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const eventDoc = await Tutor.findById(id);
    if (!eventDoc) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(eventDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ...........................................................................
app.get("/getEventsBytype", async (req, res) => {
  try {
    const type = req.query.categories; // Assuming type is sent as a query parameter

    if (!type) {
      // Handle missing type parameter (e.g., return 400 Bad Request)
      return res
        .status(400)
        .send({ message: 'Missing required parameter "type"' });
    }

    const EventsList = await Event.find({ category: type });

    if (EventsList) {
      res.status(200).json(EventsList);
    } else {
      res
        .status(200) // Consider using 204 No Content here
        .send({ message: "No events found for the specified category" });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ message: "Internal server error" }); // Generic error message for the client
  }
});

//............................................................................
app.get("/recent-events", async (req, res) => {
  try {
    const recentEvents = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: -1 }) // Sort in descending order
      .limit(10); // Limit the number of events returned

    res.json(recentEvents);
  } catch (error) {
    console.error("Error finding recent events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//............................................................................
//Event list fetching
app.get("/eventsOfUser/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userType = req.query.type;
  if (userType == "Tutor") {
    try {
      const user = await Tutor.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const eventList = user.eventlist || [];

      res.json(eventList);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (userType == "User") {
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const eventList = user.eventlist || [];

      res.json(eventList);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
//..................................
app.get("/add", async (req, res) => {
  const {
    query: { fn, val },
  } = req;

  if (!fn || !val) {
    return res
      .status(400)
      .json({ error: "Both 'fn' and 'val' query parameters are required" });
  }

  try {
    const data = await Event.findOne({ [fn]: { $regex: val, $options: "i" } });
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "No matching doument found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//............................................................................

//............................................................................

//............................................................................

//............................................................................

//............................................................................

app.listen(4000);
//............................................................................
