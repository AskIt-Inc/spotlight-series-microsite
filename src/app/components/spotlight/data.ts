export interface Clinician {
  id: number;
  name: string;
  credentials: string;
  title: string;
  speciality: string;
  type: string;
  photo: string;
  bio: string;
  hasVideo: boolean;
  hasSession: boolean;
  sessionLabel: string;
  appointmentUrl: string;
}

export interface Trial {
  id: string;
  title: string;
  status: string;
  description: string;
  phase: string;
}

export interface Session {
  id: number;
  month: string;
  day: string;
  dayOfWeek: string;
  time: string;
  title: string;
  presenter: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const clinicians: Clinician[] = [
  {
    id: 1,
    name: 'Dr. Nitasha Sarswat',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine, Director of Amyloidosis Program',
    speciality: 'Cardiac Amyloidosis · Advanced Heart Failure',
    type: 'Medical Doctor',
    photo: 'https://images.unsplash.com/photo-1673865641073-4479f93a7776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: 'Dr. Nitasha Sarswat is the Director of the Amyloidosis Program at the University of Chicago Medicine. She specialises in cardiac amyloidosis and advanced heart failure, with particular focus on diagnosing and treating transthyretin (ATTR) and light-chain (AL) cardiac amyloidosis. Dr. Sarswat leads multidisciplinary care teams and is an active investigator in clinical trials evaluating novel disease-modifying therapies. She has published extensively on outcomes in cardiac amyloidosis and is a sought-after speaker at national cardiology meetings.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Cardiac Amyloidosis — Current Approaches to Disease-Modifying Therapy',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 2,
    name: 'Dr. Jeremy A. Slivnick',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    speciality: 'Cardiac Imaging · Echocardiography · MRI',
    type: 'Medical Doctor',
    photo: 'https://images.unsplash.com/photo-1627093143401-2ade923be6c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: 'Dr. Jeremy Slivnick is a cardiologist with subspecialty expertise in advanced cardiac imaging, including echocardiography and cardiac MRI. His research focuses on the application of multimodality imaging for the early detection and phenotyping of cardiac amyloidosis. Dr. Slivnick plays a central role in the UChicago Amyloidosis Programme\'s diagnostic workup pathway, and collaborates closely with the haematology team to ensure comprehensive evaluation of all patients.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Advanced Cardiac Imaging in Amyloidosis Diagnosis',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 3,
    name: 'Dr. Ben Derman',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine',
    speciality: 'Hematology & Oncology · Plasma Cell Disorders',
    type: 'Medical Doctor',
    photo: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
    bio: 'Dr. Ben Derman is a haematologist-oncologist specialising in plasma cell disorders, including AL (light-chain) amyloidosis. He oversees haematological evaluation and treatment for patients in the UChicago Amyloidosis Programme, coordinating care across bone marrow transplant, stem cell therapy, and novel immunotherapy regimens. Dr. Derman is an active clinical trialist with a focus on improving outcomes for patients with systemic AL amyloidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: MGUS & Amyloidosis — Implications for Diagnosing AL vs ATTR',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 4,
    name: 'Rachel Campagna, MS, CGC',
    credentials: 'MS, CGC',
    title: 'Licensed, Certified Genetic Counselor | UChicago Medicine | Cardiology',
    speciality: 'Hereditary ATTR · Cardiovascular Genetics · Genetic Testing',
    type: 'Genetic Counsellor',
    photo: '',
    bio: 'Rachel is a board-certified genetic counselor at the University of Chicago. She sees patients in the Cardiovascular Genetics Clinic and the Amyloidosis Clinic as well as at-risk family members to have personalized discussions on the impact of genetic testing in personal health choices. She is currently the president-elect of the Illinois Society of Genetics Professionals (ISGP) and was previously the co-chair of the Education Committee. As a part of her role within ISGP, she is working tirelessly to move legislation through the IL General Assembly to protect Illinois residents from genetic discrimination. Rachel is also an active member of the National Society of Genetic Counselors (NSGC) and the Heart Rhythm Society (HRS).',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: TTR & Genes — How Genes Are Inherited in ATTR, What a Genetic Counselor Does & Demystifying Genetic Testing',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 5,
    name: 'Dr. Kourosh Rezania',
    credentials: 'MD',
    title: 'Professor of Neurology',
    speciality: 'Neuromuscular Diseases · Peripheral Neuropathy · Amyloidosis PN',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Kourosh Rezania is a professor of neurology and an expert in neuromuscular diseases at the University of Chicago. He specializes in the evaluation and treatment of peripheral neuropathies, myopathies, myasthenia gravis, and amyotrophic lateral sclerosis (ALS). Dr. Rezania is an active researcher and teacher, currently conducting clinical trials on chronic inflammatory demyelinating polyneuropathy, and brings deep expertise to the neurological manifestations of amyloidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Neurological Manifestations of Amyloidosis — Managing Amyloidosis PN',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 6,
    name: 'Dr. Edwin K. McDonald IV',
    credentials: 'MD',
    title: 'Assistant Professor of Medicine, Gastroenterology',
    speciality: 'Gastroenterology · Small Bowel Disease · Amyloidosis GI Manifestations',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Edwin K. McDonald IV is an assistant professor of medicine specializing in gastroenterology at the University of Chicago, with a focus on improving the health of individuals and communities through nutrition education. He works with patients with small bowel diseases, obesity, and other conditions affecting the digestive system, and brings expertise in diagnosing and managing the gastrointestinal complications of amyloidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: GI Manifestations of Amyloidosis — Diagnosis & Symptom Management',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
  {
    id: 7,
    name: 'Dr. Jennifer Moriatis Wolf',
    credentials: 'MD, PhD',
    title: 'Professor of Orthopedic Surgery and Rehabilitation Medicine',
    speciality: 'Orthopedic Surgery · Hand & Wrist · Amyloidosis Orthopedic Complications',
    type: 'Medical Doctor',
    photo: '',
    bio: 'Dr. Jennifer Moriatis Wolf is a professor of orthopedic surgery and rehabilitation medicine at the University of Chicago, specializing in the surgical and non-surgical treatment of bone, nerve, tendon, and ligament injuries. She conducts basic and clinical research to improve patient outcomes in orthopedic hand, wrist, and elbow care, and addresses the orthopedic complications — both surgical and non-surgical — that arise in patients with amyloidosis.',
    hasVideo: true,
    hasSession: true,
    sessionLabel: 'Register: Orthopedic Complications of Amyloidosis',
    appointmentUrl: 'https://www.uchicagomedicine.org',
  },
];

export const trials: Trial[] = [
  {
    id: 'NCT05029076',
    title: 'Acoramidis (AG10) for Transthyretin Amyloid Cardiomyopathy (ATTRibute-CM)',
    status: 'Recruiting',
    description: 'A phase 3, multinational, randomised, double-blind, placebo-controlled study evaluating the efficacy and safety of acoramidis in patients with transthyretin amyloid cardiomyopathy (ATTR-CM). Participants receive oral acoramidis or placebo twice daily over a 30-month period.',
    phase: 'Phase 3',
  },
  {
    id: 'NCT04136171',
    title: 'Patisiran for ATTR Amyloidosis with Cardiomyopathy (APOLLO-B)',
    status: 'Recruiting',
    description: 'A phase 3, randomised, double-blind, placebo-controlled study to evaluate patisiran in patients with transthyretin-mediated amyloidosis with cardiomyopathy. This RNAi therapeutic targets the TTR gene to reduce production of transthyretin protein and slow disease progression.',
    phase: 'Phase 3',
  },
];

export const sessions: Session[] = [
  {
    id: 1,
    month: 'JUN',
    day: '3',
    dayOfWeek: 'Wed',
    time: '7:00 PM ET',
    title: 'Cardiac Amyloidosis — Current Approaches to Disease-Modifying Therapy',
    presenter: 'Dr. Nitasha Sarswat',
    status: 'upcoming',
  },
  {
    id: 2,
    month: 'JUN',
    day: '10',
    dayOfWeek: 'Wed',
    time: '7:00 PM ET',
    title: 'Advanced Cardiac Imaging in Amyloidosis Diagnosis',
    presenter: 'Dr. Jeremy A. Slivnick',
    status: 'upcoming',
  },
  {
    id: 3,
    month: 'JUN',
    day: '17',
    dayOfWeek: 'Wed',
    time: '7:00 PM ET',
    title: 'TTR Onboarding — Living with ATTR Amyloidosis: What You Need to Know',
    presenter: 'Dr. Ben Derman',
    status: 'upcoming',
  },
  {
    id: 4,
    month: 'MAY',
    day: '27',
    dayOfWeek: 'Tue',
    time: '5:00 PM CT',
    title: 'TTR & Genes / ACT EARLY — Genetic Inheritance, Testing & Counseling for ATTR',
    presenter: 'Rachel Campagna, MS, CGC',
    status: 'upcoming',
  },
];