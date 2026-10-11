import React from 'react';
import {
  getProfile,
  getProjects,
  getCertifications,
  getExperiences,
  getEducation,
  getSkills,
  getOrganizations,
  getInterests,
  getGalleryItems,
  getSiteSettings
} from '@/services/db';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { ExperienceTimeline } from '@/components/sections/ExperienceTimeline';
import { Projects } from '@/components/sections/Projects';
import { Certifications } from '@/components/sections/Certifications';
import { Education } from '@/components/sections/Education';
import { Organizations } from '@/components/sections/Organizations';
import { Interests } from '@/components/sections/Interests';
import { Gallery } from '@/components/sections/Gallery';
import { Resume } from '@/components/sections/Resume';
import { Contact } from '@/components/sections/Contact';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const settings = await getSiteSettings();

  return {
    title: settings.siteTitle || `${profile.name} | Full-Stack Developer & Cybersecurity Specialist`,
    description: settings.metaDescription || profile.shortBio,
    keywords: [
      'Srinivasarao Chalamala',
      'Full-Stack Developer',
      'Cybersecurity Specialist',
      'Network Security',
      'Fortinet Certified Associate',
      'KIET College',
      'Web Developer India',
      'Ethical Hacking',
      'Flask Developer',
      'Firebase'
    ],
    authors: [{ name: profile.name }],
    openGraph: {
      type: 'website',
      title: settings.siteTitle,
      description: settings.metaDescription,
      siteName: 'Srinivasarao Chalamala Portfolio',
      images: [
        {
          url: profile.avatarUrl || '/profile/srinu-profile.png',
          width: 800,
          height: 800,
          alt: profile.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.siteTitle,
      description: settings.metaDescription,
      images: [profile.avatarUrl || '/profile/srinu-profile.png']
    }
  };
}

export default async function HomePage() {
  // Fetch all database-driven data concurrently
  const [
    profile,
    projects,
    certifications,
    experiences,
    education,
    skills,
    organizations,
    interests,
    galleryItems,
    settings
  ] = await Promise.all([
    getProfile(),
    getProjects(),
    getCertifications(),
    getExperiences(),
    getEducation(),
    getSkills(),
    getOrganizations(),
    getInterests(),
    getGalleryItems(),
    getSiteSettings()
  ]);

  const visible = settings.sectionsVisibility || {};

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: 'Full-Stack Web Developer & Cybersecurity Specialist',
    email: profile.email,
    telephone: profile.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Kakinada Institute of Engineering and Technology'
    },
    sameAs: [profile.github, profile.linkedin],
    description: profile.shortBio,
    knowsAbout: [
      'Full-Stack Web Development',
      'Cybersecurity',
      'Network Security',
      'Fortinet Security Fabric',
      'Firewall Configuration',
      'Vulnerability Assessment'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation */}
      <Navbar resumeUrl={profile.resumeUrl} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {visible.hero !== false && <Hero profile={profile} />}

        {visible.about !== false && <About profile={profile} />}

        {visible.skills !== false && <Skills skills={skills} />}

        {visible.experience !== false && (
          <ExperienceTimeline experiences={experiences} />
        )}

        {visible.projects !== false && <Projects projects={projects} />}

        {visible.certifications !== false && (
          <Certifications certifications={certifications} />
        )}

        {visible.education !== false && <Education education={education} />}

        {visible.organizations !== false && (
          <Organizations organizations={organizations} />
        )}

        {visible.interests !== false && <Interests interests={interests} />}

        {visible.gallery !== false && <Gallery galleryItems={galleryItems} />}

        {visible.resume !== false && <Resume profile={profile} />}

        {visible.contact !== false && (
          <Contact
            email={profile.email}
            phone={profile.phone}
            location={profile.location}
            linkedin={profile.linkedin}
            github={profile.github}
            whatsapp={profile.whatsapp}
          />
        )}
      </main>

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton
        phone={settings.whatsappNumber || profile.whatsapp}
        message={settings.whatsappPrefillMessage}
      />

      {/* Footer */}
      <Footer
        email={profile.email}
        phone={profile.phone}
        location={profile.location}
        linkedin={profile.linkedin}
        github={profile.github}
      />
    </div>
  );
}
