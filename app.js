// PM Internship Portal - Enhanced Application Logic
class PMInternshipPortal {
    constructor() {
        this.currentPage = 'homepage';
        this.userProfile = {
            qualification: null,
            stream: null,
            degree: null,
            degreeStream: null,
            skills: [],
            location: null,
            locationFlexible: false
        };
        this.currentStep = 1;
        this.maxStep = 6;
        this.dataLoaded = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFallbackData();
        this.loadDataAndInitialize();
    }

    setupEventListeners() {
        // Navigation
        document.getElementById('hamburgerBtn').addEventListener('click', () => this.toggleSidebar());
        document.getElementById('closeSidebar').addEventListener('click', () => this.closeSidebar());
        document.getElementById('sidebarOverlay').addEventListener('click', () => this.closeSidebar());
        
        // Authentication
        document.getElementById('loginBtn').addEventListener('click', () => this.showPage('loginPage'));
        document.getElementById('backToHome').addEventListener('click', () => this.showPage('homepage'));
        document.getElementById('authToggleBtn').addEventListener('click', () => this.toggleAuthMode());
        
        // Main workflow
        document.getElementById('getStartedBtn').addEventListener('click', () => this.startWorkflow());
        
        // Back buttons
        document.getElementById('backBtn1').addEventListener('click', () => this.showPage('homepage'));
        document.getElementById('backBtn2').addEventListener('click', () => this.goToStep(1));
        document.getElementById('backBtn3').addEventListener('click', () => this.goToStep(2));
        document.getElementById('backBtn4').addEventListener('click', () => this.goToStep(3));
        document.getElementById('backBtn5').addEventListener('click', () => this.goToStep(4));
        document.getElementById('backBtn6').addEventListener('click', () => this.goToStep(5));
        
        // Skills next button
        document.getElementById('nextBtn5').addEventListener('click', () => this.goToStep(6));
        
        // Start over button
        document.getElementById('startOverBtn').addEventListener('click', () => this.resetAndStart());
        
        // Location search
        document.getElementById('locationSearch').addEventListener('input', (e) => this.filterLocations(e.target.value));

        // Anywhere option
        document.getElementById('anywhereOption').addEventListener('click', () => this.selectAnywhereLocation());

        // Sidebar navigation links
        this.setupSidebarNavigation();
    }

    setupSidebarNavigation() {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        sidebarLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeSidebar();
                
                const linkText = link.textContent;
                setTimeout(() => {
                    alert(`${linkText} page - This would normally navigate to detailed information about ${linkText.toLowerCase()}. This is a prototype demonstration.`);
                }, 300);
            });
        });
    }

    async loadDataAndInitialize() {
        try {
            let attempts = 0;
            const maxAttempts = 50;
            
            const waitForData = () => {
                return new Promise((resolve) => {
                    const checkData = () => {
                        attempts++;
                        if (typeof window.internshipData !== 'undefined' && window.internshipData.length > 0) {
                            resolve(true);
                        } else if (attempts >= maxAttempts) {
                            resolve(false);
                        } else {
                            setTimeout(checkData, 100);
                        }
                    };
                    checkData();
                });
            };

            const dataLoaded = await waitForData();
            
            if (dataLoaded) {
                this.internshipData = window.internshipData;
                console.log('External data loaded:', this.internshipData.length, 'internships');
                this.extractOptionsFromData();
            } else {
                console.log('Using fallback data - external data not available');
            }
            
            this.dataLoaded = true;
            this.populateInitialOptions();
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.dataLoaded = true;
            this.populateInitialOptions();
        }
    }

    extractOptionsFromData() {
        if (!this.internshipData || !Array.isArray(this.internshipData)) {
            console.log('Invalid data structure, using fallback');
            return;
        }

        const data = this.internshipData;
        
        // Extract unique qualifications
        this.qualifications = [...new Set(data.map(item => item.qualification))].filter(Boolean);
        
        // Extract unique streams  
        this.streams = [...new Set(data.map(item => item.stream))].filter(Boolean);
        
        // Extract unique degrees by qualification
        this.degrees = {};
        this.qualifications.forEach(qual => {
            this.degrees[qual] = [...new Set(
                data.filter(item => item.qualification === qual)
                    .map(item => item.degree)
                    .filter(Boolean)
            )];
        });
        
        // Extract unique degree streams
        this.degreeStreams = [...new Set(data.map(item => item.degreeStream))].filter(Boolean);
        
        // Extract unique skills
        const allSkills = [];
        data.forEach(item => {
            if (item.skills && Array.isArray(item.skills)) {
                allSkills.push(...item.skills);
            }
        });
        this.skills = [...new Set(allSkills)].filter(Boolean);
        
        // Extract unique locations
        this.locations = [...new Set(data.map(item => item.location))].filter(Boolean);
        
        console.log('Extracted options:', {
            qualifications: this.qualifications.length,
            streams: this.streams.length,
            skills: this.skills.length,
            locations: this.locations.length
        });
    }

    setupFallbackData() {
        // Set up fallback data from the provided JSON
        this.qualifications = ["12th Pass", "Diploma", "Graduate"];
        this.streams = ["Arts", "Commerce", "Science", "Vocational"];
        this.degrees = {
            "12th Pass": [],
            "Diploma": ["ITI", "Diploma"],
            "Graduate": ["B.A.", "B.Com", "B.E.", "B.Tech", "BBA", "BCA", "B.Sc.", "B.Pharm"]
        };
        this.degreeStreams = ["Accounting", "Biotechnology", "Chemical Engineering", "Civil Engineering", "Computer Science", "Data Science", "Economics", "Electrical Engineering", "Electronics", "Finance", "Human Resources", "Information Technology", "Marketing", "Mathematics", "Mechanical Engineering", "Operations", "Pharmaceutical Sciences", "Physics", "Statistics", "Supply Chain"];
        this.skills = ["Accounting", "AutoCAD", "Business Analytics", "C++", "CAD", "Circuit Design", "Communication", "Data Analysis", "Digital Marketing", "Excel", "Financial Modeling", "HTML/CSS", "Java", "JavaScript", "MATLAB", "MS Office", "Machine Learning", "Market Research", "PLC", "Power BI", "PowerPoint", "Problem Solving", "Python", "Quality Control", "R", "SQL", "Salesforce", "Six Sigma", "SolidWorks", "Statistics", "Tableau", "Teamwork", "Thermodynamics", "Time Management"];
        this.locations = ["Ahmedabad, Gujarat", "Amritsar, Punjab", "Bengaluru, Karnataka", "Bhopal, Madhya Pradesh", "Bhubaneswar, Odisha", "Chandigarh, Chandigarh", "Chennai, Tamil Nadu", "Cochin, Kerala", "Coimbatore, Tamil Nadu", "Delhi, Delhi", "Gurugram, Haryana", "Hyderabad, Telangana", "Indore, Madhya Pradesh", "Jaipur, Rajasthan", "Kolkata, West Bengal", "Lucknow, Uttar Pradesh", "Ludhiana, Punjab", "Mumbai, Maharashtra", "Nagpur, Maharashtra", "Noida, Uttar Pradesh", "Patna, Bihar", "Pune, Maharashtra", "Raipur, Chhattisgarh", "Ranchi, Jharkhand", "Surat, Gujarat", "Trivandrum, Kerala", "Vadodara, Gujarat", "Vijayawada, Andhra Pradesh", "Visakhapatnam, Andhra Pradesh"];
        
        // Enhanced sample internship data with more variety
        this.internshipData = [
            {id: 1, qualification: "Graduate", stream: "Commerce", degree: "BCA", degreeStream: "Computer Science", location: "Jaipur, Rajasthan", company: "TATA CONSULTANCY SERVICES LIMITED", position: "Software Development Intern", skills: ["Python", "Problem Solving", "SQL"]},
            {id: 2, qualification: "12th Pass", stream: "Science", degree: null, degreeStream: null, location: "Mumbai, Maharashtra", company: "WIPRO LIMITED", position: "Operations Intern", skills: ["Java", "Market Research", "MS Office"]},
            {id: 3, qualification: "Graduate", stream: "Commerce", degree: "BBA", degreeStream: "Finance", location: "Bhopal, Madhya Pradesh", company: "ICICI SECURITIES LIMITED", position: "Accounting Intern", skills: ["Digital Marketing", "SQL", "Financial Modeling"]},
            {id: 4, qualification: "Diploma", stream: "Commerce", degree: "ITI", degreeStream: "Computer Science", location: "Patna, Bihar", company: "JUBILANT FOODWORKS LIMITED", position: "Data Analysis Intern", skills: ["R", "Time Management", "Excel"]},
            {id: 5, qualification: "Graduate", stream: "Science", degree: "B.Tech", degreeStream: "Electrical Engineering", location: "Chennai, Tamil Nadu", company: "STEEL AUTHORITY OF INDIA LIMITED", position: "Electronics Intern", skills: ["Excel", "Market Research", "Power BI"]},
            {id: 6, qualification: "Graduate", stream: "Science", degree: "B.Tech", degreeStream: "Computer Science", location: "Bengaluru, Karnataka", company: "INFOSYS LIMITED", position: "Software Development Intern", skills: ["Java", "Python", "SQL"]},
            {id: 7, qualification: "Graduate", stream: "Science", degree: "B.E.", degreeStream: "Mechanical Engineering", location: "Mumbai, Maharashtra", company: "TATA MOTORS LIMITED", position: "Mechanical Engineering Intern", skills: ["AutoCAD", "SolidWorks", "Thermodynamics"]},
            {id: 8, qualification: "Diploma", stream: "Vocational", degree: "Diploma", degreeStream: "Electronics", location: "Hyderabad, Telangana", company: "BHARAT ELECTRONICS LIMITED", position: "Electronics Technician Intern", skills: ["Circuit Design", "Electronics", "PLC"]},
            {id: 9, qualification: "12th Pass", stream: "Commerce", degree: null, degreeStream: null, location: "Delhi, Delhi", company: "RELIANCE INDUSTRIES LIMITED", position: "Sales Assistant Intern", skills: ["Communication", "MS Office", "Teamwork"]},
            {id: 10, qualification: "Graduate", stream: "Commerce", degree: "BBA", degreeStream: "Marketing", location: "Pune, Maharashtra", company: "WIPRO LIMITED", position: "Digital Marketing Intern", skills: ["Digital Marketing", "Market Research", "PowerPoint"]},
            {id: 11, qualification: "Graduate", stream: "Arts", degree: "B.A.", degreeStream: "Economics", location: "Kolkata, West Bengal", company: "STATE BANK OF INDIA", position: "Finance Intern", skills: ["Excel", "Financial Modeling", "Statistics"]},
            {id: 12, qualification: "Diploma", stream: "Science", degree: "Diploma", degreeStream: "Civil Engineering", location: "Surat, Gujarat", company: "LARSEN & TOUBRO LIMITED", position: "Civil Engineering Intern", skills: ["AutoCAD", "CAD", "Problem Solving"]},
            {id: 13, qualification: "Graduate", stream: "Science", degree: "B.Sc.", degreeStream: "Physics", location: "Noida, Uttar Pradesh", company: "DRDO", position: "Research Intern", skills: ["MATLAB", "Statistics", "Problem Solving"]},
            {id: 14, qualification: "12th Pass", stream: "Arts", degree: null, degreeStream: null, location: "Lucknow, Uttar Pradesh", company: "HDFC BANK", position: "Customer Service Intern", skills: ["Communication", "MS Office", "Teamwork"]},
            {id: 15, qualification: "Graduate", stream: "Commerce", degree: "B.Com", degreeStream: "Accounting", location: "Ahmedabad, Gujarat", company: "ADANI ENTERPRISES", position: "Accounting Intern", skills: ["Accounting", "Excel", "Financial Modeling"]}
        ];
        
        console.log('Fallback data initialized with', this.internshipData.length, 'internships');
    }

    populateInitialOptions() {
        if (document.getElementById('qualificationOptions').children.length === 0) {
            this.populateQualifications();
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const hamburger = document.getElementById('hamburgerBtn');
        
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburger.classList.toggle('active');
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        const hamburger = document.getElementById('hamburgerBtn');
        
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.classList.remove('active');
    }

    toggleAuthMode() {
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const authTitle = document.getElementById('authTitle');
        const authSubtitle = document.getElementById('authSubtitle');
        const authToggleBtn = document.getElementById('authToggleBtn');
        const authToggleText = document.getElementById('authToggleText');

        if (loginForm.classList.contains('active')) {
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
            authTitle.textContent = 'Create Your Account';
            authSubtitle.textContent = 'Join thousands of students finding their perfect internships';
            authToggleBtn.textContent = 'Login';
            authToggleText.innerHTML = 'Already have an account? <button type="button" id="authToggleBtn">Login</button>';
        } else {
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
            authTitle.textContent = 'Login to Your Account';
            authSubtitle.textContent = 'Access your personalized internship recommendations';
            authToggleBtn.textContent = 'Sign up';
            authToggleText.innerHTML = 'Don\'t have an account? <button type="button" id="authToggleBtn">Sign up</button>';
        }
        
        document.getElementById('authToggleBtn').addEventListener('click', () => this.toggleAuthMode());
    }

    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        this.currentPage = pageId;
    }

    startWorkflow() {
        this.resetUserProfile();
        
        if (!this.dataLoaded) {
            setTimeout(() => this.startWorkflow(), 200);
            return;
        }
        
        this.goToStep(1);
    }

    resetUserProfile() {
        this.userProfile = {
            qualification: null,
            stream: null,
            degree: null,
            degreeStream: null,
            skills: [],
            location: null,
            locationFlexible: false
        };
        this.currentStep = 1;
    }

    goToStep(step) {
        let actualStep = step;
        
        if (step >= 3) {
            const showDegreeStep = this.userProfile.qualification && this.userProfile.qualification !== '12th Pass';
            
            if (step === 3 && !showDegreeStep) {
                actualStep = step + 1;
            } else if (step === 4 && (!showDegreeStep || !this.userProfile.degree)) {
                actualStep = step + 1;
            }
        }

        if (actualStep > 6) actualStep = 6;

        this.currentStep = actualStep;
        this.showPage(`step${actualStep}`);
        
        const progressPercentage = (actualStep / 6) * 100;
        const progressBar = document.querySelector(`#step${actualStep} .progress-fill`);
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        this.populateCurrentStepOptions(actualStep);
    }

    populateCurrentStepOptions(step) {
        switch(step) {
            case 1: this.populateQualifications(); break;
            case 2: this.populateStreams(); break;
            case 3: this.populateDegrees(); break;
            case 4: this.populateDegreeStreams(); break;
            case 5: this.populateSkills(); break;
            case 6: this.populateLocations(); break;
        }
    }

    populateQualifications() {
        const container = document.getElementById('qualificationOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        const icons = { '12th Pass': '🎓', 'Diploma': '📜', 'Graduate': '🎯' };

        this.qualifications.forEach(qualification => {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.innerHTML = `
                <span class="icon">${icons[qualification] || '📚'}</span>
                <h3>${qualification}</h3>
                <p>Select if this is your highest qualification</p>
            `;
            
            card.addEventListener('click', () => this.selectQualification(qualification));
            container.appendChild(card);
        });
    }

    selectQualification(qualification) {
        this.userProfile.qualification = qualification;
        document.querySelectorAll('#qualificationOptions .selection-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.selection-card').classList.add('selected');
        
        setTimeout(() => this.goToStep(2), 500);
    }

    populateStreams() {
        const container = document.getElementById('streamOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        const icons = { 'Arts': '🎨', 'Commerce': '💼', 'Science': '🔬', 'Vocational': '🔧' };

        this.streams.forEach(stream => {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.innerHTML = `
                <span class="icon">${icons[stream] || '📖'}</span>
                <h3>${stream}</h3>
                <p>Your field of study</p>
            `;
            
            card.addEventListener('click', () => this.selectStream(stream));
            container.appendChild(card);
        });
    }

    selectStream(stream) {
        this.userProfile.stream = stream;
        document.querySelectorAll('#streamOptions .selection-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.selection-card').classList.add('selected');
        
        setTimeout(() => {
            if (this.userProfile.qualification === '12th Pass') {
                this.goToStep(5);
            } else {
                this.goToStep(3);
            }
        }, 500);
    }

    populateDegrees() {
        const container = document.getElementById('degreeOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        const availableDegrees = this.degrees[this.userProfile.qualification] || [];
        
        availableDegrees.forEach(degree => {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.innerHTML = `
                <span class="icon">🎓</span>
                <h3>${degree}</h3>
                <p>Your degree type</p>
            `;
            
            card.addEventListener('click', () => this.selectDegree(degree));
            container.appendChild(card);
        });
    }

    selectDegree(degree) {
        this.userProfile.degree = degree;
        document.querySelectorAll('#degreeOptions .selection-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.selection-card').classList.add('selected');
        
        setTimeout(() => this.goToStep(4), 500);
    }

    populateDegreeStreams() {
        const container = document.getElementById('degreeStreamOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.degreeStreams.forEach(stream => {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.innerHTML = `
                <span class="icon">🎯</span>
                <h3>${stream}</h3>
                <p>Your specialization</p>
            `;
            
            card.addEventListener('click', () => this.selectDegreeStream(stream));
            container.appendChild(card);
        });
    }

    selectDegreeStream(stream) {
        this.userProfile.degreeStream = stream;
        document.querySelectorAll('#degreeStreamOptions .selection-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.target.closest('.selection-card').classList.add('selected');
        
        setTimeout(() => this.goToStep(5), 500);
    }

    populateSkills() {
        const container = document.getElementById('skillsOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.skills.forEach(skill => {
            const badge = document.createElement('div');
            badge.className = 'skill-badge';
            badge.textContent = skill;
            badge.dataset.skill = skill;
            
            badge.addEventListener('click', () => this.toggleSkill(skill, badge));
            container.appendChild(badge);
        });
        
        this.updateSkillsCounter();
    }

    toggleSkill(skill, element) {
        const maxSkills = 3;
        const currentSkills = this.userProfile.skills;
        
        if (currentSkills.includes(skill)) {
            this.userProfile.skills = currentSkills.filter(s => s !== skill);
            element.classList.remove('selected');
        } else if (currentSkills.length < maxSkills) {
            this.userProfile.skills.push(skill);
            element.classList.add('selected');
        }
        
        document.querySelectorAll('.skill-badge').forEach(badge => {
            if (!badge.classList.contains('selected') && this.userProfile.skills.length >= maxSkills) {
                badge.classList.add('disabled');
            } else {
                badge.classList.remove('disabled');
            }
        });
        
        this.updateSkillsCounter();
        this.updateNextButton();
    }

    updateSkillsCounter() {
        const counter = document.getElementById('skillsCount');
        if (counter) {
            counter.textContent = this.userProfile.skills.length;
        }
    }

    updateNextButton() {
        const nextBtn = document.getElementById('nextBtn5');
        if (nextBtn) {
            nextBtn.disabled = this.userProfile.skills.length === 0;
        }
    }

    populateLocations() {
        const container = document.getElementById('locationOptions');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.locations.forEach(location => {
            const item = document.createElement('div');
            item.className = 'location-item';
            item.textContent = location;
            item.dataset.location = location;
            
            item.addEventListener('click', () => this.selectLocation(location));
            container.appendChild(item);
        });
    }

    filterLocations(searchTerm) {
        const items = document.querySelectorAll('.location-item');
        const term = searchTerm.toLowerCase();
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(term) ? 'block' : 'none';
        });
    }

    selectAnywhereLocation() {
        this.userProfile.location = 'anywhere';
        this.userProfile.locationFlexible = true;
        
        // Update UI
        const anywhereCard = document.getElementById('anywhereOption');
        anywhereCard.classList.add('selected');
        
        // Clear other selections
        document.querySelectorAll('.location-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        setTimeout(() => this.showLoadingAndGenerateRecommendations(), 500);
    }

    selectLocation(location) {
        this.userProfile.location = location;
        this.userProfile.locationFlexible = false;
        
        // Update UI
        document.querySelectorAll('.location-item').forEach(item => {
            item.classList.remove('selected');
        });
        event.target.classList.add('selected');
        
        // Clear anywhere selection
        document.getElementById('anywhereOption').classList.remove('selected');
        
        setTimeout(() => this.showLoadingAndGenerateRecommendations(), 500);
    }

    showLoadingAndGenerateRecommendations() {
        this.showPage('loadingPage');
        
        const steps = document.querySelectorAll('.loading-step');
        let currentStep = 0;
        
        const animateStep = () => {
            if (currentStep > 0) {
                steps[currentStep - 1].classList.remove('active');
            }
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
                setTimeout(animateStep, 800);
            } else {
                setTimeout(() => this.generateRecommendations(), 1000);
            }
        };
        
        setTimeout(animateStep, 500);
    }

    generateRecommendations() {
        console.log('Generating recommendations for profile:', this.userProfile);
        
        const recommendations = this.findMatchingInternships();
        this.displayRecommendations(recommendations);
        this.showPage('resultsPage');
    }

    findMatchingInternships() {
        const profile = this.userProfile;
        const matches = [];
        let threshold = 40; // Start with 40% threshold
        
        // First pass - try with standard threshold
        this.internshipData.forEach(internship => {
            const score = this.calculateMatchScore(profile, internship);
            if (score >= threshold) {
                matches.push({
                    ...internship,
                    matchScore: score,
                    matchedSkills: this.getMatchedSkills(profile.skills, internship.skills || []),
                    matchReason: this.getMatchReason(profile, internship, score)
                });
            }
        });
        
        // If we have fewer than 3 matches, progressively lower threshold
        if (matches.length < 3) {
            const thresholds = [30, 20, 10, 0];
            
            for (const newThreshold of thresholds) {
                if (matches.length >= 5) break;
                
                this.internshipData.forEach(internship => {
                    const score = this.calculateMatchScore(profile, internship);
                    if (score >= newThreshold && score < threshold && 
                        !matches.find(m => m.id === internship.id)) {
                        matches.push({
                            ...internship,
                            matchScore: score,
                            matchedSkills: this.getMatchedSkills(profile.skills, internship.skills || []),
                            matchReason: this.getMatchReason(profile, internship, score),
                            isAlternative: score < 40
                        });
                    }
                });
                
                threshold = newThreshold;
            }
        }
        
        // Ensure we have at least 3 recommendations
        if (matches.length < 3) {
            // Add highest scoring remaining internships
            const remaining = this.internshipData.filter(internship => 
                !matches.find(m => m.id === internship.id)
            );
            
            remaining.forEach(internship => {
                if (matches.length >= 5) return;
                
                const score = this.calculateMatchScore(profile, internship);
                matches.push({
                    ...internship,
                    matchScore: score,
                    matchedSkills: this.getMatchedSkills(profile.skills, internship.skills || []),
                    matchReason: this.getMatchReason(profile, internship, score),
                    isAlternative: true
                });
            });
        }
        
        // Sort by match score and return top results
        return matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);
    }

    calculateMatchScore(profile, internship) {
        let score = 0;
        
        // Qualification match (30% weight)
        if (profile.qualification === internship.qualification) {
            score += 30;
        } else if (this.isQualificationCompatible(profile.qualification, internship.qualification)) {
            score += 15;
        }
        
        // Stream match (20% weight)
        if (profile.stream === internship.stream) {
            score += 20;
        }
        
        // Degree match (15% weight) - only if user has a degree
        if (profile.degree && internship.degree && profile.degree === internship.degree) {
            score += 15;
        }
        
        // Degree stream match (15% weight) - only if user has degree stream
        if (profile.degreeStream && internship.degreeStream && 
            profile.degreeStream === internship.degreeStream) {
            score += 15;
        }
        
        // Skills match (20% weight)
        const skillsMatch = this.calculateSkillsMatch(profile.skills, internship.skills || []);
        score += skillsMatch * 20;
        
        // Location bonus (not part of core score, but adds if matching and not flexible)
        if (!profile.locationFlexible && profile.location === internship.location) {
            score += 5; // Small bonus for location match
        }
        
        return Math.round(Math.max(0, Math.min(100, score)));
    }

    isQualificationCompatible(userQual, jobQual) {
        const hierarchy = {
            'Graduate': ['Graduate', 'Diploma', '12th Pass'],
            'Diploma': ['Diploma', '12th Pass'],
            '12th Pass': ['12th Pass']
        };
        
        return hierarchy[userQual] && hierarchy[userQual].includes(jobQual);
    }

    calculateSkillsMatch(userSkills, jobSkills) {
        if (!userSkills.length || !jobSkills.length) return 0;
        
        const matchedSkills = userSkills.filter(skill => 
            jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
        );
        
        return matchedSkills.length / Math.max(userSkills.length, jobSkills.length);
    }

    getMatchedSkills(userSkills, jobSkills) {
        return userSkills.filter(skill => 
            jobSkills.some(jobSkill => jobSkill.toLowerCase() === skill.toLowerCase())
        );
    }

    getMatchReason(profile, internship, score) {
        const reasons = [];
        
        if (profile.qualification === internship.qualification) {
            reasons.push("Perfect qualification match");
        } else if (this.isQualificationCompatible(profile.qualification, internship.qualification)) {
            reasons.push("Compatible qualification level");
        }
        
        if (profile.stream === internship.stream) {
            reasons.push("Stream alignment");
        }
        
        if (profile.degreeStream && internship.degreeStream && 
            profile.degreeStream === internship.degreeStream) {
            reasons.push("Specialization match");
        }
        
        const matchedSkills = this.getMatchedSkills(profile.skills, internship.skills || []);
        if (matchedSkills.length > 0) {
            reasons.push(`${matchedSkills.length} skill(s) match`);
        }
        
        if (profile.locationFlexible) {
            reasons.push("Open to any location");
        } else if (profile.location === internship.location) {
            reasons.push("Location preference match");
        }
        
        if (score < 40) {
            reasons.push("Consider broadening criteria");
        }
        
        return reasons.length > 0 ? reasons.join(" • ") : "Alternative opportunity";
    }

    displayRecommendations(recommendations) {
        const container = document.getElementById('resultsGrid');
        const alternativesSection = document.getElementById('alternativesSection');
        const alternativesGrid = document.getElementById('alternativesGrid');
        const resultsDescription = document.getElementById('resultsDescription');
        
        if (!container) return;
        
        container.innerHTML = '';
        alternativesGrid.innerHTML = '';
        
        const primaryRecommendations = recommendations.filter(r => !r.isAlternative);
        const alternativeRecommendations = recommendations.filter(r => r.isAlternative);
        
        // Update results description
        if (this.userProfile.locationFlexible) {
            resultsDescription.textContent = "Based on your profile and location flexibility, here are opportunities from across India";
        } else {
            resultsDescription.textContent = "Based on your profile and preferences, here are the best matches we found for you";
        }
        
        // Show primary recommendations
        if (primaryRecommendations.length > 0) {
            primaryRecommendations.forEach(internship => {
                const card = this.createRecommendationCard(internship);
                container.appendChild(card);
            });
        }
        
        // Show alternatives if any
        if (alternativeRecommendations.length > 0) {
            alternativesSection.style.display = 'block';
            alternativeRecommendations.forEach(internship => {
                const card = this.createRecommendationCard(internship, true);
                alternativesGrid.appendChild(card);
            });
        } else {
            alternativesSection.style.display = 'none';
        }
        
        // If no primary recommendations, show message
        if (primaryRecommendations.length === 0 && alternativeRecommendations.length > 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 24px; background: var(--color-bg-2); border-radius: var(--radius-lg);">
                    <h3>Expanding Your Search</h3>
                    <p>We've found some opportunities that might interest you by broadening the matching criteria. Consider these alternatives below.</p>
                </div>
            `;
        }
    }

    createRecommendationCard(internship, isAlternative = false) {
        const card = document.createElement('div');
        card.className = `result-card ${this.getMatchQualityClass(internship.matchScore)}`;
        
        const matchedSkills = internship.matchedSkills || [];
        const unmatchedSkills = (internship.skills || []).filter(skill => 
            !matchedSkills.some(matched => matched.toLowerCase() === skill.toLowerCase())
        );
        
        const badges = this.generateMatchBadges(internship);
        
        card.innerHTML = `
            <div class="result-header">
                <div class="result-company">${internship.company}</div>
                <div class="result-position">${internship.position}</div>
                <div class="result-location">📍 ${internship.location}</div>
            </div>
            <div class="result-body">
                <div class="match-score">
                    <div class="match-percentage">${internship.matchScore}%</div>
                    <div class="match-label">Match</div>
                </div>
                
                ${badges.length > 0 ? `
                <div class="match-badges">
                    ${badges.map(badge => `<span class="match-badge ${badge.class}">${badge.text}</span>`).join('')}
                </div>` : ''}
                
                <div class="match-explanation">
                    <strong>Why this match?</strong> ${internship.matchReason}
                </div>
                
                <div class="skills-match">
                    <h4>Required Skills</h4>
                    <div class="skills-list">
                        ${matchedSkills.map(skill => `<span class="skill-tag matched">${skill}</span>`).join('')}
                        ${unmatchedSkills.map(skill => `<span class="skill-tag unmatched">${skill}</span>`).join('')}
                    </div>
                </div>
                <button class="btn btn--primary btn--full-width" onclick="alert('This would redirect to the application form for ${internship.company.replace(/'/g, "\\'")} - ${internship.position.replace(/'/g, "\\'")}')">Apply Now</button>
            </div>
        `;
        
        return card;
    }

    generateMatchBadges(internship) {
        const badges = [];
        const profile = this.userProfile;
        
        if (internship.matchedSkills && internship.matchedSkills.length > 0) {
            badges.push({ text: "Skills Match", class: "skills-match" });
        }
        
        if (profile.qualification === internship.qualification) {
            badges.push({ text: "Qualification Match", class: "qualification-match" });
        }
        
        if (profile.locationFlexible) {
            badges.push({ text: "Open to All Locations", class: "location-flexible" });
        }
        
        return badges;
    }

    getMatchQualityClass(score) {
        if (score >= 60) return 'match-quality-high';
        if (score >= 40) return 'match-quality-medium';
        return 'match-quality-low';
    }

    resetAndStart() {
        this.resetUserProfile();
        this.showPage('homepage');
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PMInternshipPortal();
});