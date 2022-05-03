const fs = require('fs')
const path = require('path')
const types = require('./utility')

const getCategory = (name) => {
    const ext = path.extname(name).slice(1)
    let category = 'other'
    Object.keys(types).forEach((type) => {
        if (types[type].includes(ext)) {
            category = type
        }
    })
    return category
}

const sendFiles = (srcFilePath, dest, category) => {
    const categoryPath = path.join(dest, category)
    if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath)
    }
    const fileName = path.basename(srcFilePath)
    const destFilePath = path.join(categoryPath, fileName)
    fs.copyFileSync(srcFilePath, destFilePath)
}

const organizeHelper = (src, dest) => {
    const childNames = fs.readdirSync(src)
    childNames.forEach((childName) => {
        const childAddress = path.join(src, childName)
        const isFile = fs.lstatSync(childAddress).isFile()
        if (isFile) {
            const category = getCategory(childName)
            sendFiles(childAddress, dest, category)
        }
    })
}

const organize = (dirPath) => {
    let destPath
    if (dirPath === undefined) {
        destPath = process.cwd()
        return
    } 

    const doesExist = fs.existsSync(dirPath)
    if (!doesExist) {
        console.log('Please enter a correct path')
        return
    } 

    destPath = path.join(dirPath, 'organized_files')
    if(!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath)
    }
    organizeHelper(dirPath, destPath)
} 

module.exports = organize 
