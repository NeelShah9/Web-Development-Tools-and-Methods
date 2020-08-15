# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
  
Ans: The first rule about REST sevices means that the URL should have a significance to it and not just be a link. The URL should be something you can interact with, often a noun. For example: 'GET /showUser/'. This URL does not 
     represent a resource, but an action(verb). You cannot GET a showUSer. A proper way to write this would be: 'GET/user/?name=Neel'. You can interact with the resource user and GET it based on id or name or any other parameters.

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  

Ans: The problem here is that fetch returns a promise, not a value. 'Promise' is async, and to access async data you need a callback. The console.log here would return a promise and not the value of the username as expected.
     So to fix this one would have to do a callnback on the promise returned by fetch and print out the value. For example: username.then( val => console.log((`user is named ${username}`);

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

Ans: An application "state" is the summary of the current values of all the things/variables that can change, while DOM stand sfor Document Object Model. So "store your state in the DOM" means updating the state(values) in the DOM.
     This shouldn't be done because, once you update the DOM you lose the previous state. This would make reading from states very complicated. So, for instance if you hide a User from the DOM, and go back to find the user and 
     unhide it, you have to do a lot of work to get it back. The best way to store states is in variables, and use those to update a display as needed

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

Ans: A multi-page web application(mpa) as the name suggest has multiple  pages and subpages with different content. A single-page web application(spa) has only one page where all the data is displayed. A mpa uses "links" to 
     naviagte through the pages while a spa uses "service calls". For a mpa, the whole page reloads to update data and for an spa there are no automatic page reloads, instead parts of the page update(DOM manipulation) to display 
     new data. A mpa needs forms but an spa dosen't. Mpa(s) are good for displaying huge amounts of data as there are a lot of options while spa(s) are more efficient since the time taken for partial reloads is lesser.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Ans: Progressive Enhancement is Taking a non-client-side JS web app and augmenting it with JS. This means that we can take a mpa and apply JS to it to make it an spa. An SPA that does not use Progressive Enhancement will stop
     working or wont't work well if the browser does not support client-side JS. But an SPA that uses Progressive Enhancement will keep working as a MPA, also it will be much more secure than an SPA that doesn't use Progressive
     Enhancement when the JS is working.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
       A REST service is similar to a dynamic asset. THis is because a dynamic asset generates HTML when the page is rendered, similarly a REST service generates HTML when called. So, they both use Dynamic HTML. 
       A REST service and a dynamic asset differ in the way that REST service need one HTML page to function while dynamic asset does not.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
    
Ans: An example of information that you shouldn't store is a password or any other persona;/sensitive data. This is because they're out in the open and potentially accessible to anyone out there. They are often just plain texts
     of data that can be read and written. We need to assume that at any point of time, we are always under attack, so storing personal data like passwords in a cookie could lead to a breach from hackers or other people. 

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data

Ans: A large portion of the code is reused and not written from scratch. Seperating of a function that fetches data from what you do with the data helps improve this reusability. If these two are coupled together in a code, its is
     difficult to replace one without changing the other, hence hampering reusability. The seperation of the two also improves the readability(skimming) of the code by reducing effort, in the sense that one dosen't have to read every
     line to know what's going on with the code.
     

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
  
Ans: Try/catch is useless when dealing with asynchronous errors because it never catches the error. This is because the "try" statement runs and its following promise runs, but the callback associated with it doesn't run yet. After that the 
     "catch" and everything associated with the catch runs, so the code is now complete. After this the callback of the "try" statement runs but it's not under "try/catch" anymore, so the error never falls under the "catch" statement.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.

Ans: Seperation of concerns is both a front end as well as server-side issue. Failing to do so any of the two sides can lead to poor quality of code. For example, Javascript could be on the server side or on the front-end. A function validating
     the login of a user on the client side should only handle the validation, other things like getting data or parsing data should be done by other functions. Similarly a service call written in server.js should only do the work of fetching 
     and sending data, other tasks like processing the data should be done by other functions. Failing to do follow Seperation of concerns would lead to poor quality of code in both the cases.