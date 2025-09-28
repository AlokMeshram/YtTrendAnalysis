// Sample data for demonstration
const mockData = {
    trendingVideos: [
        {
            rank: 1,
            title: "The Future of AI Technology Explained",
            creator: "TechExplainer",
            category: "Technology",
            views: "2.4M",
            likes: "124K",
            duration: "12:45",
            published: "2 hours ago",
            trendScore: 95
        },
        {
            rank: 2,
            title: "Epic Gaming Moments Compilation",
            creator: "GameMaster",
            category: "Gaming",
            views: "1.8M",
            likes: "89K",
            duration: "15:32",
            published: "4 hours ago",
            trendScore: 88
        },
        {
            rank: 3,
            title: "Top 10 Songs of the Week",
            creator: "MusicVibes",
            category: "Music",
            views: "3.2M",
            likes: "156K",
            duration: "8:21",
            published: "1 day ago",
            trendScore: 92
        },
        {
            rank: 4,
            title: "Breaking: Major News Update",
            creator: "NewsNow",
            category: "News",
            views: "945K",
            likes: "45K",
            duration: "6:15",
            published: "30 minutes ago",
            trendScore: 85
        },
        {
            rank: 5,
            title: "Hilarious Comedy Sketch",
            creator: "LaughFactory",
            category: "Comedy",
            views: "1.5M",
            likes: "78K",
            duration: "9:44",
            published: "6 hours ago",
            trendScore: 82
        }
    ],
    categoryData: {
        labels: ['Gaming', 'Music', 'Entertainment', 'Education', 'Technology', 'Sports', 'News', 'Comedy'],
        data: [25, 20, 15, 12, 10, 8, 6, 4]
    },
    creatorsData: {
        labels: ['TechExplainer', 'GameMaster', 'MusicVibes', 'NewsNow', 'LaughFactory'],
        data: [2400000, 1800000, 3200000, 945000, 1500000]
    },
    engagementData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        likes: [45000, 52000, 48000, 61000, 55000, 67000],
        comments: [12000, 15000, 13000, 18000, 16000, 21000],
        shares: [8000, 9500, 8500, 11000, 9800, 13000]
    },
    trendData: {
        labels: [],
        data: []
    }
};

// Chart instances
let charts = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setCurrentDate();
    initializeCharts();
    populateTrendingTable();
    setupEventListeners();
    generateTrendData();
}

function setCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

function generateTrendData() {
    const now = new Date();
    const labels = [];
    const data = [];
    
    // Generate hourly data for the last 24 hours
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
        labels.push(time.getHours() + ':00');
        data.push(Math.floor(Math.random() * 1000) + 500);
    }
    
    mockData.trendData.labels = labels;
    mockData.trendData.data = data;
}

function initializeCharts() {
    initializeTrendChart();
    initializeCategoryChart();
    initializeCreatorsChart();
    initializeEngagementChart();
    initializeRegionalChart();
}

function initializeTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    charts.trend = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.trendData.labels,
            datasets: [{
                label: 'Trending Videos',
                data: mockData.trendData.data,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function initializeCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    charts.category = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: mockData.categoryData.labels,
            datasets: [{
                data: mockData.categoryData.data,
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c',
                    '#4facfe',
                    '#00f2fe',
                    '#43e97b',
                    '#38f9d7'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

function initializeCreatorsChart() {
    const ctx = document.getElementById('creatorsChart').getContext('2d');
    charts.creators = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: mockData.creatorsData.labels,
            datasets: [{
                label: 'Views',
                data: mockData.creatorsData.data,
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                borderColor: '#667eea',
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000000).toFixed(1) + 'M';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initializeEngagementChart() {
    const ctx = document.getElementById('engagementChart').getContext('2d');
    charts.engagement = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mockData.engagementData.labels,
            datasets: [
                {
                    label: 'Likes',
                    data: mockData.engagementData.likes,
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Comments',
                    data: mockData.engagementData.comments,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Shares',
                    data: mockData.engagementData.shares,
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return (value / 1000).toFixed(0) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            }
        }
    });
}

function initializeRegionalChart() {
    const ctx = document.getElementById('regionalChart').getContext('2d');
    charts.regional = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Gaming', 'Music', 'Tech', 'Sports', 'News', 'Comedy', 'Education', 'Lifestyle'],
            datasets: [
                {
                    label: 'United States',
                    data: [85, 75, 90, 80, 70, 85, 65, 75],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'United Kingdom',
                    data: [70, 85, 75, 90, 80, 75, 70, 65],
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.2)',
                    borderWidth: 2
                },
                {
                    label: 'Global Average',
                    data: [75, 80, 70, 75, 65, 80, 60, 70],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.2)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

function populateTrendingTable() {
    const tbody = document.getElementById('trendingTableBody');
    tbody.innerHTML = '';
    
    mockData.trendingVideos.forEach(video => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${video.rank}</strong></td>
            <td>
                <div class="video-info">
                    <div class="video-thumbnail">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-details">
                        <h4>${video.title}</h4>
                        <p>${video.duration} • ${video.published}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="creator-info">
                    <div class="creator-avatar">
                        ${video.creator.charAt(0)}
                    </div>
                    <span>${video.creator}</span>
                </div>
            </td>
            <td><span class="category-badge">${video.category}</span></td>
            <td><strong>${video.views}</strong></td>
            <td>${video.likes}</td>
            <td>${video.duration}</td>
            <td>${video.published}</td>
            <td>
                <div class="trend-score ${getTrendScoreClass(video.trendScore)}">
                    <i class="fas fa-fire"></i>
                    ${video.trendScore}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function getTrendScoreClass(score) {
    if (score >= 90) return 'high';
    if (score >= 70) return 'medium';
    return 'low';
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    
    // Filter functionality
    const categoryFilter = document.getElementById('categoryFilter');
    const timeFilter = document.getElementById('timeFilter');
    const regionFilter = document.getElementById('regionFilter');
    
    categoryFilter.addEventListener('change', handleFilterChange);
    timeFilter.addEventListener('change', handleFilterChange);
    regionFilter.addEventListener('change', handleFilterChange);
    
    // Chart period buttons
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            chartButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const period = this.dataset.period;
            updateTrendChart(period);
        });
    });
    
    // Refresh button
    const refreshBtn = document.getElementById('refreshData');
    refreshBtn.addEventListener('click', refreshData);
    
    // Hashtag clicks
    const hashtags = document.querySelectorAll('.hashtag');
    hashtags.forEach(hashtag => {
        hashtag.addEventListener('click', function() {
            const tag = this.textContent;
            searchInput.value = tag;
            handleSearch();
        });
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log('Searching for:', searchTerm);
    
    // In a real application, this would filter the actual data
    // For demo purposes, we'll just log the search term
    
    // Add visual feedback
    const searchBox = document.querySelector('.search-box');
    searchBox.style.transform = 'scale(0.98)';
    setTimeout(() => {
        searchBox.style.transform = 'scale(1)';
    }, 150);
    
    // Simulate search results update
    setTimeout(() => {
        updateSearchResults(searchTerm);
    }, 500);
}

function updateSearchResults(searchTerm) {
    // Simulate filtering trending videos based on search term
    let filteredVideos = mockData.trendingVideos;
    
    if (searchTerm) {
        filteredVideos = mockData.trendingVideos.filter(video => 
            video.title.toLowerCase().includes(searchTerm) ||
            video.creator.toLowerCase().includes(searchTerm) ||
            video.category.toLowerCase().includes(searchTerm)
        );
    }
    
    // Update the table with filtered results
    updateTrendingTable(filteredVideos);
}

function updateTrendingTable(videos) {
    const tbody = document.getElementById('trendingTableBody');
    tbody.innerHTML = '';
    
    if (videos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="9" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 10px; display: block;"></i>
                    No videos found matching your search criteria.
                </td>
            </tr>
        `;
        return;
    }
    
    videos.forEach((video, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>#${index + 1}</strong></td>
            <td>
                <div class="video-info">
                    <div class="video-thumbnail">
                        <i class="fas fa-play"></i>
                    </div>
                    <div class="video-details">
                        <h4>${video.title}</h4>
                        <p>${video.duration} • ${video.published}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="creator-info">
                    <div class="creator-avatar">
                        ${video.creator.charAt(0)}
                    </div>
                    <span>${video.creator}</span>
                </div>
            </td>
            <td><span class="category-badge">${video.category}</span></td>
            <td><strong>${video.views}</strong></td>
            <td>${video.likes}</td>
            <td>${video.duration}</td>
            <td>${video.published}</td>
            <td>
                <div class="trend-score ${getTrendScoreClass(video.trendScore)}">
                    <i class="fas fa-fire"></i>
                    ${video.trendScore}
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function handleFilterChange() {
    const category = document.getElementById('categoryFilter').value;
    const time = document.getElementById('timeFilter').value;
    const region = document.getElementById('regionFilter').value;
    
    console.log('Filters changed:', { category, time, region });
    
    // In a real application, this would update all charts and data
    // For demo purposes, we'll just update some visual feedback
    
    // Add loading animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.classList.add('loading');
        setTimeout(() => {
            card.classList.remove('loading');
        }, 1000);
    });
    
    // Update stats with "filtered" data
    setTimeout(() => {
        updateStats(category, time, region);
    }, 1000);
}

function updateStats(category, time, region) {
    // Simulate different stats based on filters
    const stats = {
        videos: Math.floor(Math.random() * 50000) + 10000,
        views: (Math.random() * 5 + 1).toFixed(1) + 'B',
        creators: Math.floor(Math.random() * 100000) + 20000,
        tags: Math.floor(Math.random() * 5000) + 500
    };
    
    document.getElementById('totalVideos').textContent = stats.videos.toLocaleString();
    document.getElementById('totalViews').textContent = stats.views;
    document.getElementById('activeCreators').textContent = stats.creators.toLocaleString();
    document.getElementById('trendingTags').textContent = stats.tags.toLocaleString();
}

function updateTrendChart(period) {
    const chart = charts.trend;
    let labels = [];
    let data = [];
    
    const now = new Date();
    
    switch(period) {
        case 'hour':
            // Generate hourly data for the last 24 hours
            for (let i = 23; i >= 0; i--) {
                const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
                labels.push(time.getHours() + ':00');
                data.push(Math.floor(Math.random() * 1000) + 500);
            }
            break;
        case 'day':
            // Generate daily data for the last 30 days
            for (let i = 29; i >= 0; i--) {
                const time = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
                labels.push((time.getMonth() + 1) + '/' + time.getDate());
                data.push(Math.floor(Math.random() * 5000) + 2000);
            }
            break;
        case 'week':
            // Generate weekly data for the last 12 weeks
            for (let i = 11; i >= 0; i--) {
                const time = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
                labels.push('Week ' + (52 - i));
                data.push(Math.floor(Math.random() * 20000) + 10000);
            }
            break;
    }
    
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update('active');
}

function refreshData() {
    const refreshBtn = document.getElementById('refreshData');
    const icon = refreshBtn.querySelector('i');
    
    // Add spinning animation
    icon.style.animation = 'spin 1s linear infinite';
    refreshBtn.disabled = true;
    
    // Simulate data refresh
    setTimeout(() => {
        // Update all data
        generateTrendData();
        updateRandomStats();
        updateCharts();
        populateTrendingTable();
        
        // Remove spinning animation
        icon.style.animation = '';
        refreshBtn.disabled = false;
        
        // Show success feedback
        showNotification('Data refreshed successfully!', 'success');
    }, 2000);
}

function updateRandomStats() {
    const stats = {
        videos: Math.floor(Math.random() * 50000) + 10000,
        views: (Math.random() * 5 + 1).toFixed(1) + 'B',
        creators: Math.floor(Math.random() * 100000) + 20000,
        tags: Math.floor(Math.random() * 5000) + 500
    };
    
    document.getElementById('totalVideos').textContent = stats.videos.toLocaleString();
    document.getElementById('totalViews').textContent = stats.views;
    document.getElementById('activeCreators').textContent = stats.creators.toLocaleString();
    document.getElementById('trendingTags').textContent = stats.tags.toLocaleString();
}

function updateCharts() {
    // Update trend chart
    charts.trend.data.labels = mockData.trendData.labels;
    charts.trend.data.datasets[0].data = mockData.trendData.data;
    charts.trend.update();
    
    // Update other charts with random data
    charts.category.data.datasets[0].data = mockData.categoryData.data.map(val => 
        Math.floor(Math.random() * 30) + 5
    );
    charts.category.update();
    
    charts.creators.data.datasets[0].data = mockData.creatorsData.data.map(val => 
        Math.floor(Math.random() * 2000000) + 500000
    );
    charts.creators.update();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Auto-refresh data every 5 minutes
setInterval(() => {
    if (document.visibilityState === 'visible') {
        refreshData();
    }
}, 5 * 60 * 1000);