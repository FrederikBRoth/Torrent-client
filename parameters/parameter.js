class Parameter {
    constructor(){
        this.name = undefined
        this.description = undefined
        this.optional = false
        this.error = undefined
    }

    setName(name) {
        this.name = name
        this.error = name + " is not set correctly"
        return this
    }

    setDescription(description) {
        this.description = description
        return this
    }

    setOptional(optional) {
        this.optional = optional
        return this
    }

    toString(){
        let str = ""
        str += "\tName: " + this.name + "\n"
        str += "\tDescription: " + this.description + "\n"
        return str
    }
}

module.exports = Parameter