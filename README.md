# Gram Panchayat Website

A modern, responsive website for Gram Panchayat built with MERN stack (MongoDB, Express, React, Node.js).

## Features

- 🌐 **Multi-language Support**: English, Hindi, and Marathi
- 📱 **Fully Responsive**: Works on all devices
- 🎨 **Modern UI**: Built with React and Bootstrap
- 📧 **Contact Forms**: Complaint submission and contact forms
- 🖼️ **Photo Gallery**: Interactive image gallery
- 📹 **Video Support**: Embedded video with modal popup
- 🏆 **Awards Section**: Showcase achievements
- 🗺️ **Tourist Destinations**: Display local attractions
- 📰 **News/Updates**: Latest announcements and news

## Project Structure

```
Gram Panchayat abc/
├── frontend/          # React frontend application
│   ├── public/        # Static files
│   ├── src/           # Source code
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context (Language)
│   │   └── App.js      # Main app component
│   └── package.json
├── backend/           # Node.js/Express backend
│   ├── server.js      # Main server file
│   └── package.json
├── img/               # Images folder
└── package.json       # Root package.json
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

   Or install manually:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Start development servers:**

   Run both frontend and backend concurrently:
   ```bash
   npm run dev
   ```

   Or run separately:
   ```bash
   # Terminal 1 - Backend
   npm run server

   # Terminal 2 - Frontend
   npm run client
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Configuration

### Backend Environment Variables

Create a `backend/.env` file:
```
PORT=5000
NODE_ENV=development
```

### Image Assets

Place your images in the `img/` folder. The application will use:
- `logo.png` - Gram Panchayat logo
- `gav1.jpeg`, `gav2.jpeg`, `gav3.jpeg` - Village images
- `sarpanch.png`, `gramadhikari.png`, etc. - Official photos
- Other images for gallery and pages

### Video

Place the welcome video at `frontend/public/videos/welcome.mp4` for the About section.

## Available Scripts

### Root Level
- `npm run dev` - Run both frontend and backend
- `npm run server` - Run backend only
- `npm run client` - Run frontend only
- `npm run install-all` - Install all dependencies

### Frontend
- `npm start` - Start React development server
- `npm run build` - Build for production

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Features in Detail

### Multi-language Support
- Switch between English, Hindi, and Marathi
- All content updates dynamically
- Language preference can be stored in localStorage (future enhancement)

### Responsive Design
- Mobile-first approach
- Bootstrap 5 for responsive grid
- Custom CSS for enhanced styling

### Complaint System
- Modal form for filing complaints
- Submits to backend API
- Will store in MongoDB (to be implemented)

### Photo Gallery
- Grid layout with hover effects
- Click to view full-size images in modal
- Uses images from `img/` folder

## Future Enhancements

- [ ] MongoDB integration for data storage
- [ ] Admin panel for content management
- [ ] User authentication
- [ ] Email notifications for complaints
- [ ] Search functionality
- [ ] More language translations
- [ ] Blog/News CMS
- [ ] Event calendar

## Technologies Used

- **Frontend:**
  - React 18
  - React Router DOM
  - Bootstrap 5
  - React Bootstrap
  - Axios
  - React Icons
  - Font Awesome

- **Backend:**
  - Node.js
  - Express.js
  - CORS
  - Body Parser
  - Nodemailer (for future email functionality)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for Gram Panchayat use.

## Support

For issues or questions, please contact the development team.

