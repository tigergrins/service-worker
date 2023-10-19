const checkPermission = () => {
	if (!('serviceWorker' in navigator)) {
			throw new Error("No support for service worker!")
	}

	if (!('Notification' in window)) {
			throw new Error("No support for notification API");
	}

	if (!('PushManager' in window)) {
			throw new Error("No support for Push API")
	}
}

const registerSW = async () => {
	const registration = await navigator.serviceWorker.register('sw.js');

	const title = 'Simple Title';

const options = {
  body: 'Simple piece of body text.\nSecond line of body text :)',
};

registration.showNotification(title, options);
	return registration;
}

const requestNotificationPermission = async () => {
	if (Notification.permission !== "denied") {
		const permission = await Notification.requestPermission();

		if (permission !== 'granted') {
				throw new Error("Notification permission not granted")
		}

		new Notification('Example', {body: 'Text Body'})
	}
}

const main = async () => {
	checkPermission()
	await requestNotificationPermission()
	await registerSW()
}

// const checkNotifications = () => {
// 	if (!('Notification' in window)) {
// 		console.log('This browser does not support notification')
// 		return
// 	}

// 	if (Notification.permission === "granted") {
// 		console.log('This user accepted notifications')
// 		return
// 	}

// 	if (Notification.permission !== "denied") {
// 		Notification.requestPermission(function (permission) {
// 			// Если пользователь разрешил, то создаём уведомление
// 			if (permission === "granted") {
// 				var notification = new Notification("Hi there!");
// 			}
// 		});
// 	}
// }

// const registerServiceWorker = () => {
// 	if ("serviceWorker" in navigator) {
// 		navigator.serviceWorker
// 			.register('./service-worker.js')
// 			.then(registration => {
// 				console.log('registration', registration)
// 				registration.pushManager.subscribe({userVisibleOnly: true})
// 					.then(pushSubscription => {
// 						//@ts-ignore
// 						console.log('subscriptionId', pushSubscription.subscriptionId);
// 						console.log('endpoint', pushSubscription.endpoint);
// 					})
// 					.catch(error => {
// 						console.log('Service-worker subscribe error:', error);
// 					})
// 			})
// 			.catch(function (error) {
// 				console.log("Ошибка при регистрации service worker-а:", error);
// 			});
// 	} else {
// 		console.log("Текущий браузер не поддерживает service worker-ы");
// 	}
// }
