const { io } = require("../server");
const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

const users = new Users();

//constant communication with backend
io.on("connection", (client) => {

    client.on("enterChat", (data, callback) => {
        if (!data.name || !data.room) {
            callback({
                error: true,
                message: "Name is required"
            });
        }

        client.join(data.room);

        users.addPerson(client.id, data.name, data.room);
        let usersList = users.listRoomPersons(data.room);
        callback({
            usersList
        });
        client.broadcast.to(data.room).emit("updatePersons", usersList);
    });

    client.on("disconnect", () => {
        let removedPerson = users.removePerson(client.id);
        let room = removedPerson.room;
        let message = createMessage("Admin", `${removedPerson.name} has left.`);
        client.broadcast.to(removedPerson.room).emit("notifyLeave", message);
        client.broadcast.to(room).emit("updatePersons", users.listRoomPersons(room));
    });

    client.on("sendMessage", (data) => {
        let person = users.getPerson(client.id);
        let msg = createMessage(data.name, data.message);
        client.broadcast.to(person.room).emit("updateChat", msg);
    });

    client.on("privateMsg", (data) => {
        let person = users.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(data.recipient).emit("privateMsg", message);
    });

});