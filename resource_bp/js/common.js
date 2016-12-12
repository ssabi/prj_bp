$(document).ready(function(){
	//글자수 체크
	chklength();
	if(browser() == "Firefox"){
		keyUpTrigger();
	}
	//대상찾기 버튼 높이값 조정
	reisizeHeight();
	//등록폼 제목 Decoration...
	setTitleDeco();
	//기간설정 초기 설정
	setDate("#post_start", "#post_end");
	setDate("#opt_start", "#opt_end");
	setDate(".opt_start", ".opt_end");
	setDate(".date_start", ".date_end", 180);

	/* IE */
	if(browser() == "IE"){
		$(".btn span").bind({
			"mousedown" : function(){
				$(this).closest(".btn").addClass("active");
			},
			"mouseup" : function(){
				$(this).closest(".btn").removeClass("active");
			}
		});
	}

	//System Map
	var body = $("body");
	var sysTarget = ".sysmap_wrap";
	var sysBtn = ".top_btn_system";
	var sysBg = ".sysmap_bg";
	var sysCon = ".sysmap";
	var sysClose = ".sysmap_close";
	$(sysBtn).live({
		"click" : function(e){
			e.preventDefault();

			if($(sysTarget).hasClass("show")){
				$(this).removeClass("on");
				$(sysTarget).removeClass("show");
				body.removeClass("ovf_hdn");
				$(sysTarget).stop().animate({"left":"100%"}, 150);
			}else{
				$(this).removeClass("on").addClass("on");
				$(sysTarget).addClass("show");
				body.addClass("ovf_hdn");
				$(sysTarget).stop().animate({"left":"0"}, 150);
			}
		}
	});
	//System Map BG event
	$(sysBg).live({
		"click" : function(){
			$(sysTarget).stop().animate({"left":"100%"}, 150, function(){
				$(".top_btn_system").removeClass("on");
				$(sysTarget).removeClass("show");
				body.removeClass("ovf_hdn");
			});
		}
	});
	$(sysClose).live({
		"click" : function(e){
			e.preventDefault();

			$(sysBg).trigger("click");
		}
	});

	//상단 Infomation
	var infoBox = ".tnavi";
	var infoBtn = ".info .name";
	var infoLayer = ".info_ly";
	$(infoBox).find(infoBtn).bind({
		"click" : function(e){
			e.preventDefault();

			$(infoBox).find(infoLayer).toggle();
			$(this).toggleClass("on");
			$(document).on('mousedown touchstart focusin', function(e){
				//console.log(e.target);
				if($(e.target).closest(infoBox).length === 0) {
					$(infoLayer).hide();
					$(infoBtn).removeClass("on");
				}
			});
		}
	});

	//Design Selectbox
	$(".w70").selectOrDie({customClass: $(".w70").attr("class"), size: 10});
	$(".w121").selectOrDie({customClass: $(".w121").attr("class"), size: 10});
	$(".w141").selectOrDie({customClass: $(".w141").attr("class"), size: 10});
	$(".w260").selectOrDie({customClass: $(".w260").attr("class"), size: 10});
	$(".sch_sel").selectOrDie({customClass: $(".sch_sel").attr("class"), size: 10});

	//게시대상
	hasDataAttr("[data-target-toggle]", function($ele){
		$ele.each(function(){
			var $this = $(this), data = $(this).data("target-toggle");
			$this.bind({
				"click" : function(){
					var dataEle = data.ele;
					var dataDispaly = data.display;
					var checked = data.check;
					/*
						show : target show
						hide : target hide
						all_show : target all show
						all_hide : target all hide
					*/
					var dataEle02 = data.ele02;
					//console.log(dataEle02);
					//console.log(dataDispaly)
					if(!checked){
						dataDispaly == "show" ? $(dataEle).show() : $(dataEle).hide();
						if(dataEle02 !="" && dataEle02 != null){
							dataDispaly == "show" ? $(dataEle02).hide() : $(dataEle02).show();
						}
						if(dataDispaly != "" && dataDispaly != null){
							if(dataDispaly == "all_hide"){
								$(dataEle).hide();
								$(dataEle02).hide();
							}
						}
					}else{
						if($this.prop("checked")){
							$(dataEle).show();
						}else{
							 $(dataEle).hide();
						}
					}
					reisizeHeight();
				}
			});
		});
	});

	//Check All
	var form = function(){
		var setLabel = function(clz){
			if($(clz + ' input').length){
				$(clz).each(function(){
					$(this).removeClass('on');
					$(this).removeClass('on_disabled');
					$(this).removeClass('disabled');
				});
				$(clz + ' input:checked').each(function(){
					$(this).parent('label').addClass('on');
				});
				$(clz + ' input:disabled').each(function(){
					if ($(this).prop('checked')){
						$(this).parent('label').addClass('on_disabled');
					}else{
						$(this).parent('label').addClass('disabled');
					}
				});
			}
		}

		setLabel('.label_check');
		setLabel('.label_radio');
		$('.label_check').click(function(e){
			setLabel('.label_check');
			e.stopPropagation();
		});
		$('.label_radio').click(function(e){
			setLabel('.label_radio');
			e.stopPropagation();
		});
		hasDataAttr('[data-check-all]',function($ctx){
			$ctx.each(function(){
				//var $input = $(this).find('input'), checkGroup = $(this).data('check-all');
				var $input = $(this).siblings('input'), checkGroup = $(this).data('check-all');

				$input.on('click',function(){
					var val = $input.prop('checked'), bool;
					//console.log(val);
					if(val){
						//bool = false;
						bool = true;
					}else{
						//bool = true;
						bool = false;
					}

					$('[data-check-group="' + checkGroup + '"]').each(function(){
						//$(this).find('input').prop('checked',bool);
						$(this).siblings('input').prop('checked',bool);
					});
					setLabel('.label_check');
					setLabel('.label_radio');
				});
			});
		});

		hasDataAttr('[data-check-group]',function($ctx){
			$ctx.each(function(){
				//var $input = $(this).find('input'), checkAll = $(this).data('check-group');
				var $input = $(this).siblings('input'), checkAll = $(this).data('check-group');
				$input.on('click',function(){
					//$('[data-check-all="' + checkAll + '"]').find('input').prop('checked',false);
					var len = $('[data-check-group="' + checkAll + '"]').length;
					var chkLen = $('[data-check-group="' + checkAll + '"]').siblings('input:checked').length;

					if(len == chkLen){
						$('[data-check-all="' + checkAll + '"]').siblings('input').prop('checked',true);
					}else{
						$('[data-check-all="' + checkAll + '"]').siblings('input').prop('checked',false);
					}
					
					setLabel('.label_check');
					setLabel('.label_radio');
				});
			});
		});
	}
	form();
	//end Check All

	//기간 설정 오늘, 1주일, 1개월
	var target = ".tbl_opt .period .btn";
	$(target).bind({
		"click" : function(e){
			e.preventDefault();

			var start = "#opt_start";
			var end = "#opt_end";
			var val = $(this).attr("data-period");
			//console.log(val);
			$(target).removeClass("on");
			$(this).toggleClass("on");
			switch (val){
			case "today" :		//오늘
				$(start).datepicker('setDate', new Date());
				$(end).datepicker('setDate', new Date());
			break;
			case "week" :			//일주일
				$(start).datepicker('setDate', setDateCal(7));
				$(end).datepicker('setDate', new Date());
			break;
			case "month" :		//1개월
				$(start).datepicker('setDate', setDateCal(30));
				$(end).datepicker('setDate', new Date());
			break;
			case "month3" :	//3개월
				$(start).datepicker('setDate', setDateCal(90));
				$(end).datepicker('setDate', new Date());
			break;
			case "month6" :	//6개월
				$(start).datepicker('setDate', setDateCal(180));
				$(end).datepicker('setDate', new Date());
			break;
			case "month12" :	//12개월
				$(start).datepicker('setDate', setDateCal(360));
				$(end).datepicker('setDate', new Date());
			break;
			}
		}
	});

	//대상찾기 삭제 이벤트
	$(".target_tag .del").live({
		"click" : function(e){
			e.preventDefault();

			$(this).closest(".target_tag").remove();
			reisizeHeight();
		}
	});

	//Banner Slider
	hasDataAttr("[data-main-banner]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("main-banner"); 
			var itemShow = val.show;
			var itemScroll = val.scroll;
			$(this).slick({
				autoplay: true,
				dots: true,
				infinite: true,
				slidesToShow: itemShow,
				slidesToScroll: itemShow,
				arrows: false,
				responsive:[{
					breakpoint:1173,
					settings:{
						slidesToShow:4,
						slidesToScroll:4,
						infinite: true,
						dots: true
					}
				},{
					breakpoint:768,
					settings:{
						slidesToShow:1,
						slidesToScroll:1,
						infinite: true,
						dots: true
					}
				}]
			});
		});
	});

	//팝업창 닫기
	$(document).on('mousedown touchstart focusin', function(e){
		//console.log(e.target);
		if($(e.target).closest(".lybg .inner").length === 0) {
			$(e.target).closest(".lybg").remove();
		}
	});

	//검색 옵션 초기화
	$(".resetBtn").click(function(e){
		e.preventDefault();

		resetOptions(".reset_area");
	});

	parent.loadFrame();
});
//END Document Ready

//HasData
var hasDataAttr = function(ctx, func){
	if($(ctx).length){
		var $ctx = $(ctx);
		if(func !== undefined){
			func($ctx);
		}else{
			console.log('callback function is not defined.');
		}
	}
}

//iframe 로드 이벤트
$(window).load(function(){
	parent.loadFrame();
});
var lycnt = 0;
var layer_pop = function(url, name, width, height, target){
	var doc = $("body", window.parent.document);
	var bg, inDiv, div, frameTit, iframe;

	if(target == "self"){
		var bg = $(".lybg", window.parent.document);
		var bgLen = bg.length;
		if(bgLen > 0){
			bg.eq(bgLen - 1).find(".lytit strong").html(name);
			bg.eq(bgLen - 1).find("iframe").attr("src", url);
		}
	}else{
		//Backgroud
		bg = $("<div />", {
			"class":"lybg",
		});
		//Layer Box
		inDiv = $("<div />", {
			"class" : "inner"
		});
		//Layer in Div
		div = $("<div />");
		//Layer Title
		frameTit = $("<div />",{
			"class" : "lytit"
		});
		frameTit.html('<strong>'+name+'</strong><a href="javascript:void(0);" class="close" onclick="javascript:close_layer();">닫기</a>');
		//iFrame
		iframe = $("<iframe name='' title='' src='"+url+"' width='100%' height='100%' frameborder='0' scrolling='auto'>", {
			"class" : "ly_ifrm",
			"id" : "ly_ifrm"+lycnt
		});

		$("body").addClass("ovf_hdn");

		var tmp = inDiv.css({"width" : width, "height":"100%"}).append(div.append(frameTit).append(iframe));
		bg.append(tmp).appendTo(doc);

		$(".lybg .inner").css("height", $(".lybg").height() - 90);
		iframe.attr("height", $(".lybg .inner>div").height() - 56);
	}

	lycnt++;
}
var loadFrame = function(){
	var bg = $(".lybg");
	var bgLen = bg.length;
	if(bgLen > 0){
		var bgInner = bg.eq(bgLen - 1).find(".inner");
		$(bgInner).css("height", "auto");
		$(bgInner).find("iframe").attr("height", "100%");
		bg.eq(bgLen - 1).find("iframe").load(function(){
			var height = this.contentWindow.document.body.scrollHeight;
			$(bgInner).css("height", height + 56);
			//$(bgInner).find("iframe").attr("height", "100%");
			$(bgInner).find("iframe").attr("height", height);
		});
	}
}
var close_layer = function(){
	var bg = $(".lybg", window.parent.document);
	var bgLen = bg.length;
	if(bgLen == 1){
		$("body", window.parent.document).removeClass("ovf_hdn");
	}
	bg.eq(bgLen - 1).remove();
}
//대상찾기 리스트 처리
var reisizeHeight = function(){
	hasDataAttr("[data-target-box]", function($ele){
		$ele.each(function(){
			var $this = $(this), val = $this.data("target-box");
			var height = $this.outerHeight();
			$('[data-target-box-button='+val+']').css({"height":(height-2),"line-height":(height-2)+"px"});
		});
	});
}
//글자수 체크
var chklength = function(){
	hasDataAttr("[data-chk-length]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), val = $(this).data("lnb-period");
			$this.live({
				"keyup" : function(e){
					var textarea = $(this).find("textarea, input[type=text]");
					var textareaVal = $(this).find("textarea, input[type=text]").val();
					var textareaLen = textareaVal.length;
					var byteNum = 0, len = 0;

					var txt = $(this).find(".byte span");
					var maxLen = eval($(this).find(".count").text());

					for(var i = 0; i < textareaLen; i++){
						c = textareaVal.charAt(i);
						if(escape(c).length > 4){
							byteNum += 2;
						}else{
							byteNum++;
						}

						if(byteNum <= maxLen){
							len = i + 1;
						}
					}

					txt.html(byteNum);
					if(byteNum > maxLen){
						var substrTxt = textareaVal.substr(0, len);
						//alert(len + "자를 초과 입력 할 수 없습니다.");
						textarea.val(substrTxt);
						txt.html(maxLen);
						return false;
					}
				}
			}).trigger("keyup");
		});
	});
}
var keyUpTrigger = function(){
	$('[data-chk-length]').find("input, textarea").each(function(idx){
		var $this = $(this);
		$this[0].checkKeyEvt = undefined;
		$this[0].existValue = undefined;
	});

	$('[data-chk-length]').find("input, textarea").on('focus blur', function(e){
			var $this = $(this);
			var watcher = function(){
				if($this[0].existValue != $this.val()){
				$this.trigger('keyup');
			}
			$this[0].existValue = $this.val();
			if($this[0].checkKeyEvt) clearInterval($this[0].checkKeyEvt);
			$this[0].checkKeyEvt = setInterval(watcher, 100);
		};
		if(e.type == 'focus'){
			if(!$this[0].checkKeyEvt) watcher();
		}else if(e.type == 'blur'){
			if($this[0].checkKeyEvt){
				clearInterval($this[0].checkKeyEvt);
				$this[0].checkKeyEvt = undefined;
			}
		}
	});
};
//기간 설정
var disabled_start, disabled_end;
var dateFormat = "yy.mm.dd", closeText = "닫기",
dayNames = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
dayNamesMin = ['월', '화', '수', '목', '금', '토', '일'],
monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
monthNamesShort = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
function setDate(startDate, endDate, day){
	/*
	startDate : input 의 class 또는 id(string)
	endDate : input 의 class 또는 id(string)
	day : 
	*/
	//Datepicker
	var from = $(startDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource_bp/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		//changeMonth: true,
		//changeYear: true,
		//showButtonPanel: true,
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true
	}).on('change', function(){
		to.datepicker("option", "minDate", getDate(this));
	}),
	to = $(endDate).datepicker({
		showOn: 'both',
		buttonImage : '/resource_bp/images/common/ico_cal.png',
		buttonImageOnly : true,
		buttonText: '날짜 선택',
		//changeMonth: true,
		//changeYear: true,
		//showButtonPanel: true,
		closeText: closeText,
		dateFormat: dateFormat,
		dayNames: dayNames,
		dayNamesMin: dayNamesMin,
		monthNames: monthNames,
		monthNamesShort: monthNamesShort,
		showOtherMonths: true,
		selectOtherMonths: true,
		showMonthAfterYear: true
	}).on('change', function(){
		from.datepicker("option", "maxDate", getDate(this));
	});

	if($(startDate).val() == ''){
		from.datepicker('setDate', new Date());
	}else{
		from.datepicker('setDate', new Date($(startDate).val()));
	}
	if($(endDate).val() == ''){
		to.datepicker('setDate', new Date());
	}else{
		to.datepicker('setDate', new Date($(endDate).val()));
	}

	if(day > 0){
		from.datepicker('setDate', setDateCal(day));
	}

	function getDate(element){
		var date;
		try{
			date = $.datepicker.parseDate(dateFormat, element.value);
		}catch(error){
			date = null;
		}
		return date;
	}
}
//날짜 계산
function setDateCal(d, s){
	/*
	d : day(int)
	s : seperate
	*/
	var from_year, from_month, from_day;
	if(s == null || s == ""){
		s = ".";
	}
	var date = new Date();
	var from = new Date(Date.parse(date) - (d * 1000 * 60 * 60 * 24));

	from_year = from.getFullYear();
	if(from.getMonth() < 9){
		from_month = '0' + (from.getMonth()+1);
	}else{
		from_month = from.getMonth()+1;
	}
	if(from.getDate() < 9){
		from_day = '0'+from.getDate();
	}else{
		from_day = from.getDate();
	}
	return from_year + s + from_month + s + from_day;
}
//Detect Browser
var browser = function() {
	// Return cached result if avalible, else get result then cache it.
	if (browser.prototype._cachedResult)
		return browser.prototype._cachedResult;

	// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
	// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
	// Chrome 1+
	var isChrome = !!window.chrome && !isOpera;
	// At least IE6
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
	return browser.prototype._cachedResult =
		isOpera ? 'Opera' :
		isFirefox ? 'Firefox' :
		isSafari ? 'Safari' :
		isChrome ? 'Chrome' :
		isIE ? 'IE' :
		isEdge ? 'Edge' :
		"Don't know";
};
//등록폼 제목 Decoration
function setTitleDeco(){
	//텍스트 볼드 Set
	hasDataAttr("[data-text-bold]", function($ele){
		$ele.each(function(){
			var $this = $(this), data = $(this).data("text-bold");
			$this.bind({
				"click" : function(e){
					e.preventDefault();

					$this.toggleClass("on");
					$this.hasClass("on") ? $("input[name=text_bold]").val("true") : $("input[name=text_bold]").val("");
					$this.hasClass("on") ? $("[data-text-deco="+data+"]").css({"font-weight":"bold"}) : $("[data-text-deco="+data+"]").css({"font-weight":"normal"});
				}
			});
		});
	});
	//텍스트 컬러 Set
	hasDataAttr("[data-text-color]", function($ele){
		$ele.each(function(idx){
			var $this = $(this), $thisChild = $(this).find(">span"), data = $(this).data("text-color");
			$($this, $thisChild).spectrum({
				allowEmpty:true,
				showInitial: true,
				showPalette: true,
				showSelectionPalette: true,
				palette: [
					["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
					"rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
					["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
					"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
					["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
					"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
					"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
					"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
					"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
					"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
					"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
					"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
					/*"rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
					"rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",*/
					"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
					"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
				],
				change: function(color){
					if(color !=null && color !=""){
						//console.log("color = "+color);
						var val = color.toHexString();	// #ff0000
						var hex = color.toHex();				// ff0000
						$(".txt_color span").css({"border-bottom-color":val});
						$("#color_value").val(hex);
						$("[data-text-deco="+data+"]").css({"color":val});
					}
				}
			});
		});
	});
}
//검색 옵션 초기화
var resetOptions = function(ele){
	var $this = $(ele);
	var chkbox = $this.find("input[type=checkbox]");
	var radio = $this.find("input[type=radio]");
	var input = $this.find("input[type=text]");
	var periodBtn = $this.find(".period .btn");
	var select = $this.find("select");
	var desingSelect = $this.find(".w70, .w99, .w104, .w121, .w170, .w260, .w100p, .sch_sel");

	chkbox.prop("checked", false);				//체크박스 초기화
	radio.prop("checked", false);					//라디오버튼 초기화
	input.val("");												//Input 텍스트 초기화
	periodBtn.removeClass("on");				//기간 선택 버튼(오늘, 1주일, 1개월, 3개월 ...) 비활성화
	for(var i=0; i < select.length; i++){		//셀렉트박스 초기화
		select.eq(i).find("option:eq(0)").attr("selected", "selected").trigger('change');
	}
	for(var i=0; i < desingSelect.length; i++){	//디자인 셀렉트박스 초기화
		//desingSelect.eq(i).selectOrDie("destroy").selectOrDie({customClass: desingSelect.eq(i).attr("class"), size: 10});
		desingSelect.eq(i).selectOrDie("update");
	}
}