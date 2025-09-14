# Read the current CSS file
with open('style.css', 'r') as f:
    css_content = f.read()

# Add the styling for the hero image right after the existing hero section styles
# I'll find a good place to insert it, after the .hero-content p styles

hero_image_css = """
/* Hero Image */
.hero-image {
    text-align: center;
    margin: var(--space-24) 0;
}

.internify-logo {
    max-width: 400px;
    width: 100%;
    height: auto;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    transition: transform var(--duration-normal) var(--ease-standard);
}

.internify-logo:hover {
    transform: scale(1.02);
}

/* Responsive adjustments for hero image */
@media (max-width: 768px) {
    .internify-logo {
        max-width: 300px;
    }
}
"""

# Find the position after the hero-content p styles and before the .hero-stats
pattern = r'(\.hero-content p \{[^}]+\})'
replacement = r'\1\n' + hero_image_css

# Insert the CSS
modified_css = re.sub(pattern, replacement, css_content)

# Write the modified CSS back to file
with open('style.css', 'w') as f:
    f.write(modified_css)

print("Successfully added the hero image CSS styling")