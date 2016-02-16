window.onload=function(){
	var 
	ROW=15,
	width=Math.floor((600-ROW)/ROW),
	sence=document.getElementById('screen'),
	div,heng,shu;
	for(var i=0;i<ROW;i++){
		for(var j=0;j<ROW;j++){
			div=document.createElement('div');
			div.setAttribute('class','block');
			div.setAttribute('id',i+'_'+j);
			div.style.width=width+'px';
			div.style.height=width+'px';
			div.style.webkitTransform='scale(.95,.95)';
			sence.appendChild(div);
		}
	}
	for(i=0;i<ROW;i++){
		heng=document.createElement('div');
		heng.style.position='absolute';
		heng.style.width=600-width+'px';
		heng.style.height='1px';
		heng.style.left=width/2+'px';
		heng.style.top=(600/ROW)/2+(600/ROW)*i+'px';
		heng.style.background='rgb(255,228,123)';
		sence.appendChild(heng);
		shu=document.createElement('div');
		shu.style.position='absolute';
		shu.style.width='1px';
		shu.style.height=600-width+'px';
		shu.style.top=width/2+'px';
		shu.style.left=(600/ROW)/2+(600/ROW)*i+'px';
		shu.style.background='rgb(255,228,123)';
		sence.appendChild(shu);
	}
	var blocks=document.getElementsByClassName('block');
	var kaiguan=true;
	var dict1={},dict2={};
	var panduan=function(id,dic){
		var x=Number(id.split('_')[0]);
		var y=Number(id.split('_')[1]);
		var tx,ty;
		var heng=1;
		tx=x;ty=y;
		while(dic[tx+'_'+(ty+1)]){
			heng++;
			ty++;
		}
		tx=x;ty=y;
		while(dic[tx+'_'+(ty-1)]){
			heng++;
			ty--;
		}
		if(heng==5){
			return true;
		}
		tx=x;ty=y;
		var lie=1;		
		while(dic[(tx+1)+'_'+ty]){
			lie++;
			tx++;
		}
		tx=x;ty=y;
		while(dic[(tx-1)+'_'+ty]){
			lie++;
			tx--;
		}
		tx=x;ty=y;
		if(lie==5){
			return true;
		}
		tx=x;ty=y;
		var zuoxie=1;		
		while(dic[(tx+1)+'_'+(ty-1)]){
			zuoxie++;
			tx++;
			ty--;
		}
		tx=x;ty=y;
		while(dic[(tx-1)+'_'+(ty+1)]){
			zuoxie++;
			tx--;
			ty++;
		}
		if(zuoxie==5){
			return true;
		}
		tx=x;ty=y;
		var youxie=1;
		while(dic[(tx+1)+'_'+(ty+1)]){
			youxie++;
			tx++;
			ty++;
		}
		tx=x;ty=y;
		while(dic[(tx-1)+'_'+(ty-1)]){
			youxie++;
			tx--;
			ty--;
		}
		if(youxie==5){
			return true;
		}
		return false;
	};
	var timerId1,timerId2,k=10,m=10;
	for(i=0;i<blocks.length;i++){
		blocks[i].onclick=function(){
			if(this.hasAttribute('aa')){
				return;
			}
			var id=this.getAttribute('id');
			if(kaiguan){
				this.style.background="white";
				clearInterval(timerId2);
				h_jishi.innerHTML=m=10;
				timerId1=setInterval(function(){
					k--;
					b_jishi.innerHTML=k;
					if(k==0){
						clearInterval(timerId1);
						zhezhao.style.display='block';
						xinxi.innerHTML='恭喜，白棋赢了！';
					}
				},1000);
				kaiguan=false;
				dict1[this.getAttribute('id')]=true;
				console.log(dict1);
				if(panduan(id,dict1)){
					clearInterval(timerId1);
					zhezhao.style.display='block';
					xinxi.innerHTML='恭喜，白棋赢了！';
				}
			}else{
				this.style.background="black";
				clearInterval(timerId1);
				b_jishi.innerHTML=k=10;
				timerId2=setInterval(function(){
					m--;
					h_jishi.innerHTML=m;
					if(m==0){
						clearInterval(timerId2);
						zhezhao.style.display='block';
						xinxi.innerHTML='恭喜，黑棋赢了！';
					}
				},1000);
				kaiguan=true;
				dict2[this.getAttribute('id')]=true;
				console.log(dict2);
				if(panduan(id,dict2)){
					clearInterval(timerId2);
					zhezhao.style.display='block';
					xinxi.innerHTML='恭喜，黑棋赢了！';
				}
			}
			this.setAttribute('aa','true');
		};
	}
	var renshu=document.getElementById('renshu');
	var heqi=document.getElementById('heqi');
	var shuoming=document.getElementById('shuoming');
	var tip=document.getElementById('tip');
	var tip1=document.getElementById('tip1');
	var close=document.getElementById('close');
	var yes=document.getElementById('yes');
	var no=document.getElementById('no');
	var k1,k2;
	shuoming.onclick=function(){
		if(!k1){
			tip.style.display='block';
			k1=true;
		}else{
			tip.style.display='none';
			k1=false;
		}
	};
	heqi.onclick=function(){
		tip1.style.display='block';
		if(!kaiguan){
			clearInterval(timerId1);
		}else{
			clearInterval(timerId2);
		}
		k2=true;
	};
	close.onclick=function(){
		tip.style.display='none';
		k1=false;
	};
	yes.onclick=function(){
		if(!k2){
			return;
		}
		tip1.style.display='none';
		zhezhao.style.display='block';
		xinxi.innerHTML='恭喜，平局！';
	};
	no.onclick=function(){
		tip1.style.display='none';
		if(!kaiguan){
			timerId1=setInterval(function(){
				k--;
				b_jishi.innerHTML=k;
				if(k==0){
					clearInterval(timerId1);
					zhezhao.style.display='block';
					xinxi.innerHTML='恭喜，白棋赢了！';
				}
			},1000);
		}else{
			timerId2=setInterval(function(){
				m--;
				h_jishi.innerHTML=m;
				if(m==0){
					clearInterval(timerId2);
					zhezhao.style.display='block';
					xinxi.innerHTML='恭喜，黑棋赢了！';
				}
			},1000);
		}
	};
	renshu.onclick=function(){
		if(kaiguan){
			clearInterval(timerId2);
			zhezhao.style.display='block';
			xinxi.innerHTML='恭喜，黑棋赢了！';
		}else{
			clearInterval(timerId1);
			zhezhao.style.display='block';
			xinxi.innerHTML='恭喜，白棋赢了！';
		}
	}
	re_start.onclick=function(){
		location.reload();
	};
	document.onmousedown=function(e){
		e.preventDefault();
	};
};