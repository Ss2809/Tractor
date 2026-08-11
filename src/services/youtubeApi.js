const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const PLAYLIST_ID = "PLgObA3pAqvOh87Z03QG8Z4xE-uqlAWSBy";

export async function getPlaylistSongs() {
  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems" +
    `?part=snippet,contentDetails` +
    `&playlistId=${PLAYLIST_ID}` +
    `&maxResults=70` +
    `&key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    console.error(error);
    throw new Error("Failed to fetch playlist");
  }

  const data = await response.json();

  return data.items
    .filter((item) => item.snippet?.resourceId?.videoId)
    .map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails?.medium?.url ||
        item.snippet.thumbnails?.default?.url,
      channel: item.snippet.videoOwnerChannelTitle || "YouTube",
    }));
}