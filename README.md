# VentCal

## Synopsis
VentCal is an app that is targeted towards people looking for events in their area. How it works:  
 * Users can search events based on location, date, and type of event
 * Once search is complete the page populates with three events that meet the search criteria
 * Users can click on the event to see a dropdown that includes details about the event including date, time, location, and a brief description of the event
   * If the event is music related, Soundcloud provides music from the artist
 * Users can add an event to their calendar on their profile page in order to keep track of their upcoming events
 * The user profile page includes a calendar of all events they have added
 * Users are able to delete, drag and drop (edit), and view events including event details on their calendar

[Trello Board](https://trello.com/b/reVEs9vo/les-developpeurs)

## Motivation

This is project 3 of our WDI course.

## Installation
* Download the zip file or clone this repo to your local computer
* Cd inside the root of the directory and run 'npm install'
* You will need to get API keys for SoundCloud, Eventful, and Yelp, Facebook, and setup the correct environment variables to make the APIs functional
* Create a .env file to hold all of your Api keys and Facebook auth information

## Wire Frames

### Main Page
![Main Page](./public/images/wireframes/Main.png)

### Profile Page
![Profile Page](./public/images/wireframes/Profile.png)

### Signup Page
![Signup Page](./public/images/wireframes/SignUp.png)

### Login Page
![Login Page](./public/images/wireframes/Login.png)

## Models
![ERD](./public/images/ERD.png)

## API Reference
* Eventful
* Yelp
* SoundCloud
* SeatGeek

## Technologies Used
* Node.js
* Express
* MongoDB
* Passport
* Ajax
* jQuery/jQuery UI
* FullCalendar
* Google Maps
* Moment.js

## Contributors

*Gabriel Schnall*

*Laura Leonard*

*Reid Crawford*

## License

This app can be used free of charge. Enjoy!
