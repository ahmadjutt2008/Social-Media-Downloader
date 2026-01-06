# 🎥 MediaSaver - All-in-One Media Downloader

**Download videos, audio, and images from your favorite social platforms in seconds. Secure, fast, and free.**

![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Active-brightgreen)

## 📸 Project Overview

MediaSaver is a modern, web-based media downloader that supports multiple social media platforms. Whether you want to save content from TikTok, YouTube, Instagram, Facebook, or Twitter/X, MediaSaver makes it simple and fast.

### Supported Platforms
- 🎬 **YouTube** - Download videos in up to 8K resolution
- 🎵 **TikTok** - Save TikTok videos
- 📷 **Instagram** - Download Instagram content
- 👥 **Facebook** - Save Facebook videos
- 𝕏 **Twitter/X** - Download tweets with media

## ✨ Key Features

### 🚀 Super Fast
- Download your media in seconds with optimized servers
- Instant processing and streaming
- No waiting, no delays

### 🔒 Safe & Secure
- **No login required** - Complete privacy
- We don't store your personal data
- No tracking information collected
- Your downloads stay private

### 📱 Mobile Friendly
- Fully responsive design
- Works perfectly on iPhone, Android, Tablets, and Desktop
- Optimized for all screen sizes
- Touch-friendly interface

### 🔍 Smart Platform Detection
- Auto-detect supported platforms
- Real-time URL validation
- Works with any social media link

### 📥 Multiple Format Options
- **Video Format** - Download as MP4
- **Audio Format** - Extract as MP3
- **Image Format** - Save as JPG

### 🎬 Quality Selection
Download in your preferred quality:
- 8K (Ultra HD)
- 4K (Ultra HD)
- 2K (Quad HD)
- 1080p (Full HD)
- 720p (HD)
- 480p (SD)

## 🏗️ Project Structure

```
Social-Media-Downloader/
├── index.html           # Main website structure
├── css/
│   └── style.css       # Styling and layout
├── js/
│   └── script.js       # Frontend logic and interactions
├── server/
│   ├── server.js       # Node.js backend server
│   ├── package.json    # Dependencies configuration
└── README.md           # Documentation
```

## 📋 How to Use

### Step 1: Copy Link
Find the video or image you want on social media and copy its URL.

### Step 2: Paste URL
Paste the link into MediaSaver's input field. The platform will be auto-detected.

### Step 3: Download
Select your preferred format and quality, then click "Start Download". Your file will be saved automatically.

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Bootstrap 5
- **JavaScript** - Interactive UI and platform detection
- **Bootstrap 5** - Responsive grid and components
- **Font Awesome** - Beautiful icons
- **Google Fonts** - Premium typography (Outfit font family)

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **ytdl-core** - YouTube video downloading
- **CORS** - Cross-origin request handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Social-Media-Downloader.git
   cd Social-Media-Downloader
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

4. **Open the frontend:**
   - Open `index.html` in your web browser
   - Or use a local server like `Live Server` extension in VS Code

### Development Mode

For development with auto-reload:
```bash
cd server
npm run dev
```

## 📡 API Endpoints

### GET `/api/info`
Fetches video information and available formats.

**Query Parameters:**
- `url` (required) - The video URL

**Response:**
```json
{
  "platform": "YouTube",
  "title": "Video Title",
  "thumbnail": "image_url",
  "formats": [
    {
      "itag": 18,
      "quality": "1080p",
      "container": "mp4"
    }
  ]
}
```

### GET `/api/download`
Downloads the media file.

**Query Parameters:**
- `url` (required) - The video URL

**Response:**
- Binary file stream (video, audio, or image)

## 🎨 UI/UX Components

### Navigation Bar
- Fixed positioning for easy access
- Auto-detects scroll position
- Smooth transitions
- Call-to-action button

### Hero Section
- Eye-catching headline with gradient text
- Platform icons showcase
- Clear value proposition
- Action buttons

### Downloader Card
- Clean, modern design with glass-morphism effect
- Auto-detect badge with platform visualization
- URL input with floating label
- Format selection (Video/Audio/Image)
- Quality selection dropdown
- Progress bar with status updates
- Success message display

### Features Section
- Card-based layout showcasing 3 key benefits
- Icon boxes with hover effects
- Responsive grid

### How It Works Section
- 3-step process visualization
- Numbered step cards
- Clear, concise instructions

## 🎯 Features in Detail

### Platform Detection
The application automatically detects which platform a URL belongs to using regex patterns:
- YouTube URLs (youtube.com, youtu.be)
- TikTok URLs (tiktok.com)
- Instagram URLs (instagram.com)
- Facebook URLs (facebook.com)
- Twitter/X URLs (twitter.com, x.com)

### Download Process
1. User enters a media URL
2. Frontend validates and detects platform
3. Backend fetches video information
4. User selects format and quality
5. Backend processes and streams download
6. File is automatically saved to user's device

### Progress Tracking
- Real-time status updates
- Percentage completion display
- Animated progress bar
- Success/error messaging

## ⚙️ Configuration

### Port Configuration
The backend server runs on port **5000** by default. To change it:
1. Edit `server/server.js`
2. Change the `PORT` variable
3. Update the backend URL in `js/script.js`

### Environment Variables
Currently, no environment variables are required for basic setup.

## 🐛 Troubleshooting

### "Server is not running" error
- Make sure you've started the backend: `npm start` in the server folder
- Check that port 5000 is not in use
- Verify your firewall settings

### Downloads not starting
- Check browser console for errors (F12)
- Ensure the URL is valid for the platform
- Try a different video/image

### Platform not detected
- Copy the exact URL from the address bar
- Some shortened URLs may not be detected properly

## 📝 License

This project is licensed under the MIT License. Feel free to use, modify, and distribute as needed.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the documentation

## 🔐 Privacy & Security

MediaSaver prioritizes your privacy:
- No account creation required
- No data collection or tracking
- Downloads happen directly to your device
- No servers store your media files
- All transactions use secure protocols

## 📈 Future Enhancements

Planned features for future releases:
- Support for more social media platforms
- Batch downloads
- Cloud storage integration
- Download history (local storage)
- Custom quality profiles
- Dark mode theme
- Multi-language support

## 📚 Additional Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [Express.js Guide](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [ytdl-core GitHub](https://github.com/fent/youtube-dl)

## ⭐ Show Your Support

If you find MediaSaver helpful, please consider:
- Starring the repository
- Sharing with friends
- Contributing to improvements
- Providing feedback

---

**Made with ❤️ by the MediaSaver Team**

*Last Updated: January 2026*