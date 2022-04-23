((win, doc)=>{
    'use strict';
        function app(){
            return{
                init: function(){
                  this.inicio()
                    
                },

                inicio(){
                    console.log('aaaaaaaa')
                    var request = new XMLHttpRequest();
                    request.open('GET', './package/packege.json');
                    request.send();
                    request.addEventListener('readystatechange',this.busca);

                },
                
                busca : function busca(){
                    if(app().isFineConetion.call(this)){
                        var j=[];
                        if(j.length===0){
                            var obj=JSON.parse(this.responseText);
                            j=obj.slice(obj);
                        }
                        var index=app().geradorIndexPergunta();
                        console.log(j);
                        var objEscolhido= j.splice(index,1);
                        
                        console.log(objEscolhido);

                        var $pergunta = doc.querySelector('[data-js="pergunta"]');
                        var $divA = doc.querySelector('[data-js="res0"]');
                        var $divB = doc.querySelector('[data-js="res1"]');
                        var $divC = doc.querySelector('[data-js="res2"]');
                        var $divD = doc.querySelector('[data-js="res3"]');
                        var $divs = doc.querySelectorAll('div');
                        var $ponto = doc.querySelector('[data-js="ponto"]');
                        var pos = app().positionResp();
                       
                        $pergunta.innerHTML = objEscolhido[0].pergunta;
                        $divA.innerHTML += objEscolhido[0].respostasE[pos[0]];
                        $divB.innerHTML += objEscolhido[0].respostasE[pos[1]];
                        $divC.innerHTML += objEscolhido[0].respostasE[pos[2]];
                        $divD.innerHTML += objEscolhido[0].respostasE[pos[3]]; 

                        Array.prototype.forEach.call($divs, element => {
                            element.addEventListener('click', function(){
                                var a = app().ignoraSpan(this);
                                console.log(objEscolhido[0].respCerta, a);

                                if(app().respCerta(objEscolhido[0].respCerta,a)){
                                    //this.style.backgroundColor = 'rgb(100, 255, 170)';
                                    this.classList.add('certas');
                                    console.log($divA.innerHTML.split(' ').join('').replace(/>(\w{2,}|\d{2,}-?\w+)/g,'>'))
                                    setTimeout(() =>{
                                    this.classList.remove('certas');
                                    $ponto.value = +$ponto.value+10;
                                    $divA.innerHTML = $divA.innerHTML.split(' ').join('').replace(/>(\w{2,}|\d{2,}-?\w+)/g,'>');
                                    $divB.innerHTML = $divB.innerHTML.split(' ').join('').replace(/>(\w{2,}|\d{2,}-?\w+)/g,'>');
                                    $divC.innerHTML = $divC.innerHTML.split(' ').join('').replace(/>(\w{2,}|\d{2,}-?\w+)/g,'>');
                                    $divD.innerHTML = $divD.innerHTML.split(' ').join('').replace(/>(\w{2,}|\d{2,}-?\w+)/g,'>');
                                       app().inicio(); 
                                    }, 1000);
                                }else{
                                    this.style.backgroundColor = 'red';
                                }
                            });
                        });
                        
                    }
                },

                ignoraSpan: function ignoraSpan(tag){
                    return tag.innerHTML.replace(/<\w+>\w+(\W+\w+:)?<\/\w+>/gi,'');
                },

                respCerta: function respCerta(certa, tentativa){
                    return certa===tentativa;
                },

                isFineConetion : function isFineConetion(){
                   return (this.readyState===4 && this.status===200);
                },

                geradorIndexPergunta : function geradorIndexPergunta(){
                    return Math.floor(Math.random()*(7 - 0)+(0));
                },
                geradorIndexResposta : function geradorIndexPergunta(){
                    return Math.floor(Math.random()*(4 - 0)+(0));
                },
                
                positionResp : function positionResp(){
                    var arr =[]; 
                    while(arr.length<4){
                        var aux=app().geradorIndexResposta();
                        var valid=arr.every(function(item){
                            return item!==aux
                        });
                        if(valid)
                        arr.push(aux);
                    }
                    return arr;
                } 
            };
        };

    app().init();
})(window, document);