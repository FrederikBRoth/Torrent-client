const Parameter = require("./parameter")
const { findCommand, findParameter, findParameterAndValue } = require('../Support Files/regex');
class Clique {

    constructor() {
        this.command = undefined
        this.description = undefined
        this.parameters = []

    }

    setDescription(description) {
        this.description = description
        return this
    }

    setParameter(parameter) {
        this.parameters.push(parameter)
        return this
    }

    setCommand(command) {
        this.command = command
        return this
    }

    toString() {
        let str = "Command: " + this.command + "\n"
        str += "Description: " + this.description + "\n"
        str += "Parameters\n"
        for (const parameter of this.parameters) {
            str += parameter.toString()
        }
        return str
    }

    async executeParameters(input) {
        const executePromise = new Promise(async (resolve, reject) => {
            const inputParametersAndValues = [...input.matchAll(findParameterAndValue)]
            const inputParameters = [...input.matchAll(findParameter)]
            const cleanParamArray = inputParameters.map(element => element[0].substring(1))
            let comparedParams = await compareParameter(this.parameters, cleanParamArray, reject)
            
            if (inputParameters.length == inputParametersAndValues.length) {
                let parameterValueArray = []
                for (const parameter of inputParametersAndValues) {
                    let parameterValue = { parameter: parameter[0].split(" ")[1], value: parameter[0].split(" ")[2].replace("_", " ") }
                    parameterValueArray.push(parameterValue)
                }
                resolve(parameterValueArray)
            } else {
                if(comparedParams.length == 1) {
                    console.log(comparedParams[0].param.toString())
                } else {
                    reject("One or more parameters does not have a value")
                }
                
            }
        }).catch(error => {
            console.log(error)
        })
        let array = await executePromise
        return array

    }
}

async function compareParameter(commandParams, inputParams, reject) {
    let inputParamsArray = inputParams
    let verifiedParams = []
    for (const param of inputParams) {
        const found = await commandParams.find(element => element.name == param)
        if (found == undefined) {
            let error = { param: undefined, message: param + " is not a parameter for this command" }
            reject(error.message)
        } else {
            let verifiedParam = { param: found, message: "Param found" }
            if (verifiedParams.find(element => element.param == verifiedParam.param)) {
                verifiedParams.push({ param: undefined, message: param + " has already been detailed!" })
                reject(error.message)
            } else {
                verifiedParams.push(verifiedParam)
            }
        }
    }
    return verifiedParams
}





module.exports = Clique