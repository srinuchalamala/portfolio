import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  where,
  limit
} from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import {
  Profile,
  Project,
  Certification,
  Experience,
  Education,
  Skill,
  Organization,
  Interest,
  ContactMessage,
  ActivityLog,
  SiteSettings,
  GalleryItem
} from '@/types';
import {
  initialProfile,
  initialProjects,
  initialCertifications,
  initialExperiences,
  initialEducation,
  initialSkills,
  initialOrganizations,
  initialInterests,
  initialGallery,
  initialSiteSettings
} from '@/data/initialData';

// Helper for logging admin activities
export async function logActivity(
  action: string,
  resource: string,
  resourceId?: string,
  details?: string
) {
  try {
    const user = auth.currentUser;
    const activityCol = collection(db, 'activityLogs');
    await addDoc(activityCol, {
      userId: user?.uid || 'anonymous',
      email: user?.email || 'system',
      action,
      resource,
      resourceId: resourceId || '',
      details: details || '',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.warn('Could not record activity log:', err);
  }
}

// ----------------------------------------------------
// PROFILE
// ----------------------------------------------------
export async function getProfile(): Promise<Profile> {
  try {
    const profileRef = doc(db, 'profiles', 'main');
    const snap = await getDoc(profileRef);
    if (snap.exists()) {
      return { ...initialProfile, ...(snap.data() as Profile) };
    }
  } catch (err) {
    console.warn('Falling back to local profile:', err);
  }
  return initialProfile;
}

export async function updateProfile(data: Partial<Profile>): Promise<void> {
  const profileRef = doc(db, 'profiles', 'main');
  await setDoc(profileRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  await logActivity('UPDATE', 'Profile', 'main', `Updated profile fields`);
}

// ----------------------------------------------------
// PROJECTS
// ----------------------------------------------------
export async function getProjects(): Promise<Project[]> {
  try {
    const q = query(collection(db, 'projects'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial projects:', err);
  }
  return initialProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const q = query(collection(db, 'projects'), where('slug', '==', slug), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const d = snap.docs[0];
      return { id: d.id, ...(d.data() as Omit<Project, 'id'>) };
    }
  } catch (err) {
    console.warn('Falling back to initial project by slug:', err);
  }
  return initialProjects.find((p) => p.slug === slug) || null;
}

export async function createProject(data: Omit<Project, 'id'>): Promise<string> {
  const col = collection(db, 'projects');
  const docRef = await addDoc(col, {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  await logActivity('CREATE', 'Project', docRef.id, `Created project "${data.title}"`);
  return docRef.id;
}

export async function updateProject(id: string, data: Partial<Project>): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  await logActivity('UPDATE', 'Project', id, `Updated project fields`);
}

export async function deleteProject(id: string): Promise<void> {
  const docRef = doc(db, 'projects', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Project', id, `Deleted project`);
}

// ----------------------------------------------------
// CERTIFICATIONS
// ----------------------------------------------------
export async function getCertifications(): Promise<Certification[]> {
  try {
    const q = query(collection(db, 'certifications'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Certification, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial certifications:', err);
  }
  return initialCertifications;
}

export async function createCertification(data: Omit<Certification, 'id'>): Promise<string> {
  const col = collection(db, 'certifications');
  const docRef = await addDoc(col, data);
  await logActivity('CREATE', 'Certification', docRef.id, `Created certificate "${data.title}"`);
  return docRef.id;
}

export async function updateCertification(id: string, data: Partial<Certification>): Promise<void> {
  const docRef = doc(db, 'certifications', id);
  await updateDoc(docRef, data);
  await logActivity('UPDATE', 'Certification', id, `Updated certificate`);
}

export async function deleteCertification(id: string): Promise<void> {
  const docRef = doc(db, 'certifications', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Certification', id, `Deleted certificate`);
}

// ----------------------------------------------------
// EXPERIENCE
// ----------------------------------------------------
export async function getExperiences(): Promise<Experience[]> {
  try {
    const q = query(collection(db, 'experience'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Experience, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial experiences:', err);
  }
  return initialExperiences;
}

export async function createExperience(data: Omit<Experience, 'id'>): Promise<string> {
  const col = collection(db, 'experience');
  const docRef = await addDoc(col, data);
  await logActivity('CREATE', 'Experience', docRef.id, `Created experience at "${data.company}"`);
  return docRef.id;
}

export async function updateExperience(id: string, data: Partial<Experience>): Promise<void> {
  const docRef = doc(db, 'experience', id);
  await updateDoc(docRef, data);
  await logActivity('UPDATE', 'Experience', id, `Updated experience`);
}

export async function deleteExperience(id: string): Promise<void> {
  const docRef = doc(db, 'experience', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Experience', id, `Deleted experience`);
}

// ----------------------------------------------------
// EDUCATION
// ----------------------------------------------------
export async function getEducation(): Promise<Education[]> {
  try {
    const q = query(collection(db, 'education'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Education, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial education:', err);
  }
  return initialEducation;
}

export async function createEducation(data: Omit<Education, 'id'>): Promise<string> {
  const col = collection(db, 'education');
  const docRef = await addDoc(col, data);
  await logActivity('CREATE', 'Education', docRef.id, `Added education record "${data.institution}"`);
  return docRef.id;
}

export async function updateEducation(id: string, data: Partial<Education>): Promise<void> {
  const docRef = doc(db, 'education', id);
  await updateDoc(docRef, data);
  await logActivity('UPDATE', 'Education', id, `Updated education`);
}

export async function deleteEducation(id: string): Promise<void> {
  const docRef = doc(db, 'education', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Education', id, `Deleted education`);
}

// ----------------------------------------------------
// SKILLS
// ----------------------------------------------------
export async function getSkills(): Promise<Skill[]> {
  try {
    const q = query(collection(db, 'skills'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Skill, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial skills:', err);
  }
  return initialSkills;
}

export async function createSkill(data: Omit<Skill, 'id'>): Promise<string> {
  const col = collection(db, 'skills');
  const docRef = await addDoc(col, data);
  await logActivity('CREATE', 'Skill', docRef.id, `Added skill "${data.name}"`);
  return docRef.id;
}

export async function updateSkill(id: string, data: Partial<Skill>): Promise<void> {
  const docRef = doc(db, 'skills', id);
  await updateDoc(docRef, data);
  await logActivity('UPDATE', 'Skill', id, `Updated skill`);
}

export async function deleteSkill(id: string): Promise<void> {
  const docRef = doc(db, 'skills', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Skill', id, `Deleted skill`);
}

// ----------------------------------------------------
// ORGANIZATIONS
// ----------------------------------------------------
export async function getOrganizations(): Promise<Organization[]> {
  try {
    const q = query(collection(db, 'organizations'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Organization, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial organizations:', err);
  }
  return initialOrganizations;
}

export async function createOrganization(data: Omit<Organization, 'id'>): Promise<string> {
  const col = collection(db, 'organizations');
  const docRef = await addDoc(col, data);
  await logActivity('CREATE', 'Organization', docRef.id, `Added organization "${data.name}"`);
  return docRef.id;
}

export async function updateOrganization(id: string, data: Partial<Organization>): Promise<void> {
  const docRef = doc(db, 'organizations', id);
  await updateDoc(docRef, data);
  await logActivity('UPDATE', 'Organization', id, `Updated organization`);
}

export async function deleteOrganization(id: string): Promise<void> {
  const docRef = doc(db, 'organizations', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Organization', id, `Deleted organization`);
}

// ----------------------------------------------------
// INTERESTS
// ----------------------------------------------------
export async function getInterests(): Promise<Interest[]> {
  try {
    const q = query(collection(db, 'interests'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Interest, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial interests:', err);
  }
  return initialInterests;
}

export async function createInterest(data: Omit<Interest, 'id'>): Promise<string> {
  const col = collection(db, 'interests');
  const docRef = await addDoc(col, data);
  await logActivity('CREATE', 'Interest', docRef.id, `Added interest "${data.title}"`);
  return docRef.id;
}

export async function updateInterest(id: string, data: Partial<Interest>): Promise<void> {
  const docRef = doc(db, 'interests', id);
  await updateDoc(docRef, data);
  await logActivity('UPDATE', 'Interest', id, `Updated interest`);
}

export async function deleteInterest(id: string): Promise<void> {
  const docRef = doc(db, 'interests', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Interest', id, `Deleted interest`);
}

// ----------------------------------------------------
// GALLERY
// ----------------------------------------------------
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const q = query(collection(db, 'gallery'), orderBy('sortOrder', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<GalleryItem, 'id'>) }));
    }
  } catch (err) {
    console.warn('Falling back to initial gallery:', err);
  }
  return initialGallery;
}

export async function createGalleryItem(data: Omit<GalleryItem, 'id'>): Promise<string> {
  const col = collection(db, 'gallery');
  const docRef = await addDoc(col, {
    ...data,
    createdAt: new Date().toISOString()
  });
  await logActivity('CREATE', 'Gallery', docRef.id, `Uploaded gallery item "${data.title}"`);
  return docRef.id;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const docRef = doc(db, 'gallery', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Gallery', id, `Deleted gallery item`);
}

// ----------------------------------------------------
// CONTACT MESSAGES
// ----------------------------------------------------
export async function createContactMessage(
  data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>
): Promise<string> {
  const col = collection(db, 'messages');
  const docRef = await addDoc(col, {
    ...data,
    status: 'new',
    createdAt: new Date().toISOString()
  });
  return docRef.id;
}

export async function getMessages(): Promise<ContactMessage[]> {
  try {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ContactMessage, 'id'>) }));
  } catch (err) {
    console.warn('Error fetching messages from Firestore:', err);
    return [];
  }
}

export async function updateMessageStatus(
  id: string,
  status: ContactMessage['status'],
  notes?: string
): Promise<void> {
  const docRef = doc(db, 'messages', id);
  const updateData: Record<string, unknown> = { status };
  if (notes !== undefined) updateData.notes = notes;
  await updateDoc(docRef, updateData);
  await logActivity('UPDATE', 'Message', id, `Changed message status to ${status}`);
}

export async function deleteMessage(id: string): Promise<void> {
  const docRef = doc(db, 'messages', id);
  await deleteDoc(docRef);
  await logActivity('DELETE', 'Message', id, `Deleted message`);
}

// ----------------------------------------------------
// ACTIVITY LOGS
// ----------------------------------------------------
export async function getActivityLogs(limitCount = 50): Promise<ActivityLog[]> {
  try {
    const q = query(collection(db, 'activityLogs'), orderBy('timestamp', 'desc'), limit(limitCount));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ActivityLog, 'id'>) }));
  } catch (err) {
    console.warn('Error fetching activity logs:', err);
    return [];
  }
}

// ----------------------------------------------------
// SITE SETTINGS
// ----------------------------------------------------
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const docRef = doc(db, 'settings', 'global');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { ...initialSiteSettings, ...(snap.data() as SiteSettings) };
    }
  } catch (err) {
    console.warn('Falling back to initial site settings:', err);
  }
  return initialSiteSettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<void> {
  const docRef = doc(db, 'settings', 'global');
  await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  await logActivity('UPDATE', 'Settings', 'global', `Updated site configuration`);
}

// ----------------------------------------------------
// DATABASE SEEDER (Seeds Firestore with verified data)
// ----------------------------------------------------
export async function seedDatabaseWithVerifiedData(): Promise<{ success: boolean; message: string }> {
  try {
    // 1. Profile
    await setDoc(doc(db, 'profiles', 'main'), initialProfile, { merge: true });

    // 2. Settings
    await setDoc(doc(db, 'settings', 'global'), initialSiteSettings, { merge: true });

    // 3. Projects
    for (const p of initialProjects) {
      await setDoc(doc(db, 'projects', p.id), p, { merge: true });
    }

    // 4. Certifications
    for (const c of initialCertifications) {
      await setDoc(doc(db, 'certifications', c.id), c, { merge: true });
    }

    // 5. Experiences
    for (const e of initialExperiences) {
      await setDoc(doc(db, 'experience', e.id), e, { merge: true });
    }

    // 6. Education
    for (const edu of initialEducation) {
      await setDoc(doc(db, 'education', edu.id), edu, { merge: true });
    }

    // 7. Skills
    for (const s of initialSkills) {
      await setDoc(doc(db, 'skills', s.id), s, { merge: true });
    }

    // 8. Organizations
    for (const o of initialOrganizations) {
      await setDoc(doc(db, 'organizations', o.id), o, { merge: true });
    }

    // 9. Interests
    for (const i of initialInterests) {
      await setDoc(doc(db, 'interests', i.id), i, { merge: true });
    }

    // 10. Gallery
    for (const g of initialGallery) {
      await setDoc(doc(db, 'gallery', g.id), g, { merge: true });
    }

    await logActivity('SEED', 'Database', 'all', 'Seeded Firestore with verified source data');

    return {
      success: true,
      message: 'All verified portfolio data has been successfully written to Firestore!'
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Database seeding failed: ${errorMsg}`
    };
  }
}
