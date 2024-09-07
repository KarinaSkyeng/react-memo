const API_URL = "https://wedev-api.sky.pro/api/leaderboard";

export async function getPlayersList() {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  const data = await response.json();
  return data.leaders;
}

export async function updateLeaderboard(name, score, time, achievements) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ name, score, time, achievements }), // Добавляем поле time в запрос
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Ошибка при обновлении лидерборда:", response.status, errorText);
      throw new Error(`Не удалось обновить лидерборд: ${response.status} ${errorText}`);
    }

    console.log("Лидерборд успешно обновлён");
  } catch (error) {
    console.error("Ошибка сети или другая ошибка:", error);
    throw new Error("Не удалось обновить лидерборд");
  }
}
