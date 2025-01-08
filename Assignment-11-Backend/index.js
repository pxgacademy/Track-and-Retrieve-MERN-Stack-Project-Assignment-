const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment-11-abd.web.app",
      "https://assignment-11-abd.firebaseapp.com",
    ],
    credentials: true,
  })
);

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  const errMessage = { message: "Unauthorized access" };

  if (!token) return res.status(401).send(errMessage);

  const secret = process.env.ACCESS_TOKEN_SECRET;
  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).send(errMessage);
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rm6ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const uri = `mongodb://localhost:27017`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // const cookieOptions = {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // };

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    };

    // creating JWT token
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const expiresIn = { expiresIn: "10h" };

      const token = jwt.sign(user, secret, expiresIn);
      res.cookie("token", token, cookieOptions).send({ success: true });
    });

    // Deleting JWT token
    app.delete("/logout", (req, res) => {
      res.clearCookie("token", cookieOptions).send({ success: true });
    });

    // ============================================================================

    // Collections
    const dataBase = client.db("TrackRetrieve");
    const serviceCollection = dataBase.collection("lostOrFounds");
    const recoveredCollection = dataBase.collection("recoveredDetails");

    // items count
    app.get("/items-count", async (req, res) => {
      const count = await serviceCollection.estimatedDocumentCount();
      res.send({ count });
    });

    // get 8 items for homepage
    app.get("/lost-founds-limited/8", async (req, res) => {
      const items = await serviceCollection
        .find({ status: "Pending" })
        .sort({ date: -1 })
        .limit(8)
        .toArray();
      res.send(items);
    });

    // get all items
    app.get("/lost-founds", async (req, res) => {
      const { postType, query } = req.query;

      let filter = {};

      if (query && query.trim() !== "") {
        filter.$or = [
          { title: { $regex: query, $options: "i" } },
          { location: { $regex: query, $options: "i" } },
        ];
      }

      if (postType && postType !== "all") {
        filter.postType = postType;
      }

      let skip = req.query.skip;
      let limit = req.query.limit;

      if ((query && query.trim() !== "") || (postType && postType !== "all")) {
        skip = 0;
        limit = await serviceCollection.estimatedDocumentCount();
      }

      const items = await serviceCollection
        .find(filter)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .toArray();
      res.send(items);
    });

    // get a single item
    app.get("/single-item/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const item = await serviceCollection.findOne(query);
      res.send(item);
    });

    //get my items
    app.get("/my-items", verifyToken, async (req, res) => {
      const { email } = req.query;
      const userEmail = req.user.email;
      if (userEmail !== email)
        return res.status(403).send({ message: "Forbidden access" });

      const items = await serviceCollection.find({ email }).toArray();

      res.send(items);
    });

    // add single service (Lost / Found)
    app.post("/lost-found", verifyToken, async (req, res) => {
      const item = req.body;
      const result = await serviceCollection.insertOne(item);
      res.send(result);
    });

    // update a single service
    app.put("/lost-found/:id", verifyToken, async (req, res) => {
      const { email } = req.body;
      const userEmail = req.user.email;
      if (userEmail !== email)
        return res.status(403).send({ message: "Forbidden access" });

      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const item = req.body;
      const result = await serviceCollection.updateOne(query, { $set: item });
      res.send(result);
    });

    // delete a single service
    app.delete("/lost-found/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    });

    // get all recovered items of logged-in user
    app.get("/recovered-items", verifyToken, async (req, res) => {
      const { email } = req.query;
      const userEmail = req.user.email;
      if (userEmail !== email)
        return res.status(403).send({ message: "Forbidden access" });

      const items = await recoveredCollection.find({ email }).toArray();

      for (const item of items) {
        const query = { _id: new ObjectId(item.postId) };
        const lostFoundItem = await serviceCollection.findOne(query);
        if (lostFoundItem) {
          item.postItems = lostFoundItem;
        }
      }

      res.send(items);
    });

    // add recovered details
    app.post("/recovered-details", async (req, res) => {
      const item = req.body;
      const { status, ...newItem } = item;
      const result = await recoveredCollection.insertOne(newItem);

      // update lost or found status
      const query = { _id: new ObjectId(item.postId) };
      await serviceCollection.updateOne(query, { $set: { status } });

      res.send(result);
    });

    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // await client.close();
  }
}
run();

app.get("/", (req, res) => {
  res.status(200).send("Assignment 11 sever is running");
});

app.listen(port);
