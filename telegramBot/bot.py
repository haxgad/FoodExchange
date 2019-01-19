import logging
#import telegram_id

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackQueryHandler, Updater, CommandHandler, MessageHandler, Filters, RegexHandler, ConversationHandler

TOKEN = '770876411:AAE7Xbr26fa-vkJ4BfnJV2rOntmwaD3Hsns'

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)

is_creating_tweet = False
saved_tweet = None

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
    reply_keyboard = [['Today', 'Tomorrow', 'Another Day']]

    update.message.reply_text(
        'Hi there! Welcome to FoodExchange, '
                     'a bot that helps you buy meal credits. '
                     'Try the /help '
                     'command to see all available commands.' 
                     'For now, when would you like to purchase food?'
        reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True))

    return GENDER

# def start(bot, update):

#     reply_keyboard = [['Boy', 'Girl', 'Other']]

#     update.message.reply_text = ('Hi there! Welcome to FoodExchange, '
#                     'a bot that helps you buy meal credits. '
#                     'Try the /help '
#                     'command to see all available commands.')

#     reply_markup=ReplyKeyboardMarkup(reply_keyboard, one_time_keyboard=True)



def help(bot, update):
    help_message = ('You can control me by sending these commands:\n'
                    '/buy - buy a meal credit from someone\n'
                    '/menu - view the menu today'
                    )

    update.message.reply_text(help_message)



def order(bot, update):
    #global saved_tweet

    # if update.message.from_user.id != telegram_id.id:
    #     no_match_message = ('Sorry, you cannot Tweet using this bot because '
    #                         'you are not the owner of this bot. However, you '
    #                         'can create one for yourself by following the step'
    #                         'by step guide at https://github.com/CT15/FastTweetBot')
    #     update.message.reply_text(no_match_message)
    #     return

    #check_is_creating_order(update)

    if saved_tweet is None:
        fail_message = ('You have not created any Tweet yet. '
                        'Use the /create command to create one.')
        update.message.reply_text(fail_message)
        return

    keyboard = [[InlineKeyboardButton('Yes', callback_data='Yes'),
                 InlineKeyboardButton('No', callback_data='No')]]

    reply_markup = InlineKeyboardMarkup(keyboard)

    message = ('Are you sure? '
               'Use the /saved command to check what you are going to Tweet.')

    update.message.reply_text(message, reply_markup=reply_markup)


def create_order(bot, update):
    global is_creating_tweet
    global saved_tweet

    if not is_creating_tweet:
        fail_message = ('Are you trying to create a Tweet? Use the /create '
                        'command to do so.')

        update.message.reply_text(fail_message)
        return

    char_count = len(update.message.text)
    if char_count > 280:
        fail_message = ("Your Tweet contains {char_count}. "
                        'Twitter only allows a maximum of 280 characters '
                        'per Tweet.\n'
                        'You can start recreating your Tweet now ...')
        update.message.reply_text(fail_message)

    saved_tweet = update.message.text
    success_message = ('Your tweet is successfully saved! '
                       'Use the /saved command to see your saved Tweet.')
    update.message.reply_text(success_message)

    is_creating_tweet = False
    return


def error(bot, update, error):
    """Log Errors caused by Updates."""
    logger.warning('Update "%s" caused error "%s"', update, error)


def main():
    """Start the bot"""
    updater = Updater(TOKEN)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler('start', start))
    dp.add_handler(CommandHandler('help', help))
    #dp.add_handler(CommandHandler('create', create))
    #dp.add_handler(CommandHandler('tweet', tweet))
    #updater.dispatcher.add_handler(CallbackQueryHandler(confirm_tweet))
    #dp.add_handler(CommandHandler('saved', saved))
    #dp.add_handler(MessageHandler(Filters.text, create_tweet))

    dp.add_error_handler(error)

    updater.start_polling()

    updater.idle()

if __name__ == '__main__':
    main()