#stuff to push to backend

from firebase import firebase

def pushToBackend(amount, date, location, meal, contact, time) {
	firebase = firebase.FirebaseApplication('https://food-exchange-a9870.firebaseio.com', None)

	data = {
  "amount" : amount,
  "date" : date,
  "location" : location,
  "mealType" : meal,
  "telegramHandle" : contact,
  "time" : time
	}

	jsondata = json.dumps(data)

#result = firebase.post('/users', new_user, {'print': 'pretty'}, {'X_FANCY_HEADER': 'VERY FANCY'})

	result = firebase.post('/Coupon', jsondata)

}

from bot import amount, date, location, meal, contact, time
import private
import json





