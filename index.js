#! /usr/bin/env node
import inquirer from "inquirer";
let toDos = [];
let toDos1 = [];
let condition = true;
async function start() {
    while (true) {
        let options = await inquirer.prompt([
            {
                name: "todo",
                message: "Which one do you want to opt?",
                type: "list",
                choices: ["Add", "Update by Replacing Item", " Update by Including another list", "Delete", "View", "Exit"],
            }
        ]);
        if (options.todo === "Add") {
            await add();
        }
        else if (options.todo === "Update by Replacing Item") {
            await Update();
        }
        else if (options.todo === " Update by Including another list") {
            await UpdateConcat();
        }
        else if (options.todo === "Delete") {
            await Delete();
        }
        else if (options.todo === "View") {
            console.log("your List:", toDos);
            console.log("Thank you");
        }
        else if (options.todo === "Exit") {
            break;
        }
        else {
            console.log("Invalid choice");
        }
    }
}
async function add() {
    while (true) {
        let addTask = await inquirer.prompt([
            {
                name: "addTodo",
                type: "input",
                message: "Do you want to add more? or press q to quit",
            }
        ]);
        if (addTask.addTodo === "q") {
            console.log("Thank You!");
            break;
        }
        else if (addTask.addTodo) {
            toDos.push(addTask.addTodo);
            console.log("your List:", toDos);
        }
        else {
            "Invalid Option!! ";
        }
    }
}
async function Delete() {
    while (true) {
        let deleteTodo = await inquirer.prompt([
            {
                type: "list",
                name: "delete",
                message: "Select Item you want to delete:",
                choices: [...toDos, "Exit"]
            }
        ]);
        let deleteItem = deleteTodo.delete;
        if (deleteItem === "Exit") {
            break;
        }
        else {
            toDos = toDos.filter(item => item !== deleteItem);
            console.log(`Item "${deleteItem}" has been deleted.`);
            console.log("Updated Todo List:", toDos);
        }
    }
}
async function Update() {
    while (true) {
        let updateOptions = await inquirer.prompt([
            {
                type: "list",
                name: "update1",
                message: "Select item to update:",
                choices: [...toDos, "Exit"]
            },
            {
                type: "input",
                name: "update2",
                message: "Enter updated value or press q to quit:"
            }
        ]);
        if (updateOptions.update1 === "Exit" && updateOptions.update2 === "q") {
            console.log("Thanks");
            break;
        }
        else {
            let updateIndex = toDos.indexOf(updateOptions.update1);
            if (updateIndex !== -1) {
                toDos[updateIndex] = updateOptions.update2;
                console.log(`Item "${updateOptions.update1}" has been updated to "${updateOptions.update2}".`);
                console.log("Updated Todo List:", toDos);
            }
            else {
                console.log("Invalid opt!.");
            }
        }
    }
}
async function UpdateConcat() {
    while (true) {
        let updateOptions1 = await inquirer.prompt([
            {
                type: "input",
                name: "update3",
                message: "Enter new  value for another list or press q to quit:"
            }
        ]);
        if (updateOptions1.update3 === "q") {
            console.log("Thanks");
            break;
        }
        else if (updateOptions1.update3) {
            toDos1.push(updateOptions1.update3);
            console.log("Your new list is :", toDos1);
        }
        else {
            console.log("Invalid Option!!");
        }
        let newArray = toDos.concat(toDos1);
        console.log("Your new Updated list by adding another list is:", newArray);
    }
}
start();
