// ─── v4 Data — June 2026 Spotlight with dual-site teams + full trials ────────
// This file is v4-specific. The shared data.ts in spotlight/ is NOT modified.

export interface ClinicianV4 {
  id: number;
  name: string;
  credentials: string;
  title: string;
  specialty: string;
  site: 'main' | 'endeavor' | 'both';
  photo: string;
  bio: string;
  hasSession: boolean;
  sessionDate: string;
  sessionTitle: string;
  sessionDescription: string;
  status: 'confirmed' | 'pending';
}

export interface SupportStaff {
  id: number;
  name: string;
  role: string;
  site: 'main' | 'endeavor';
}

export interface TrialV4 {
  id: string;
  name: string;
  category: 'past-uchicago' | 'enrolling-uchicago' | 'upcoming-uchicago' | 'enrolling-endeavor' | 'al-placeholder';
  status: string;
  note?: string;
}

export interface BestPracticeSession {
  id: number;
  date: string;
  dayOfWeek: string;
  title: string;
}

// ─── Main Site (UChicago) Presenters ────────────────────────────────────────
export const mainSitePresenters: ClinicianV4[] = [
  {
    id: 1,
    name: 'Rachel Campagna, MS, CGC & Dr. Donald E. Dietz IV',
    credentials: 'MS, CGC / MD',
    title: 'Genetic Counselor / Physician & Amyloidosis Advocate',
    specialty: 'TTR Inheritance · Genetic Testing · ACT-EARLY Trial',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/2025-headshot-2.jpg',
    bio: 'Rachel Campagna, MS, CGC, is a board-certified genetic counselor at the University of Chicago. She sees patients in the Cardiovascular Genetics Clinic and the Amyloidosis Clinic, as well as at-risk family members, for personalized discussions on the impact of genetic testing in personal health choices. She is currently the president-elect of the Illinois Society of Genetics Professionals (ISGP), was previously co-chair of the Education Committee, and is an active member of the National Society of Genetic Counselors (NSGC) and the Heart Rhythm Society (HRS).\n\nDr. Donald E. Dietz IV is a physician and amyloidosis advocate focused on advancing earlier diagnosis, patient education, and access to emerging therapies for hereditary ATTR amyloidosis. Through his involvement with the ACT-EARLY initiative, Dr. Dietz works to increase awareness of genetic risk, encourage proactive screening, and help patients and families better understand evolving treatment and clinical trial opportunities.',
    hasSession: true,
    sessionDate: 'Mar 27 (Completed)',
    sessionTitle: '90-Minute Extended Session: TTR Inheritance, Genetic Testing & ACT-EARLY Trial',
    sessionDescription: 'This 90-minute extended session will help patients and families better understand how TTR gene mutations are inherited, what genetic counselors do, and how genetic testing works. The program will also include an overview of the ACT-EARLY clinical trial and the importance of identifying hereditary ATTR amyloidosis as early as possible.',
    status: 'confirmed',
  },
  {
    id: 2,
    name: 'Dr. Nitasha Sarswat',
    credentials: 'MD',
    title: 'Associate Professor of Medicine · Director, Multi-Institutional Amyloid Center of Excellence',
    specialty: 'Advanced Heart Failure · Cardiac Amyloidosis · Disease-Modifying Therapy',
    site: 'both',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png',
    bio: 'Dr. Nitasha Sarswat is a cardiologist at UChicago Medicine specializing in advanced heart failure, transplantation, and cardiac amyloidosis. She combines clinical expertise with research to help patients better understand and manage the impact of amyloidosis on the heart.',
    hasSession: true,
    sessionDate: 'June 3',
    sessionTitle: 'Current Approach to Management of Amyloidosis CM — Disease Modifying Therapy to Symptom Management',
    sessionDescription: 'In this session Dr. Sarswat will present her approach to treating Amyloidosis patients with Cardiomyopathy including managing symptoms.',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Dr. Jeremy A. Slivnick',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Cardiac Imaging · MRI · CT · Echocardiography · AI Echo Go',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/Jeremy-slivnick.webp',
    bio: 'Dr. Jeremy A. Slivnick is a cardiologist and cardiac imaging specialist focused on advanced MRI, CT, and echocardiography to diagnose complex heart diseases. His work includes improving the detection and evaluation of cardiac amyloidosis, heart failure, hypertrophic cardiomyopathy, and cardiac sarcoidosis.',
    hasSession: true,
    sessionDate: 'June 10',
    sessionTitle: 'Current and Emerging Role of Cardiac Imaging in the Diagnosis and Management of Cardiac Amyloidosis',
    sessionDescription: 'In this session, Dr. Slivnick will present how cardiac imaging is used to help diagnose and manage patients with Cardiac amyloidosis and what the future holds.',
    status: 'pending',
  },
  {
    id: 4,
    name: 'Dr. Ben Derman',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    specialty: 'Hematology & Oncology · Plasma Cell Disorders · AL Amyloidosis',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/derman-ben-bio-261x347.webp',
    bio: 'Ben Derman is a hematologist-oncologist specializing in plasma cell disorders, including amyloidosis, multiple myeloma, MGUS, and POEMS syndrome. He uses advanced therapies such as CAR T-cell therapy and stem cell transplantation, with research focused on MRD, quality of life, treatment outcomes, and reducing racial disparities in care.',
    hasSession: true,
    sessionDate: 'June 17',
    sessionTitle: 'What is the Role of Maintenance Therapy in AL Amyloidosis',
    sessionDescription: 'In this session, Dr. Derman will present what the current recommendations are for maintenance therapy in AL amyloidosis patients after completing initial treatment, who should be considered and what is really known.',
    status: 'pending',
  },
  {
    id: 5,
    name: 'Dr. Kourosh Rezania',
    credentials: 'MD',
    title: 'Professor of Neurology',
    specialty: 'Peripheral Neuropathy · Neuromuscular Disorders · Amyloidosis PN',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/rezania-kourosh-bio-261x347.webp',
    bio: 'Kourosh Rezania is a neurologist specializing in peripheral neuropathy and neuromuscular disorders, with expertise in the diagnosis and management of amyloidosis-related nerve complications. His work focuses on helping patients identify and manage symptoms such as numbness, pain, weakness, and autonomic dysfunction, while advancing multidisciplinary care for individuals living with ATTR and AL amyloidosis.',
    hasSession: true,
    sessionDate: 'June 24',
    sessionTitle: 'Current Approach and Management of Amyloidosis PN',
    sessionDescription: 'In this session Dr. Rezania will present how he works up and treats Amyloidosis patients with peripheral neuropathy including managing symptoms.',
    status: 'pending',
  },
  {
    id: 6,
    name: 'Dr. Beatrice Concepcion',
    credentials: 'MD',
    title: 'Professor of Medicine, Nephrology',
    specialty: 'Transplant Nephrology · Kidney & Pancreas Transplantation · Amyloidosis',
    site: 'main',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2026-04/concepcion-beatrice-bio-261x347.webp',
    bio: 'Beatrice Concepcion is a transplant nephrologist specializing in kidney and pancreas transplantation. She provides personalized, compassionate care focused on immunosuppressive management, post-transplant complications, and improving long-term quality of life for patients with complex medical needs, including amyloidosis-related kidney disease.',
    hasSession: true,
    sessionDate: 'Swing (TBD)',
    sessionTitle: 'When to Consider Kidney Transplantation in Patients with Amyloidosis',
    sessionDescription: 'In this session, Dr. Concepcion will present the current indications and considerations when evaluating patients with Amyloidosis for kidney transplantation — what is currently known.',
    status: 'pending',
  },
];

// ─── Endeavor Site Team ─────────────────────────────────────────────────────
export const endeavorTeam: ClinicianV4[] = [
  {
    id: 101,
    name: 'Dr. Nitasha Sarswat',
    credentials: 'MD',
    title: 'Director, Multi-Institutional Amyloid Center of Excellence',
    specialty: 'Cardiology · Cardiac Amyloidosis',
    site: 'both',
    photo: 'https://somebodytotalkto.com/sites/default/files/pictures/2025-10/Nitasha%20Sarswat_circle.png',
    bio: '',
    hasSession: false,
    sessionDate: '',
    sessionTitle: '',
    sessionDescription: '',
    status: 'confirmed',
  },
  {
    id: 102,
    name: 'Richard Wlodarski',
    credentials: '',
    title: 'Neurologist',
    specialty: 'Neuromuscular Disorders',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '', status: 'pending',
  },
  {
    id: 103,
    name: 'Larry Zeidman',
    credentials: '',
    title: 'Neurologist',
    specialty: 'Autonomic Dysfunction',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '', status: 'pending',
  },
  {
    id: 104,
    name: 'Robert Eisner',
    credentials: '',
    title: 'Hematologist',
    specialty: 'Hematology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '', status: 'pending',
  },
  {
    id: 105,
    name: 'Amy Wang',
    credentials: '',
    title: 'Hematologist',
    specialty: 'Hematology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '', status: 'pending',
  },
  {
    id: 106,
    name: 'David Grinblatt',
    credentials: '',
    title: 'Hematologist',
    specialty: 'Hematology',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '', status: 'pending',
  },
  {
    id: 107,
    name: 'Robert Gray',
    credentials: '',
    title: 'Orthopedic Surgeon',
    specialty: 'Orthopedic Surgery',
    site: 'endeavor',
    photo: '',
    bio: '',
    hasSession: false, sessionDate: '', sessionTitle: '', sessionDescription: '', status: 'pending',
  },
];

// ─── Support Staff ──────────────────────────────────────────────────────────
export const supportStaff: SupportStaff[] = [
  { id: 1, name: 'Elizabeth Hushka', role: 'Advanced Heart Failure NP', site: 'main' },
  { id: 2, name: 'Samantha de Santiago', role: 'Advanced Heart Failure / Amyloid RN', site: 'main' },
  { id: 3, name: 'Tracey Silverstein', role: 'Amyloid Navigator RN', site: 'endeavor' },
];

// ─── Clinical Trials ────────────────────────────────────────────────────────
export const trialsV4: TrialV4[] = [
  // Past trials at UChicago (TTR perspective)
  { id: 'past-1', name: 'ApolloB', category: 'past-uchicago', status: 'Completed' },
  { id: 'past-2', name: 'Helios B', category: 'past-uchicago', status: 'Completed' },
  { id: 'past-3', name: 'Attribute CM', category: 'past-uchicago', status: 'Completed' },

  // Currently enrolling at UChicago
  { id: 'enroll-uc-1', name: 'Act Early', category: 'enrolling-uchicago', status: 'Recruiting', note: 'Dr. Sarswat on steering committee' },
  { id: 'enroll-uc-2', name: 'Alnylam 007', category: 'enrolling-uchicago', status: 'Recruiting', note: 'Open label extension' },
  { id: 'enroll-uc-3', name: 'Trace AI', category: 'enrolling-uchicago', status: 'Recruiting' },
  { id: 'enroll-uc-4', name: 'MaesTTRo', category: 'enrolling-uchicago', status: 'Recruiting' },

  // Upcoming at UChicago
  { id: 'upcoming-uc-1', name: 'Cleopattra', category: 'upcoming-uchicago', status: 'Coming June 2026' },
  { id: 'upcoming-uc-2', name: 'ATTRiumph', category: 'upcoming-uchicago', status: 'Coming July 2026' },
  { id: 'upcoming-uc-3', name: 'Magnitude', category: 'upcoming-uchicago', status: 'Coming July 2026' },

  // Currently enrolling at Endeavor
  { id: 'enroll-end-1', name: 'Alnylam 007', category: 'enrolling-endeavor', status: 'Recruiting', note: 'Open label extension' },
  { id: 'enroll-end-2', name: 'Cleopatrra', category: 'enrolling-endeavor', status: 'Recruiting' },
  { id: 'enroll-end-3', name: 'Triton CM', category: 'enrolling-endeavor', status: 'Recruiting' },

  // AL trials placeholder
  { id: 'al-placeholder', name: 'AL Amyloidosis Trials', category: 'al-placeholder', status: 'Pending', note: 'Awaiting details from Dr. Derman and Dr. Cooperrider' },
];

// ─── Monday Best Practice Sessions ──────────────────────────────────────────
export const bestPracticeSessions: BestPracticeSession[] = [
  { id: 1, date: 'Monday, June 1', dayOfWeek: 'Mon', title: 'Your Medical Notebook: Organizing Records, Medications, Questions, and Contacts' },
  { id: 2, date: 'Monday, June 8', dayOfWeek: 'Mon', title: 'Being Honest About Symptoms Without Feeling Like a Complainer' },
  { id: 3, date: 'Monday, June 15', dayOfWeek: 'Mon', title: 'Advocacy 201: Using Your Experience to Improve Care for the Next Patient' },
  { id: 4, date: 'Monday, June 22', dayOfWeek: 'Mon', title: 'Clinical Trials, Registries, and Research: What Patients Should Understand' },
  { id: 5, date: 'Monday, June 29', dayOfWeek: 'Mon', title: 'What is a Care Team and How to Build One That Works for You' },
];
