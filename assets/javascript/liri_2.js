// Using the require keyword lets us access all of the exports
// in our keys.js file
var fs = require("./keys.js");

var consumerKey = fs.twitterKeys.consumer_key;
var consumerSec = fs.twitterKeys.consumer_secret;
var accessKey = fs.twitterKeys.access_token_key;
var accessSec = fs.twitterKeys.access_token_secret;

console.log("`	Your consumer key = " + fs.twitterKeys.consumer_key);
console.log("Your consumer secret = " + fs.twitterKeys.consumer_secret);
console.log("Your access key = " + fs.twitterKeys.access_token_key);
console.log("Your access secret = " + fs.twitterKeys.access_token_secret);

var inCommand = process.argv[2];

if (inCommand === "my-tweets") {
    getTweets();
} else if (inCommand === "spotify-this-song") {
    getSpotify();
} else if (inCommand === "movie-this") {
    getOMDB();
} else if (inCommand === "do-what-it-says") {
    doIt();

    function doIt() {
        //var fs = require("../text/random.txt");	
        var fs = require("fs");
        fs.readFile("../text/random.txt", "utf8", function(error, data) {
            console.log(data);

            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");

            // We will then re-display the content as an array for later use.
            console.log(dataArr);
            inCommand = dataArr[0];
            process.argv[3] = dataArr[1];
            if (inCommand === "spotify-this-song") {

                getSpotify();
            } 
            else if (inCommand === "movie-this") {
                getOMDB();
            } 
            else if (inCommand === "my-tweets") {
                getTweets();
            }

            })
        }

        function getOMDB() {
            var omdb = require('omdb');
            var movieName = process.argv[3];
            var movieYear = process.argv[4];
            console.log("the movie chosen is " + movieName);
            if (movieName === ' ' || movieName === undefined) {
                movieName = 'Mr. Nobody';
                movieYear = '2009';
                console.log("the movie chosen is " + movieName);
            }
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
                });	// closes omdb.search
                }; //closes getOMDB
                */

            omdb.get({ title: movieName, year: movieYear }, true, function(err, movie) {
                if (err) {
                    return console.error(err);
                }

                if (!movie) {
                    return console.log('Movie not found!');
                }
                /*
    console.log('%s (%d) %d/10', movie.title);
    console.log('%s (%d) %d/10', movie.year);
    //console.log('%s (%d) %d/10', movie.imdb.rating);
    console.log('%s (%d) %d/10', movie.rated);
    console.log('%s (%d) %d/10', movie.imdb);
    console.log('%s (%d) %d/10', movie.actors);
    console.log('%s (%d) %d/10', movie.countries);
    console.log(movie.plot);*/

                console.log(movie);

            }) //closes getOMDB
        }

        function getSpotify() {
            song = process.argv[3];
            if (song === '') {
                song = 'The Sign';
            }
            var spotify = require('spotify');

            spotify.search({ type: 'track', query: song }, function(err, data) {
                if (err) {
                    console.log('Error occurred: ' + err);
                    return;
                } else {
                    // Do something with 'data'
                    //console.log(data); 
                    var songInfo = data.tracks.items[0];
                    var songResult = console.log(songInfo.artists[0].name);
                    console.log(songInfo.name);
                    console.log(songInfo.album.name);
                    console.log(songInfo.preview_url);
                    //console.log(songInfo);
                }


            })

        } //closes getSpotify();
        function getTweets() {
            var Twitter = require('twitter');

            var client = new Twitter({
                consumer_key: consumerKey,
                consumer_secret: consumerSec,
                access_token_key: accessKey,
                access_token_secret: accessSec
            })

            var params = { screen_name: 'sean2073', count: 20 };
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    console.log(tweets);
                    //console.log(response.text);
                }
            })
        };
