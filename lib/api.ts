export async function loginUser(phone: string, password: string) {
  try {
    const res = await fetch("https://api.doniyortest.uz/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", 
      },
      body: JSON.stringify({
        phone_number: phone,
        password,
      }),
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Ошибка от сервера:", errorText);
      throw new Error("Неверный номер телефона или пароль");
    }

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const raw = await res.text(); 
      console.error("Ожидался JSON, но получен:", raw);
      throw new Error("Сервер вернул неверный формат (не JSON)");
    }
  } catch (err) {
    console.error("Ошибка логина:", err);
    throw err;
  }
}
