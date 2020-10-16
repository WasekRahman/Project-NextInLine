Homepage: https://project-next-in-line.herokuapp.com/ 
Dashboard: https://project-next-in-line.herokuapp.com/dashboard
Door: https://project-next-in-line.herokuapp.com/door
Event: https://project-next-in-line.herokuapp.com/event

In order to view a specific Dashboard - 
https://project-next-in-line.herokuapp.com/dashboard/{{name}}

For example: https://project-next-in-line.herokuapp.com/dashboard/newgame

In order to view a specific door - 
https://project-next-in-line.herokuapp.com/door/{{name}}

For example: https://project-next-in-line.herokuapp.com/door/ken

In order to view a specific event- 
https://project-next-in-line.herokuapp.com/event/{{doorID}}

For example: https://project-next-in-line.herokuapp.com/event/1d8c9347-473

POST requests -
Building/business information: https://project-next-in-line.herokuapp.com/building/post

Door: https://project-next-in-line.herokuapp.com/door/post/{{name_of_the_building}}
To make sure, the tables map with one another, we have to pass in the name for the building, 
for example- Building with name "newgame" exists in database, so for "newgame" to have doors, 
we will have to make a request to -  https://project-next-in-line.herokuapp.com/door/post/newgame/


Event: https://project-next-in-line.herokuapp.com/event/post/{{doorID_of_the_door}}
Same explanation as earlier.
We will have to use a doorID of a dataset from doors table - https://project-next-in-line.herokuapp.com/event/post/1d8c9347-473

