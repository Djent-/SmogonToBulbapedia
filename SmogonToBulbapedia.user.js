// ==UserScript==
// @name        Smogon Links to Bulbapedia
// @namespace   djent-.SmogonToBulbapedia
// @description Add links to Bulbapedia articles on Pokemon and moves to Smogon Strategy Dex pages.
// @include     http://www.smogon.com/dex/*/pokemon/*/
// @version     1.1
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (i=0; i<links.length; i++) {
  // check whether they link to /moves/
  var element = links[i];
  if (element.href.indexOf('/moves/') !== -1) {
    var BulbapediaMoveLink = document.createElement('a');
    BulbapediaMoveLink.style.marginLeft = '5px';
    var moveregexp = /http:(.+?)moves\/(.*)\//;
    var Move = element.href.replace(moveregexp, '$2');
    // Skip the link to the move database
    if (Move == 'http://www.smogon.com/dex/xy/moves/') {
      continue;
    }
    // Substitute the first letter and any letter following an underscore
    // with that letter in upper case
    // This is a special case for two-word moves
    Move = Move.replace(/_(\w)/, function(x){return x.toUpperCase();});
    Move = Move.replace(/^(\w)/, function(x){return x.toUpperCase();});
    BulbapediaMoveLink.href = 'http://bulbapedia.bulbagarden.net/wiki/' + Move + '_(move)';
    var BulbapediaIco = document.createElement('IMG');
    BulbapediaIco.src = 'http://bulbapedia.bulbagarden.net/favicon.ico';
    BulbapediaIco.height = 15;
    BulbapediaIco.width = 15;
    BulbapediaMoveLink.appendChild(BulbapediaIco);
    element.parentNode.insertBefore(BulbapediaMoveLink, element.nextSibling);
  }
}

var h1s = document.getElementsByTagName('h1');

// Get the name of the Pokemon
var address = document.location;
var Pokemon = h1s[0].innerHTML;

for (i=0; i<h1s.length; i++) {
  var element = h1s[i];
  
  // There are a number of h1s on the page besides the ones identifying
  // particular setups.
  // The h1s I want are the ones with an export button as the previous sibling
  if (element.previousSibling && element.previousSibling.nodeName == 'BUTTON') {
    var WikiButton = document.createElement('button');
    WikiButton.className = 'wiki-button';
    WikiButton.style.float = 'right';
    WikiButton.style.marginRight = '10px';
    var BulbapediaPokemonLink = 'http://bulbapedia.bulbagarden.net/wiki/'+Pokemon+'_(Pokémon)';
    WikiButton.onclick = function(){
      window.open(BulbapediaPokemonLink);
    };
    WikiButton.innerHTML = Pokemon + ' on Bulbapedia';
    element.parentNode.insertBefore(WikiButton, element);
  }
}
