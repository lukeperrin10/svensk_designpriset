# Designpriset

This system is divided in 3 parts: Django admin interface, node server and react frontend (see dirs backend and frontend for readme on how to build/run etc).
THe system is built to handle the competitions different phases as followed:

### Phase one: 
Phase for registering entries to enter the competition
### Phase two: 
Phase for the jury to nominate entries and for entering companies to edit their entries.
### Phase three: 
Voting time!
### Phase four: 
Waiting for the winners to be announced-phase.
### Phase five: 
Announce the winners and then wait for next years phase one.

We use Django to manage (almost) all of the website content + settings for the award year (phase dates, award places, entries, profiles, users etc).
The frontend and the node server uses the settings made by Batteri in Django for the post and response logic.

