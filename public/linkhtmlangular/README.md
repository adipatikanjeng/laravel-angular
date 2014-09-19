The path defined in $routeProvider can contain named groups starting with a colon and ending with a star: e.g.:name*. All characters are eagerly stored in $routeParams under the given name when the route matches.

For example /list/:id will match /list/1 and give <code>$routeParams.id = 1.</code>

The path can contain optional named group parameters with a question mark.FOr e.g.link1?search=hello will give 
<code>$routeParams.search = "hello"</code>