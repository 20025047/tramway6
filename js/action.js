/*=============================================
	KAZZ-MATU_Action.js - 個別JS および jQuery実装
=============================================*/
/*=======================================================
	FormError
========================================================*/
function fixForm(){
	var inpStep = document.getElementById('step');
	var forForm1 = document.getElementById('form1');
	inpStep.setAttribute('value','1');
	forForm1.setAttribute('action','confirm.php');
	forForm1.submit();
}

/*=======================================================
	jq
========================================================*/
var w;
jQuery(function($){
	w = $(window);

	scrollEvent();
	if($('.res').length){
		swImg();
	}
	if($('.month_area').length){
		eventPage();
	}	
	$('.sec_faq_item_app h2').each(function(index, element) {
		$(this).on('click',function(){
			$(this).toggleClass('on')
		})
	});
	if(checkUA() == 'pc'){
		$('a[href^="tel"]').addClass('tel_dis').removeAttr('href')
	}
	
	if($('label').length){
		$('label').on('click',function(){});
		labelClick();
	}
	
	$('.btn_time_top').on('click',function(e){ e.preventDefault(); });
	if($('.slide_news').length){
				$('.slide_news').find('ul').owlCarousel({
						items : 4,
						itemsDesktop : [1199,4],
						itemsDesktopSmall : false,
						itemsTablet: [600,3],
						itemsMobile : [479,2],
						navigation : true,
						navigationText : ['',''],
						rewindNav : true,
						scrollPerPage : false,
						pagination : true,
						paginationNumbers: false
				});
	}
	spMenu()
	loadWait()
	videoPage($('.v_pic'))
	
	if($('.photo_top').length){
		topPage();
	}
	if($('.top_image').length){
		topImage($('.top_image'),1000,1000,8500,0,true);
	}

});
function topPage(){
			var count = 0;
			var limit = 6;
			var text = '';
			var data;
			var graph_api = 'https://graph.facebook.com/v4.0/';
			var accessToken = 'EAAIADWE1DiYBAL88xwufGNNQ5i58ZAzLcXmNtUFcaZAKoTbZAlwddAb90OR7KUt3RrHkyX0ddEmSPAD1cVVsbZBzctDZA0SZCBa6nsE7shWPqUud4evZA6W2tXH1JQ3P54WME9FT1ZB1gZBCQBbHCbcPMgwi57AvGkyd7ma43iCrIiq0qMj0DsT23QqXGw3RopUIZD';
			var businessID = '17841401879903170';
			var fields = 'media{caption,media_url,permalink,timestamp,username,thumbnail_url}';
			var url = graph_api + businessID + '?fields=' + fields + "&access_token=" + accessToken;
			$.ajax({
					url: url
			})
					.done(function(res) {
					data = res.media;
					limit = 9;
					count = 0;
					$.each(data, function(index, val) {
							$.each(val, function(i, elem) {
									if (elem.media_url && count < limit) {
											if(elem.thumbnail_url) {
													text1 = '<li><a href="'+elem.permalink+'" target="_blank">';
													text2 = '<div><img src="'+elem.thumbnail_url+'"></div>';
													text3 = '</a></li>';
													count ++;
													text = text + text1 + text2 + text3;
											} else {
													text1 = '<li><a href="'+elem.permalink+'" target="_blank">';
													text2 = '<div><img src="'+elem.media_url+'"></div>';
													text3 = '</a></li>';
													count ++;
													text = text + text1 + text2 + text3;
											}
									}//
							});
					});
					$('.photo_top ul').html(text);
					$('.photo_top').find('ul').owlCarousel({
						items : 6,
						itemsDesktop : [1199,6],
						itemsDesktopSmall : false,
						itemsTablet: [600,4],
						itemsMobile : [479,3],
							navigation : true,
							navigationText : ['',''],
							rewindNav : true,
							scrollPerPage : false,
							pagination : true,
							paginationNumbers: false
					});

			})
			.fail(function(jqXHR, status) {
					$('.photo_top').html('<p></p>');
			})

}
function videoPage(t){
	$('body').prepend('<div id="overlay"></div>');
	$('#overlay').hide();
	$('a',t).off('click');
		
	$('a',t).each(function(index, element) {
		var url = $(this).attr('href').replace('https://www.youtube.com/watch?v=','');

		$(this).on('click',function(){
			
			$('#video_area').remove();
			$('body').prepend('<div id="video_area"><div class="video"><iframe width="780" height="439" src="https://www.youtube.com/embed/'+url+'" frameborder="0" allowfullscreen></iframe></div><p><a href="#">CLOSE</a></p></div>');
			$('#overlay').fadeTo(100,0.9);
	
			$('#video_area a').off('click');
			$('#overlay,#video_area a').on('click',function(e){
				$('#overlay').fadeTo(0,0.9).hide();
				$('#video_area').remove();
				e.preventDefault();
			});

			return false;
		});


	});
}

var lFlag = false;
function loadWait(){
	var date = new Date();
	var now = date.getTime()
	var file_wait,file_time;
	var $area1 = $('.time_load');
	var $area2 = $('.wait_load');
	if(lFlag){ return false; }
	
	$area1.html('お待ち下さい');
	file_time = 'https://www.raumen.co.jp/new_comment.php?'+now;
	$area1.load(file_time, function(response,status,xhr){
		if (status == "error") {
			lFlag=true;
			area1.html('読み込めません');
		}else{
			lFlag=true;	
		}
	});

	$area2.html('お待ち下さい');
	file_wait = 'https://www.raumen.co.jp/new_wait.php?'+now;
	$area2.load(file_wait, function(response,status,xhr){
		if (status == "error") {
			lFlag=true;
			area1.html('読み込めません');
		}else{
			lFlag=true;	
		}
	});
}

function spMenu(){
	$('body').prepend('<div id="ov"></div>');

	$('.btn_sp_menu').on('click',function(e){
		$('html').toggleClass('menu_on');
		$('html').removeClass('time_on');
		e.preventDefault();
	});
	$('.btn_time').on('click',function(e){
		$('html').toggleClass('time_on');
		$('html').removeClass('menu_on');
		e.preventDefault();
	});
		$('.sp_wail a').on('click',function(e){
		$('html').toggleClass('sp_time_wait');
		e.preventDefault();
	});
		$('.par').on('click',function(e){
		$(this).toggleClass('par_on');
		e.preventDefault();
	});
	
$('#ov').on('click',function(e){
		$('html').removeClass('menu_on');
		$('html').removeClass('time_on');
	});

}

function scrollEvent(){
	var st = 0;
	w.on('load resize scroll',function(){
		st = w.scrollTop();
		if(st >= 500){
			$('html').addClass('scr_on');
		}else{
			$('html').removeClass('scr_on');
		}
	});
}

function topImage(t,st,ft,dt,r,a){
	var img = t;
	var mark;
	var mh;
	
	var startTime = st; //1000;
	var fadeTime = ft;//1000;
	var delayTime = dt;//8500;
	var autoFlg = a;//true;
	var currentNo = 0;
	var oldNo = 0;
	var imageLength;
	var tid;
	var r = a;//0.633;
	
	resizeFunc();

	imageLength = img.find('li').length;
	img.append('<span class="mark_p"></span><span class="mark_n"></span><p class="mark"></p>');
	mark = img.find('.mark');
	img.find('li').hide();

	t.find('li').each(function(index) {
		mark.append('<span>●</span>');
	});
	
	mark.find('span').each(function(index) {
		$(this).on('click',function(){
			clearInterval(tid);
			oldNo = currentNo;
			currentNo = index;
			changeNews();		
		});
	});

	mark.find('span').eq(0).addClass('on');

	t.find('.mark_n').on('click',function(){ changeTopImage(1);clearInterval(tid); });
	t.find('.mark_p').on('click',function(){ changeTopImage(2);clearInterval(tid); });	

	function changeTopImage(m){
		oldNo = currentNo;
		if(m==1){
			currentNo++;
			if(currentNo > (imageLength - 1)){
				currentNo = 0;	
			}
			changeNews();
		}else{
			currentNo--;
			if(currentNo <= -1){
				currentNo = imageLength - 1;	
			}
			changeNews();
		}
	}

	function changeNews(){
		img.find('li').eq(oldNo).fadeOut(fadeTime,function(){
			mark.find('span').removeClass('on');
			mark.find('span').eq(currentNo).addClass('on');
		});
		img.find('li').eq(currentNo).fadeIn(fadeTime);
	}

	w.on('load',function(){
		mark.find('span').eq(0).addClass('on');
		img.find('li').eq(0).delay(startTime).fadeIn(fadeTime,function(){
			if (autoFlg) tid = setInterval(function(){
				oldNo = currentNo;
				currentNo++;
				if (currentNo >= imageLength)
				{
					currentNo = 0;
				}
				changeNews();	
				
			},delayTime);		
		});
		resizeFunc();	
	});

	w.on('resize',function(){
		resizeFunc();
	});

	function resizeFunc(){
		mh = img.width() * r;
		//img.find('ul').css('height',mh + 'px');
	}
}

function labelClick(){
	var radio = $('label');

	radio.each(function(){
		if ($(this).find('input').prop('checked')) {
			$(this).addClass('checked');
		}
	});

	radio.click(function(){
		radio.each(function(){
			if ($(this).find('input').prop('checked')) {
				$(this).addClass('checked');
			}else{
				$(this).removeClass('checked');
			}
		});
	});
}

function checkUA(){
	if((navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') == -1) || navigator.userAgent.indexOf('A1_07') > 0 || navigator.userAgent.indexOf('SC-01C') > 0 || navigator.userAgent.indexOf('iPad') > 0){
		return 'tb';
	} else if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || (navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0)){
		return 'sp';
	}else{
		return 'pc';
	}
}

function swImg(){
  // 置換の対象とするclass属性。
  var $elem = $('.res');
  // 置換の対象とするsrc属性の末尾の文字列。
  var sp = '_sp.';
  var pc = '_pc.';
  // 画像を切り替えるウィンドウサイズ。
  var replaceWidth = 768;

  function imageSwitch() {
    // ウィンドウサイズを取得する。
    var windowWidth = parseInt($(window).width());

    // ページ内にあるすべての`.js-image-switch`に適応される。
    $elem.each(function() {
      var $this = $(this);
      // ウィンドウサイズが768px以上であれば_spを_pcに置換する。
      if(windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));

      // ウィンドウサイズが768px未満であれば_pcを_spに置換する。
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }
  imageSwitch();

  // 動的なリサイズは操作後0.2秒経ってから処理を実行する。
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      imageSwitch();
    }, 200);
  });
}

function eventPage(){
	$btn = $('.tab_btn');
	$cal = $('.month_area');
	$cal.hide().eq(0).show();
	$btn.find('a').eq(0).addClass('on');
	$('.event_deleted').parent().addClass('event_none')
	$btn.find('a').each(function(index, element) {
		$(this).off('click');
    $(this).on('click',function(e){
			$btn.find('a').removeClass('on').eq(index).addClass('on');
			$cal.hide().eq(index).show();
			e.preventDefault();
		});
  });	
}