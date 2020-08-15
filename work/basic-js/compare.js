"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
	
	if (word === undefined || guess=== undefined)
	{return 0;
	} 
	word = word.toUpperCase();
	guess = guess.toUpperCase();
	const ctr1 = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0,K:0,L:0,
				M:0,N:0,O:0,P:0,Q:0,R:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0};
	const ctr2 = {A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0,I:0,J:0,K:0,L:0,
				M:0,N:0,O:0,P:0,Q:0,R:0,S:0,T:0,U:0,V:0,W:0,X:0,Y:0,Z:0};
	for(const i in word){
		
		const letter = word.charAt(i);
		ctr1[letter]++;
	}
	for(const i in guess){
		
		const letter = guess.charAt(i);
		ctr2[letter]++;
		
	}
	
	var total = 0;
	for( const letter in ctr1){
		
		var val = 0;
		if(ctr1[letter]<=ctr2[letter]){
			val = ctr1[letter];
		} else {
			val = ctr2[letter];
		}
		total =  total + val;
		
	}
	
	



  return total;

}
