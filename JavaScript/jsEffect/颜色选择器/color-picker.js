//使用tinycolor.js来做进行颜色的转换。

var colorPicker = (function() {
	var ele,
		isInitDom = false,
		pickerPanel;
	var set = {
		colors: {
			hsv: {
				h: 150,
				s: 0.66,
				v: 0.30,
				a: 1
			}
		}
	}
	var presetColors = [
		'#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
		'#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
		'#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF'
	]
	var strToDom = function(str) {
		var div = document.createElement('div');
		div.innerHTML = str;
		return div.childNodes;
	}
	//--start 一些常用的方法。
	function getScrollLeft() {
		return window.pageXOffset || window.scrollX || (document.documentELement || document.body).scrollLeft;
	}

	function getScrollTop() {
		return window.pageYOffset || window.scrollY || (document.documentELement || document.body).scrollTop;
	}

	function getWinHei() {
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	}

	function getWinWid() {
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	}
	//--end
	var handleChange = function(e) {
		e.preventDefault();

		//获取鼠标点击的距离在DOM的相对位置。
		var width = pickerPanel.getElementsByClassName('saturationPanel')[0].clientWidth;
		var height = pickerPanel.getElementsByClassName('saturationPanel')[0].clientHeight;

		//元素的左边和上边距离文档的大小包括滚动条
		var xOffset = pickerPanel.getElementsByClassName('saturationPanel')[0].getBoundingClientRect().left + getScrollLeft();
		var yOffset = pickerPanel.getElementsByClassName('saturationPanel')[0].getBoundingClientRect().top + getScrollTop();

		//获取
		var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
		var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);

		var left = pageX - xOffset;
		var top = pageY - yOffset;

		//left等于e.offsetX,没有直接使用，是offsetX有兼容性问题
		//					console.log(left+" -- "+top);
		//					console.log(e.offsetX+" -- "+e.offsetY);
		if(left < 0) {
			left = 0
		} else if(left > width) {
			left = width
		}
		if(top < 0) {
			top = 0
		} else if(top > height) {
			top = height
		}

		// 左边距离除以宽度
		var saturation = left / width
		// 上边距离除以高度
		var bright = -(top / height) + 1

		bright = bright > 0 ? bright : 0
		bright = bright > 1 ? 1 : bright

		var data = {
			h: set.colors.hsv.h,
			s: saturation,
			v: bright,
			a: set.colors.hsv.a
		};
		Object.assign(set.colors.hsv, data)

		pickerPanel.getElementsByClassName('saturation-pointer')[0].style.left = left - 6 + "px";
		pickerPanel.getElementsByClassName('saturation-pointer')[0].style.top = (top + 116) + "px";
		onChange(data,"panle");
		updatePanel();
	}

	var handleChange2 = function(e) {
		e.preventDefault();

		//获取鼠标点击的距离在DOM的相对位置。
		var width = pickerPanel.getElementsByClassName('hueWrap')[0].clientWidth;
		var height = pickerPanel.getElementsByClassName('hueWrap')[0].clientHeight;

		//元素的左边和上边距离文档的大小包括滚动条
		var xOffset = pickerPanel.getElementsByClassName('hueWrap')[0].getBoundingClientRect().left + getScrollLeft();
		var yOffset = pickerPanel.getElementsByClassName('hueWrap')[0].getBoundingClientRect().top + getScrollTop();

		//获取
		var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
		var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);

		var left = pageX - xOffset;
		var top = pageY - yOffset;

		var h, percent;
		if(left < 0) {
			h = 0
			left = 0;
		} else if(left > width) {
			left = width;
			h = 360
		} else {
			h = 360 * left / width;
		}

		pickerPanel.getElementsByClassName('huePicker')[0].style.left = left + "px";

		var data = {
			h: h,
			s: set.colors.hsv.s,
			v: set.colors.hsv.v,
			a: set.colors.hsv.a
		};
		Object.assign(set.colors.hsv, data)
		onChange(data);
		updatePanel();
	}

	var handleChange3 = function(e) {
		e.preventDefault();

		//获取鼠标点击的距离在DOM的相对位置。
		var width = pickerPanel.getElementsByClassName('alphaWrap')[0].clientWidth;
		var height = pickerPanel.getElementsByClassName('alphaWrap')[0].clientHeight;

		//元素的左边和上边距离文档的大小包括滚动条
		var xOffset = pickerPanel.getElementsByClassName('alphaWrap')[0].getBoundingClientRect().left + getScrollLeft();
		var yOffset = pickerPanel.getElementsByClassName('alphaWrap')[0].getBoundingClientRect().top + getScrollTop();

		var pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0);
		var pageY = e.pageY || (e.touches ? e.touches[0].pageY : 0);

		var left = pageX - xOffset;
		var top = pageY - yOffset;

		var a;
		if(left < 0) {
			a = 0
			left = 0;
		} else if(left > width) {
			left = width;
			a = 1
		} else {
			a = left / width;
		}

		pickerPanel.getElementsByClassName('alphaPicker')[0].style.left = left + "px";

		var data = {
			h: set.colors.hsv.h,
			s: set.colors.hsv.s,
			v: set.colors.hsv.v,
			a: a
		};
		Object.assign(set.colors.hsv, data);
		onChange(data);
		updatePanel();
	}

	function updatePanel() {
		var color = {
			h: set.colors.hsv.h,
			s: 1,
			v: 1,
			a: 1
		}
		//初始化面板的颜色和滑块的位置。
		var c = tinycolor(color).toRgb();
		var rgb = `rgba(${c.r},${c.g},${c.b},${c.a})`;
		var colorNow = tinycolor(set.colors.hsv).toRgb();
		var rNow = `rgba(${colorNow.r},${colorNow.g},${colorNow.b},${colorNow.a})`;
		pickerPanel.getElementsByClassName("saturation")[0].style.backgroundColor = rgb;
		pickerPanel.getElementsByClassName("activeColor")[0].style.backgroundColor = rNow;
		pickerPanel.getElementsByClassName("alphaColor")[0].style.background = `linear-gradient(to right, rgba(0, 0, 0, 0) 0%,${rgb} 100%)`;
		pickerPanel.getElementsByClassName("saturation-pointer")[0].style.left = set.colors.hsv.s * pickerPanel.getElementsByClassName('saturationPanel')[0].clientWidth - 6 + "px";
		pickerPanel.getElementsByClassName("saturation-pointer")[0].style.top = (1 - set.colors.hsv.v) * pickerPanel.getElementsByClassName('saturationPanel')[0].clientHeight - 6 + "px";
		pickerPanel.getElementsByClassName("huePicker")[0].style.left = set.colors.hsv.h / 360 * pickerPanel.getElementsByClassName('hueWrap')[0].clientWidth + "px";
		pickerPanel.getElementsByClassName("alphaPicker")[0].style.left = colorNow.a * pickerPanel.getElementsByClassName('alphaWrap')[0].clientWidth + "px";
		pickerPanel.getElementsByClassName("saturation")[0].style.backgroundColor = `rgba(${c.r},${c.g},${c.b},${c.a})`
		//输入框的值赋值。
		pickerPanel.getElementsByClassName("hex-input")[0].value = tinycolor(set.colors.hsv).toHex();
		pickerPanel.getElementsByClassName("rgba-input")[0].value = colorNow.r;
		pickerPanel.getElementsByClassName("rgba-input")[1].value = colorNow.g;
		pickerPanel.getElementsByClassName("rgba-input")[2].value = colorNow.b;
		pickerPanel.getElementsByClassName("rgba-input")[3].value = colorNow.a;
	}

	var onChange = function(data,which) {
		var c=tinycolor(data).toRgb();
		if(which=="panle"){
			var rgb=`rgb(${c.r},${c.g},${c.b})`;
		}else{
			var rgb=`rgba(${c.r},${c.g},${c.b},${c.a})`;
		}
		set.change(rgb);
	}
	//初始化选择器的事件
	var __bindDomEvent = function() {
		
		//颜色选择面板上的事件 
		pickerPanel.getElementsByClassName('saturationPanel')[0].addEventListener('mousedown', function(e) {
			handleChange(e);
			window.addEventListener('mousemove', handleChange);
			window.addEventListener('mouseup', handleChange);
			window.addEventListener('mouseup', __delteDomEvent);
		});
		pickerPanel.getElementsByClassName('saturationPanel')[0].addEventListener('mouseup', function() {
			__delteDomEvent();
		});
		
		//slides第一个滑块上面的事件
		pickerPanel.getElementsByClassName('hueWrap')[0].addEventListener('mousedown', function(e) {
			handleChange2(e);
			window.addEventListener('mousemove', handleChange2);
			window.addEventListener('mouseup', handleChange2);
			window.addEventListener('mouseup', __delteDomEvent2);
		});
		pickerPanel.getElementsByClassName('hueWrap')[0].addEventListener('mouseup', function() {
			__delteDomEvent2();
		});
		//slides第二个滑块上面的事件
		pickerPanel.getElementsByClassName('alphaWrap')[0].addEventListener('mousedown', function(e) {
			handleChange3(e);
			window.addEventListener('mousemove', handleChange3);
			window.addEventListener('mouseup', handleChange3);
			window.addEventListener('mouseup', __delteDomEvent3);
		});
		pickerPanel.getElementsByClassName('alphaWrap')[0].addEventListener('mouseup', function() {
			__delteDomEvent3();
		});
		//添加presets-color点击事件
		pickerPanel.getElementsByClassName("presets")[0].addEventListener('click', function(e) {
			if(e.target.className.indexOf("presets-color") != -1) {
				var bgColor = getComputedStyle(e.target).backgroundColor;
				var data = tinycolor(bgColor).toHsv();
				Object.assign(set.colors.hsv, data);
				onChange(data);
				updatePanel();
			}
		});
		//添加输入框的事件

		//-----hex值的输入框
		pickerPanel.getElementsByClassName("hex-input")[0].oninput = function() {
			if(this.value.length > 6) {
				this.value = this.value.substr(0, 6);
			} else if(this.value.length == 6) {
				var data = tinycolor(this.value).toHsv();
				Object.assign(set.colors.hsv, data);
				onChange(data);
				updatePanel();
			}
		}

		//-----rgba的4个输入框
		for(var i = 0; i < 4; i++) {
			(function(i) {
				pickerPanel.getElementsByClassName("rgba-input")[i].oninput = function() {
					if(isNaN(this.value) || this.value == "") {
						this.value = 0;
					} else {
						//透明度的输入框 值范围[0,1] rgb的输入框 范围[0,255]
						if(i == 3) {
							if(parseFloat(this.value) < 0) {
								this.value = 0;
							} else if(parseFloat(this.value) > 1) {
								this.value = 1;
							} else {
								this.value = parseFloat(this.value)
							}

						} else {
							if(parseInt(this.value) < 0) {
								this.value = 0;
							} else if(parseInt(this.value) > 255) {
								this.value = 255;
							} else {
								this.value = parseInt(this.value)
							}
						}
						var data = {
							r: pickerPanel.getElementsByClassName("rgba-input")[0].value,
							g: pickerPanel.getElementsByClassName("rgba-input")[1].value,
							b: pickerPanel.getElementsByClassName("rgba-input")[2].value,
							a: pickerPanel.getElementsByClassName("rgba-input")[3].value
						}
						data = tinycolor(data).toHsv();
						Object.assign(set.colors.hsv, data);
						onChange(data);
						updatePanel();
					}
				};
				pickerPanel.getElementsByClassName("rgba-input")[i].onwheel = function(e) {
					if(i == 3) {
						if(e.deltaY > 0 && parseFloat(this.value) >= 0.01) {
							this.value = parseFloat(this.value) - 0.01;
						} else if(e.deltaY < 0 && parseFloat(this.value) <= 0.99) {
							this.value = parseFloat(this.value) + 0.01;
						}
					} else {
						if(e.deltaY > 0 && parseInt(this.value) > 0) {
							this.value = parseInt(this.value) - 1;
						} else if(e.deltaY < 0 && parseInt(this.value) < 255) {
							this.value = parseInt(this.value) + 1;
						}
					}
					var data = {
						r: pickerPanel.getElementsByClassName("rgba-input")[0].value,
						g: pickerPanel.getElementsByClassName("rgba-input")[1].value,
						b: pickerPanel.getElementsByClassName("rgba-input")[2].value,
						a: pickerPanel.getElementsByClassName("rgba-input")[3].value
					}
					data = tinycolor(data).toHsv();
					Object.assign(set.colors.hsv, data);
					onChange(data);
					updatePanel();
				};
			})(i);
		}
		
		
	}
	var __delteDomEvent = function() {
		window.removeEventListener('mousemove', handleChange);
		window.removeEventListener('mouseup', handleChange);
		window.removeEventListener('mouseup', __delteDomEvent);
	}
	var __delteDomEvent2 = function() {
		window.removeEventListener('mousemove', handleChange2);
		window.removeEventListener('mouseup', handleChange2);
		window.removeEventListener('mouseup', __delteDomEvent2);
	}
	var __delteDomEvent3 = function() {
		window.removeEventListener('mousemove', handleChange3);
		window.removeEventListener('mouseup', handleChange3);
		window.removeEventListener('mouseup', __delteDomEvent3);
	}

	var __initDom = function(that) {
		var presetsColorDom = "";
		presetColors.forEach(function(val) {
			presetsColorDom += "<div class='presets-color' style='background-color:" + val + ";'></div>";
		});
		var str = `
				<div class="sketch">
					<div class="saturation">
						<div class="saturationPanel">
							<div class="saturation-white"></div>
							<div class="saturation-black"></div>
							<div class="saturation-pointer">
								
							</div>
						</div>
					</div>
					<div class='controls'>
						<div class='slides'>
							<div class='hueWrap'>
								<div class='huePicker'></div>
							</div>
							<div class='alphaWrap'>
								<div class='alphaColor'></div>
								<div class='alphaPicker'></div>
							</div>
						</div>
						<div class='showColorWrap'>
							<div class='activeColor'>
							</div>
							<div class='showColorBg'></div>
						</div>
					</div>
					<div class='editValues'>
						<div class='edit-hex'>
							<input class='hex-input' type='text' />
							<span class='edit-tips'>Hex</span>
						</div>
						<div class='edit-rgba'>
							<input class='rgba-input' type='num' />
							<span class='edit-tips'>R</span>
						</div>
						<div class='edit-rgba'>
							<input class='rgba-input' type='text' />
							<span class='edit-tips'>G</span>
						</div>
						<div class='edit-rgba'>
							<input class='rgba-input' type='text' />
							<span class='edit-tips'>B</span>
						</div>
						<div class='edit-rgba'>
							<input class='rgba-input' type='text' />
							<span class='edit-tips'>A</span>
						</div>
					</div>
					<div class='presets'>
						${presetsColorDom}
					</div>
				</div>
			`;
		pickerPanel = strToDom(str)[1];
		__bindDomEvent();
		
		document.getElementsByTagName('body')[0].appendChild(pickerPanel);
		
		
		
		updatePanel();
		
		
		__initPos();
		window.addEventListener('resize', __initPos);
		window.addEventListener('scroll', __initPos);
		
		isInitDom = true;
		
		document.addEventListener('click',function(e){
			if(!pickerPanel.contains(e.target) && !ele.contains(e.target)){
				that.hide();
			}
		})
	}

	var __initPos = function() {

		var pos = ele.getBoundingClientRect();

		var winH = getWinHei(),
			winW = getWinWid();
		if(winH - 10 < pos.bottom + pickerPanel.clientHeight) {
			pickerPanel.style.top = pos.top - pickerPanel.clientHeight - 10 + "px";
		} else {
			pickerPanel.style.top = pos.bottom + 10 + "px";
		}
		//当选择器被右边遮蔽的时候，则会看不到。所以往左边偏移一下。
		if(winW - pos.left <  + pickerPanel.clientWidth) {
			pickerPanel.style.left = winW - pickerPanel.clientWidth + "px";
		} else {
			pickerPanel.style.left = pos.left + "px";
		}

	}
	//初始化绑定元素的事件
//	var __initEvent = function(_this) {
//		ele.addEventListener("click", function() {
//			if(ele!=this){
//				ele=this;
//				set.isShow=false;
//			}
//			ele=this;
//			if(!set.isShow) {
//				_this.show();
//			} else {
//				_this.hide();
//			}
//		});
//	}

	var colorFun = function(el, op) {
	}

	colorFun.prototype.show = function() {
		if(!isInitDom) {
			__initDom(this);
		}
		
		pickerPanel.style.display = "block";
		
		updatePanel();
		__initPos();
		
		window.addEventListener('resize', __initPos);
		window.addEventListener('scroll', __initPos);
		
		return this;
	}

	colorFun.prototype.hide = function() {
		window.removeEventListener('resize', __initPos);
		window.removeEventListener('scroll', __initPos);
		pickerPanel.style.display = "none";
		return this;
	}
	
	colorFun.prototype.init=function(op){
		
		var flag=(op.el==ele);
		ele=op.el;
		var c=tinycolor(op.color).toHsv();
		Object.assign(set.colors.hsv,c);
		set.change=op.change;
		
//		__initEvent(this);
		if(!flag || pickerPanel.style.display=="none"){
			this.show();
		}else{
			this.hide();
		}
		return this;
	}
	return colorFun;
})();