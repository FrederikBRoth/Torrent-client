const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const readline = require('readline');
const { findCommand, findParamater } = require('./Support Files/regex');
const Clique = require("./parameters/clique");
const Parameter = require('./parameters/parameter');
const { getMovies, getMovieDetails, assembleMagnetURI} = require("./yts")

var WebTorrent = require('webtorrent')
const parseTorrent = require('parse-torrent')
var client = new WebTorrent()

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let isRunning = false
async function inputHandler() {
    rl.question("", async (input) => {
        let firstWord = findCommand.exec(input)[0]
        switch (firstWord) {
            case "help":
                console.log("awdawdawdawd")
                console.log(client.torrents)
                break
            case "download":
                let response = await searchCommand.executeParameters(input)
                if (response.length != 0) {
                    if (response[0].parameter == "-s") {
                        let data = await getMovies(response[0].value)
                        console.log(data)
                        break
                    } 
                    if (response[0].parameter == "-d") {
                        let data = await getMovieDetails(response[0].value)
                        
                        let movie = data.find(element => element.quality == '1080p')
                        let torrentStr = assembleMagnetURI(movie.hash, movie.url)
                        console.log(torrentStr)
                        client.add(torrentStr, (torrent) => {
                            console.log('client is downloading:', torrent.infoHash)
                        })
                        
                        break
                    }

                    break
                }
                break
            default:
                console.log("To get commands type \"help\" ")
        }

        inputHandler()
        rl.close
    })
}


function startProgram() {
    clear()
    console.log(
        chalk.yellow(
            figlet.textSync('Fatricos YTS Client', { horizontalLayout: 'full' })
        )
    );
    console.log("Welcome to Fatricos YTS Client!")
    inputHandler()

}

startProgram()

let searchCommand = new Clique()
    .setCommand("download")
    .setDescription("This will search for movies")
    .setParameter(new Parameter().setName("-s").setOptional(false).setDescription("Search String"))
    .setParameter(new Parameter().setName("-f").setOptional(true).setDescription("Filters the search is some way"))
    .setParameter(new Parameter().setName("-d").setOptional(true).setDescription("Starts download using movie id"))



