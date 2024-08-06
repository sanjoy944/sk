let currentPage = 1;
const resultsPerPage = 6;

document.getElementById('search-button').addEventListener('click', function() {
    currentPage = 1;
    performSearch();
    document.getElementById('re-search-button').style.display = 'block';
});

document.getElementById('show-more-button').addEventListener('click', function() {
    currentPage++;
    performSearch();
});

document.getElementById('re-search-button').addEventListener('click', function() {
    currentPage = 1;
    document.getElementById('results').innerHTML = '';
    performSearch();
});

document.getElementById('search-query').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        currentPage = 1;
        performSearch();
        document.getElementById('re-search-button').style.display = 'block';
    }
});

function performSearch() {
    const query = document.getElementById('search-query').value;
    const apiKey = 'AIzaSyDTkWlyp-jmXYkZE9E_Hwp0PjlxRNf9PAE';
    const bloggerId = '5287105147361226760';
    const apiUrl = `https://www.googleapis.com/blogger/v3/blogs/${bloggerId}/posts/search?q=${query}&key=${apiKey}`;
    
    // Show loading spinner
    document.getElementById('loading').style.display = 'block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            if (currentPage === 1) resultsDiv.innerHTML = '';

            data.items.slice(0, resultsPerPage).forEach(item => {
                const title = item.title || 'No Title';
                const imageUrl = item.images && item.images.length > 0 ? item.images[0].url : '';

                const resultItem = document.createElement('div');
                resultItem.innerHTML = `
                    <a href="${item.url}" target="_blank">
                        ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
                        <h3>${title}</h3>
                    </a>
                `;
                resultsDiv.appendChild(resultItem);
            });

            document.getElementById('show-more-button').style.display = data.items.length >= resultsPerPage ? 'block' : 'none';
        })
        .catch(error => {
            console.error('Error:', error);
        })
        .finally(() => {
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';
        });
}

   const apiKey = 'AIzaSyDTkWlyp-jmXYkZE9E_Hwp0PjlxRNf9PAE';
        const blogId = '5287105147361226760';
        const maxPosts = 3;

        async function fetchLatestPosts() {
            const response = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}&maxResults=${maxPosts}`);
            const data = await response.json();
            return data.items;
        }

        function extractImage(content) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const img = tempDiv.querySelector('img');
            return img ? img.src : null;
        }

        function displayPosts(posts) {
            const postsContainer = document.getElementById('posts');
            postsContainer.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const postTitle = document.createElement('h2');
                postTitle.classList.add('post-title');
                postTitle.innerHTML = `<a href="${post.url}" target="_blank">${post.title}</a>`;

                const postImageSrc = extractImage(post.content);
                if (postImageSrc) {
                    const postImage = document.createElement('div');
                    postImage.classList.add('post-image');
                    postImage.innerHTML = `<img src="${postImageSrc}" alt="${post.title}">`;
                    postElement.appendChild(postImage);
                }

                postElement.appendChild(postTitle);
                postsContainer.appendChild(postElement);
            });
        }

        async function updatePosts() {
            const posts = await fetchLatestPosts();
            displayPosts(posts);
        }

        // Initial load
        updatePosts();

        // Update every 5 minutes (300000 milliseconds)
        setInterval(updatePosts, 10000);
		

// Content script to inject into the web page

// Function to inject HTML and CSS into the page
function injectHTML() {
    var postsContainer = document.createElement("div");
    postsContainer.id = "postss";
    postsContainer.innerHTML = `
        <div id="posts"></div>
    `;
    document.body.appendChild(postsContainer);
}


// Add event listener to search button
document.addEventListener("click", function(event) {
    if (event.target && event.target.id === "search-button") {
        var searchQuery = document.getElementById("search-query").value;
        if (searchQuery.trim() !== "") {
            var postsDiv = document.getElementById("posts");
            if (postsDiv) {
                postsDiv.style.display = "none"; // Hide the posts
            }
        }
    }
});
// Function to reset badge text and color
function resetBadge() {
  chrome.browserAction.setBadgeText({ text: "" });
}
