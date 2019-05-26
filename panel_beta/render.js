const jQ = require('jQuery');
const { remote } = require('electron')
const path = require('path')
const url = require('url')

var transitionIndexOut = function(){
  jQ(".index-col").animate({
     opacity: 0.1,
     marginTop: "4in",
   }, 1500, function() {
     jQ("#index-container").hide()
  })
}
var transitionIndexIn = function(){
  jQ("#index-container").show()
  jQ(".index-col").animate({
     opacity: 1,
     marginTop: "0",
   }, 1500)
}

var transitionModuleOut = function(){
  jQ("#module-container").hide()
  jQ(".module-wrapper").empty()
}
var transitionModuleIn = function(){
  jQ("#module-container").show()
}

// On module click, either quit or trigger the transition
jQ(".module-link").click(function() {
  var moduleName = jQ(this).attr("id")
  if(moduleName === "exit"){
    var window = remote.getCurrentWindow()
    window.close()
  }
  transitionIndexOut()
  jQ(".module-wrapper").load("modules/"+moduleName+"/index.html")
  transitionModuleIn()
})

// On back icon, load index
jQ("#backIndex").click(function() {
  transitionModuleOut()
  transitionIndexIn()
})

// Enable scroller
var scroller = new FTScroller(document.getElementById('scrollable-list'), {
  scrollingX: false
})