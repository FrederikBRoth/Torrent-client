let findCommand = /^[A-Za-z_]+/
let findParameter = / \-[A-Za-z_]*\w/g
let findParameterAndValue = / \-[A-Za-z_]* [A-Za-z_1-9]*\w/g

module.exports.findCommand = findCommand
module.exports.findParameter = findParameter
module.exports.findParameterAndValue = findParameterAndValue