# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)

Ans: The best practices for both JSX Components and JS functions are as follows:
     1). A function/component should have only one purpose. Both Jsx Components as well as JS functions should be  minimal, there shouldn't be too much logic in a single function or component, if there is you should break it down into multiple functions/components. 
     2). A function/Component should be reusable. This can be done by seperation of concerns, no single function/component should know too much or be too specific. When you write code you should keep in mind that other people are gonna be working on the same code someday and they should be able to change an aspect without having to go through changing too many things.
     3). A function/Component should have meaningful names that potray the functionality.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?

Ans: SPA should not be used alone because it uses client-side JS to display the various elements of the page without a full page reload. But if you're using just an SPA, it won't have all the elements working if there is NO client-side JS. That is if the client's browser does not support JS. By using progressive enhancement the SPA can be turned into an MPA in case of no client-side JS avoiding the inconvenience.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where the request is coming from and where the response is received.

Ans: When the page running on the dev server (port 3000) makes a call to `/service` , the browser(front-end js) makes a request to the dev server. The dev server in turns makes a request to the local server(port 4000), this is called proxying a request. On receiving this request the local server(port 4000) sends a response back to the dev serverwhich in turn sends a response to the page(browser).

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`

Ans: When you 'npm run build' and serve the 'build' files as the static files, the server you have written is the only one running and serving the end points as well as the static content. So when the JSX makes a call to `/service` the request is made to the local server(port 4000) which sends a response back to the browser. There are no proxies, the static files we build using create react app are served by the local server.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.

Ans: In React, data is passed down using props. Passing data down means they're passed from parent to child or grandchild an so on, but never from child to parent(up) using props because it is not possible.
 
  Here is an example to explain passing data down:

  const Index = () => {
  return (
    <ul>
      <List id="one" />
      <List id="two" />
    </ul>
  );
 };

 const Count = (props) => {
  return <h1>Item No {props.id} </h1>;
 };
 export default Count;

 So in the above example, the property 'id' is passed from Index to Count comp as props. Hence, the Count component renders the html with 'id' as a part of it. 

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.

Ans:In React, the data cannot be passed up the component tree(parent to child). So anything that is "down" can change the data through state(for classes) and hooks(for functions). In this concept the data that is sent down has a callback that can change the state(data) of the parent component.

Here is an Example to illustrate better:

const App = () => {
  const [switch, setSwitch] = useState(false);

  const toggleOnClick = () => {
    setSwitch(!show);
  };
  return (
    <div>
      <Welcome time="Day" show={switch} />
      <Welcome time="Night" show={switch} />
      <Button onClick={toggleOnClick} />
    </div>
  );
};


const Time = ({ time, show }) => {
  return show ? <p>It is: {time} </p> : null;
};
export default Time;


const Button = ({ onClick }) => {
  return <button onClick={onClick}> Day/Night </button>;
};

 So in the above example, the App component passes down the function as props to the Button component. The Button component calls the onClick function passed by the parent on clicking it, without knowing anything about the logic. The App component recieves the callback function, it changes the state and all the components who uses the "show" state will be rendered according to the state variable.
 
## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

Ans: The collection of student records should be written as an object like this:
 
 const students = {
  Bao: {
    id:654321,
    name: Bao,
    address: 123 Main street,
  },
  Neel: {
    id:990999,
    name: Neel,
    address: White House,
  },
};

It should be an Object in this case because the order of the elements in the collection is not important. Also, the retrieval of values in objects is faster.

The collection of steps to create a pizza should be in an Array, like this:

const pizza = [
  { qty: '2 cups',
    ingredient: 'Marinara sauce',
    instructions: ['spread evenly on pizza'],
  },
  { qty: '1 cup',
    ingredient: 'shredded cheese',
    instructions: ['sprinkle over pizza'],
  },  
];

In this case, the order of the steps in making a pizza is important, hence we use an array because elements in the collection can be accessed by their numerical position in the list.

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.

Ans: All the Inheritance in JS is obtained through the use of protoypes. When we try to call a method or property on an object, and the object does not have it, the interpreter checks the prototype(which are also objects) to see if the protoype has the method/property. If the prototype has the property/method the object will inherit from the prototype and if it doesn't the interpreter will check the prototype's protoypes till it reaches the absolute parent node or finds the property/method. This is called the inheritance chain and that's how objects inherit in Javascript.
 There are 4 ways to create inheritance through prototypes in JS:
 (1). ES6 classes
 (2). Constructor functions
 (3). Brute Force.
 (4). Object.create()

Here is an Example of one of the 4 ways to create inheritance through protoyypes:

function Car(name, color, taste){
    this.name = name,
    this.color = color,
    this.year= year,
}


const ferrari = new Car('Ferrari', 'red', '1986');
const lambo = new Car('Lamborghini', 'yellow', '2017');

Car.prototype.say = function () {
  console.log(`This is a ${this.color} ${this.name} made in ${this.year}`);
};

ferrari.say(); 
lambo.say();


So here, Car is the prototype and we've created objects ferrari and lambo that inherit from the prototype Car. The output of ferrari.say() will be "This is a red Ferrari made in 1986".
 

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.

Ans: In the code sample above the equal to operator (==) is used which tests for 'loose' equality which means that it does 'type conversion' before the equality comparison. This is wrong because if username is not true the second part of the statement (username == undefined) will always return 'true' leading to unexpected errors in the code. A 'strict' comparison would solve this problem by using the '===' operator.

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?

Ans: Decoupling is when two aspects of code (a class or a function or even a file) do not depend on each other. In React App decoupling is when the logic and the display components aren't in the same file. The display component should be in the JSX files while any and all logic should be in a JS file. This is beneficial for both the reusability and reading of the code. If someone is trying to change how something looks, he shouldn't be accidentaly changing the logic of the code and vice versa.

