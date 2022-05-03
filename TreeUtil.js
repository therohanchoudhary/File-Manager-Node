const fs = require('fs')
const path = require('path')

const treeHelper = (dirPath, indent = "") => {
    const isFile = fs.lstatSync(dirPath).isFile()
    if (isFile) {
        const fileName = path.basename(dirPath)
        console.log(indent + "|--- " + fileName)
        return 
    }
    const dirName = path.basename(dirPath)
    console.log(indent + "|___ " + dirName)

    const children = fs.readdirSync(dirPath)
    children.forEach((child) => {
        const childPath = path.join(dirPath, child)
        treeHelper(childPath, indent+"\t")
    })
}

const treeCreate = (dirPath) => {
    if (dirPath === undefined) {
        treeHelper(process.cwd())
        return
    } 

    const doesExist = fs.existsSync(dirPath)
    if (!doesExist) {
        console.log(' Please enter a correct path')
        return
    } 
    treeHelper(dirPath)
}

module.exports = treeCreate