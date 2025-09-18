// Content Cleaner for Valet.finance
// This class handles cleaning and sanitizing blog content

class ContentCleaner {
    constructor() {
        // Initialize any configuration options here
    }

    // Clean blog post excerpt
    cleanExcerpt(excerpt) {
        if (!excerpt) return '';
        
        return excerpt
            // Comment out image tags
            .replace(/<img[^>]*>/g, '<!-- $& -->')
            // Remove all HTML except basic formatting
            .replace(/<(?!\/?(em|strong|b|i))[^>]+>/g, '')
            // Trim whitespace
            .trim();
    }

    // Clean blog post content for modal display
    cleanContent(content) {
        if (!content) return '';
        
        return content
            // Fix code block formatting
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                return `<pre><code class="language-${lang || 'plaintext'}">${this.escapeHtml(code.trim())}</code></pre>`;
            })
            // Process inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Resize article content images
            .replace(/<img[^>]*src="([^"]+)"[^>]*>/g, (match, src) => {
                // Extract any existing classes and alt text
                const classMatch = match.match(/class="([^"]+)"/);
                const altMatch = match.match(/alt="([^"]+)"/);
                const classes = classMatch ? classMatch[1] : '';
                const alt = altMatch ? altMatch[1] : '';
                
                // Add resized class and style for article content images
                return `<img src="${src}" class="${classes} article-content-image" 
                    style="width: 50%; height: auto;" alt="${alt}">`;
            })
            // Fix URLs to be relative to root
            .replace(/src="(?!http|\/\/|data:)(.*?)"/g, 'src="../../$1"')
            .replace(/href="(?!http|\/\/|mailto:|#)(.*?)"/g, 'href="../../$1"')
            // Convert markdown-style headers
            .replace(/^#{1,6}\s+(.*)$/gm, (match, text) => {
                const level = match.trim().split('#').length - 1;
                return `<h${level}>${text.trim()}</h${level}>`;
            })
            // Convert markdown-style links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            // Convert markdown-style bold
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            // Convert markdown-style italic
            .replace(/\*([^*]+)\*/g, '<em>$1</em>')
            // Convert markdown-style lists
            .replace(/^-\s+(.*)$/gm, '<li>$1</li>')
            .replace(/((?:<li>.*<\/li>\n)+)/g, '<ul>$1</ul>')
            // Fix double escaping of entities
            .replace(/&amp;([a-z]+);/g, '&$1;')
            // Fix newlines
            .replace(/\n\n+/g, '</p><p>')
            .replace(/\n/g, '<br>')
            // Wrap in paragraphs if not already wrapped
            .replace(/^(?!<[hp]|<ul|<pre)(.+)$/gm, '<p>$1</p>')
            // Remove empty paragraphs
            .replace(/<p>\s*<\/p>/g, '')
            // Trim whitespace
            .trim();
    }

    // Helper method to escape HTML special characters
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
