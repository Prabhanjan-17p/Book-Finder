
async function searchBooks() {
    const query = document.getElementById('searchBar').value;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  // Clear previous results
    
    if (query.trim() === "") {
        resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        //it check the docs are available or not
        if (data.docs.length > 0) {
            // Display all the docs
            data.docs.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');
                bookElement.innerHTML = `
                    <h2>${book.title}</h2>
                    <p><strong>Author:</strong> ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
                    <p><strong>Published:</strong> ${book.first_publish_year || "N/A"}</p>
                `;
                resultsContainer.appendChild(bookElement);
            });
        } else {
            resultsContainer.innerHTML = "<p>No books found.</p>";
        }
    } catch (error) {
        resultsContainer.innerHTML = "<p>Error fetching books. Please try again later.</p>";
    }
}
