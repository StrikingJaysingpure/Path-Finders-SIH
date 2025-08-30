// PM Internship Recommendation App - JavaScript
class InternshipApp {
    constructor() {
        this.currentScreen = 'welcome-screen';
        this.currentLanguage = 'en';
        this.userProfile = {
            education: null,
            skills: [],
            sectors: [],
            location: null,
            state: null
        };
        
        this.init();
    }

    init() {
        this.populateSkillsGrid();
        this.populateSectorsGrid();
        this.populateStateDropdown();
        this.setupEventListeners();
    }

    // Sample data
    sampleInternships = [
        {
            id: 1,
            title: "Customer Service Intern",
            company: "Bharti Airtel",
            location: "Delhi",
            state: "Delhi",
            sector: "Telecommunications",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Communication", "Hindi", "English", "Computer Basics"],
            education_required: "12th Pass",
            description: "Handle customer queries and provide support"
        },
        {
            id: 2,
            title: "Banking Assistant Intern",
            company: "State Bank of India",
            location: "Mumbai",
            state: "Maharashtra", 
            sector: "Banking",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Mathematics", "Communication", "Computer Basics"],
            education_required: "12th Pass",
            description: "Assist customers with basic banking operations"
        },
        {
            id: 3,
            title: "Data Entry Intern",
            company: "Wipro Technologies",
            location: "Bangalore",
            state: "Karnataka",
            sector: "Technology",
            duration: "12 months", 
            stipend: 5000,
            skills_required: ["Computer Skills", "MS Office", "Attention to Detail"],
            education_required: "12th Pass",
            description: "Enter and manage data in computer systems"
        },
        {
            id: 4,
            title: "Healthcare Assistant Intern",
            company: "Apollo Hospitals",
            location: "Chennai",
            state: "Tamil Nadu",
            sector: "Healthcare",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Communication", "Empathy", "Basic Health Knowledge"],
            education_required: "12th Pass",
            description: "Assist medical staff and support patients"
        },
        {
            id: 5,
            title: "Sales Support Intern",
            company: "Reliance Retail",
            location: "Ahmedabad",
            state: "Gujarat",
            sector: "Retail",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Communication", "Sales", "Customer Service"],
            education_required: "12th Pass", 
            description: "Support sales team and help customers"
        },
        {
            id: 6,
            title: "Manufacturing Trainee",
            company: "Tata Motors",
            location: "Pune",
            state: "Maharashtra",
            sector: "Manufacturing", 
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Technical Skills", "Safety Awareness", "Teamwork"],
            education_required: "ITI/Diploma",
            description: "Learn manufacturing processes and quality control"
        },
        {
            id: 7,
            title: "Digital Marketing Assistant",
            company: "Paytm",
            location: "Noida", 
            state: "Uttar Pradesh",
            sector: "Technology",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Social Media", "Communication", "Computer Skills"],
            education_required: "Graduate",
            description: "Assist with social media and online marketing"
        },
        {
            id: 8,
            title: "Logistics Coordinator Intern",
            company: "Amazon India",
            location: "Hyderabad",
            state: "Telangana",
            sector: "E-commerce",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Organization", "Communication", "Problem Solving"],
            education_required: "12th Pass",
            description: "Coordinate deliveries and manage logistics"
        },
        {
            id: 9,
            title: "Teaching Assistant Intern",
            company: "Government School",
            location: "Jaipur",
            state: "Rajasthan",
            sector: "Education",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Teaching", "Patience", "Communication", "Hindi"],
            education_required: "Graduate",
            description: "Assist teachers and support student learning"
        },
        {
            id: 10,
            title: "Agriculture Extension Intern", 
            company: "IFFCO",
            location: "Indore",
            state: "Madhya Pradesh",
            sector: "Agriculture",
            duration: "12 months",
            stipend: 5000,
            skills_required: ["Agriculture Knowledge", "Communication", "Field Work"],
            education_required: "12th Pass",
            description: "Help farmers with modern farming techniques"
        }
    ];

    skillsOptions = [
        {id: "communication", name: "Communication", nameHi: "संवाद", icon: "💬"},
        {id: "computer", name: "Computer Skills", nameHi: "कंप्यूटर कौशल", icon: "💻"},
        {id: "hindi", name: "Hindi", nameHi: "हिंदी", icon: "🗣️"},
        {id: "english", name: "English", nameHi: "अंग्रेजी", icon: "📝"},
        {id: "mathematics", name: "Mathematics", nameHi: "गणित", icon: "🔢"},
        {id: "sales", name: "Sales", nameHi: "बिक्री", icon: "🤝"},
        {id: "customer_service", name: "Customer Service", nameHi: "ग्राहक सेवा", icon: "👥"},
        {id: "technical", name: "Technical Skills", nameHi: "तकनीकी कौशल", icon: "🔧"},
        {id: "teaching", name: "Teaching", nameHi: "शिक्षण", icon: "📚"},
        {id: "healthcare", name: "Healthcare", nameHi: "स्वास्थ्य सेवा", icon: "🏥"},
        {id: "agriculture", name: "Agriculture", nameHi: "कृषि", icon: "🌱"},
        {id: "organization", name: "Organization", nameHi: "संगठन", icon: "📋"}
    ];

    sectors = [
        {id: "technology", name: "Technology", nameHi: "प्रौद्योगिकी", icon: "💻"},
        {id: "healthcare", name: "Healthcare", nameHi: "स्वास्थ्य सेवा", icon: "🏥"},
        {id: "banking", name: "Banking", nameHi: "बैंकिंग", icon: "🏦"},
        {id: "retail", name: "Retail", nameHi: "खुदरा", icon: "🛒"},
        {id: "education", name: "Education", nameHi: "शिक्षा", icon: "📚"},
        {id: "manufacturing", name: "Manufacturing", nameHi: "विनिर्माण", icon: "🏭"},
        {id: "agriculture", name: "Agriculture", nameHi: "कृषि", icon: "🌾"},
        {id: "telecommunications", name: "Telecommunications", nameHi: "दूरसंचार", icon: "📱"},
        {id: "ecommerce", name: "E-commerce", nameHi: "ई-कॉमर्स", icon: "📦"}
    ];

    states = [
        "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Uttar Pradesh", 
        "Telangana", "Rajasthan", "Madhya Pradesh", "West Bengal", "Haryana", "Punjab"
    ];

    // Language management
    setLanguage(lang) {
        this.currentLanguage = lang;
        this.updateLanguageDisplay();
        
        // Auto-proceed to first step after language selection
        setTimeout(() => {
            this.showScreen('education-screen');
        }, 500);
    }

    updateLanguageDisplay() {
        const elements = document.querySelectorAll('[data-en][data-hi]');
        elements.forEach(element => {
            const text = this.currentLanguage === 'hi' ? element.getAttribute('data-hi') : element.getAttribute('data-en');
            element.textContent = text;
        });

        // Update skills and sectors with language-specific names
        this.populateSkillsGrid();
        this.populateSectorsGrid();
    }

    // Screen navigation
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        document.getElementById(screenId).classList.add('active');
        this.currentScreen = screenId;

        // Scroll to top
        window.scrollTo(0, 0);
    }

    startApplication() {
        this.showScreen('education-screen');
    }

    goBack() {
        const screens = ['welcome-screen', 'education-screen', 'skills-screen', 'location-screen'];
        const currentIndex = screens.indexOf(this.currentScreen);
        if (currentIndex > 0) {
            this.showScreen(screens[currentIndex - 1]);
        }
    }

    nextStep() {
        switch(this.currentScreen) {
            case 'education-screen':
                this.showScreen('skills-screen');
                break;
            case 'skills-screen':
                this.showScreen('location-screen');
                break;
        }
    }

    startOver() {
        this.userProfile = {
            education: null,
            skills: [],
            sectors: [],
            location: null,
            state: null
        };
        
        // Reset form selections
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        document.querySelectorAll('.next-btn').forEach(btn => btn.disabled = true);
        document.getElementById('state-selector').classList.add('hidden');
        document.getElementById('state-dropdown').value = '';
        
        this.showScreen('welcome-screen');
    }

    // Form population
    populateSkillsGrid() {
        const grid = document.getElementById('skills-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.skillsOptions.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-item';
            skillElement.setAttribute('data-skill', skill.id);
            skillElement.setAttribute('tabindex', '0');
            skillElement.innerHTML = `
                <div class="skill-icon">${skill.icon}</div>
                <div class="skill-name">${this.currentLanguage === 'hi' ? skill.nameHi : skill.name}</div>
            `;
            
            // Add click handler
            skillElement.addEventListener('click', () => this.toggleSkill(skill.id, skillElement));
            skillElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSkill(skill.id, skillElement);
                }
            });
            
            grid.appendChild(skillElement);
        });
    }

    populateSectorsGrid() {
        const grid = document.getElementById('sectors-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.sectors.forEach(sector => {
            const sectorElement = document.createElement('div');
            sectorElement.className = 'sector-item';
            sectorElement.setAttribute('data-sector', sector.id);
            sectorElement.setAttribute('tabindex', '0');
            sectorElement.innerHTML = `
                <div class="sector-icon">${sector.icon}</div>
                <div class="sector-name">${this.currentLanguage === 'hi' ? sector.nameHi : sector.name}</div>
            `;
            
            // Add click handler
            sectorElement.addEventListener('click', () => this.toggleSector(sector.id, sectorElement));
            sectorElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleSector(sector.id, sectorElement);
                }
            });
            
            grid.appendChild(sectorElement);
        });
    }

    populateStateDropdown() {
        const dropdown = document.getElementById('state-dropdown');
        if (!dropdown) return;
        
        // Clear existing options except the first one
        dropdown.innerHTML = '<option value="">Choose a state</option>';
        
        this.states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            dropdown.appendChild(option);
        });
    }

    // Form interactions
    selectEducation(level) {
        // Remove previous selection
        document.querySelectorAll('#education-screen .selection-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection to clicked card  
        const clickedCard = document.querySelector(`#education-screen .selection-card[onclick*="${level}"]`) || 
                            event.target.closest('.selection-card');
        if (clickedCard) {
            clickedCard.classList.add('selected');
        }
        
        // Update user profile
        this.userProfile.education = level;
        
        // Enable next button
        const nextBtn = document.getElementById('education-next');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
    }

    toggleSkill(skillId, element) {
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            this.userProfile.skills = this.userProfile.skills.filter(s => s !== skillId);
        } else {
            element.classList.add('selected');
            this.userProfile.skills.push(skillId);
        }
        
        console.log('Skills updated:', this.userProfile.skills); // Debug log
        this.updateSkillsNextButton();
    }

    toggleSector(sectorId, element) {
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            this.userProfile.sectors = this.userProfile.sectors.filter(s => s !== sectorId);
        } else if (this.userProfile.sectors.length < 3) {
            element.classList.add('selected');
            this.userProfile.sectors.push(sectorId);
        } else {
            // Show message about 3 sector limit
            this.showTemporaryMessage(this.currentLanguage === 'hi' ? 
                'केवल 3 क्षेत्र चुन सकते हैं' : 'You can only select 3 sectors');
            return;
        }
        
        console.log('Sectors updated:', this.userProfile.sectors); // Debug log
        this.updateSkillsNextButton();
    }

    updateSkillsNextButton() {
        const hasSkills = this.userProfile.skills.length > 0;
        const hasSectors = this.userProfile.sectors.length > 0;
        const nextBtn = document.getElementById('skills-next');
        
        console.log('Updating button - Skills:', hasSkills, 'Sectors:', hasSectors); // Debug log
        
        if (nextBtn) {
            nextBtn.disabled = !(hasSkills && hasSectors);
            console.log('Button disabled:', nextBtn.disabled); // Debug log
        }
    }

    selectLocation(type) {
        // Remove previous selection
        document.querySelectorAll('.location-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Add selection to clicked card
        const clickedCard = event.target.closest('.location-card');
        if (clickedCard) {
            clickedCard.classList.add('selected');
        }
        
        // Update user profile
        this.userProfile.location = type;
        
        const stateSelector = document.getElementById('state-selector');
        const nextBtn = document.getElementById('location-next');
        
        if (type === 'specific') {
            if (stateSelector) stateSelector.classList.remove('hidden');
            if (nextBtn) nextBtn.disabled = true;
        } else {
            if (stateSelector) stateSelector.classList.add('hidden');
            if (nextBtn) nextBtn.disabled = false;
            this.userProfile.state = null;
        }
    }

    setupEventListeners() {
        // State dropdown change
        const stateDropdown = document.getElementById('state-dropdown');
        if (stateDropdown) {
            stateDropdown.addEventListener('change', (e) => {
                this.userProfile.state = e.target.value;
                const nextBtn = document.getElementById('location-next');
                if (nextBtn) {
                    nextBtn.disabled = !e.target.value;
                }
            });
        }
    }

    showTemporaryMessage(message) {
        // Create temporary message element
        const messageEl = document.createElement('div');
        messageEl.className = 'temporary-message';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-primary);
            color: var(--color-btn-primary-text);
            padding: var(--space-16) var(--space-24);
            border-radius: var(--radius-lg);
            z-index: 1000;
            font-weight: var(--font-weight-medium);
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            if (document.body.contains(messageEl)) {
                document.body.removeChild(messageEl);
            }
        }, 2000);
    }

    // Recommendation logic
    async getRecommendations() {
        this.showScreen('loading-screen');
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const recommendations = this.calculateRecommendations();
        this.displayRecommendations(recommendations);
        this.showScreen('recommendations-screen');
    }

    calculateRecommendations() {
        const scoredInternships = this.sampleInternships.map(internship => {
            let score = 0;
            
            // Location matching (40% weight)
            score += this.calculateLocationScore(internship) * 0.4;
            
            // Education matching (25% weight)  
            score += this.calculateEducationScore(internship) * 0.25;
            
            // Skills matching (20% weight)
            score += this.calculateSkillsScore(internship) * 0.2;
            
            // Sector matching (15% weight)
            score += this.calculateSectorScore(internship) * 0.15;
            
            return { ...internship, score };
        });

        // Sort by score and return top 5
        return scoredInternships
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }

    calculateLocationScore(internship) {
        if (this.userProfile.location === 'any') {
            return 70; // Any location preference
        }
        
        if (this.userProfile.state === internship.state) {
            return 100; // Exact state match
        }
        
        // Check nearby states (simplified)
        const nearbyStates = {
            'Delhi': ['Haryana', 'Uttar Pradesh'],
            'Maharashtra': ['Gujarat', 'Madhya Pradesh'],
            'Karnataka': ['Tamil Nadu', 'Telangana'],
            'Gujarat': ['Maharashtra', 'Rajasthan']
        };
        
        const userNearbyStates = nearbyStates[this.userProfile.state] || [];
        if (userNearbyStates.includes(internship.state)) {
            return 60; // Nearby state
        }
        
        return 20; // Different state
    }

    calculateEducationScore(internship) {
        const educationLevels = {
            '10th': 1,
            '12th': 2,
            'iti': 2.5,
            'graduate': 3
        };
        
        const userLevel = educationLevels[this.userProfile.education] || 0;
        const requiredLevel = educationLevels[internship.education_required.toLowerCase().replace('th pass', 'th').replace('/diploma', '')] || 0;
        
        if (userLevel >= requiredLevel) {
            return userLevel > requiredLevel ? 80 : 100; // Meets or exceeds requirement
        }
        
        return 0; // Underqualified
    }

    calculateSkillsScore(internship) {
        if (!internship.skills_required || this.userProfile.skills.length === 0) {
            return 0;
        }
        
        let skillScore = 0;
        let totalSkillsChecked = 0;
        
        // Normalize skills for matching
        const normalizeSkill = (skill) => skill.toLowerCase().replace(/\s+/g, '');
        const userSkillsNormalized = this.userProfile.skills.map(normalizeSkill);
        
        internship.skills_required.forEach(requiredSkill => {
            const requiredNormalized = normalizeSkill(requiredSkill);
            totalSkillsChecked++;
            
            // Direct match
            if (userSkillsNormalized.includes(requiredNormalized) || 
                requiredNormalized.includes('communication') && userSkillsNormalized.includes('communication') ||
                requiredNormalized.includes('computer') && userSkillsNormalized.includes('computer') ||
                requiredNormalized.includes('hindi') && userSkillsNormalized.includes('hindi') ||
                requiredNormalized.includes('english') && userSkillsNormalized.includes('english')) {
                skillScore += 100;
            }
            // Related skills
            else if ((requiredNormalized.includes('technical') && userSkillsNormalized.includes('computer')) ||
                     (requiredNormalized.includes('customer') && userSkillsNormalized.includes('communication')) ||
                     (requiredNormalized.includes('office') && userSkillsNormalized.includes('computer'))) {
                skillScore += 60;
            }
            // Transferable skills
            else if (userSkillsNormalized.includes('communication') || 
                     userSkillsNormalized.includes('computer') ||
                     userSkillsNormalized.includes('organization')) {
                skillScore += 40;
            }
        });
        
        return totalSkillsChecked > 0 ? skillScore / totalSkillsChecked : 0;
    }

    calculateSectorScore(internship) {
        if (this.userProfile.sectors.length === 0) {
            return 40; // General interest
        }
        
        const internshipSectorNormalized = internship.sector.toLowerCase();
        
        for (let userSector of this.userProfile.sectors) {
            const sectorObj = this.sectors.find(s => s.id === userSector);
            if (sectorObj) {
                const sectorNameNormalized = sectorObj.name.toLowerCase();
                
                // Direct match
                if (internshipSectorNormalized.includes(sectorNameNormalized) || 
                    sectorNameNormalized.includes(internshipSectorNormalized)) {
                    return 100;
                }
                
                // Related sectors
                const relatedSectors = {
                    'technology': ['e-commerce', 'telecommunications'],
                    'healthcare': ['education'],
                    'retail': ['e-commerce'],
                    'manufacturing': ['agriculture']
                };
                
                if (relatedSectors[userSector] && 
                    relatedSectors[userSector].some(related => internshipSectorNormalized.includes(related))) {
                    return 70;
                }
            }
        }
        
        return 40; // General interest
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('recommendations-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (recommendations.length === 0) {
            container.innerHTML = `
                <div class="no-recommendations">
                    <h3>${this.currentLanguage === 'hi' ? 'कोई उपयुक्त इंटर्नशिप नहीं मिली' : 'No suitable internships found'}</h3>
                    <p>${this.currentLanguage === 'hi' ? 'कृपया अपनी प्राथमिकताएं बदलकर फिर से कोशिश करें' : 'Please try again with different preferences'}</p>
                </div>
            `;
            return;
        }
        
        recommendations.forEach((internship, index) => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            
            const companyInitial = internship.company.charAt(0);
            const matchPercentage = Math.round(internship.score);
            
            card.innerHTML = `
                <div class="score-badge">${matchPercentage}% ${this.currentLanguage === 'hi' ? 'मैच' : 'Match'}</div>
                <div class="recommendation-header">
                    <div class="company-icon">${companyInitial}</div>
                    <div class="recommendation-info">
                        <div class="job-title">${internship.title}</div>
                        <div class="company-name">${internship.company}</div>
                    </div>
                </div>
                
                <div class="recommendation-details">
                    <div class="detail-item">
                        <span class="detail-icon">📍</span>
                        <span>${internship.location}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">📅</span>
                        <span>${internship.duration}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-icon">💰</span>
                        <span>₹${internship.stipend}</span>
                    </div>
                </div>
                
                <div class="recommendation-actions">
                    <button class="btn btn--primary apply-btn" onclick="app.applyToInternship(${internship.id})">
                        ${this.currentLanguage === 'hi' ? 'आवेदन करें' : 'Apply Now'}
                    </button>
                    <button class="btn btn--secondary details-btn" onclick="app.toggleDetails(${internship.id})">
                        ${this.currentLanguage === 'hi' ? 'विवरण देखें' : 'View Details'}
                    </button>
                </div>
                
                <div class="job-description" id="details-${internship.id}">
                    <h4>${this.currentLanguage === 'hi' ? 'काम का विवरण' : 'Job Description'}</h4>
                    <p>${internship.description}</p>
                    <h4>${this.currentLanguage === 'hi' ? 'आवश्यक कौशल' : 'Required Skills'}</h4>
                    <p>${internship.skills_required.join(', ')}</p>
                </div>
            `;
            
            container.appendChild(card);
        });
    }

    toggleDetails(internshipId) {
        const details = document.getElementById(`details-${internshipId}`);
        if (!details) return;
        
        details.classList.toggle('show');
        
        // Find the button that was clicked
        const button = event.target;
        if (details.classList.contains('show')) {
            button.textContent = this.currentLanguage === 'hi' ? 'विवरण छुपाएं' : 'Hide Details';
        } else {
            button.textContent = this.currentLanguage === 'hi' ? 'विवरण देखें' : 'View Details';
        }
    }

    applyToInternship(internshipId) {
        const internship = this.sampleInternships.find(i => i.id === internshipId);
        if (internship) {
            this.showTemporaryMessage(
                this.currentLanguage === 'hi' ? 
                `${internship.title} के लिए आवेदन सफल!` :
                `Applied successfully for ${internship.title}!`
            );
        }
    }
}

// Global functions for HTML onclick events
function setLanguage(lang) {
    if (window.app) {
        window.app.setLanguage(lang);
    }
}

function startApplication() {
    if (window.app) {
        window.app.startApplication();
    }
}

function goBack() {
    if (window.app) {
        window.app.goBack();
    }
}

function nextStep() {
    if (window.app) {
        window.app.nextStep();
    }
}

function selectEducation(level) {
    if (window.app) {
        window.app.selectEducation(level);
    }
}

function selectLocation(type) {
    if (window.app) {
        window.app.selectLocation(type);
    }
}

function getRecommendations() {
    if (window.app) {
        window.app.getRecommendations();
    }
}

function startOver() {
    if (window.app) {
        window.app.startOver();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new InternshipApp();
});

// Text-to-speech support for accessibility (if available)
function speakText(text) {
    if ('speechSynthesis' in window && window.app) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = window.app.currentLanguage === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.app) {
        window.app.goBack();
    }
});