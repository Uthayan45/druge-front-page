document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'index.html'; // Redirect to login if not authenticated
    }

    // Fetch and display tracking data
    const fetchTrackingData = async (platform = 'all', status = 'all') => {
        try {
            const response = await fetch(API_TRACKING_ENDPOINT?platform=${platform}&status=${status}, {
                headers: {
                    'Authorization': Bearer ${token} // Use token for authentication
                }
            });

            const data = await response.json();
            const trackingResults = document.getElementById('tracking-results');
            trackingResults.innerHTML = ''; // Clear previous results

            data.forEach(item => {
                trackingResults.innerHTML += `
                    <div class="tracking-item">
                        <h4>${item.platform} - ${item.status}</h4>
                        <p>${item.message}</p>
                        <p><strong>Date:</strong> ${new Date(item.date).toLocaleString()}</p>
                    </div>
                `;
            });

        } catch (error) {
            console.error('Error fetching tracking data:', error);
        }
    };

    // Handle filter functionality
    const filterBtn = document.getElementById('filter-btn');
    filterBtn.addEventListener('click', () => {
        const platform = document.getElementById('platform').value;
        const status = document.getElementById('status').value;
        fetchTrackingData(platform, status);
    });

    // Fetch initial data
    fetchTrackingData();
});