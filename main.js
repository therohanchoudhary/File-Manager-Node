#!/usr/bin/env node
const organize = require('./OrganizeUtil')
const treeCreate = require('./TreeUtil')

const inputArr = process.argv.slice(2)
const command = inputArr[0]

switch (command) {
    case "tree":
        treeCreate(inputArr[1])
        break
    case "organize":
        organize(inputArr[1])
        break
    case "help":
        console.log(`List of all commands:\n\norgFile tree $directory$\norgFile organize $directory$\norgFile help`)
        break
    default:
        console.log("Please enter a valid command")
        break
}
