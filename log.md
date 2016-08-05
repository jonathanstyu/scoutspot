* The app started as an Electron app, a breakoff from VLooker
* After I came across some performance issues, I brought it over to NodeJS world, using an ExpressJS template
* It is structured to have an Engine, which has within it an EngineQuery that contains the various components of the query
* The Engine interprets the data and then feeds it into the SQl library which provides the final query


<!-- React -->
* The App started as pure JS, with underscore templating. I had a single page with a whole lot of functions tied with jQuery
* After a while I got tired of that, so I learned React and added React to the page. I converted little by little the entire page into React components.
* But shortly after I found myself passing a whole lot of callbacks between the pages, passing four or five callbacks down into the component structure.
* This was annoying so I thought about a solution, and came across a page that talked about Flux. From Flux, I learned about Redux
* It took several days to convert the app to Redux
