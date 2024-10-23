export const fetchWithAuth = async (url, options = {}) => {
    // Отримання токена з localStorage
    const token = localStorage.getItem('token');
    // Додавання заголовків до запиту
    const headers = {
        ...options.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        'Content-Type': 'application/json',
    };
    console.clear()
    console.info(options)

    try {
        // Виконання fetch запиту з переданими опціями і заголовками
        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Перевірка, чи запит був успішним
        if (!response.ok) {
            // Якщо відповідь не успішна, отримуємо текст помилки з сервера
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        // Повертаємо відповідь
        return response;
    } catch (error) {
        // Виводимо помилку у консоль
        console.error('Fetch error:', error);
        throw error;
    }
};