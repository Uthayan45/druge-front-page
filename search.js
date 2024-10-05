document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html'; // Redirect to login if not authenticated
    }

    // Handle search functionality
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', async () => {
        const query = document.getElementById('search-query').value;
        const platform = document.getElementById('search-platform').value;
        const status = document.getElementById('search-status').value;
        const date = document.getElementById('search-date').value;

        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '<p>Loading...</p>'; // Show loading

        try {
            const response = await fetch(API_SEARCH_ENDPOINT?query=${query}&platform=${platform}&status=${status}&date=${date}, {
                headers: {
                    'Authorization': Bearer ${token} // Use token for authentication
                }
            });

            const results = await response.json();
            searchResults.innerHTML = ''; // Clear loading message

            if (results.length === 0) {
                searchResults.innerHTML = '<p>No results found</p>';
                return;
            }

            // Populate search results
            results.forEach(result => {
                searchResults.innerHTML += `
                    <div class="search-item">
                        <h4>${result.platform} - ${result.status}</h4>
                        <p><strong>Message:</strong> ${result.message}</p>
                        <p><strong>Date:</strong> ${new Date(result.date).toLocaleString()}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error('Error fetching search results:', error);
            searchResults.innerHTML = '<p>Error loading results</p>';
        }
    });
});