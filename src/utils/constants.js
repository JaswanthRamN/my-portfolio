// Personal Information
export const PERSONAL_INFO = {
  name: 'Jaswanth Ram Nagabhyrava',
  title: 'Data Analyst',
  location: 'Baltimore, MD',
  email: 'jrnagabhy@gmail.com',
  phone: '+1(443)540-4434',
  linkedin: 'https://www.linkedin.com/in/jaswanth-ram-nagabhyrava-0740151b3/',
  github: 'https://github.com/JaswanthRamN',
};

// Hero Section
export const HERO = {
  headline: 'Turning data into decisions that drive business outcomes',
  subheadline: 'Data Analyst with 3+ years building analytics systems that reduce reporting overhead, improve forecast accuracy, and deliver measurable cost savings.',
  impactStats: [
    { value: '45%', label: 'reduction in manual reporting time' },
    { value: '500K+', label: 'records processed monthly' },
    { value: '6+', label: 'production dashboards deployed' },
  ],
};

// Featured Projects
export const PROJECTS = [
  {
    id: 'baltimore-crime',
    title: 'Baltimore Crime Analysis',
    tagline: 'Supporting resource allocation with granular incident insights',
    context: 'Public safety agencies need to understand where and when incidents occur to optimize patrol deployment and resource planning.',
    approach: 'Analyzed 1M+ emergency call records using Python and SQL to surface geographic and temporal patterns across districts and call types.',
    impact: [
      'Reduced weekly report generation from hours to minutes with automated Tableau dashboards',
      'Enabled drill-down analysis by district, time, and incident category for data-driven staffing decisions',
      'Automated refresh pipelines to support ongoing tracking without manual intervention',
    ],
    metrics: { efficiency: '90% faster reporting', scale: '1M+ records analyzed' },
    stack: ['Python', 'SQL', 'Tableau', 'Data Pipelines'],
    github: 'https://github.com/JaswanthRamN/baltimore-crime-analysis',
    highlights: ['Geographic pattern detection', 'Temporal trend analysis', 'Automated reporting'],
  },
  {
    id: 'f1-prediction',
    title: 'Formula 1 Lap Time Prediction',
    tagline: 'Forecasting race performance with telemetry and engineered features',
    context: 'Motorsport teams rely on historical telemetry to forecast lap times and inform strategy during sessions.',
    approach: 'Built a regression model using FastF1 telemetry data with engineered features like tire compound, track conditions, and driver history. Achieved 93% R² and 0.42 MAE.',
    impact: [
      'Enabled multi-driver, multi-session comparative analysis',
      'Reduced per-session analysis turnaround from 30 minutes to under 5 minutes',
      'Generated automated visualizations for session review and strategy planning',
    ],
    metrics: { accuracy: '93% R²', efficiency: '6x faster analysis' },
    stack: ['Python', 'scikit-learn', 'FastF1 API', 'Feature Engineering'],
    github: 'https://github.com/JaswanthRamN/f1-lap-prediction',
    highlights: ['Regression modeling', 'Telemetry analysis', 'Automated visualization'],
  },
  {
    id: 'behavior-prediction',
    title: 'Off-Task Behavior Prediction',
    tagline: 'Classifying engagement patterns with ML and real-time dashboards',
    context: 'Educational platforms need to detect disengagement signals early to support intervention strategies.',
    approach: 'Analyzed 27K+ behavioral records and trained classification models with feature engineering and hyperparameter tuning, improving F1-score by 12%.',
    impact: [
      'Built Flask application with integrated dashboards to visualize predictions in real time',
      'Improved engagement-monitoring accuracy by 20% through feature optimization',
      'Delivered actionable classification scores for proactive intervention planning',
    ],
    metrics: { accuracy: '+12% F1-score', impact: '20% better detection' },
    stack: ['Python', 'scikit-learn', 'Flask', 'Dashboards'],
    github: 'https://github.com/JaswanthRamN/behavior-prediction',
    highlights: ['Classification models', 'Real-time inference', 'Interactive dashboards'],
  },
];

// Skills organized by analytics workflow
export const SKILLS = {
  'Data Analysis & Reporting': [
    'SQL (Advanced)',
    'Python (pandas, numpy)',
    'Power BI',
    'Tableau',
    'Advanced Excel',
    'KPI Development',
  ],
  'Data Engineering': [
    'ETL/ELT Pipelines',
    'dbt',
    'Apache Airflow',
    'Data Quality Checks',
    'Workflow Automation',
  ],
  'Databases & Platforms': [
    'Snowflake',
    'Redshift',
    'PostgreSQL',
    'SQL Server',
    'MySQL',
    'AWS (S3, Lambda)',
  ],
  'Statistical Methods': [
    'Time Series Analysis',
    'Regression',
    'Forecasting',
    'Hypothesis Testing',
    'A/B Testing',
  ],
  'Machine Learning': [
    'Random Forest',
    'Gradient Boosting',
    'SVM',
    'Model Evaluation',
    'Feature Engineering',
  ],
};

// Professional Experience (without company-specific metrics that need tailoring)
export const EXPERIENCE = [
  {
    role: 'Data Analyst',
    organization: 'Rishi Inc',
    location: 'United States',
    period: 'Mar 2024 – Present',
    responsibilities: [
      'Built and automated Power BI dashboards used by stakeholders across the organization, owning end-to-end delivery from requirements and data validation to refresh SLAs',
      'Designed SQL pipelines integrating multiple data sources to consolidate reporting and improve data accuracy',
      'Developed Python-based ETL pipelines for data cleaning, validation, and transformation',
      'Deployed scheduled workflows with data quality checks supporting daily dashboard refresh requirements',
      'Delivered ad-hoc analyses and stakeholder-ready insights for cost optimization and performance initiatives',
    ],
  },
  {
    role: 'Data Analyst',
    organization: 'Pioneer Auto World Pvt Ltd',
    location: 'Guntur, India',
    period: 'Aug 2021 – Dec 2022',
    responsibilities: [
      'Built SQL and Excel pipelines consolidating sales, service, and inventory records across multiple branches',
      'Developed Tableau dashboards tracking technician efficiency, service throughput, and inventory turnover',
      'Applied time-series forecasting for demand planning, improving inventory and staffing accuracy',
      'Automated monthly reporting using SQL and Excel macros, reducing preparation time significantly',
      'Delivered analytics-driven procurement insights contributing to measurable cost savings',
    ],
  },
  {
    role: 'Data Analyst Intern',
    organization: 'Pioneer Auto World Pvt Ltd',
    location: 'Guntur, India',
    period: 'Jun 2020 – Jul 2021',
    responsibilities: [
      'Cleaned and validated multi-branch datasets using Excel, Google Sheets, and SQL to support operational reporting',
      'Built pivot-table dashboards and tracking models to monitor performance and identify bottlenecks',
      'Supported demand and preventive maintenance analysis to improve service completion rates',
    ],
  },
];

// Education
export const EDUCATION = [
  {
    degree: 'Master of Science in Information Systems',
    institution: 'University of Maryland, Baltimore County (UMBC)',
    location: 'Baltimore, MD',
  },
  {
    degree: 'Bachelor of Technology in Automobile Engineering',
    institution: 'Hindustan Institute of Technology and Science',
    location: 'Chennai, India',
  },
];

// Site Metadata
export const SITE_NAME = 'Jaswanth Ram Nagabhyrava';
export const SITE_DESCRIPTION = 'Data Analyst specializing in SQL, Python, Power BI, and ETL pipelines';
