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
        title: "Interested in health care? We’re here to help!",
        subtitle: ''
      },
      logo: '/logo.png',
      description: 'Med Path is a group of medical students who are eager to share advice and resources with premed students at UCSD and beyond. We partner with the UCSD Career Center, the School of Medicine Office of Admissions, and the Office of Outreach & Pathway Programs to host student panels, provide 1-on-1 advising, and distribute free resources to all premed students at UCSD and beyond.'
    },
    'about.json': {
      content: '# About Us\n\nMed Path is dedicated to supporting premed students on their journey to medical school.'
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
          title: 'After-Panel Event Feedback Form',
          description: 'Share your feedback after attending a MedPath panel.',
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSe5_672iY78SLZ5M7w30GYQjLOjG4qO3Ek0Bg6mmmhgXAUPIg/viewform?usp=publish-editor'
        }
      ]
    },
    'contact.json': {
      description: 'Get in touch with Med Path at UCSD',
      email: 'medpathorg@gmail.com',
      socialLinks: {
        instagram: 'https://instagram.com/medpath.mentorship'
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

export interface AdvisingContent {
  content: string
  title?: string
  links?: Array<{ title: string; url: string }>
}

export async function getAdvisingContent(): Promise<AdvisingContent> {
  return readMarkdownFile('advising.md') as AdvisingContent
}

export async function getResourcesContent() {
  return readJSONFile('resources.json')
}

export async function getContactContent() {
  return readJSONFile('contact.json')
}
