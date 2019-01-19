import logging
#import telegram_id

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import (Updater, CommandHandler, MessageHandler, Filters, 
CallbackQueryHandler, RegexHandler, ConversationHandler)

TOKEN = '770876411:AAE7Xbr26fa-vkJ4BfnJV2rOntmwaD3Hsns'

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)

DATE, TIME, LOCATION, AMOUNT, MEAL, CONTACT = range(6)

def build_menu(buttons,
               n_cols,
               header_buttons=None,
               footer_buttons=None):
    menu = [buttons[i:i + n_cols] for i in range(0, len(buttons), n_cols)]
    if header_buttons:
        menu.insert(0, header_buttons)
    if footer_buttons:
        menu.append(footer_buttons)
    return menu

def start(bot, update):
    reply_keyboard = [['Breakfast', 'Dinner']]

    update.message.reply_text(
        'Hi there! Welcome to FoodExchange, '
                     'a bot that helps you buy meal credits. '
                     'Try the /help '
                     'command to see all available commands.' 
                     'What meal would you like to purchase?',
                    reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))

    return MEAL

def cancel(bot, update):
    update.message.reply_text('Bye!',
                              reply_markup=ReplyKeyboardRemove())

    return ConversationHandler.END

def meal(bot, update):
    reply_keyboard = [['Today', 'Tomorrow']]
    user = update.message.from_user

    logger.info("%s has selected breakfast/dinner: %s", user.first_name, update.message.text)

    update.message.reply_text('I see! I have noted your choice. Now when would you like to purchase this meal?',
                            reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))

    return DATE

def date(bot, update):
    user = update.message.from_user
    reply_keyboard = [['7-8', '8-9','9-10']]

    logger.info("%s has chosen date: %s", user.first_name, update.message.text)

    update.message.reply_text('Excellent. Now, please tell me what time you would like to purchase the meal credit?',
                              reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))

    return TIME

def time(bot, update):
    user = update.message.from_user
    reply_keyboard = [['Cinnamon/Tembusu Dining Hall', 'Capt/RC4 Dining Hall']]

    logger.info("%s has chosen the following time: %s", user.first_name, update.message.text)

    update.message.reply_text('I see! Now please chose your location.',
                                reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))
    return LOCATION

def location(bot, update):
    user = update.message.from_user

    logger.info("%s has selected the location: %s", user.first_name, update.message.text)

    update.message.reply_text('How many meals would you like to purchase?')

    return AMOUNT

def amount(bot, update):
    user = update.message.from_user

    logger.info("%s has selected the amount: %s", user.first_name, update.message.text)

    update.message.reply_text('I see! I have noted your choice. Now please give me your telegram handle')

    return CONTACT

def contact(bot, update):
    user = update.message.from_user

    logger.info("%s contact is: %s", user.first_name, update.message.text)

    update.message.reply_text('I see! I have noted your contact information')
    
    return ConversationHandler.END


def help(bot, update):
    help_message = ('You can control me by sending these commands:\n'
                    '/buy - buy a meal credit from someone\n'
                    '/menu - view the menu today'
                    )

    update.message.reply_text(help_message)

def error(bot, update, error):
    logger.warning('Update "%s" caused error "%s"', update, error)


def main():
    updater = Updater(TOKEN)
    dp = updater.dispatcher

    #dp.add_handler(CommandHandler('create', create))
    #dp.add_handler(CommandHandler('tweet', tweet))
    #updater.dispatcher.add_handler(CallbackQueryHandler(confirm_tweet))
    #dp.add_handler(CommandHandler('saved', saved))
    #dp.add_handler(MessageHandler(Filters.text, create_tweet))

    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('start', start)],

        states={

            MEAL: [RegexHandler('^(Breakfast|Dinner)$', meal)],

            DATE: [MessageHandler(Filters.text, date)],

            TIME: [RegexHandler('^(7-8|8-9|9-10)$', time)],

            LOCATION: [RegexHandler('^(Cinnamon/Tembusu Dining Hall | Capt/RC4 Dining Hall)$', location)],

            AMOUNT: [MessageHandler(Filters.text, amount)],

            CONTACT: [MessageHandler(Filters.text, contact)]

            #BIO: [MessageHandler(Filters.text, bio)]
        },

        fallbacks=[CommandHandler('cancel', cancel)]
    )

    dp.add_handler(conv_handler)

    dp.add_error_handler(error)

    updater.start_polling()

    updater.idle()

if __name__ == '__main__':
    main()
