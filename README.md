### Current API Challenge
 website url:
 https://current-challenge.herokuapp.com/visit
## To Add a visit:

To add a visit: 
must have userId (i.e., Id of user) and name (i.e., location of visit) of location
When entering a new visit, the newly generated visitId will be returned

Example:
http://current-challenge.herokuapp.com/visit?userId=10&name=starbucks


## To Query user/location
Can search for a specific visit using the visitId:
must enter visitId in query string

to search for a user and search for location (i.e., name) must enter userId and searchString in query strings

When searching, the 5 most recent visits will be returned that match the search string.  The search will match if part of all of the search string is included.

Example: 
Using visitId:
http://current-challenge.herokuapp.com/visit?visitId=15981e556038457580d4c7783395263b

Using userId and searchString:
http://current-challenge.herokuapp.com/visit?userId=user9&searchString=starbucks



