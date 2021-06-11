# MickeyClicker
Based on the CookieClicker app, created with React Native.

Uses AWS authentication to sign in, adds users to a user pool. After sign in is the home screen, if you go to the play screen you will be able to click on the Mickey Mouse image and it will display total clicks, clicks per second, current time, and an animation that compresses the image when clicked on.
High score for individual users is saved to DynamoDB, and will update if clicks exceeds the high score.

Note: must click "start timer" to begin the clicks per second and timer displays.
