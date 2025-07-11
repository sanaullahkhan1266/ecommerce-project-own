// Google OAuth Configuration
export const GOOGLE_CONFIG = {
  // Replace with your actual Google OAuth Client ID
  CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID_HERE",
  
  // Scopes for Google OAuth
  SCOPES: [
    'openid',
    'profile',
    'email'
  ],
  
  // Redirect URI (if needed)
  REDIRECT_URI: window.location.origin,
};

// Instructions for setting up Google OAuth:
// 1. Go to Google Cloud Console (https://console.cloud.google.com/)
// 2. Create a new project or select existing one
// 3. Enable Google+ API and Google OAuth2 API
// 4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
// 5. Set application type to "Web application"
// 6. Add your domain to authorized origins (for development: http://localhost:5173)
// 7. Copy the Client ID and replace "YOUR_GOOGLE_CLIENT_ID_HERE" above
// 8. For production, add your actual domain to authorized origins 