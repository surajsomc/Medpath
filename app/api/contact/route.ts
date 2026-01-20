import { NextRequest, NextResponse } from 'next/server'
import { getContactContent } from '@/lib/content'
import { Resend } from 'resend'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Get contact email from content
    const contactContent = await getContactContent()
    const recipientEmail = contactContent.email || process.env.CONTACT_EMAIL || 'contact@medpathucsd.edu'

    // Create email content
    const emailSubject = `Contact Form: ${subject}`
    const emailBody = `
New contact form submission from Med Path website:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the contact form on the Med Path website.
    `.trim()

    // Send email via Resend (no SMTP).
    // Requires:
    // - RESEND_API_KEY
    // - RESEND_FROM (optional; defaults to onboarding@resend.dev)
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Email sending is not configured (missing RESEND_API_KEY).' },
        { status: 501 }
      )
    }

    const resend = new Resend(resendApiKey)
    const from = process.env.RESEND_FROM || 'onboarding@resend.dev'

    await resend.emails.send({
      from,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: emailBody,
    })

    // Option 2: Use Nodemailer (requires SMTP configuration)
    // Uncomment and configure if using Nodemailer
    /*
    const nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
    
    await transporter.sendMail({
      from: process.env.SMTP_FROM || email,
      to: recipientEmail,
      subject: emailSubject,
      text: emailBody,
    })
    */

    return NextResponse.json(
      { 
        success: true,
        message: 'Message sent successfully' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
