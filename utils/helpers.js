import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'NOTIFICATION_KEY';
const DECK_STORAGE_KEY = 'FlashCards'


export function getDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {
    return JSON.parse(result);
  });
}
export function getDeck (id) {
  	return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results)=>{
  		const data = JSON.parse(results)
  		return data[id]
  })
 
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then(result => {
            const data = JSON.parse(result);	
            data[title].questions.push(card);
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
        })
}

export function saveDeckTitle (title) {
 	  return AsyncStorage.mergeItem( DECK_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: []
        }
    }))
   
}

export function clearLocalNotifications () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export function createNotification () {
    return {
        title: 'Dont forget to study',
        body: "Practice makes perfect",
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotifications () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if(data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                  if (status === 'granted') {
                      Notifications.cancelAllScheduledNotificationsAsync();

                      let tomorrow = new Date();
                      tomorrow.setDate(tomorrow.getDate() + 1);
                      tomorrow.setHours(8);
                      tomorrow.setMinutes(0);

                      Notifications.scheduleLocalNotificationAsync(
                          createNotification(),
                          {
                              time: tomorrow,
                              repeat: 'day'
                          }
                      );
                      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                  }
              })
        }
      })
}