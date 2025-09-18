// Content Loader for Valet.finance
// This file handles dynamic content loading for both index.html and blog.html

console.log('=== CONTENT LOADER SCRIPT LOADED ===');
console.log('Content Loader script loaded successfully!');
console.log('Script location:', window.location.href);
console.log('Current time:', new Date().toLocaleTimeString());

class ContentLoader {
    constructor() {
        this.blogPosts = [];
        this.businessUpdates = [];
    }

    // Load blog posts from JSON
    async loadBlogPosts() {
        try {
            // Determine the correct path based on current page and environment
            const currentPage = window.location.pathname;
            const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
            
            let basePath;
            if (isGitHubPages) {
                // GitHub Pages: use absolute paths from repository root
                basePath = currentPage.includes('top_nav/') ? '../../' : './';
            } else {
                // Local development: use relative paths
                basePath = currentPage.includes('top_nav/') ? '../../' : '../';
            }
            
            const timestamp = new Date().getTime(); // Cache busting
            const jsonPath = basePath + 'data/blog-posts.json?t=' + timestamp;
            console.log('Loading blog posts from:', jsonPath);
            console.log('Current page path:', currentPage);
            console.log('Base path:', basePath);
            console.log('Is GitHub Pages:', isGitHubPages);
            
            const response = await fetch(jsonPath);
            const data = await response.json();
            this.blogPosts = data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log('Loaded blog posts:', this.blogPosts.length);
            return this.blogPosts;
        } catch (error) {
            console.error('Error loading blog posts:', error);
            return [];
        }
    }

    // Load business updates from JSON
    async loadBusinessUpdates() {
        try {
            // Determine the correct path based on current page and environment
            const currentPage = window.location.pathname;
            const isGitHubPages = window.location.hostname.includes('github.io') || window.location.hostname.includes('github.com');
            
            let basePath;
            if (isGitHubPages) {
                // GitHub Pages: use absolute paths from repository root
                basePath = currentPage.includes('top_nav/') ? '../../' : './';
            } else {
                // Local development: use relative paths
                basePath = currentPage.includes('top_nav/') ? '../../' : '../';
            }
            
            const response = await fetch(basePath + 'data/business-updates.json');
            const data = await response.json();
            this.businessUpdates = data.updates.sort((a, b) => new Date(b.date) - new Date(a.date));
            return this.businessUpdates;
        } catch (error) {
            console.error('Error loading business updates:', error);
            return [];
        }
    }

    // Get latest blog post for index.html
    getLatestBlogPost() {
        return this.blogPosts.length > 0 ? this.blogPosts[0] : null;
    }

    // Get latest 2 business updates for index.html
    getLatestBusinessUpdates() {
        return this.businessUpdates.slice(0, 2);
    }

    // Get latest post by category
    getLatestPostByCategory(category) {
        const categoryPosts = this.blogPosts.filter(post => post.category === category);
        return categoryPosts.length > 0 ? categoryPosts[0] : null;
    }

    // Format date for display
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Safely render HTML content (allows HTML tags while preventing XSS)
    renderHTML(content) {
        // Create a temporary div to parse HTML safely
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        return tempDiv.innerHTML;
    }

    // Create blog post HTML for index.html
    createIndexBlogCard(post) {
        if (!post) return '';
        
        const categoryParam = post.category.toLowerCase();
        const blogUrl = `top_nav/bnb/blog.html?category=${categoryParam}`;
        
        // Determine the appropriate label, icon, and CSS class based on category
        let categoryLabel = 'Latest Blog';
        let categoryIcon = '📝';
        let categoryClass = 'blog-card';
        
        if (post.category === 'Technology') {
            categoryLabel = 'News';
            categoryIcon = '📰';
            categoryClass = 'industry-card';
        } else if (post.category === 'Business') {
            categoryLabel = 'Business';
            categoryIcon = '💼';
            categoryClass = 'business-card';
        } else if (post.category === 'Education') {
            categoryLabel = 'Education';
            categoryIcon = '🎓';
            categoryClass = 'education-card';
        }

        // Add featured class if post is featured
        const featuredClass = post.featured ? 'featured' : '';
        const featuredBadge = post.featured ? '<div class="featured-badge">Featured</div>' : '';
        
        return `
            <div class="news-card ${categoryClass} ${featuredClass}">
                ${featuredBadge}
                <div class="news-image">
                    <div class="lazy-image-placeholder">
                        <div class="lazy-loading-spinner"></div>
                    </div>
                    <img class="lazy-image" data-src="${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="news-content">
                    <div class="news-icon">${categoryIcon}</div>
                    <span class="news-date">${categoryLabel}</span>
                    <h3>${this.renderHTML(post.title)}</h3>
                    <p>${this.renderHTML(post.excerpt)}</p>
                    <a href="${blogUrl}" class="read-more">Read More</a>
                </div>
            </div>
        `;
    }

    // Create business update HTML for index.html
    createIndexBusinessCard(update) {
        if (!update) return '';
        
        const blogUrl = `top_nav/bnb/blog.html?category=business`;
        
        return `
            <div class="news-card business-card">
                <div class="news-image">
                    <img src="${update.image}" alt="${update.title}" onerror="this.style.display='none'">
                </div>
                <div class="news-content">
                    <div class="news-icon">💼</div>
                    <span class="news-date">Business News</span>
                    <h3>${this.renderHTML(update.title)}</h3>
                    <p>${this.renderHTML(update.excerpt)}</p>
                    <a href="${blogUrl}" class="read-more">Read More</a>
                </div>
            </div>
        `;
    }

    // Create blog post HTML for blog.html
    createBlogPostHTML(post) {
        const categoryClass = post.category.toLowerCase();
        const featuredClass = post.featured ? 'featured' : '';
        const featuredBadge = post.featured ? '<div class="featured-badge">Featured</div>' : '';
        
        return `
            <article class="blog-post ${featuredClass}">
                ${featuredBadge}
                <div class="category-badge ${categoryClass}">${post.category}</div>
                <div class="blog-post-image">
                    <div class="lazy-image-placeholder">
                        <div class="lazy-loading-spinner"></div>
                    </div>
                    <img class="lazy-image" data-src="../../${post.image}" alt="${post.title}" loading="lazy">
                </div>
                <div class="blog-post-content">
                    <div class="blog-post-meta">
                        <span class="blog-post-category">${post.category}</span>
                        <span>${this.formatDate(post.date)}</span>
                        <span>${post.readTime}</span>
                    </div>
                    <h2 class="blog-post-title">${this.renderHTML(post.title)}</h2>
                    <div class="blog-post-excerpt-container">
                        <p class="blog-post-excerpt">${this.renderHTML(post.excerpt)}</p>
                    </div>
                    <a href="#" class="blog-post-link" data-post-id="${post.id}" onclick="openArticleModal('${post.id}')">Read More →</a>
                </div>
            </article>
        `;
    }

    // Create recent posts sidebar HTML
    createRecentPostsHTML(posts) {
        const recentPosts = posts.slice(0, 5);
        return recentPosts.map(post => `
            <li>
                <a href="#${post.slug}" class="recent-post-title">${this.renderHTML(post.title)}</a>
                <div class="recent-post-date">${this.formatDate(post.date)}</div>
            </li>
        `).join('');
    }

    // Create categories sidebar HTML
    createCategoriesHTML(posts, selectedCategory = null) {
        const categories = {};
        posts.forEach(post => {
            categories[post.category] = (categories[post.category] || 0) + 1;
        });

        return Object.entries(categories).map(([category, count]) => {
            const isActive = selectedCategory && category.toLowerCase() === selectedCategory.toLowerCase();
            const activeClass = isActive ? 'active' : '';
            const href = isActive ? 'blog.html' : `blog.html?category=${category.toLowerCase()}`;
            
            return `
                <li>
                    <a href="${href}" class="category-link ${activeClass}">
                        <span>${category}</span>
                        <span class="category-count">${count}</span>
                    </a>
                </li>
            `;
        }).join('');
    }

    // Update index.html news section
    async updateIndexNewsSection() {
        await this.loadBlogPosts();
        await this.loadBusinessUpdates();

        // Get latest post from each category
        const latestIndustryNews = this.getLatestPostByCategory('Technology');
        const latestBusinessNews = this.getLatestPostByCategory('Business');
        const latestBitcoinArticle = this.getLatestPostByCategory('Education');

        const newsGrid = document.querySelector('.news-grid');
        if (!newsGrid) return;

        let html = '';

        // Card 1: Industry News (Technology category)
        if (latestIndustryNews) {
            html += this.createIndexBlogCard(latestIndustryNews);
        }

        // Card 2: Business News (Business category)
        if (latestBusinessNews) {
            html += this.createIndexBlogCard(latestBusinessNews);
        }

        // Card 3: Bitcoin Article (Education category)
        if (latestBitcoinArticle) {
            html += this.createIndexBlogCard(latestBitcoinArticle);
        }

        newsGrid.innerHTML = html;

        // Set up lazy loading for index page
        this.setupLazyLoading();
    }

    // Update blog.html content
    async updateBlogPage() {
        console.log('updateBlogPage called');
        await this.loadBlogPosts();

        // Get category from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCategory = urlParams.get('category');
        console.log('Selected category from URL:', selectedCategory);

        const blogMain = document.querySelector('.blog-main');
        const recentPostsList = document.querySelector('.recent-posts');
        const categoriesList = document.querySelector('.categories-list');

        console.log('Found elements:', {
            blogMain: !!blogMain,
            recentPostsList: !!recentPostsList,
            categoriesList: !!categoriesList
        });

        // Filter posts by category if specified
        let postsToShow = this.blogPosts;
        if (selectedCategory) {
            postsToShow = this.blogPosts.filter(post => 
                post.category.toLowerCase() === selectedCategory.toLowerCase()
            );
            console.log(`Filtered posts for category "${selectedCategory}":`, postsToShow.length);
        }

        console.log('Posts to show:', postsToShow.length);
        postsToShow.forEach((post, index) => {
            console.log(`Post ${index + 1}:`, {
                id: post.id,
                title: post.title,
                category: post.category,
                contentLength: post.content.length
            });
        });

        if (blogMain) {
            // Get current page from URL
            const urlParams = new URLSearchParams(window.location.search);
            const currentPage = parseInt(urlParams.get('page')) || 1;
            const postsPerPage = 4;
            
            // Calculate pagination
            const startIndex = (currentPage - 1) * postsPerPage;
            const endIndex = startIndex + postsPerPage;
            const paginatedPosts = postsToShow.slice(startIndex, endIndex);
            
            const blogPostsHTML = paginatedPosts.map(post => this.createBlogPostHTML(post)).join('');
            console.log('Generated HTML length:', blogPostsHTML.length);
            console.log('Sample HTML:', blogPostsHTML.substring(0, 200));
            
            // Preserve the back button and add blog posts
            const backButtonHTML = `
                <!-- Back to All Posts button (shown only when category is filtered) -->
                <div class="back-to-all-container" id="backToAllContainer" style="display: none;">
                    <a href="blog.html" class="back-to-all-btn">
                        ← Back to All Posts
                    </a>
                </div>
            `;
            
            blogMain.innerHTML = backButtonHTML + blogPostsHTML;
            
            // Test if the "Read More" links are properly generated
            const readMoreLinks = document.querySelectorAll('.blog-post-link');
            console.log('Read More links found:', readMoreLinks.length);
            readMoreLinks.forEach((link, index) => {
                console.log(`Link ${index}:`, link.getAttribute('onclick'));
            });
        }

        if (recentPostsList) {
            recentPostsList.innerHTML = this.createRecentPostsHTML(this.blogPosts);
        }

        if (categoriesList) {
            categoriesList.innerHTML = this.createCategoriesHTML(this.blogPosts, selectedCategory);
        }

        // Show/hide "Back to All Posts" button based on category filter
        const backToAllContainer = document.getElementById('backToAllContainer');
        if (backToAllContainer) {
            if (selectedCategory) {
                backToAllContainer.style.display = 'block';
            } else {
                backToAllContainer.style.display = 'none';
            }
        }

        // Update pagination
        this.updatePagination(postsToShow, selectedCategory);

        // Set up search functionality
        this.setupSearch();

        // Set up lazy loading
        this.setupLazyLoading();
    }

    // Lazy loading functionality
    setupLazyLoading() {
        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            this.setupIntersectionObserver();
        } else {
            // Fallback for older browsers
            this.setupScrollListener();
        }
    }

    setupIntersectionObserver() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before image comes into view
            threshold: 0.01
        });

        // Observe all lazy images
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    setupScrollListener() {
        // Fallback for browsers without Intersection Observer
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const loadImages = () => {
            lazyImages.forEach(img => {
                if (this.isImageInViewport(img)) {
                    this.loadImage(img);
                }
            });
        };

        // Load images on scroll
        window.addEventListener('scroll', this.throttle(loadImages, 100));
        // Load initial images
        loadImages();
    }

    isImageInViewport(img) {
        const rect = img.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Create new image to preload
        const newImg = new Image();
        
        newImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            
            // Hide placeholder
            const placeholder = img.parentElement.querySelector('.lazy-image-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        };

        newImg.onerror = () => {
            // Hide image if it fails to load
            img.style.display = 'none';
            const placeholder = img.parentElement.querySelector('.lazy-image-placeholder');
            if (placeholder) {
                placeholder.innerHTML = '<span>Image not available</span>';
            }
        };

        newImg.src = src;
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Create pagination HTML
    createPaginationHTML(posts, selectedCategory = null, currentPage = 1) {
        const postsPerPage = 4;
        const totalPosts = posts.length;
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        
        // Pagination debug info
        console.log('Pagination:', {
            totalPosts,
            postsPerPage,
            totalPages,
            currentPage,
            selectedCategory
        });
        
        if (totalPages <= 1) {
            return ''; // No pagination needed
        }

        let html = '';
        
        // Previous button
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            const prevUrl = selectedCategory ? `blog.html?category=${selectedCategory}&page=${prevPage}` : `blog.html?page=${prevPage}`;
            html += `<a href="${prevUrl}" class="pagination-link">← Previous</a>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const isActive = i === currentPage;
            const pageUrl = selectedCategory ? `blog.html?category=${selectedCategory}&page=${i}` : `blog.html?page=${i}`;
            html += `<a href="${pageUrl}" class="pagination-link ${isActive ? 'active' : ''}">${i}</a>`;
        }

        // Next button
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            const nextUrl = selectedCategory ? `blog.html?category=${selectedCategory}&page=${nextPage}` : `blog.html?page=${nextPage}`;
            html += `<a href="${nextUrl}" class="pagination-link">Next →</a>`;
        }

        return html;
    }

    // Update pagination
    updatePagination(posts, selectedCategory = null) {
        const paginationContainer = document.getElementById('blogPagination');
        
        if (!paginationContainer) return;

        // Get current page from URL
        const urlParams = new URLSearchParams(window.location.search);
        const currentPage = parseInt(urlParams.get('page')) || 1;

        const paginationHTML = this.createPaginationHTML(posts, selectedCategory, currentPage);
        paginationContainer.innerHTML = paginationHTML;
    }

    // Search functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResultsInfo = document.getElementById('searchResultsInfo');
        
        if (!searchInput) return;

        let searchTimeout;

        // Load search history
        this.loadSearchHistory();

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300); // Debounce search
        });

        // Show/hide search history on focus/blur
        searchInput.addEventListener('focus', () => {
            this.showSearchHistory();
        });

        searchInput.addEventListener('blur', () => {
            // Delay hiding to allow clicking on history items
            setTimeout(() => {
                this.hideSearchHistory();
            }, 200);
        });

        // Handle keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateSearchHistory(e.key);
            } else if (e.key === 'Enter') {
                this.hideSearchHistory();
            }
        });

        // Clear search when input is cleared
        searchInput.addEventListener('keyup', (e) => {
            if (e.target.value === '') {
                this.clearSearch();
            }
        });
    }

    // Search history management
    loadSearchHistory() {
        const history = this.getSearchHistory();
        this.renderSearchHistory(history);
    }

    getSearchHistory() {
        try {
            const history = localStorage.getItem('blogSearchHistory');
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('Error loading search history:', error);
            return [];
        }
    }

    saveSearchHistory(searchTerm) {
        if (!searchTerm.trim()) return;

        try {
            let history = this.getSearchHistory();
            
            // Remove if already exists
            history = history.filter(term => term !== searchTerm);
            
            // Add to beginning
            history.unshift(searchTerm);
            
            // Keep only last 10 searches
            history = history.slice(0, 10);
            
            localStorage.setItem('blogSearchHistory', JSON.stringify(history));
            this.renderSearchHistory(history);
        } catch (error) {
            console.error('Error saving search history:', error);
        }
    }

    renderSearchHistory(history) {
        const searchHistory = document.getElementById('searchHistory');
        if (!searchHistory) return;

        if (history.length === 0) {
            searchHistory.innerHTML = '<div class="search-history-item"><span class="search-history-text">No recent searches</span></div>';
            return;
        }

        const historyHTML = history.map(term => `
            <div class="search-history-item" data-term="${term}">
                <span class="search-history-icon">🔍</span>
                <span class="search-history-text">${term}</span>
                <span class="search-history-remove" onclick="contentLoader.removeFromHistory('${term}')">×</span>
            </div>
        `).join('');

        const clearButton = '<div class="search-history-clear" onclick="contentLoader.clearSearchHistory()">Clear all history</div>';
        
        searchHistory.innerHTML = historyHTML + clearButton;

        // Add click handlers for history items
        searchHistory.querySelectorAll('.search-history-item[data-term]').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('search-history-remove')) {
                    const term = item.getAttribute('data-term');
                    document.getElementById('searchInput').value = term;
                    this.performSearch(term);
                    this.hideSearchHistory();
                }
            });
        });
    }

    showSearchHistory() {
        const searchHistory = document.getElementById('searchHistory');
        if (searchHistory) {
            searchHistory.classList.add('show');
        }
    }

    hideSearchHistory() {
        const searchHistory = document.getElementById('searchHistory');
        if (searchHistory) {
            searchHistory.classList.remove('show');
        }
    }

    navigateSearchHistory(direction) {
        const searchHistory = document.getElementById('searchHistory');
        const items = searchHistory.querySelectorAll('.search-history-item[data-term]');
        const currentIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));
        
        let newIndex;
        if (direction === 'ArrowDown') {
            newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        } else {
            newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        }

        // Remove previous selection
        items.forEach(item => item.classList.remove('selected'));
        
        // Add new selection
        if (items[newIndex]) {
            items[newIndex].classList.add('selected');
        }
    }

    removeFromHistory(term) {
        try {
            let history = this.getSearchHistory();
            history = history.filter(t => t !== term);
            localStorage.setItem('blogSearchHistory', JSON.stringify(history));
            this.renderSearchHistory(history);
        } catch (error) {
            console.error('Error removing from search history:', error);
        }
    }

    clearSearchHistory() {
        try {
            localStorage.removeItem('blogSearchHistory');
            this.renderSearchHistory([]);
        } catch (error) {
            console.error('Error clearing search history:', error);
        }
    }

    performSearch(searchTerm) {
        if (!searchTerm.trim()) {
            this.clearSearch();
            return;
        }

        // Save search term to history
        this.saveSearchHistory(searchTerm);

        const searchResultsInfo = document.getElementById('searchResultsInfo');
        const blogMain = document.querySelector('.blog-main');
        
        // Search in titles, excerpts, and content
        const searchResults = this.blogPosts.filter(post => {
            const searchableText = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
            return searchableText.includes(searchTerm.toLowerCase());
        });

        // Update search results info
        if (searchResultsInfo) {
            searchResultsInfo.textContent = `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} found`;
        }

        // Highlight search results
        if (blogMain) {
            const blogPosts = blogMain.querySelectorAll('.blog-post');
            blogPosts.forEach(post => {
                const postId = post.querySelector('.blog-post-link').getAttribute('data-post-id');
                const isSearchResult = searchResults.some(result => result.id === postId);
                
                if (isSearchResult) {
                    post.classList.add('search-result');
                    this.highlightSearchTerms(post, searchTerm);
                } else {
                    post.classList.remove('search-result');
                    this.removeHighlights(post);
                }
            });
        }
    }

    highlightSearchTerms(postElement, searchTerm) {
        const title = postElement.querySelector('.blog-post-title');
        const excerpt = postElement.querySelector('.blog-post-excerpt');
        
        if (title) {
            title.innerHTML = this.highlightText(title.textContent, searchTerm);
        }
        
        if (excerpt) {
            excerpt.innerHTML = this.highlightText(excerpt.textContent, searchTerm);
        }
    }

    highlightText(text, searchTerm) {
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    removeHighlights(postElement) {
        const title = postElement.querySelector('.blog-post-title');
        const excerpt = postElement.querySelector('.blog-post-excerpt');
        
        if (title) {
            title.innerHTML = title.textContent;
        }
        
        if (excerpt) {
            excerpt.innerHTML = excerpt.textContent;
        }
    }

    clearSearch() {
        const searchResultsInfo = document.getElementById('searchResultsInfo');
        const blogMain = document.querySelector('.blog-main');
        
        if (searchResultsInfo) {
            searchResultsInfo.textContent = '';
        }
        
        if (blogMain) {
            const blogPosts = blogMain.querySelectorAll('.blog-post');
            blogMain.querySelectorAll('.blog-post').forEach(post => {
                post.classList.remove('search-result');
                this.removeHighlights(post);
            });
        }
    }

    // Comments system functionality
    setupComments() {
        const submitBtn = document.getElementById('submitComment');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                this.submitComment();
            });
        }
    }

    submitComment() {
        const nameInput = document.getElementById('commentName');
        const emailInput = document.getElementById('commentEmail');
        const contentInput = document.getElementById('commentContent');
        const submitBtn = document.getElementById('submitComment');

        // Get current post ID from modal
        const modalTitle = document.getElementById('modalTitle');
        const postId = this.getCurrentPostId();

        if (!postId) {
            alert('Error: Could not identify the current post.');
            return;
        }

        // Validate inputs
        if (!nameInput.value.trim() || !emailInput.value.trim() || !contentInput.value.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        // Create comment object
        const comment = {
            id: Date.now().toString(),
            postId: postId,
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            content: contentInput.value.trim(),
            date: new Date().toISOString(),
            timestamp: Date.now()
        };

        // Save comment
        this.saveComment(comment);

        // Clear form
        nameInput.value = '';
        emailInput.value = '';
        contentInput.value = '';

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Post Comment';

        // Reload comments
        this.loadComments(postId);

        // Show success message
        this.showCommentSuccess();
    }

    saveComment(comment) {
        try {
            const comments = this.getComments();
            comments.push(comment);
            localStorage.setItem('blogComments', JSON.stringify(comments));
        } catch (error) {
            console.error('Error saving comment:', error);
            alert('Error saving comment. Please try again.');
        }
    }

    getComments() {
        try {
            const comments = localStorage.getItem('blogComments');
            return comments ? JSON.parse(comments) : [];
        } catch (error) {
            console.error('Error loading comments:', error);
            return [];
        }
    }

    getCommentsForPost(postId) {
        const allComments = this.getComments();
        return allComments.filter(comment => comment.postId === postId);
    }

    loadComments(postId) {
        const commentsList = document.getElementById('commentsList');
        if (!commentsList) return;

        const comments = this.getCommentsForPost(postId);

        if (comments.length === 0) {
            commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
            return;
        }

        // Sort comments by date (newest first)
        comments.sort((a, b) => b.timestamp - a.timestamp);

        const commentsHTML = comments.map(comment => `
            <div class="comment">
                <div class="comment-header">
                    <span class="comment-author">${this.escapeHtml(comment.name)}</span>
                    <span class="comment-date">${this.formatCommentDate(comment.date)}</span>
                </div>
                <div class="comment-content">${this.escapeHtml(comment.content)}</div>
            </div>
        `).join('');

        commentsList.innerHTML = commentsHTML;
    }

    getCurrentPostId() {
        // Try to get post ID from modal title or other elements
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) {
            // Find the post that matches the current modal title
            const post = this.blogPosts.find(p => p.title === modalTitle.textContent);
            return post ? post.id : null;
        }
        return null;
    }

    formatCommentDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showCommentSuccess() {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            font-weight: 600;
        `;
        successMsg.textContent = 'Comment posted successfully!';
        document.body.appendChild(successMsg);

        // Remove after 3 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
    }

    // Author information functionality
    loadAuthorInfo(postId) {
        const authorSection = document.getElementById('authorSection');
        if (!authorSection) return;

        const post = this.blogPosts.find(p => p.id === postId);
        if (!post || !post.author) {
            authorSection.style.display = 'none';
            return;
        }

        const author = post.author;
        const authorHTML = `
            <div class="author-header">
                <img src="../../${author.avatar}" alt="${author.name}" class="author-avatar" onerror="this.style.display='none'">
                <div class="author-info">
                    <div class="author-name">${this.escapeHtml(author.name)}</div>
                    <div class="author-title">Product Growth Lead at Standard Sats</div>
                </div>
            </div>
            <div class="author-bio">${this.escapeHtml(author.bio)}</div>
            <div class="author-social">
                ${author.social.twitter ? `
                    <a href="https://twitter.com/${author.social.twitter.replace('@', '')}" target="_blank" class="social-link twitter">
                        <span>🐦</span>
                        <span>Twitter</span>
                    </a>
                ` : ''}
                ${author.social.linkedin ? `
                    <a href="https://linkedin.com/in/${author.social.linkedin}" target="_blank" class="social-link linkedin">
                        <span>💼</span>
                        <span>LinkedIn</span>
                    </a>
                ` : ''}
                ${author.social.github ? `
                    <a href="https://github.com/${author.social.github}" target="_blank" class="social-link github">
                        <span>📦</span>
                        <span>GitHub</span>
                    </a>
                ` : ''}
            </div>
        `;

        authorSection.innerHTML = authorHTML;
        authorSection.style.display = 'block';
    }

    // Social sharing functionality
    setupSocialSharing() {
        const shareBtn = document.getElementById('modalShareBtn');
        const shareModal = document.getElementById('shareModal');
        const shareModalClose = document.getElementById('shareModalClose');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.openShareModal();
            });
        }
        
        if (shareModalClose) {
            shareModalClose.addEventListener('click', () => {
                this.closeShareModal();
            });
        }
        
        if (shareModal) {
            shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                    this.closeShareModal();
                }
            });
        }

        // Setup share options
        this.setupShareOptions();
    }

    openShareModal() {
        const shareModal = document.getElementById('shareModal');
        const shareUrl = document.getElementById('shareUrl');
        
        if (shareModal && shareUrl) {
            // Get current post info
            const currentPost = this.getCurrentPost();
            if (currentPost) {
                const articleUrl = `${window.location.origin}${window.location.pathname}?article=${currentPost.slug}`;
                shareUrl.value = articleUrl;
                
                // Update share links
                this.updateShareLinks(currentPost);
            }
            
            shareModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeShareModal() {
        const shareModal = document.getElementById('shareModal');
        if (shareModal) {
            shareModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    getCurrentPost() {
        const modalTitle = document.getElementById('modalTitle');
        if (modalTitle) {
            return this.blogPosts.find(p => p.title === modalTitle.textContent);
        }
        return null;
    }

    updateShareLinks(post) {
        const shareUrl = `${window.location.origin}${window.location.pathname}?article=${post.slug}`;
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(post.title);
        const encodedText = encodeURIComponent(`${post.title} - ${post.excerpt.replace(/<[^>]*>/g, '')}`);

        // Update share links
        const shareTwitter = document.getElementById('shareTwitter');
        const shareFacebook = document.getElementById('shareFacebook');
        const shareLinkedIn = document.getElementById('shareLinkedIn');
        const shareWhatsApp = document.getElementById('shareWhatsApp');
        const shareTelegram = document.getElementById('shareTelegram');
        const shareCopy = document.getElementById('shareCopy');

        if (shareTwitter) {
            shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        }
        
        if (shareFacebook) {
            shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        }
        
        if (shareLinkedIn) {
            shareLinkedIn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        }
        
        if (shareWhatsApp) {
            shareWhatsApp.href = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        }
        
        if (shareTelegram) {
            shareTelegram.href = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        }
        
        if (shareCopy) {
            shareCopy.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyToClipboard(shareUrl);
            });
        }
    }

    setupShareOptions() {
        // Add click handlers for share options
        const shareOptions = document.querySelectorAll('.share-option');
        shareOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                if (option.id === 'shareCopy') {
                    e.preventDefault();
                    this.copyToClipboard(document.getElementById('shareUrl').value);
                } else {
                    // Open in new window for external sharing
                    window.open(option.href, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            // Use modern clipboard API
            navigator.clipboard.writeText(text).then(() => {
                this.showCopySuccess();
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        
        document.body.removeChild(textArea);
    }

    showCopySuccess() {
        // Create a temporary success message
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10B981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10003;
            font-weight: 600;
        `;
        successMsg.textContent = 'Link copied to clipboard!';
        document.body.appendChild(successMsg);

        // Remove after 3 seconds
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 3000);
    }
}

// Initialize content loader
const contentLoader = new ContentLoader();

// Auto-detect page and load appropriate content
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    console.log('DOMContentLoaded - Current page:', currentPage);
    
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        console.log('Detected index page - updating news section');
        // On index.html - update news section
        contentLoader.updateIndexNewsSection();
    } else if (currentPage.includes('blog.html')) {
        console.log('Detected blog page - updating blog content');
        // On blog.html - update blog content
        contentLoader.updateBlogPage();
    } else {
        console.log('Page not recognized:', currentPage);
    }
}); 