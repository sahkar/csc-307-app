import express from "express"
import cors from "cors";
import userService from "./services/user-service.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING)
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.findUserById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while fetching the user.");
    });
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService.getUsers(name, job)
    .then((result) => {
      if (result && result.length > 0) {
        res.send(result);
      } else {
        res.status(404).send("No users found with the specified criteria.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while fetching users.");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  console.log(userToAdd)
  userService.addUser(userToAdd)
    .then((addedUser) => {
      res.status(201).send(addedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while adding the user.");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.deleteUserById(id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while deleting the user.");
    });
});

app.listen(port, () => {
  console.log(
    `App listening at http://localhost:${port}`
  );
});
