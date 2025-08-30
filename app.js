// PM Internship Recommendation App - JavaScript (English Only)

class InternshipApp {
    constructor() {
        this.currentScreen = 'welcome-screen';
        this.userProfile = {
            education: null,
            skills: [],
            sectors: [],
            location: null,
            state: null
        };
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
            skills_required: ["Communication", "English", "Computer Basics"],
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
            skills_required: ["Teaching", "Patience", "Communication"],
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
        {id: "communication", name: "Communication", icon: "💬"},
        {id: "computer", name: "Computer Skills", icon: "💻"},
        {id: "english", name: "English", icon: "📝"},
        {id: "mathematics", name: "Mathematics", icon: "🔢"},
        {id: "sales", name: "Sales", icon: "🤝"},
        {id: "customer_service", name: "Customer Service", icon: "👥"},
        {id: "technical", name: "Technical Skills", icon: "🔧"},
        {id: "teaching", name: "Teaching", icon: "📚"},
        {id: "healthcare", name: "Healthcare", icon: "🏥"},
        {id: "agriculture", name: "Agriculture", icon: "🌱"},
        {id: "organization", name: "Organization", icon: "📋"}
    ];

    sectors = [
        {id: "technology", name: "Technology", icon: "💻"},
        {id: "healthcare", name: "Healthcare", icon: "🏥"},
        {id: "banking", name: "Banking", icon: "🏦"},
        {id: "retail", name: "Retail", icon: "🛒"},
        {id: "education", name: "Education", icon: "📚"},
        {id: "manufacturing", name: "Manufacturing", icon: "🏭"},
        {id: "agriculture", name: "Agriculture", icon: "🌾"},
        {id: "telecommunications", name: "Telecommunications", icon: "📱"},
        {id: "ecommerce", name: "E-commerce", icon: "📦"}
    ];

    states = [
        "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Uttar Pradesh", 
        "Telangana", "Rajasthan", "Madhya Pradesh", "West Bengal", "Haryana", "Punjab"
    ];

    init() {
        this.populateSkillsGrid();
        this.populateSectorsGrid();
        this.populateStateDropdown();
        this.setupEventListeners();
    }

    // Screen navigation
    showScreen(screenId) {        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
        }

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
        
        const stateSelector = document.getElementById('state-selector');
        if (stateSelector) stateSelector.classList.add('hidden');
        
        const stateDropdown = document.getElementById('state-dropdown');
        if (stateDropdown) stateDropdown.value = '';
        
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
                <div class="skill-name">${skill.name}</div>
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
                <div class="sector-name">${sector.name}</div>
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
        
        // Find and select the clicked card
        const cards = document.querySelectorAll('#education-screen .selection-card');
        cards.forEach(card => {
            if (card.getAttribute('onclick') && card.getAttribute('onclick').includes(level)) {
                card.classList.add('selected');
            }
        });
        
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
            this.showTemporaryMessage('You can only select 3 sectors');
            return;
        }
        
        this.updateSkillsNextButton();
    }

    updateSkillsNextButton() {
        const hasSkills = this.userProfile.skills.length > 0;
        const hasSectors = this.userProfile.sectors.length > 0;
        const nextBtn = document.getElementById('skills-next');
        
        if (nextBtn) {
            nextBtn.disabled = !(hasSkills && hasSectors);
        }
    }

    selectLocation(type) {        
        // Remove previous selection
        document.querySelectorAll('.location-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Find and select the clicked card
        const cards = document.querySelectorAll('.location-card');
        cards.forEach(card => {
            if (card.getAttribute('onclick') && card.getAttribute('onclick').includes(type)) {
                card.classList.add('selected');
            }
        });
        
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
                    <h3>No suitable internships found</h3>
                    <p>Please try again with different preferences</p>
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
                <div class="score-badge">${matchPercentage}% Match</div>
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
                    <button class="btn btn--primary apply-btn" data-internship-id="${internship.id}">
                        Apply Now
                    </button>
                    <button class="btn btn--secondary details-btn" data-internship-id="${internship.id}">
                        View Details
                    </button>
                </div>
                
                <div class="job-description" id="details-${internship.id}">
                    <h4>Job Description</h4>
                    <p>${internship.description}</p>
                    <h4>Required Skills</h4>
                    <p>${internship.skills_required.join(', ')}</p>
                </div>
            `;
            
            container.appendChild(card);
        });

        // Add event listeners to recommendation buttons
        this.setupRecommendationListeners();
    }

    setupRecommendationListeners() {
        // Apply buttons
        document.querySelectorAll('.apply-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const internshipId = parseInt(e.target.getAttribute('data-internship-id'));
                this.applyToInternship(internshipId);
            });
        });

        // Details buttons
        document.querySelectorAll('.details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const internshipId = parseInt(e.target.getAttribute('data-internship-id'));
                this.toggleDetails(internshipId, e.target);
            });
        });
    }

    toggleDetails(internshipId, button) {
        const details = document.getElementById(`details-${internshipId}`);
        if (!details) return;
        
        details.classList.toggle('show');
        
        if (details.classList.contains('show')) {
            button.textContent = 'Hide Details';
        } else {
            button.textContent = 'View Details';
        }
    }

    applyToInternship(internshipId) {
        const internship = this.sampleInternships.find(i => i.id === internshipId);
        if (internship) {
            this.showTemporaryMessage(`Applied successfully for ${internship.title}!`);
        }
    }
}

// Initialize the app
let app = null;

// Global functions for HTML onclick handlers
function startApplication() {
    if (app) app.startApplication();
}

function goBack() {
    if (app) app.goBack();
}

function nextStep() {
    if (app) app.nextStep();
}

function selectEducation(level) {
    if (app) app.selectEducation(level);
}

function selectLocation(type) {
    if (app) app.selectLocation(type);
}

function getRecommendations() {
    if (app) app.getRecommendations();
}

function startOver() {
    if (app) app.startOver();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app = new InternshipApp();
    app.init();
});