let index; 
let documents; 


const jsonFilePath = new URL('_data/dataset.json', window.location.href).href;
console.log(jsonFilePath);


fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) 
    {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

    documents = data;

    index = lunr(function () {
      this.ref('term');
      this.field('description');
      this.field('term');

      data.forEach(function (doc) {
        this.add(doc);
      }, this);

    });

  })
  .catch(error => {
    console.error('There was a problem fetching the JSON data:', error);
  });


const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('mbw');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  if (index) 
  {
    const results = index.search(query);
    console.log(results);

    // Display The Output
    resultsContainer.innerHTML = results
      .map((result) => {
        const item = documents.find((data) => data.term === result.ref);
        console.log(item);

        return `
          <div class="p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
            <dt class="font-bold text-xl tracking-wide"> ${item.term} &nbsp; : </dt>
            <dd class="text-gray-600 ml-10 text-justify"> ${item.description} </dd>
          </div>
        `;
      })
      .join('');

    if (results.length === 0) 
    {
      resultsContainer.innerHTML = '<p> No results found. </p>';
    }
  } 
  else 
  {
    console.error('Lunr index is not yet ready.');
  }
});
