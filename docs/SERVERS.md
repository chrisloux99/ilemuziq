# Setting Up iLe Muziq Servers

## How to Get a Navidrome Server

If you don't already have a Navidrome server, you'll need to set one up to host your music library. Here are the two easiest ways to get started:

### Option A: Windows (Simplest for beginners)
1. Download the latest Windows binary from the [Navidrome Releases](https://github.com/navidrome/navidrome/releases) page (look for `navidrome_X.X.X_windows_amd64.zip`).
2. Extract the `.zip` file into a folder (e.g., `C:\Navidrome`).
3. Open a Command Prompt or PowerShell in that folder and run `.\navidrome.exe`.
4. It will create a `navidrome.toml` file. You can edit this to point to your music folder (`MusicFolder = "D:\MyMusic"`).
5. Once running, open your web browser and go to `http://localhost:4533`.
6. **Your Server URL for iLe Muziq** will be `http://localhost:4533` (if on the same machine) or `http://YOUR_COMPUTER_IP:4533`.

### Option B: Docker (Recommended for long-term use)
If you have Docker Desktop installed:
1. Create a `docker-compose.yml` file:
```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    ports:
      - "4533:4533"
    environment:
      ND_MUSICFOLDER: /music
    volumes:
      - "./data:/data"
      - "C:/Users/YourName/Music:/music:ro" # Change to your music path
```
2. Run `docker-compose up -d`.
3. Open `http://localhost:4533` in your browser.
4. **Your Server URL for iLe Muziq** will be `http://YOUR_IP:4533`.

### How to find your URL
- **Local machine**: `http://localhost:4533`
- **Other machines on your network**: 
  1. Open Command Prompt and type `ipconfig`.
  2. Look for `IPv4 Address` (e.g., `192.168.1.50`).
  3. Your URL is `http://192.168.1.50:4533`.

> [!IMPORTANT]
> **Common Installation Issue**: Ensure you have downloaded the **Windows** version of Navidrome. If your folder name contains `darwin_arm64`, you have the macOS version, which will not run on Windows. Look for `navidrome_X.X.X_windows_amd64.zip` instead.
>
> In PowerShell, you must run the program with `.\navidrome.exe` (with the dot and backslash).

## Navidrome Configuration Guide

Navidrome is the recommended server for **iLe Muziq**. To get the best experience, follow these detailed steps to configure your Navidrome instance and connect it to iLe Muziq.

### 1. Find Your Navidrome URL
- Ensure your Navidrome server is running and accessible on your network.
- The default port for Navidrome is `4533`.
- Example URLs:
  - Local network: `http://192.168.1.100:4533`
  - Domain (if using a reverse proxy): `https://music.yourdomain.com`

### 2. Configure Navidrome Settings for iLe Muziq
For the best performance and to avoid frequent re-logins, we recommend adjusting your `navidrome.toml` (or environment variables) with these settings:

- **SessionTimeout**: Set this to a large value (e.g., `72h` for 3 days) to stay logged in longer.
  - Env Var: `ND_SESSIONTIMEOUT=72h`
- **Enable Subsonic API**: iLe Muziq uses the Subsonic API to communicate with Navidrome. This is enabled by default, but ensure it's not disabled.
  - Env Var: `ND_ENABLESUBSONIC=true`

### 3. Adding the Server in iLe Muziq
1. Open the **iLe Muziq** app.
2. Go to **Manage Servers** from the sidebar menu.
3. Click **Add Server**.
4. Set **Server Type** to `Navidrome`.
5. Enter your **Server URL**.
6. **Authentication**:
   - Provide your Navidrome username and password.
   - For some security setups, you might need to use a Subsonic-specific password or "Generate a Subsonic Token" if your server requires it (Navidrome usually works with the main password).
   - Click **Save password** to stay logged in.

### 4. Handling Large Libraries
If you have a very large music library:
- **Rescanning**: After adding music to your server's media folder, you may need to trigger a scan in Navidrome (Settings > Scan) for iLe Muziq to see the new tracks.
- **Scanning Mode**: Navidrome's "Quick Scan" is usually sufficient for new files, while a "Full Scan" is better for metadata changes.

### 5. Advanced: Transcoding
If your internet connection is slow, you can set up transcoding in Navidrome:
1. Log in to your Navidrome web interface.
2. Go to **Settings > Players**.
3. Choose your iLe Muziq player (it will show up after you first connect).
4. Select a transcoding profile (e.g., MP3 or Opus) to reduce the bandwidth used for playback.

## How to Add a Server

### Via the User Interface (Desktop)
1. Launch **iLe Muziq**.
2. If it's your first time, you will be prompted to add a server.
3. Otherwise, click the **Open Menu** button (hamburger icon) in the sidebar.
4. Select **Manage Servers**.
5. Click **Add Server**.
6. Fill in the details:
   - **Name**: Give your server a display name (e.g., "Home NAS").
   - **Type**: Select your server type (Navidrome, Jellyfin, or Subsonic).
   - **Server URL**: The full URL including protocol and port (e.g., `https://music.example.com` or `http://192.168.1.100:4533`).
7. Click **Save**.

### Via Environment Variables (Docker / Advanced)
If you are running iLe Muziq via Docker, you can pre-configure the server using environment variables:

- `SERVER_NAME`: The name of the server.
- `SERVER_TYPE`: `navidrome`, `jellyfin`, or `subsonic`.
- `SERVER_URL`: The full URL of the server.
- `SERVER_LOCK`: Set to `true` to prevent users from changing these settings in the UI.

Example Docker Compose snippet:
```yaml
services:
  ilemuziq:
    image: ghcr.io/your-org/ile-muziq:latest
    environment:
      - SERVER_NAME=MyMusic
      - SERVER_TYPE=navidrome
      - SERVER_URL=https://navidrome.example.com
      - SERVER_LOCK=true
    ports:
      - 9180:9180
```

## Troubleshooting
- **Connection Error**: Ensure the server URL is correct and accessible from the machine running iLe Muziq.
- **Login Failed**: Double-check your username and password. For Navidrome, we recommend using the "Save password" option.
- **SSL Issues**: If your server uses a self-signed certificate, you may need to enable "Ignore SSL errors" in the advanced settings.
