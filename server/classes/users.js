class Users {
    constructor() {
        this.persons = [];
    }

    addPerson(id, name, room) {
        let person = { id, name, room };
        this.persons.push(person);
        return this.persons;
    }

    getPerson(id) {
        let person = this.persons.filter(persona => { return persona.id === id; })[0];
        return person;
    }

    listPersons() {
        return this.persons;
    }

    listRoomPersons(room) {
        let roomPersons = this.persons.filter(person => person.room === room);
        return roomPersons;
    }

    removePerson(id) {
        let removedPerson = this.getPerson(id);
        this.persons = this.persons.filter(person => { return person.id !== id; });
        return removedPerson;
    }
}

module.exports = {
    Users
}