# Food Exchange

## Inspiration

This project is inspired by the real-life pains of students staying on campus - we are forced to buy meal plans, and meals are included even on public holidays and weekends! Most people only end up consuming about 70% of their meal credits, and this leads to a huge amount of food wastage and money wasted. Making matters worse, each credit has an expiry date!

## What It Does

Our application connects sellers subscribed to meal plans that have spare credits with willing buyers.

This application has two phases - a telegram bot for buyers, and a web application for both buyers and sellers. The telegram bot is easy to use and saves past information. A smart algorithm is used to match buyers to sellers, and information is updated real-time instantly using a NoSQL database.

On the web application, buyers can visualise information such as available coupons, and opt to purchase meal coupons. This gives the buyers the ability to use either the web application to view availability of coupons and plan ahead, or just use the telegram bot for its convenience.

Sellers can use the web app to track and manage their coupons, sell their coupons, and accept deals from buyers. Sellers can track the use of their coupons to better manage their usage.

Buyers and sellers can trade coupons for up to 2 days ahead of today.

## How We Built It

Our design and engineering decisions are inspired by the tools that would make the user experience absolutely seamless. We used a Telegram Bot API to design and implement our telegram bot, while the web app built using ReactJS, HTML5/CSS, NodeJS. The database was built using NoSQL on firebase. Using firebase with React allows us to update information in real-time, allowing users to view the most up-to-date information without having to refresh their app. This is a 2-way synchronisation makes the app very easy to use.

## Challenges We Ran Into

It was our first time using ReactJS and making a telegram bot, and we spent many hours staring at tutorials and debugging - nothing came easy to us, but we are very proud of our end product!

## Screenshots


## Members

[Calvin Tantio](https://github.com/CT15)

[Cheong Jie Ning Jacqueline](https://github.com/Aquarinte)

[Harsh Gadodia](https://github.com/harshgadodia)

[Lee Yan Hwa](https://github.com/leeyh20)
