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

## Content/mail types and vars in the database and Django

To allow Batteri to add, change and delete content and email content we've created a few models for templates and types. 
These models are not editable by Batteri, only you can and should change these.
The models:

### ContentPhase
Currently we use 5 phases. These content phases are mainly to allow different content to be viewed in different phases.
For each content page Batteri create they need to chose one or more of these phases.

### ContentTemplate
Different templates for distributing correct content on different parts of designpriset.se.
Each content page needs to have one and only one content template.

### MailVar
To allow Batteri to use variables in their emails and to construct, design and structure each email we've created mail vars.
These are later handled in the node backend to replace each var (using regex) and inserten appropriate data.
For example Batteri wants to structure the confirmation email sent to applicants with design and content but needs the competitors information to be inserted in the email.
```
Hi, [#company_name]!
Thanks for entering the competition
```

## Old winner entries
Since this system is new and the model for the entries has changed we've migrated all the old winners from the old system and are treating them slightly different.
The use their own table (old_winner_entries and old_winner_profiles). This goes for the entries that actually existed in the old database. The really old winner entries from the years 2006-2010 was in the old system only generated as html.
We've parsed those into json files included in the node backend.
We recommend not to alter any old entries since the old databse used a different (older) charset and you might be in for a hell of parsing if you're unlucky. =)

## Hosting / SMTP
Right now the system is hosted at Oderland and Batteri is the account holder.
The domain, email adresses and the smpt server is hosted at Ports.