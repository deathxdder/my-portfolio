    lucide.createIcons();

    const projects = [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-featured online store with cart functionality, user authentication, and payment processing.',
        status: 'completed',
        tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        link: 'https://github.com/deathxdder',
        image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: '2',
        title: 'Task Management App',
        description: 'A Kanban-style project management tool with drag-and-drop functionality.',
        status: 'in-progress',
        tags: ['Vue', 'TypeScript', 'Firebase'],
        link: 'https://github.com/deathxdder',
        image: 'https://images.pexels.com/photos/3243/pen-calendar-to-do-checklist.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        id: '3',
        title: 'Portfolio Website',
        description: 'A responsive developer portfolio showcasing projects and skills.',
        status: 'completed',
        tags: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/deathxdder/my-portfolio',
        image: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ];

    const skills = {
      active: [
        { name: 'TypeScript', icon: 'code' },
        { name: 'JavaScript', icon: 'code' },
        { name: 'React', icon: 'code' },
        { name: 'Vue', icon: 'code' },
        { name: 'Node.js', icon: 'code' }
      ],
      learning: [
        { name: 'Rust', icon: 'code' },
        { name: 'Java', icon: 'code' }
      ]
    };

    function updateDateTime() {
      const now = new Date();
      
      document.getElementById('time').textContent = now.toLocaleTimeString();
      
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      document.getElementById('timezone').textContent = timezone;
      
      const dateOptions = { day: 'numeric', month: 'long' };
      document.getElementById('date').textContent = now.toLocaleDateString(undefined, dateOptions);
      document.getElementById('year').textContent = now.getFullYear();
      
      document.getElementById('currentYear').textContent = now.getFullYear();
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    function renderProjects(filter = 'all') {
      const projectsGrid = document.querySelector('.projects__grid');
      projectsGrid.innerHTML = '';
      
      const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.status === filter);
      
      filteredProjects.forEach(project => {
        const statusColors = {
          'completed': 'status__completed',
          'in-progress': 'status__progress',
          'frozen': 'status__frozen'
        };

        const statusText = {
          'completed': 'Completed',
          'in-progress': 'In Progress',
          'frozen': 'Frozen'
        };

        const projectCard = document.createElement('div');
        projectCard.className = 'project__card';
        projectCard.innerHTML = `
          <div class="project__image">
            <img src="${project.image}" alt="${project.title}">
          </div>
          <div class="project__content">
            <div class="project__header">
              <h3 class="project__title">${project.title}</h3>
              <span class="project__status ${statusColors[project.status]}">${statusText[project.status]}</span>
            </div>
            <p class="project__description">${project.description}</p>
            <div class="project__tags">
              ${project.tags.map(tag => `<span class="project__tag">${tag}</span>`).join('')}
            </div>
            <div class="project__links">
              <a href="${project.link}" class="project__link" target="_blank" rel="noopener noreferrer">
                <i data-lucide="github"></i>
                View Code
              </a>
              <a href="#" class="project__link" style="color: #60a5fa;">
                <i data-lucide="external-link"></i>
                Live Demo
              </a>
            </div>
          </div>
        `;
        
        projectsGrid.appendChild(projectCard);
      });
      
      lucide.createIcons();
    }

    function renderSkills() {
      // Render active skills
      const activeSkillsList = document.querySelector('.skills__card:first-child .skills__list');
      activeSkillsList.innerHTML = skills.active.map(skill => `
        <div class="skill__item">
          <div class="skill__icon">
            <i data-lucide="${skill.icon}"></i>
          </div>
          <div class="skill__info">
            <div class="skill__header">
              <span class="skill__name">${skill.name}</span>
              <span class="skill__status status__active">Active</span>
            </div>
            <div class="skill__bar">
              <div class="skill__progress progress__active"></div>
            </div>
          </div>
        </div>
      `).join('');

      const learningSkillsList = document.querySelector('.skills__card:last-child .skills__list');
      learningSkillsList.innerHTML = skills.learning.map(skill => `
        <div class="skill__item">
          <div class="skill__icon">
            <i data-lucide="${skill.icon}"></i>
          </div>
          <div class="skill__info">
            <div class="skill__header">
              <span class="skill__name">${skill.name}</span>
              <span class="skill__status status__learning">Learning</span>
            </div>
            <div class="skill__bar">
              <div class="skill__progress progress__learning"></div>
            </div>
          </div>
        </div>
      `).join('');

      lucide.createIcons();
    }

    renderProjects();
    renderSkills();

    document.querySelector('.projects__filters').addEventListener('click', (e) => {
      if (e.target.classList.contains('filter__button')) {
        document.querySelectorAll('.filter__button').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        renderProjects(e.target.dataset.filter);
      }
    });

    let isDarkMode = true;
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      document.body.style.backgroundColor = isDarkMode ? '#0f172a' : '#f8fafc';
      document.body.style.color = isDarkMode ? '#f8fafc' : '#0f172a';
      
      themeToggle.innerHTML = isDarkMode 
        ? '<i data-lucide="sun"></i><span>Light</span>'
        : '<i data-lucide="moon"></i><span>Dark</span>';
      
      // Reinitialize icons
      lucide.createIcons();
    });