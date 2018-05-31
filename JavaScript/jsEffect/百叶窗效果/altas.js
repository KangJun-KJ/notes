//平滑 翻转  栅格bar 栅格3d 溶解(opactity 从) 方快(切割方块) 翻页  
//方块旋转原理： 
//总共只需要三个面，每次旋转完了之后都重新放回正面，在给三个面重新附上图片
//碎片原理
//固定分割多少快，直接根据块数，计算出
//然后给每个方块随机添加一个生成动画的时间，随机添加一个飞出去的方向
//翻页
//两个div一边占半张图片。
//梳理：长条分别从上下间隔的出去
//
(function($) {
	$.fn.atlas = function(options) {
		let defaults = {
			num: ['img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg'],
			autoplay: false,
			canswiper: false,
			delay: 3000,
			effects: 6,
			duration:1000
		}
		let $this = $(this),
			op = $.extend(defaults, options),
			sIdx = 0,
			startX = 0,
			startY = 0,
			loopTimer = "", //循环播放的倒计时
			lastIdx = -1, //记录上个idx
			nextFlag = false,
			prevFlag = false,
			wid = $(this).width(),
			hei = $(this).height(),
			pressDown = false;
		$this.width(wid);
		$this.height(hei);
		this.init = function() {
			$this.empty().show().removeClass("stop");
			initDom();
			if(op.canswiper == true) {
				initTouchEvent();
			}
			if(op.autoplay == true) {
				loop();
			}
		}

		this.clearDom = function() {
			$this.empty();
			clearInterval(loopTimer);
		}

		function initTouchEvent() {
			$this.on("touchstart", function(e) {
				var _touch = e.originalEvent.targetTouches[0];
				e.preventDefault();
				startX = _touch.pageX;
				startY = _touch.pageY;
				pressDown = true;
			});
			$this.on("touchmove", function(e) {
				var _touch = e.originalEvent.targetTouches[0];
				if(_touch.length > 1 || (startX == -1 && startY == -1)) {
					return;
				}
				e.preventDefault();
				if(_touch.pageX - startX >= 20) {
					prev();
					clearTimerByTouch();
					pressDown = false;
				} else if(_touch.pageX - startX <= -20) {
					next();
					clearTimerByTouch();
					pressDown = false;
				}
			});
			$this.on("touchend", function(e) {
				pressDown = false;
			});
			$this.on("mousedown", function(e) {
				startX = e.originalEvent.clientX;
				startY = e.originalEvent.clientY;
				e.preventDefault();
				pressDown = true;
			});
			$this.on("mousemove", function(e) {
				if(!pressDown) {
					return;
				}
				e.preventDefault();
				if(e.originalEvent.clientX - startX >= 20) {
					pressDown = false;
					prev();
					clearTimerByTouch();
				} else if(e.originalEvent.clientX - startX <= -20) {
					pressDown = false;
					next();
					clearTimerByTouch();
				}

			});
			$this.on("mouseup", function(e) {
				pressDown = false;
			});
		}

		function initDom() {
			switch(op.effects) {
				case 0:
					addDom0();
					break;
				case 1:
					addDom1();
					break;
				case 2:
					addDom1();
					break;
				case 3:
					addDom1();
					break;
				case 4:
					addDom4();
					break;
				case 5:
					addDom5();
					break;
				case 6:
					addDom6();
					break;
				case 7:
					//碎片
					addDom7();
					break;
			}
		}

		function addDom0() {
			//实现无缝轮播，复制第一个div.
			op.num.push(op.num[0]);
			var str = `<div style='overflow:hidden;width:${wid}px;height:${hei}px;'><div class='atlasWrap' style='width:${100 * (op.num.length)}%;height:100%;'>`;
			for(var i = 0, len = op.num.length; i < len; i++) {
				str += `<div class='atlas-item' style='float:left;width:${100 / op.num.length}%;background:url(${op.num[i]}) no-repeat center;background-size:100% 100%;'>`
				str += `</div>`;
			}
			str += "</div>";
			$this.html(str);
			//显示当前下标div
			getDom().show();
		}

		function addDom1() {
			var str = "";
			var fenshu = 5,
				dis = wid / fenshu;
			for(var i = 0, len = op.num.length; i < len; i++) {
				str += `<div class='atlas-item' style='position:absolute;display:none;width:100%;transform: perspective(1000px);'>`
				for(let j = 0; j < fenshu; j++) {
					str += `
									<div class='atlas-item-span' style='width:100%;float:left;width:${100 / fenshu}%;
									background-image:url(${op.num[i]});
									background-size:${fenshu * 100}% 100%;
									background-position:${-dis * j}px;'
									></div>
								`;
				}
				str += `</div>`;
			}
			$this.html(str);
			//显示当前下标div
			getDom().show();
		}

		function addDom4() {
			var str = "";
			for(var i = 0, len = op.num.length; i < len; i++) {
				str += `<div class='atlas-item' style='position:absolute;
							display:none;
							width:100%;
							background-image:url(${op.num[i]});
							background-size:100% 100%;
							'>`;
				str += `</div>`;
			}
			$this.html(str);
			//显示当前下标div
			getDom().show();
		}

		function addDom5() {
			var str = "";
			for(var i = 0, len = op.num.length; i < len; i++) {
				str += `<div class='atlas-item ' style='
							width:100%;
							height:100%;
							background-image:url(${op.num[i]});
							background-size:100% 100%;
							position:absolute;
							top:0;
							left:0;
							'>`;
				str += `</div>`;
			}
			$this.html(str);
			$this.css({
				"transform": "perspective(3000px) rotatex(0deg) rotatey(0deg)",
				"transformStyle": "preserve-3d",
				"overflow": "inherit"
			});
			$this.find(".atlas-item").eq(0).addClass('c_front').css({
				"transform": "translatez(" + wid / 2 + "px)"
			});
			//						$this.find(".atlas-item").eq(op.num.length - 1).addClass('c_left').css({
			//							"transform": "rotatey(270deg) translatez(" + wid / 2 + "px)"
			//						});
			$this.find(".atlas-item").eq(1).addClass('c_right').css({
				"transform": "rotatey(90deg) translatez(" + wid / 2 + "px)"
			});
			$this.find(".atlas-item").eq(2).addClass('c_right').css({
				"transform": "rotatey(270deg) translatez(" + wid / 2 + "px)"
			});
			// $this.find(".atlas-item").addClass("shadow_1");
		}

		function addDom6() {
			var str = "";
			var fenshu = 2,
				dis = wid / fenshu;
			for(var i = 0, len = op.num.length; i < len; i++) {
				str += `<div class='atlas-item' style='position:absolute;display:none;width:100%;'>`
				for(let j = 0; j < fenshu; j++) {
					str += `
						<div class='atlas-item-span' 
						style='width:100%;
						float:left;
						width:${100 / fenshu}%;
						background-image:url(${op.num[i]});
						background-size:${fenshu * 100}% 100%;
						background-position:${-dis * j}px;'
						></div>
					`;
				}
				str += `</div>`;
			}
			$this.html(str);
			//显示当前下标div
			getDom().show();
			$this.css({
				"transform": "perspective(3000px) rotatex(0deg) rotatey(0deg)",
				"transformStyle": "preserve-3d",
				"position": "relative",
				"overflow": "inherit"
			});
		}

		function addDom7() {
			var str = '';
			var bW = 30,
				bH = 30
			for(var i = 0, len = op.num.length; i < len; i++) {
				str += `<div class='atlas-item' style='display:none;background-image:url(${op.num[i]});background-size:100% 100%;'>`
				str += `</div>`;
			}
			str += `<div class='cilps' style='display:none;position:absolute;top:0;left:0;width:100%;height:100%;'>`;

			for(var i = 0, len = Math.ceil(wid / bW); i < len; i++) {
				for(var j = 0, Hlen = Math.ceil(hei / bH); j < Hlen; j++) {
					str += `
						<div class='cilps-item' style='
							position:absolute;
							top:${bH * j}px;
							left:${bW * i}px;
							width:${bW}px;
							height:${bH}px;
							background-size:${wid}px ${hei}px;
							background-position:${-bW * i}px ${-bH * j}px;'
						'>
						</div>
					`
				}
			}

			str += `</div>`;
			$this.html(str);
			getDom().show();
		}

		function DomMove(el, styleCom, value, goal, time, callback) {
			time = time || 1000;
			var cnt = 0,
				count = time / 10,
				distance = value / count,
				callback = callback || function() {};
			var timer = setInterval(function() {
				var nowTop = parseInt(el.css(styleCom).substr(0, el.css(styleCom).length - 2));

				el.css({
					"marginLeft": nowTop - distance + "px"
				})
				if(++cnt > count) {
					el.css({
						"marginLeft": -goal + "px"
					});
					clearInterval(timer);
					setTimeout(function() {
						callback();
					}, 100);
				}
			}, 17);
		}

		function next() {
			if(op.effects == 0) {
				sIdx++;
				if(sIdx == op.num.length) {
					$this.children("div").children(".atlasWrap").css({
						"marginLeft": 0
					});
					sIdx = 1;
				}
				DomMove($this.children("div").children(".atlasWrap"), "marginLeft", wid, sIdx * wid, op.duration);

			} else if(op.effects == 1) {
				/*
				 * 切换的时候给当前页面添加动画元素turn
				 * 然后立马显示第二个页面元素
				 */
				lastIdx = sIdx;
				++sIdx >= op.num.length && (sIdx = 0);

				getDom().find(".atlas-item-span").removeClass('turn');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").addClass('turn');

			} else if(op.effects == 2) {
				lastIdx = sIdx;
				++sIdx >= op.num.length && (sIdx = 0);

				getDom().find(".atlas-item-span").removeClass('grid');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").addClass('grid');

			} else if(op.effects == 3) {
				lastIdx = sIdx;
				++sIdx >= op.num.length && (sIdx = 0);

				getDom().find(".atlas-item-span").removeClass('turn').addClass('turn2');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").removeClass('turn2').addClass('turn');
			} else if(op.effects == 4) {
				lastIdx = sIdx;
				++sIdx >= op.num.length && (sIdx = 0);

				getDom().removeClass('dissolve');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).addClass('dissolve');
			} else if(op.effects == 5) {
				$this.addClass('rotateRight');
				if(!nextFlag) {
					nextFlag = true;
					if(!prevFlag)
						sIdx = 2;
					console.log(sIdx);
					$this.on("webkitAnimationEnd", function() {
						$this.removeClass('rotateRight');
						$this.find(".c_front").css({
							"background-image": `url(${op.num[(sIdx-1)<0?op.num.length-1:(sIdx-1)]})`
						});
						$this.find(".c_right").css({
							"background-image": `url(${op.num[sIdx]})`
						});
						$this.find(".c_left").css({
							"background-image": `url(${op.num[(sIdx-2)<0?op.num.length-2:(sIdx-2)]})`
						});
						++sIdx >= op.num.length && (sIdx = 0);
					});
				}
			} else if(op.effects == 6) {
				getLastDom().hide();
				lastIdx = sIdx;
				++sIdx >= op.num.length && (sIdx = 0);
				getDom().find(".atlas-item-span:last-child").removeClass('fanye');

				getDom().css({
					zIndex: 1
				}).show();
				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span:last-child").addClass('fanye');
				setTimeout(function() {
					getLastDom().hide();
				}, 1000);
			} else if(op.effects == 7) {
				getDom().hide();
				$this.find(".cilps").show();
				$this.find('.cilps-item').css({
					"background-image": getDom().css("background-image")
				});
				++sIdx >= op.num.length && (sIdx = 0);
				getDom().show();
				$this.find(".cilps-item").each(function() {
					var t = $(this),
						t2 = Math.random() * 500;
					setTimeout(function() {
						t.removeClass("clipsHide");
						setTimeout(function() {
							t.addClass("clipsHide");
						}, 0);
					}, t2);
				});
				setTimeout(function() {
					$this.find(".cilps").hide();
				}, 1000);
			}

		}

		function prev() {

			if(op.effects == 0) {
				sIdx--;
				if(sIdx == -1) {
					$this.children("div").children(".atlasWrap").css({
						"marginLeft": -((op.num.length - 1) * wid) + "px"
					});
					sIdx = op.num.length - 2;
				}
				DomMove($this.children("div").children(".atlasWrap"), "marginLeft", -wid, sIdx * wid, op.duration);
			} else if(op.effects == 1) {
				lastIdx = sIdx;
				--sIdx == -1 && (sIdx = op.num.length - 1);

				getDom().find(".atlas-item-span").removeClass('turn');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").addClass('turn');
			} else if(op.effects == 2) {
				lastIdx = sIdx;
				--sIdx == -1 && (sIdx = op.num.length - 1);

				getDom().find(".atlas-item-span").removeClass('grid');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").addClass('grid');
			} else if(op.effects == 3) {
				lastIdx = sIdx;
				--sIdx == -1 && (sIdx = op.num.length - 1);

				getDom().find(".atlas-item-span").removeClass('turn').addClass('turn2');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").removeClass('turn2').addClass('turn');
			} else if(op.effects == 4) {
				lastIdx = sIdx;
				--sIdx == -1 && (sIdx = op.num.length - 1);

				getDom().find(".atlas-item-span").removeClass('dissolve');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span").addClass('dissolve');
			} else if(op.effects == 5) {
				$this.addClass('rotateLeft');
				if(!prevFlag) {
					prevFlag = true;
					if(!nextFlag)
						sIdx = 0;
					$this.on("webkitAnimationEnd", function() {
						--sIdx == -1 && (sIdx = op.num.length - 1);
						$this.removeClass('rotateLeft');
						$this.find(".c_front").css({
							"background-image": `url(${op.num[sIdx]})`
						});
						$this.find(".c_left").css({
							"background-image": `url(${op.num[(sIdx+1)>=op.num.length?0:(sIdx+1)]})`
						});
						$this.find(".c_right").css({
							"background-image": `url(${op.num[(sIdx-1)<0?op.num.length-1:(sIdx-1)]})`
						});

					});
				}
			} else if(op.effects == 6) {
				lastIdx = sIdx;
				--sIdx == -1 && (sIdx = op.num.length - 1);
				getDom().find(".atlas-item-span:first-child").removeClass('fanye2');
				getDom().css({
					zIndex: 1
				}).show();

				getLastDom().css({
					zIndex: 2
				}).find(".atlas-item-span:first-child").addClass('fanye2');
				setTimeout(function() {
					getLastDom().hide();
				}, 1000);
			} else if(op.effects == 7) {
				getDom().hide();
				$this.find(".cilps").show();
				$this.find('.cilps-item').css({
					"background-image": getDom().css("background-image")
				});
				--sIdx == -1 && (sIdx = op.num.length - 1);
				getDom().show();
				$this.find(".cilps-item").each(function() {
					var t = $(this),
						t2 = Math.random() * 500;
					setTimeout(function() {
						t.removeClass("clipsHide");
						setTimeout(function() {
							t.addClass("clipsHide");
						}, 0);
					}, t2);
				});
				setTimeout(function() {
					$this.find(".cilps").hide();
				}, 1000);
			}
		}

		function getDom() {
			return $this.find(".atlas-item").eq(sIdx);
		}

		function getLastDom() {
			return $this.find(".atlas-item").eq(lastIdx);
		}
		//手动切换的时候，清除自动切换的计时器，重新开始
		function clearTimerByTouch() {
			//当滑动过一次之后，清空开始值，让他抬起手，才可以进行第二次滑动。
			startX = -1, startY = -1;
			clearInterval(loopTimer);
			loop();

		}

		function loop() {
			if(op.autoplay == true) {
				loopTimer = setInterval(() => {
					next();
				}, op.delay);
			}
		}
		var jiantingTimer;
		jiantingTimer = setInterval(() => {
			if($this.hasClass("stop")) {
				console.log('结束了');
				$(".rotateLeft").removeClass("rotateLeft");
				$(".rotateRight").removeClass("rotateRight");
				op.autoplay = false;
				clearInterval(loopTimer);
				clearInterval(jiantingTimer);
			}
		}, 20);
		this.init();

		return this;
	}
}(jQuery));