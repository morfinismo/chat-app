//.on listens for events
let socket = io();
let params = new URLSearchParams(window.location.search);
if (!params.has("name") || !params.has("room")) {
    window.location = "index.html";
    throw Error("Name and Room are required");
}

let data = {
    name: params.get("name"),
    room: params.get("room")
};
socket.on("connect", () => {
    console.log("Connected to server");
    socket.emit("enterChat", data, (persons) => {
        console.log(persons);
    });
});

socket.on("disconnect", () => {
    console.log("Lost connection with server");
});

socket.on("notifyLeave", (payload) => {
    console.log(payload);
});

socket.on("updatePersons", (persons) => {
    console.log(persons);
});

socket.on("updateChat", (data) => {
    console.log(data);
});

socket.on("privateMsg", (msg) => {
    console.log(msg);
});