import express from "express"
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByNameJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  )
}

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user.id = Math.random().toString(36);
  users["users_list"].push(user);
  return user;
};

const deleteUser = (id) => {
  return users["users_list"].filter((user) => user["id"] !== id);
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const addedUser = addUser(userToAdd);
  res.status(201).send(addedUser);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id.toString());
  if (result !== undefined) {
    users["users_list"] = deleteUser(id);
    res.status(204).send(); // Added .send() to complete the response
  } else {
    res.status(404).send("Resource not found.");
  }
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    const result = findUserByNameJob(name, job);
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("No users found with the specified name and job.");
    }
  } else {
    res.send(users);
  }
})

app.listen(port, () => {
  console.log(
    `App listening at http://localhost:${port}`
  );
});
