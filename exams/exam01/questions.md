# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?

Ans- The difference between a Dynamic and static asset is that static assets are displayed as they are stored, on a browser,
while dynamic assets are rendered when you load a page or do other interactions with a webpage. Static assets can be called "files" 
and dynamic assets cannot because they aren't exactly files before they are rendered. Static assets do not change (unless changed explicitly)
whereas Dynamic assets can change according to input.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?

Ans- The difference between a relative and absolute path is that relative paths are defined from the current page or scenario, whereas absolute paths are defined from the very start or “root”.
 Absolute path starts with a “/” and relative paths does not. The "webserver root/document root" is the root of the webserver and not the file system. Absolute path starts from this webserver root and relative path does not.

## Q: What is the difference between server-side and client-side JS?

Ans- Client-side JS is the JS that runs on the browser, while sever-side JS runs on file systems and backend(server). Client-side JS is used to make the browser interactive with respect to the user. Server-side JS is used for security (passwords).

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?

Ans- ‘var’ hoists a function, meaning even if it is in a function not at the top of the code, var makes it act like the function was written at the start. 
‘Const’ and ‘let’ do not do this, const as the name suggests is not just used for constants but is used to indicate that this value will never be changed whereas let denotes that this value might be changed in the future.
 ‘var’ should never be used. ‘const’ should be used as much as possible unless you know the value will be changed in the future, because that is when you use let.




## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)

Ans- The 4 ways to create inheritance in JS are as follows:

1.	By using the constructor function that is using the “new” keyword to create a new object. The prototype of this new object is the prototype property.
2.	By using Object.create to create a new Object. Here, no constructor is used and the prototype of the new object is the same as that of the object passed.
3.	By using ES6 classes, that is how you would inherit in any other language normally. This type defines classes to use a constructor.
4.	By using Brute Force that is setting the prototype of the object to be inherited directly as the prototype of the new object. 

 
## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".

Ans-
	"use strict"

const purr = function(name) {
	this.name = name;
};
purr.prototype.dontGo = function() {
console.log(` purr is a ${this.name}`);
};
const sound = new purr ('Sound');
sound.dontGo();



## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".

Ans- 
	"use strict"

const hiss = {
	dontBite: function() {
		console.log(`${this.action} can only slide`);
	}
};
const snake = Object.create(hiss);
snake.action = 'Snake';
snake.dontBite();






## Q: Explain what a callback is, and give an example.

Ans- When a function is passed to another function, it is called a Callback. Here, the receiving function gets control over the no of times the ‘callback’ is called,
 when the callback is called and what to pass in the call. 


## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is used `as a call back`, then `this` will not have the expected implicit value"


## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.

Ans- In CSS, “you shouldn’t name your classes after what they look like” means that the classes names should be based on the semantic meaning of the class and not based on the class’ properties like the color or font type.
This is because the graphic properties of the class may change, but the semantic meaning won’t. The background color or font of a text in the class may change, but what it does, it’s job won’t change. 

Example of a poorly named class:


.red-text
{color: Red;
text-align:center;
padding:20px;
}


Example of a well named class:


.page-title
{color: Red;
text-align:center;
padding:20px;
}





