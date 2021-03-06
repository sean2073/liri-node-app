/*
LIRI is a command line node app that 
takes in parameters and gives back data.
The commands are:
movie-this
spotify-this-song
my-tweets
do-what-it-says
*/

// Using the require keyword lets us access all of the exports
// in our keys.js file
var keys = require("./keys.js");

var omdb = require('omdb');

var spotify = require('spotify');

var Twitter = require('twitter');

var fs = require("fs");

var consumerKey = keys.twitterKeys.consumer_key;
var consumerSec = keys.twitterKeys.consumer_secret;
var accessKey = keys.twitterKeys.access_token_key;
var accessSec = keys.twitterKeys.access_token_secret;

console.log("Your consumer key = " + keys.twitterKeys.consumer_key);
console.log("Your consumer secret = " + keys.twitterKeys.consumer_secret);
console.log("Your access key = " + keys.twitterKeys.access_token_key);
console.log("Your access secret = " + keys.twitterKeys.access_token_secret);
//take in the command from the command line at the terminal
var inCommand = process.argv[2];

if (inCommand === "my-tweets") {
    getTweets();
} // close if
else if (inCommand === "spotify-this-song") {
    getSpotify();
} // close else if
else if (inCommand === "movie-this") {
    getOMDB();
} // close else if
else if (inCommand === "do-what-it-says") {
    doIt();
} //close else if

function doIt() {
    //var fs = require("../text/random.txt");   
    
    fs.readFile("./random.txt", "utf8", function(error, data) {
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        inCommand = dataArr[0];
        process.argv[3] = dataArr[1];
        if (inCommand === "spotify-this-song") {

            getSpotify();
        } // close if
        else if (inCommand === "movie-this") {
            getOMDB();
        } // close else if
        else if (inCommand === "my-tweets") {
            getTweets();
        }; // close else if

    }); // close fs.readfile function
}; // close doIt()

function getOMDB() {
    
    var movieName = process.argv[3];
    var movieYear = process.argv[4];
    console.log("the movie chosen is " + movieName);
    if (movieName === ' ' || movieName === undefined) {
        movieName = 'Mr. Nobody';
        movieYear = '2009';
        console.log("the movie chosen is " + movieName);
    } // close if
    /* 
    omdb.search(movieName, function(err, movies) {
        if(err) {
            return console.error(err);
        } //close if
     
        if(movies.length < 1) {
            return console.log('No movies were found!');
        }//closes if
     
        movies.forEach(function(movie) {
            console.log('%s (%d)', movie.title, movie.year);
        })//closes movies.foreach
        }); // closes omdb.search
        }; //closes getOMDB
        */

    omdb.get({ title: movieName, year: movieYear }, true, function(err, movie) {
        if (err) {
            return console.error(err);
        } // close if

        if (!movie) {
            return console.log('Movie not found!');
        } // close if
        /*
    console.log('%s (%d) %d/10', movie.title);
    console.log('%s (%d) %d/10', movie.year);
    //console.log('%s (%d) %d/10', movie.imdb.rating);
    console.log('%s (%d) %d/10', movie.rated);
    console.log('%s (%d) %d/10', movie.imdb);
    console.log('%s (%d) %d/10', movie.actors);
    console.log('%s (%d) %d/10', movie.countries);
    console.log(movie.plot);*/
      
        
        console.log("Title: " + movie.title);
        console.log("Year: " + movie.year);
        console.log("Rated: " + movie.rated);
        console.log("IMDB Rating: " + movie.imdb.rating);
        console.log("Country: " + movie.countries);
        console.log("Language: " + movie.language);
        console.log("Plot: " + movie.plot);
        console.log("Actors: " + movie.actors);
        console.log("Rotten Tomatoes Rating: " + movie.tomatoRating);
        console.log("Rotton Tomatoes URL: " + movie.tomatoURL);
        //console.log(movie);

    }); //closes OMDB.get function
}; //closes getOMDB()

function getSpotify() {
    song = process.argv[3];
    if (song === '') {
        song = 'The Sign';
    } // close if
    

    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } // close if
        else {
            // Do something with 'data'
            //console.log(data); 
            var songInfo = data.tracks.items[0];
            var songResult = console.log(songInfo.artists[0].name);
            console.log(songInfo.name);
            console.log(songInfo.album.name);
            console.log(songInfo.preview_url);
            //console.log(songInfo);
        } // close else


    }); // close spotify.search function

}; //closes getSpotify();
function getTweets() {
   

    var client = new Twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSec,
        access_token_key: accessKey,
        access_token_secret: accessSec
    }); // close twitter object

    var params = { screen_name: 'sean2073', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) 
            {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
            }

            
        } // close if
    }); // close client.get function
}; // close getTweets
