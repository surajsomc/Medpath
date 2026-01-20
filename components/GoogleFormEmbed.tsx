'use client'

interface GoogleFormEmbedProps {
  /**
   * The Google Form embed URL
   * Get this by: Form → Send → HTML (</>) → Copy the src URL from the iframe
   * Example: https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform?embedded=true
   */
  formUrl: string
  /**
   * Height of the form iframe in pixels
   * @default 1200
   */
  height?: number
  /**
   * Title for accessibility
   */
  title?: string
  /**
   * Additional CSS classes
   */
  className?: string
}

export default function GoogleFormEmbed({ 
  formUrl, 
  height = 1200, 
  title = 'Google Form',
  className = '' 
}: GoogleFormEmbedProps) {
  // Ensure the URL has embedded=true parameter
  const embedUrl = formUrl.includes('embedded=true') 
    ? formUrl 
    : formUrl.includes('?') 
      ? `${formUrl}&embedded=true`
      : `${formUrl}?embedded=true`

  return (
    <div className={`w-full ${className}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height={height}
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title={title}
        className="w-full border-0 rounded-lg shadow-lg"
        style={{ minHeight: '600px' }}
        loading="lazy"
      >
        Loading…
      </iframe>
    </div>
  )
}
