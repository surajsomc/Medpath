import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

// Helper to read JSON files
function readJSONFile(filename: string) {
  try {
    const filePath = path.join(contentDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    // Return default content if file doesn't exist
    return getDefaultContent(filename)
  }
}

// Helper to read Markdown files
function readMarkdownFile(filename: string) {
  try {
    const filePath = path.join(contentDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    return { ...data, content: content.trim() }
  } catch (error) {
    return { content: '' }
  }
}

// Default content fallbacks
function getDefaultContent(filename: string) {
  const defaults: Record<string, any> = {
    'home.json': {
      hero: {
        title: "PRE-MED? WE'RE HERE TO HELP",
        subtitle: ''
      },
      logo: '/logo.png',
      description: 'Med Path at UCSD is a group of over 300 medical students who are eager to share advice and resources with premed students at UCSD and beyond. We partner with the UCSD Career Center, the School of Medicine Office of Admissions, and the Office of Outreach & Pathway Programs to host student panels, provide 1-on-1 advising, and distribute free resources to all premed students at UCSD and beyond.'
    },
    'about.json': {
      content: '# About Us\n\nMed Path at UCSD is dedicated to supporting premed students on their journey to medical school.'
    },
    'team.json': {
      members: []
    },
    'events.json': {
      events: []
    },
    'advising.json': {
      content: '# Advising\n\nWe offer various advising services to help premed students.',
      links: [
        {
          title: '1-on-1 Advising',
          url: 'https://docs.google.com/document/d/1S2hMFgacn2F-f9KihZFy16RAw06CCAwZlXrGZy0cuuI/edit'
        },
        {
          title: 'Essay Review',
          url: 'https://docs.google.com/document/d/13SofYJmWFZ_Jxc_CVnqKMYKPp_nRrzUgjRA_q4u4lR8/edit'
        }
      ]
    },
    'resources.json': {
      sections: [
        {
          title: 'Pre-Med Guide',
          path: '/resources/pre-med-guide',
          subsections: [
            { title: 'Overview', path: '/resources/pre-med-guide' },
            { title: 'Application Process', path: '/resources/pre-med-guide/application' },
            { title: 'Course Requirements', path: '/resources/pre-med-guide/courses' }
          ]
        }
      ]
    },
    'contact.json': {
      description: 'Get in touch with Med Path at UCSD',
      email: 'contact@medpathucsd.edu',
      socialLinks: {
        instagram: 'https://instagram.com/medpathucsd',
        twitter: 'https://twitter.com/medpathucsd',
        facebook: 'https://facebook.com/medpathucsd'
      }
    }
  }
  return defaults[filename] || {}
}

export async function getHomeContent() {
  return readJSONFile('home.json')
}

export async function getAboutContent() {
  return readMarkdownFile('about.md')
}

export async function getTeamContent() {
  return readJSONFile('team.json')
}

export async function getEventsContent() {
  return readJSONFile('events.json')
}

export async function getAdvisingContent() {
  return readMarkdownFile('advising.md')
}

export async function getResourcesContent() {
  return readJSONFile('resources.json')
}

export async function getContactContent() {
  return readJSONFile('contact.json')
}
