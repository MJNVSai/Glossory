const datasetFilePath = './_data/dataset.json';


var doci = [
  { "term": "Aberration", "description": "An unusual departure from what is considered normal, often unwelcome." },
  { "term": "Benevolent", "description": "Characterized by goodwill and a kind disposition." },
  { "term": "Cacophony", "description": "A harsh, discordant mixture of sounds." },
  { "term": "Dichotomy", "description": "A division or contrast between two things that are opposites or entirely different." },
  { "term": "Ephemeral", "description": "Lasting for a very short time, fleeting." },
  { "term": "Facetious", "description": "Treating serious issues with humor or sarcasm, often inappropriately." },
  { "term": "Garrulous", "description": "Excessively talkative, especially on trivial matters." },
  { "term": "Hapless", "description": "Unfortunate or unlucky." },
  { "term": "Iconoclast", "description": "A person who challenges or criticizes established beliefs, customs, or institutions." },
  { "term": "Juxtaposition", "description": "The act of placing two things close together or side by side for contrasting effect." },
  { "term": "Kaleidoscope", "description": "A constantly changing and colorful pattern or sequence of elements." },
  { "term": "Lethargy", "description": "A state of tiredness or lack of energy, often resulting in inactivity." },
  { "term": "Mellifluous", "description": "Flowing smoothly and sweetly, often used to describe a pleasant voice or sound." },
  { "term": "Nefarious", "description": "Wicked, villainous, or morally reprehensible." },
  { "term": "Obfuscate", "description": "To make something unclear, confusing, or difficult to understand." },
  { "term": "Paradigm", "description": "A typical or ideal example, model, or pattern of something." },
  { "term": "Quixotic", "description": "Exceedingly idealistic and unrealistic, often to the point of impracticality." },
  { "term": "Reticent", "description": "Reserved or not revealing one's thoughts or feelings readily." },
  { "term": "Serendipity", "description": "The occurrence of fortunate and unexpected events by chance." },
  { "term": "Trepidation", "description": "A feeling of fear, anxiety, or uncertainty about something that may happen." },
  { "term": "Ubiquitous", "description": "Present, appearing, or found everywhere." },
  { "term": "Voracious", "description": "Having an insatiable appetite or an eager approach to an activity." },
  { "term": "Wistful", "description": "Longing or yearning for something, often tinged with sadness." },
  { "term": "Xenophile", "description": "A person who is attracted to foreign cultures, customs, or people." },
  { "term": "Yoke", "description": "A wooden crosspiece that connects two animals for pulling a plow or cart." },
  { "term": "Zealous", "description": "Showing great enthusiasm, passion, or fervor for a cause or activity." },
  { "term": "Alacrity", "description": "Eager and cheerful readiness and willingness to do something." },
  { "term": "Belligerent", "description": "Hostile, aggressive, and inclined to engage in conflict or war." },
  { "term": "Circumlocution", "description": "The use of many words to express an idea when fewer words would suffice, often used to be vague or evasive." },
  { "term": "Dearth", "description": "A scarcity or lack of something." },
  { "term": "Ebullient", "description": "Overflowing with enthusiasm, excitement, or energy." }
]

var documents;

var index = lunr(function () {
  this.ref('term')
  this.field('description')
  this.field('term')

  var lunrInstance = this;

  // console.log(documents)

  // documents.forEach(function (doc) {
  //   this.add(doc)
  // }, this)
  // console.log(datasetFilePath)

  
  // Define the path to your JSON file
  const jsonFilePath = new URL('_data/dataset.json', window.location.href).href;
  console.log(jsonFilePath)

  // Fetch the JSON data
  fetch(jsonFilePath).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Log the Data
      console.log(data); 
      documents = data;
      // var type = typeof data;
      // console.log(type)

      console.log(documents)

      // documents.forEach(function (doc){
      //   this.add(doc)
      // }, this)

      console.log(Object.keys(documents))
      console.log(documents[4])

      Object.keys(documents).forEach(function (key) {
        var doc = documents[key];
        console.log(doc)
        // Assuming you have an existing 'index' variable representing your Lunr index
        lunrInstance.add(doc);
        console.log(lunrInstance)
      }, lunrInstance);
    

    })
    .catch(error => {
      console.error('There was a problem fetching the JSON data:', error);
    });

})

console.log("After the Index Function");
console.log(documents)



// export default function (query) {
//     return index.search(query);
// };

// console.log(index)
// console.log(index.search("kind"))

const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('mbw');
// const search = require('./search.js');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
    const results = index.search(query);
    console.log(results)

      // Display search results
      resultsContainer.innerHTML = results
        .map((result) => {
          const item = documents.find((data) => data.term === result.ref);
          console.log(item)
          return `
              <div class="p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
                <dt class="font-bold text-xl tracking-wide"> ${item.term} &nbsp; : </dt>
                <dd class="text-gray-600 ml-10 text-justify"> ${item.description} </dd>
              </div>
            `;
          })
          .join('');

        if (results.length === 0) {
          resultsContainer.innerHTML = '<p> No results found. </p>';
        }
});