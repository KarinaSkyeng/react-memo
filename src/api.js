const API_URL = "https://wedev-api.sky.pro/api/v2/leaderboard";

export async function getPlayersList() {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  const data = await response.json();
  return data.leaders;
}

// Получить ID достижений
// function getAchievementIds(achievements) {
//   if (!Array.isArray(achievements)) {
//     return [];
//   }
//   return achievements;
// }

export async function updateLeaderboard(name, time, achievements) {
  // const achievementIds = getAchievementIds(achievements);
  // console.log("Achievements IDs in updateLeaderboard:", achievementIds);

  const requestBody = JSON.stringify({
    name: name || "Пользователь",
    time,
    achievements,
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: requestBody,
    });

    const responseBody = await response.text();
    console.log("Ответ от сервера:", responseBody);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Не удалось обновить лидерборд: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error("Ошибка сети или другая ошибка:", error);
    throw new Error("Не удалось обновить лидерборд");
  }
}
