import _ from 'lodash';
import './style.css';
// import Icon from './webpack.jpg';
// import Data from './data.xml';
import printMe from './print.js';

function component(){
    let a=123,b=123;
    var xxx=(c,d)=>c*d;
    console.log(xxx(a,b));
    
    var element=document.createElement('div');

    element.innerHTML=_.join(["Hello","webpack"],'  ');
    element.classList.add('hello');

    // var myJpg=new Image();
    // myJpg.src=Icon;
    // element.appendChild(myJpg);
    // console.log(Data);

    var btn =document.createElement('button');
    
    btn.innerHTML="click me and check the console!";
    btn.onclick=printMe;

    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());