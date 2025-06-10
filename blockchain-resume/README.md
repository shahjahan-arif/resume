# Blockchain Resume Website

A modern, blockchain-themed resume website built with Next.js, featuring a Facebook-like profile layout and PDF download functionality.

## Features

- 🔗 **Blockchain Theme**: Dark mode with crypto-inspired colors and typography
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 📄 **PDF Download**: Generate and download your resume as a PDF
- 🎨 **Facebook-like Layout**: Clean profile design with cover photo and sections
- ⚡ **Fast & Modern**: Built with Next.js 15 and Tailwind CSS
- 🔤 **Blockchain Fonts**: Uses Inter, Space Mono, and Orbitron fonts

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## Customization

### Personal Information

Edit `src/data/resumeData.ts` to update your personal information:

```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Professional Title",
  email: "your.email@example.com",
  phone: "+1 (555) 123-4567",
  location: "Your City, State",
  github: "github.com/yourusername",
  linkedin: "linkedin.com/in/yourusername",
  bio: "Your professional bio..."
};
```

### Skills, Experience, Education

Update the respective arrays in `src/data/resumeData.ts`:

- `skills` - Your technical skills organized by category
- `experience` - Your work experience
- `education` - Your educational background
- `achievements` - Certifications and accomplishments

### Colors and Theme

Customize the color scheme by updating the CSS variables in `src/app/globals.css`:

```css
:root {
  --background: #0a0b0d;    /* Main background */
  --card-bg: #111827;       /* Card backgrounds */
  --accent: #3b82f6;        /* Primary accent color */
  --secondary: #10b981;     /* Secondary accent */
  /* ... more colors */
}
```

## Font Usage

The website uses three blockchain-appropriate fonts:

- **Inter**: Main body text (clean, modern)
- **Space Mono**: Monospace elements (code-like, tech feel)
- **Orbitron**: Headers and titles (futuristic, sci-fi)

## PDF Generation

The PDF download feature uses `html2canvas` and `jsPDF` to generate a high-quality PDF of your resume. Click the "Download PDF" button in the top-right corner to save your resume.

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Lucide React** - Beautiful icons
- **html2canvas** - HTML to canvas conversion
- **jsPDF** - PDF generation

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## File Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/
│   └── ResumeProfile.tsx # Main resume component
└── data/
    └── resumeData.ts   # Your resume data
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this for your own resume website.
