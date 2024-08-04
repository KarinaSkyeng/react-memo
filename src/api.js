const API_URL = "https://wedev-api.sky.pro/api/leaderboard";

export async function getPlayersList() {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}
