# Grocery List 

###Description
This application is meant to be used for making a shopping list. The most significant feature of the application is that it can simultaneously be used on multiple devices/browsers and the list will update in real-time on all the devices, based on changes made on one. For example: if you a going to grocery shop with your partner and you split up to divide and conquer. If you grab the bread on the list and mark it as purchased, then the view your partner sees will also update to mark bread as 'completed', avoiding duplicate purchases.  
Note that both people will have to be logged in on a joint account at this stage in the application since a list is private to a user.

###Technical Decisions
The first major decision was to choose Node and Express serving EJS. This was purely due to familiarity and coding time. The next choice was how to enable real-time syncing of the lists. I chose to use Socket.Io because it has wide support in the ecosystem and good example docs to follow usage in Express. It turned out to be a bit tricky due some new updates in the way Express works. Socket could no longer be initialized by the http object, but required the server object instead. In the end, I ended up in developing a standalone socket.js module because declaring socket in server.js did not allow me to export it. The socket module handled socket initialization and emitting the events. 

###Next steps
With additonal time, my plan is to implement the ability for a user to create multiple lists, as well as the ability to choose other users to 'collaborate' with. i.e. collaborators will have the ability to work on the same lists together. 
I would also improve the UI on the list page by: 
	- making the `edit` and `delete` buttons appear only when the individual item is hovered on. This would declutter the list view and make the experience of using the list more enjoyable for the customer.
	- Enable inline editing of the item when the `edit` button is clicked. 

###Running Tests
For this application test suites have been written using Jasmine. To run the tests you will have to execute the command `npm test` on the terminal once you have navigated to the `grocery-list` repo.