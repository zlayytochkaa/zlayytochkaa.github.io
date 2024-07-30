from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from aiogram.utils import executor
from aiogram.dispatcher import FSMContext
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from dotenv import dotenv_values
from flask import Flask, jsonify
import sqlite3
import asyncio
import os
import sys

config = dotenv_values('.env')
API_TOKEN = config['API_TOKEN']
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot, storage=MemoryStorage())
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

@dp.message_handler(commands=['start'])
async def send_welcome(message: types.Message):
    user_id = message.from_user.id
    username = message.from_user.username
    fullname = message.from_user.full_name

    cursor.execute('''
        INSERT OR REPLACE INTO users (username, fullname, user_id, profile)
        VALUES (?, ?, ?, COALESCE((SELECT profile FROM users WHERE user_id = ?), NULL))
    ''', (username, fullname, user_id, user_id))
    conn.commit()

    url = f"https://zlayytochkaa.github.io/?user_id={user_id}"
    user_keyboard = InlineKeyboardMarkup()
    user_keyboard.add(
        InlineKeyboardButton("Открыть приложение", web_app=WebAppInfo(url=url))
    )
    await message.reply("Здравствуйте", reply_markup=user_keyboard)

app = Flask(__name__)
@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute('SELECT username, fullname FROM users WHERE user_id = ?', (user_id,))
    user = cursor.fetchone()
    conn.close()
    if user:
        return jsonify({'username': user[0], 'fullname': user[1]})
    else:
        return jsonify({'error': 'Пользователь не найден'}), 404

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
    os.makedirs('logs', exist_ok=True)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    executor.start_polling(dp, skip_updates=True)
    app.run(debug=True)