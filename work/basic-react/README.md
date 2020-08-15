# Basic React

* start from `the up-to-date master branch (`git checkout master; git pull origin master`)
* Create a feature branch named 'basic-react' (`git checkout -b basic-react`)
* create files in this directory to have the required features
* add, commit, and push the branch to github
* Create a PR to merge to master
* Be sure to include the TA(s) and I as reviewers.  
* Due by 11:59pm (PT) Sun Jul 12

## Goals and Requirements

You will create a multiple choice quiz SPA application using create-react-app.  There will be no backend/services portion.

* There is no login
* Your application will only be tested using `npm start` - do not worry about any server for this assignment
* If the page is reloaded, the application is reset
* You will have a collection of at least 3 questions that have at least 2 answers each.  The system will know which answers are correct.  (Hint: Find a data structure for this that isn't painful to use)
* When the page loads it will display a random question and the possible answers.  A turn counter will also be shown, as well as a score (starts at 0).
* When the user picks an answer, they will be told if they are correct or not. 
  * The turn counter will increase by 1.
  * The score will increase if they were correct.
  * A new random question and possible answers will be shown.
* The user cannot be shown the same question twice.
* Once the user has gone through all the questions a final score is shown and the user is not shown any questions.

## Structure Requirements

* Do NOT include the directory created by create-react-app inside here - make sure I can run `npm install` and `npm start` IN THIS DIRECTORY.
* Do not use any class-based components, only function-based components and the useState() react hook as needed.
* Do not modify the DOM in any way other than using React (You can READ the DOM via event.target, but don't modify it, and do not use document.querySelector or other DOM finding methods)
* Every component should be in a separate .jsx file that shares a MixedCase name with the component
* Each component should not be too large - call other components
* Each component should be well-named
* All your state variables should be well-named
* Any complex JS logic or data structures should be be in a separate .js file - import any needed data or functions into the JSX
* Make sure you use CSS! You can have it all in one top-level .css file for your top level component, or in multiple separate files
  * Do not use MixedCase AND kebab-case in your CSS/HTML classes.  Per previous advice keep it all kebab-case.

## Extra credit: 
* The final score contains a "play again" option that will reset the score and turn counters and once again move through the questions in random order.

## Visuals
- Make your application reasonably attractive
- Include enough space around items
- Have elements reasonably aligned

## Additional Requirements
- Follow the best practices described in class, in the code-review doc, and in the best-practices in the readings
- Use Semantic HTML as much as you can
- Make sure your .js/.jsx files are clear and organized, not just a jumble of code
- Follow any suggestions previously given to you in code reviews
- Do NOT use Set() or Map() - just use a plain JS object
- Do NOT use localStorage, sessionStorage, IndexedDB, cookies, or other forms of client-side storage
- Do NOT interact with the browser url, including hash fragment
- Do NOT include files in your PR that are outside the assignment (no IDE configs, node_modules/, etc)
* Do not use external JS other than react itself
* Do not use external CSS libraries
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
  * I and the TA(s) must be able to read it easily

