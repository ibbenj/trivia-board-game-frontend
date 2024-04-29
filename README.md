# Trivia Board Game

### Description
A jeopardy inspired game to play. You can create multiple games, edit the categories and boards, and reveal quesitons as you go along.

#### Fun Features:
- Questions's point values disappear after opening the question (and reappear if clicked on again).
- Double and final jeopardy are included.
- Daily doubles are randomally selected.
- You can manually update players' scores (or in a question you can click on the +/- buttons next to a player to add or remove the current question's value from their score).
- You can add/remove as many number of players as you desire.

### Run project
1. Create a Supabase project and add tables matching the schema below (NOTE TO SELF: ADD A MIGRATION FILE THAT CONTAINS SCHEMA TO MAKE THIS PROCESS MUCH EASIER)
<img width="517" alt="Screenshot 2024-04-28 at 10 41 48 PM" src="https://github.com/ibbenj/trivia-board-game-frontend/assets/67340763/22414a9a-7a70-4804-bd8f-532b1d498951">
3. Set-up .env variables in backend for PROJECT_URL, SERVICE_KEY, and ANON_KEY based on Supabase project.
4. In backend run npm i and then npm run dev.
5. In frontend run npm i and then npm start
6. Go to http://localhost:3000 and have fun!


### Reccomendation
I reccomend using https://buzzin.live/ for the buzzer if you don't have a live buzzer mechanism. I came across it and it seems like an effective way to determine order of who buzzed in.

Play board (question's points disappear as you go through them)
<img width="1759" alt="Screenshot 2024-03-31 at 6 21 48 PM" src="https://github.com/ibbenj/trivia-board-game-frontend/assets/67340763/864243c4-991b-4eb4-b2ad-ca2be838d4c6">

Question
<img width="1791" alt="Screenshot 2024-03-31 at 6 26 29 PM" src="https://github.com/ibbenj/trivia-board-game-frontend/assets/67340763/98ad2034-44f4-4457-aa18-2da61e122f74">

Edit Mode (shows all answers and can add, modify and save questions)
<img width="1783" alt="Screenshot 2024-04-28 at 10 26 40 PM" src="https://github.com/ibbenj/trivia-board-game-frontend/assets/67340763/6035f69a-01a9-42ce-b24f-aa6c6ebcbe13">
