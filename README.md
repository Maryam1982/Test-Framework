This project is the last part of my JavaScript course in which I experienced with testing Node.js apps.
I initially used Mocha and then I developed (as a guided project) this small project to run tests
in Node.j enviroment.
The goal was minimal setup, as opposed to Mocha and the framework to work both for web/Node.js enviroments.
So the most interesting part was using this "jsdom" library.
This library makes it possible to have an almost identical DOM-like object but in Node.js enviroment.
Using JSDOM.fromFile(fileName,options) we can pass a HTML file and receive a DOM-like object.

-------------------------------
To test this framework, using command line, you will need test files(.test.js).
You move to the folder containing the test file(s) and run "tme".
Since "tme" is defined globally and executes from anywhere.
There are 2 sample projects with sample test files included.
