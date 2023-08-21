
const eggs = document.querySelectorAll('.item');
var  isItGuessAlready = true;
var bubblesorting = 0;
var typeOfBadEgg = "heavy"

// Establish drag/drop functionality 
    for (let i=0; i <eggs.length; i++){
        eggs[i].addEventListener('dragstart', dragStart);
    }


    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('dragenter', dragEnter)
        box.addEventListener('dragover', dragOver);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', drop);
        box.addEventListener('dragend', dragEnd);
        box.classList.add('droppable')
    });


    const cartons = document.querySelectorAll('.carton');
    cartons.forEach(box => {
        box.addEventListener('dragenter', dragEnter)
        box.addEventListener('dragover', dragOver);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', drop);
        box.addEventListener('dragend', dragEnd);
        box.classList.add('droppable')

    });


    function dragStart(e, egg) {
        console.log('dragstart', e.target.id)
        console.log('e.target.id', e.target.id)
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);

    }


    function dragEnd(e) {

        e.target.classList.remove('hide')
    
    }

    function dragEnter(e) {
    
        if (e.target.classList.contains('droppable')){
            e.target.classList.add('drag-over');
        }
    }

    function dragOver(e) {
        if (e.target.classList.contains('droppable')){
            e.preventDefault();
            e.target.classList.add('drag-over');
        }
    }

    function dragLeave(e) {
        e.target.classList.remove('drag-over');
    }

    function drop(e) {
        e.target.classList.remove('drag-over');

        // get the draggable element
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);

        console.log(draggable, "draggable")
        // add it to the drop target

        e.target.appendChild(draggable);

        draggable.classList.remove('hide');

        console.log('dragdrop')
    }

// helper function to reOrderEggs(): determines alphabetical priority
    function compare( a, b ) {
        if ( a.dataset.alphord < b.dataset.alphord ){
        return -1;
        }
        if ( a.dataset.alphord > b.dataset.alphordm ){
        return 1;
        }
        return 0;
    }

    function reOrderEggs() { 
        eggsincarton = document.getElementById('mystery-carton').children; 
        const sortedeggsincarton = [...eggsincarton].sort(compare)
        document.getElementById('mystery-carton').replaceChildren(...sortedeggsincarton)
    }


//returns eggs to carton from scale and reorders alphabetically. called by the "Reset" button
    function clearscale() {
    
        document.getElementById('scaleimage').innerHTML = '<img style="width: 100%" src="assets/scale-balanced.png"/>'
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(10px)');
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(10px)');
    
        while (document.getElementById('scale-left').children.item(0)){
            console.log('left eggs ', (document.getElementById('scale-left').children))
            console.log('returning ', document.getElementById('scale-left').children[0])
            console.log('egg1', document.getElementById('scale-left').firstChild)
            var leftegg = document.getElementById('scale-left').firstChild
        if (leftegg) {
            console.log('children', document.getElementById('scale-left').children)
            document.getElementById('scale-left').removeChild(leftegg)
            document.getElementById('mystery-carton').appendChild(leftegg)
        }
        }
    
        while (document.getElementById('scale-right').children.item(0)){
            console.log('right eggs ', (document.getElementById('scale-right').children))
            console.log('returning ', document.getElementById('scale-right').children[0])
            var rightegg = document.getElementById('scale-right').firstChild
            if (rightegg) {
                document.getElementById('scale-right').removeChild(rightegg)
                document.getElementById('mystery-carton').appendChild(rightegg)
            
            }
        }
        reOrderEggs()

    }


// called by the "Measure" button. Compares cumulative weights of each side of the scale and records measurements in the scale record column. 

function whatsinscale() {
    var leftWeight = 0;
    var rightWeight = 0;
    console.log()
    const leftScale = document.getElementById('scale-left').children
    const rightScale = document.getElementById('scale-right').children
    
    for (let i = 0; i <leftScale.length; i++) {
        if(leftScale[i].id == "bad-egg"){
            if (typeOfBadEgg == "heavy"){leftWeight += 1.5; }
            else{leftWeight += 0.5; }
        }
        else{ 
            leftWeight += 1; 
        }
    } 

    for (let i = 0; i <rightScale.length; i++) {
        if(rightScale[i].id == "bad-egg"){
            if (typeOfBadEgg == "heavy"){rightWeight += 1.5; }
            else{rightWeight += 0.5; }
        }
        else{ 
            rightWeight += 1; 
        }
    } 

    var heavierSide = "neither" 

    if (rightWeight > leftWeight){
        heavierSide = "right"
        document.getElementById('scaleimage').innerHTML = '<img style="width: 100%" src="assets/scale-right.png"/>'
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(10vh)');
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(1vh)');
    }
    else if (leftWeight > rightWeight){
        heavierSide = "left"
        document.getElementById('scaleimage').innerHTML = '<img style="width: 100%" src="assets/scale-left.png"/>'
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(10vh)');
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(1vh)');
    }
    else {
        document.getElementById('scaleimage').innerHTML = '<img style="width: 100%" src="assets/scale-balanced.png"/>'
        document.getElementById('scale-left').style.setProperty('transform', 'translateY(1vh)');
        document.getElementById('scale-right').style.setProperty('transform', 'translateY(1vh)');
    }

    var m1 = document.getElementById('measure 1').innerHTML
    var m2 = document.getElementById('measure 2').innerHTML
    var m3 = document.getElementById('measure 3').innerHTML


    // stupid handcoding for the decadence of inefficiency. empties the scale and adds to the appropriate stiny scale in the memory section.

    if (document.getElementById('measure1scale').children[0]==undefined){        
        for (let i =0; i<leftScale.length; i++){
            const newEgg = leftScale[i].cloneNode(true)
            newEgg.id = "disabled_egg"
            newEgg.setAttribute("draggable", "false")
            console.log("children", newEgg.childNodes)
            newEgg.children[0].setAttribute("style", "width:20px")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            document.getElementById('measure1lefteggs').appendChild(newEgg)
        }

        for (let i =0; i<rightScale.length; i++){
            const newEgg = rightScale[i].cloneNode(true)
            newEgg.id = "disabled_egg"
            newEgg.setAttribute("draggable", "false")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            newEgg.children[0].setAttribute("style", "width:20px")
            
            document.getElementById('measure1righteggs').appendChild(newEgg)
            
        }
        const pic = document.getElementById('scaleimage').firstChild.cloneNode(true)

        pic.style.setProperty('width', "120px")
        document.getElementById('measure1scale').append(pic)

    
        if(heavierSide=='left'){
            document.getElementById('measure1lefteggs').style.setProperty('transform','translateY(20px)' )
        }
        if(heavierSide=='right'){
            document.getElementById('measure1righteggs').style.setProperty('transform','translateY(20px)' )
        }
       
    }
    else if (document.getElementById('measure2scale').children[0]==undefined){
        
        for (let i =0; i<leftScale.length; i++){
            const newEgg = leftScale[i].cloneNode(true)
            newEgg.id = "disabled_egg"
            newEgg.setAttribute("draggable", "false")
           
            newEgg.children[0].setAttribute("style", "width:20px")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            document.getElementById('measure2lefteggs').appendChild(newEgg)
        }
     
        for (let i =0; i<rightScale.length; i++){
            const newEgg = rightScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            newEgg.id = "disabled_egg"
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            
            newEgg.children[0].setAttribute("style", "width:20px")

            document.getElementById('measure2righteggs').appendChild(newEgg)
        }
        const pic = document.getElementById('scaleimage').firstChild.cloneNode(true)

        pic.style.setProperty('width', "120px")
        document.getElementById('measure2scale').append(pic)
        if(heavierSide=='left'){
            document.getElementById('measure2lefteggs').style.setProperty('transform','translateY(20px)' )
        }
        if(heavierSide=='right'){
            document.getElementById('measure2righteggs').style.setProperty('transform','translateY(20px)' )
        }
    }
    else if (document.getElementById('measure3scale').children[0]==undefined){
       
        for (let i =0; i<leftScale.length; i++){
            const newEgg = leftScale[i].cloneNode(true)
            newEgg.setAttribute("draggable", "false")
            newEgg.id = "disabled_egg"
            newEgg.children[0].setAttribute("style", "width:20px")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            document.getElementById('measure3lefteggs').appendChild(newEgg)
        }
       
        for (let i =0; i<rightScale.length; i++){
            const newEgg = rightScale[i].cloneNode(true)
            newEgg.id = "disabled_egg"
            newEgg.setAttribute("draggable", "false")
            newEgg.style.setProperty('width', '20px')
            newEgg.style.setProperty('height', '30px')
            newEgg.children[0].setAttribute("style", "width:20px")
            document.getElementById('measure3righteggs').appendChild(newEgg)
        }
        const pic = document.getElementById('scaleimage').firstChild.cloneNode(true)

        pic.style.setProperty('width', "120px")
        document.getElementById('measure3scale').append(pic)
        if(heavierSide=='left'){
            document.getElementById('measure3lefteggs').style.setProperty('transform','translateY(20px)' )
        }
        if(heavierSide=='right'){
            document.getElementById('measure3righteggs').style.setProperty('transform','translateY(20px)' )
        }

        guessTime()
    }
    else{ 
        alert("ERROR: You've already used the scale 3 times!")
    }
    
}


// assigns weights to eggs! randomly determines the BAD EGG 
    window.addEventListener ? 
    window.addEventListener("load",generateEggWeights(),false) : 
    window.attachEvent && window.attachEvent("onload",generateEggWeights()); 

    function generateEggWeights ()  {
        const badtype = Math.floor(Math.random() * 2);

        if (badtype > 0){
            typeOfBadEgg = "light"
        }
        console.log('typeofbadegg' , typeOfBadEgg)
        
        const eggs= document.querySelectorAll('.item')
        const badegg = Math.floor(Math.random() * 12);
        console.log("badd egg is " , eggs[badegg].id)
        eggs[badegg].id = "bad-egg"

        
    }


    window.onload = function() {
        window.onscroll = function() {
            scrollFunction()
        }
        document.getElementById("panel").style.maxHeight = panel.scrollHeight + "px";
    }

    // logic for the collapsable accordian "panel" with the premise text

    var acc = document.getElementsByClassName("accordion");
    var i;

    
    function togglePanel() {
        console.log('toggle')
        console.log('clicked!')
        var panel = document.getElementById("panel")
        panel.classList.toggle("active");
        console.log(panel)
        // var panel = this.previousElementSibling;

        if (panel.style.maxHeight) {
            console.log('toggleoff')
        panel.style.maxHeight = null;
        document.getElementById('openPremise').innerHTML="<span class='material-symbols-outlined' style=' font-size: 42px'>expand_more</span>"
        
        } else {
            console.log('toggleon')
        panel.style.maxHeight = panel.scrollHeight + "px";
        document.getElementById('openPremise').innerHTML="<span class='material-symbols-outlined' style=' font-size: 42px'>expand_less</span>"
        
        } 
    }


    //called by the "Lock in your guess" button. checks whether the egg is correct and alerts the user. 

    function makeGuess () {
        console.log()
        if (document.getElementById('guess-box').children.length == 1){
            if (document.getElementById('guess-box').children[0].id == "bad-egg") {
                // document.getElementById('guess-answer').innerHTML="CORRECT!"
                alert('CONGRATULATIONS, YOU FOUND THE BAD EGG. YOU LITTLE MASTERMIND, YOU!')
            }else {
                alert("That was NOT the bad egg. You'll get 'em next time, champ.")
                document.getElementById('guess-answer').innerHTML="INCORRECT!"
            }
        
        }else if (document.getElementById('guess-box').children.length > 1){
            document.getElementById('guess-answer').innerHTML="Error: too many eggs in guess box!"
        }else if (document.getElementById('guess-box').children.length < 1){
            document.getElementById('guess-answer').innerHTML="Error: drag an egg to the box to make a guess!"
        }

    }

    // called when all three measurements are complete . hides the scale and makes the guessing interface appear

function guessTime () {
  
    document.getElementById('guess-box-box').classList.toggle('active')
    // document.getElementById("scale-we-see").classList.toggle('active')
    
    if (isItGuessAlready){
        document.getElementById("scale").style.setProperty('visibility', 'collapse')
        document.getElementById("scale").style.setProperty('height', '0px')
        while (document.getElementById('scale-left').children.item(0)){
            var leftegg = document.getElementById('scale-left').firstChild
           if (leftegg) {
            document.getElementById('scale-left').removeChild(leftegg)
            document.getElementById('mystery-carton').appendChild(leftegg) 
            }
        
        }
    
        while (document.getElementById('scale-right').children.item(0)){
           
            var rightegg = document.getElementById('scale-right').firstChild
            if (rightegg) {
                document.getElementById('scale-right').removeChild(rightegg)
                document.getElementById('mystery-carton').appendChild(rightegg)
               }
          
        }
       
        document.getElementById("measurebutton").style.setProperty('visibility', 'hidden')
        document.getElementById("resetbutton").style.setProperty('visibility', 'hidden')
        document.getElementById("restartbutton").style.setProperty('visibility', 'visible')
        document.getElementById("reviewbutton").style.setProperty('visibility', 'visible')
        isItGuessAlready = false;

    // can also be toggled off, though this feature is longer called
    }else {
        console.log(document.getElementById('guess-box').children)
        while(document.getElementById('guess-box').children.length>0){
            console.log('child', document.getElementById('guess-box').children[0])
            document.getElementById("mystery-carton").appendChild(document.getElementById('guess-box').children[0])
        }
          
        document.getElementById("scale").style.setProperty('visibility', 'visible')
        isItGuessAlready = true;
    }


}
    //no longer relevant but it's sticking around: archaic logic for snap-scrolling between the premise and the scale. 
    
    // function scrollDown(){
    
    //     document.getElementById('intro').style.setProperty('visibility', 'collapse')
    //     // document.getElementById('intro').style.setProperty('min-height', '5px')
    //     document.getElementById('intro').style.setProperty('height', '20px')
    //     document.getElementById('scrolldownbutton').style.setProperty('height', '0px')
    //     // document.getElementById('titletext').style.setProperty('position', 'fixed')
    //     document.getElementById('topbar').style.setProperty('top', '0px')
    //     document.getElementById('back2rules').style.setProperty('visibility', 'visible')

        
    //     document.getElementById('scroll-down').style.setProperty('visibility', 'hidden')
    //     document.getElementById('scale').scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     console.log('boop')
    // }

    // function scrollUp(){
    
    //     document.getElementById('intro').style.setProperty('visibility', 'initial')
    //     document.getElementById('intro').style.setProperty('min-height', 'inital')
    //     document.getElementById('scrolldownbutton').style.setProperty('height', 'initial')
    //     document.getElementById('topbar').style.setProperty('position', 'inherit')
    //     document.getElementById('topbar').style.setProperty('top', 'inherit')
    //     document.getElementById('back2rules').style.setProperty('visibility', 'initial')

    //     document.getElementById('scroll-down').style.setProperty('visibility', 'initial')
    //     document.getElementById('intro').scrollIntoView({ behavior: 'smooth', block: 'center' });
    //     console.log('boop')
    // }


// function scrollFunction(){
//     print(document.documentElement.scrollTop)
//     if (document.documentElement.scrollTop > "10vh") {
        
//         scrollUp()
//     }
//     else {
//         scrollDown()
//     }
// }


// function scrollFunction() {
//     // console.log("T" , document.documentElement.scrollTop)
//     // console.log("H", document.body.scrollTop)
//     if (document.documentElement.scrollTop > 50) {
//         document.getElementById("titletext").style.setProperty('padding-top', '30px')
//         document.getElementById("titletext").style.setProperty('font-size', '3vmax')
//         document.getElementById("titletext").style.setProperty('position', 'auto')
//         // document.getElementById("titletext").style.setProperty('width', '100%')
//         // document.getElementById('cartonrow').style.setProperty('margin-top', '300px')
//         // document.getElementById('intro').style.setProperty('font-size', '0px')
//         document.getElementById('intro').style.setProperty('visibility', 'hidden')
//         document.getElementById('intro').style.setProperty('height', '0px')
//         document.getElementById('scroll-down').style.setProperty('height', '0px')
//         document.getElementById('scroll-down').style.setProperty('visibility', 'hidden')
//         document.getElementById('titletext').style.setProperty('height', '0px')
//         // document.getElementById('topbar').style.setProperty('position', 'sticky')
//         // document.getElementById('intro').style.setProperty('padding-top', '-4vmax')
//         // document.getElementById('scale-history').style.setProperty('margin-bottom', '60%')

//     } else {
//         document.getElementById("titletext").style.setProperty('padding-top', 'initial')
//         document.getElementById("titletext").style.setProperty('font-size',  '7vmax' )
//         document.getElementById("titletext").style.setProperty('position', 'auto')
//         // document.getElementById('cartonrow').style.setProperty('margin-top', '100px')
//         // document.getElementById('cartonrow').style.setProperty('margin-bottom', '200px')
//         // document.getElementById("titletext").style.setProperty('width', 'initial')
//         // document.getElementById('intro').style.setProperty('font-size', 'initial')
//         document.getElementById('intro').style.setProperty('visibility', 'visible')
//         document.getElementById('intro').style.setProperty('height', 'initial')
//         document.getElementById('scroll-down').style.setProperty('visibility', 'visible')
//         document.getElementById('scroll-down').style.setProperty('height', 'initial')
//         document.getElementById('titletext').style.setProperty('height', 'initial')
//         // document.getElementById('topbar').style.setProperty('position', 'unset')
//         // document.getElementById('intro').style.setProperty('padding-top', 'initial')
//         // document.getElementById('scale-history').style.setProperty('margin-bottom', '5%')

//     }
//     console.log('beep')
// }


   
// document.body.onload = () => {
//     console.log('load')
//     generateEggWeights()
// }

// window.addEventListener("load", (event) => {
//     console.log("page is fully loaded");
//   });

//   window.onload = (event) => {
//     console.log("page is fully loaded");
//   };

