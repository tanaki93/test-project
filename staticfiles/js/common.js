var mobile_scale = 1;
var subload_bg_pano, subload_pano, pano_rotated, pano_loaded;
$(function () {
    var body_size = $('body');
    var centrer1 = $('#centrer1');
    var centrer2 = $('#centrer2');
    var scroll1 = centrer1.find('.scroll_frame');
    var scroll2 = centrer2.find('.scroll_frame');
    var preloader = $('#preloader_frame');
    var ratio = 0.5625;
    var apart_ratio = 1.333;
    var time = 700;
    var video_hide_delay = 200;
    var easyIn = 'easeInQuart';
    var easyOut = 'easeOutQuart';
    var easyInOut = 'easeInOutQuart';
    var ani = true;
    var mobile = false;
	var debug = false;
    var audio_playing = false;
    var intro_playing = false;
    var transitions_av = true;
    var pano_help = true;
    var page = body_size.attr('class');
    var old_page;
    var frame_w, frame_h, frame_d, centrer1_w, centrer1_h, centrer1_t, centrer1_l, svg_paper, svg_paper_2, svg_paper_3, svg_paper_4, data, infra_xml, gallery, param_search, parallax, carousel, slideshow, sequence, apart_zoom, route, mouse_pos, text_blur_bg, bg_pano, normal_pano, krpano, popup_video, big_ani_step, big_ani_group, minimap, cur_pano, from_home, parking_data;
    var pages = [
        
    ];
    var ani_names = [
        'plans-plans-view2','plans-view2-plans','advantages-advantages-view2','advantages-view2-advantages'
    ];
    var big_ani_names = {
       
    };
    var page_urls = {
        
    };
    var pano_ani_names = [
        
    ];
    ani_names = ani_names.concat(pano_ani_names);
    $.each(big_ani_names, function (index, value) {
        ani_names.push(index);
    })
    var plans_val = {};

    if (!Modernizr.csstransitions || !Modernizr.cssanimations) {
        transitions_av = false;
        $.fn.transition = $.fn.animate;
        $.fn.transitionStop = $.fn.stop;
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB10|IEMobile|Opera Mini/.test(navigator.userAgent)) {
        mobile = true;
        $('#body_frame').attr('class', 'mobile');
        centrer2.append('<div class="rotate_help_frame"><img src="/assets/i/rotate.png" class="rotate_help" /></div>');
        var rotate_help = centrer2.find('.rotate_help_frame');
    }
    if (mobile || !Modernizr.video) {
        ani = false;
    }
    function set_audio_volume(num) {
        if (bg_music)
            bg_music.volume = num;
    }
    if (Modernizr.audio && 0) {
        $('.sound_frame').append('<audio id="bg_music" preload="auto" loop><source src="/assets/audio/music.mp3" type="audio/mpeg"><source src="/assets/audio/music.ogg" type="audio/ogg"></audio>');
        var bg_music = document.getElementById('bg_music');
        set_audio_volume(1);
        if (mobile || $.cookie('music') == 'off') {
            $('.audio_toggle').addClass('off').text('вкл. звук');
        } else {
            bg_music.play();
            audio_playing = true;
        }
        $(window)
			.on('blur', function () {
				set_audio_volume(0);
			})
			.on('focus', function () {
				set_audio_volume(1);
			});
    } else {
        $('.audio_toggle').remove();
    }
    if (ani) {
        var bg_video, videoInt, videoTime, is_video, html_loaded;
        centrer1.prepend('<video id="bg_video" class="video-js accel" preload="auto"><source src="" type="video/webm" /><source src="" type="video/mp4" /></video>');
        videojs('bg_video', {}, function () {
            bg_video = this;
            bg_video.on('ended', function () {
                if (intro_playing) {
                    load_page_js(page, old_page);
                } else
                if (page == old_page) {
                    bg_video.play();
                } else {
                    load_js(page, old_page);
                }
            });
        });
    } else {
        $('.ani_toggle').remove();
    }
    $('.accel').css({'translate3d': 0});
    function content_move() {
        if (mobile) {
            var min_window_w = 1250;
            var min_window_h = 650;
            var min_window_d = min_window_h / min_window_w;
            var window_w = $(window).width();
            var window_h = $(window).height();
            var window_d = window_h / window_w;
            if (window_d < min_window_d) {
                mobile_scale = Math.min(1, window_h / min_window_h);
                body_size.css({'min-width': window_w / mobile_scale, 'min-height': min_window_h, 'transformOrigin': '0 0', 'scale': mobile_scale});
            } else {
                mobile_scale = Math.min(1, window_w / min_window_w);
                body_size.css({'min-width': min_window_w, 'min-height': window_h / mobile_scale, 'transformOrigin': '0 0', 'scale': mobile_scale});
            }
            if (rotate_help) {
                if (window_h > window_w) {
                    rotate_help.show();
                } else {
                    rotate_help.hide();
                }
            }
        }
        frame_w = body_size.width();
        frame_h = body_size.height();
        frame_d = frame_h / frame_w;
        if (frame_d > ratio) {
            centrer1_w = frame_h / ratio;
            centrer1_h = frame_h;
            centrer1_t = 0;
            centrer1_l = 0.5 * (frame_w - centrer1_w);
        } else {
            centrer1_w = frame_w;
            centrer1_h = frame_w * ratio;
            centrer1_t = 0.5 * (frame_h - centrer1_h);
            centrer1_l = 0;
        }
        element_check_size(centrer1);
        if (svg_paper) {
            svg_paper.changeSize(centrer1_w, centrer1_h);
        }
        if (svg_paper_4) {
            plan_check_size();
        }
        if (bg_pano) {
            element_check_size(bg_pano);
        }
        if (text_blur_bg) {
            move_blur_bg(text_blur_bg);
        }
        if (gallery) {
            gallery.reinitialise();
        }
        if (popup_video) {
            popup_video.reinitialise();
        }
		if(page=='around') {
			reint_svg_parallax();	
		} else
        if (parallax) {
            parallax.reinitialise(mouse_pos);
        }
        if (apart_zoom) {
            apart_zoom.reinitialise();
        }
    }
    function plan_check_size() {
        var fr = centrer2.find('.plan_frame_centrer:last');
        var fr2 = fr.parent();
        var plan_size = Math.min(fr2.width() / apart_ratio, fr2.height());
        fr.css({'width': plan_size * apart_ratio, 'height': plan_size, 'margin-top': -0.5 * plan_size, 'margin-left': -0.5 * plan_size * apart_ratio});
        if (svg_paper_2) {
            svg_paper_2.changeSize(plan_size * apart_ratio, plan_size);
        }
        if (svg_paper_3) {
            svg_paper_3.changeSize(plan_size * apart_ratio, plan_size);
        }
    }
    function move_blur_bg(text_bg) {
        text_bg.each(function () {
            var text_bg = $(this);
            var text_blur_bg = text_bg.find('.text_blur_bg');
            element_check_size(text_blur_bg);
            text_blur_bg.find('img').css({'left': -text_bg.offset().left / mobile_scale, 'top': -text_bg.offset().top / mobile_scale});
        })
    }
    function element_check_size(targ) {
        targ.css({'width': centrer1_w, 'height': centrer1_h, 'top': centrer1_t, 'left': centrer1_l});
    }
    $(window).on('resize', function () {
        content_move();
    });
    content_move();
    setTimeout(function () {
        content_move();
    }, 500);
    setTimeout(function () {
        content_move();
    }, 1500);
    setTimeout(function () {
        content_move();
    }, 2500);

    function load_js(targ, prev) {
        //console.log('load_js '+targ);		
        if (big_ani_step != null) {
            var big_ani_bg = $('.double_ani_frame .n' + big_ani_step);
            big_ani_bg.css({'opacity': 1});
            videoTime = setTimeout(function () {
                big_ani_step++;
                load_bg_video('fly/' + big_ani_group[big_ani_step], big_ani_bg);
                if (big_ani_step == big_ani_group.length - 1) {
                    big_ani_step = null;
                }
            }, video_hide_delay);
        } else {
            body_size.attr('class', targ);
            var frame1 = scroll1.find('.' + targ + '_frame:last');
            var frame2 = scroll2.find('.' + targ + '_frame:last');
            var prev_frame1 = frame1.prevAll();
            var prev_frame2 = frame2.prevAll();
            var dir;
            var prev_index = $.inArray(prev, pages);
            var next_index = $.inArray(targ, pages);
            function frame1_ani_ended() {
                scroll1.removeAttr('style');
                frame1.css({'left': 0});
                prev_frame1.remove();
            }
            function frame2_ani_ended() {
                scroll2.removeAttr('style');
                frame2.css({'left': 0});
                prev_frame2.remove();
            }
            if (prev_index != -1 && next_index != -1) {
                if (prev_index < next_index) {
                    dir = 1;
                } else {
                    dir = -1;
                }
            }
            var video_name = prev + '-' + targ;
            if (ani && $.inArray(video_name, ani_names) != -1) {
                video_transition_ended(frame1, frame2);
                prev_frame1.remove();
                prev_frame2.remove();
            } else
            if (dir) {
                frame1.css({'left': (100 * dir) + '%'});
                frame2.css({'left': (100 * dir) + '%'});
                var css = [];
                if (transitions_av) {
                    css[0] = {'translate3d': '0%'};
                    css[1] = {'translate3d': (-100 * dir) + '%'};
                } else {
                    css[0] = {'left': '0%'};
                    css[1] = {'left': (-100 * dir) + '%'};
                }
                scroll1.transitionStop(true).delay(100).css(css[0]).transition(css[1], time, easyInOut, function () {
                    frame1_ani_ended();
                });
                scroll2.transitionStop(true).delay(100 + time * 0.3).css(css[0]).transition(css[1], time, easyInOut, function () {
                    frame2_ani_ended();
                });
            } else {
                frame1.css({'left': 0, 'opacity': 0}).transition({'opacity': 1}, time, function () {
                    frame1_ani_ended();
                });
                frame2.css({'left': 0, 'opacity': 0}).transition({'opacity': 1}, time, function () {
                    frame2_ani_ended();
                });
                prev_frame1.transitionStop(true).transition({'opacity': 0}, time);
                prev_frame2.transitionStop(true).transition({'opacity': 0}, time);
            }
            load_page_js(targ, prev);
        }
    }
    function video_transition_ended(frame1, frame2) {
        frame1.transitionStop(true).css({'left': 0, 'display': 'block', 'opacity': 1})
                .children(':not(.video-hide)').css({'opacity': 0}).transition({'opacity': 1}, time);
        frame2.transitionStop(true).css({'left': 0, 'display': 'block', 'opacity': 0}).transition({'opacity': 1}, time);
    }
    function stop_intro() {
        if (intro_playing) {
			stop_bg_video();
            intro_playing = false;
            $('.skip_intro').addClass('no-active').transition({'scale': 1.2, 'opacity': 0}, 500, function () {
                $(this).remove();
            })
            $('.menu_frame, .logo').fadeIn(500);
        }
    }
    function load_page_js(targ, prev) {
        var frame1 = scroll1.find('.' + targ + '_frame:last');
        var frame2 = scroll2.find('.' + targ + '_frame:last');
		var frame = frame1.add(frame2);
        var menu_targ = targ;
        if (ani) {
            videoTime = setTimeout(function () {
                $('#bg_video').hide();
            }, video_hide_delay);
        }
		frame1.find('.accel').css({'translate3d': 0});
        frame2.find('.accel').css({'translate3d': 0});
        frame2.find('.text_scroll').removeClass('browser_scroll').jScrollPane({showArrows: false, autoReinitialise: true, verticalDragMinHeight: 70, verticalDragMaxHeight: 70});
        if (targ == 'home' || targ=='views' || targ=='place' || targ=='quality' || targ=='comfort') {
			menu_targ='home';
			frame1.find('.p_item.n1 .div_100').attr('src',frame1.find('.bg_img').attr('src'));
			frame1.find('.bg_img').attr('src','/assets/i/blank.gif');
			/*parallax = frame.find('.p_item').parallaxInit({
                transitions_av: transitions_av,
                mouse_pos: mouse_pos
            })*/
			var active_num=0;
			if(targ == 'home' || targ=='place') {
				active_num=1;
			} else
            if(targ=='views') {
                active_num=2;
            } else
			if(targ=='quality') {
				active_num=3;
			} else
			if(targ=='comfort') {
				active_num=4;
			}
			//frame2.find('.home_slogan_frame.n'+active_num).css({'display':'block'});
			frame2.find('.home_menu_dot.n'+active_num).addClass('active');
			if(active_num!=1) {
				frame2.find('.home_menu_left').addClass('active');
			}
			if(active_num!=4) {
                frame2.find('.home_menu_right').addClass('active');
			}
            /*if(targ=='home') {
                scale_show(frame2.find('.home_banner'), time*2, 1000);
            }*/
        } else
        if (targ == 'about' || targ == 'engineering' || targ == 'infrastructure') {
            menu_targ = 'about';
            make_submenu_active(targ, frame2);
            if(targ=='about') {
                scale_show(frame2.find('.to_advantages'), time*1.5, 500);
            }
        } else
        if (targ == 'advantages' || targ == 'advantages-view2') {
            menu_targ = 'about';
            //frame1.find('.asd').dragChildrens();
        } else
        if (targ == 'gallery' || targ == 'visualization' || targ == 'entrances' || targ == 'interiors' || targ == 'architecture') {
            menu_targ = 'gallery';
			make_submenu_active(targ, frame2);
            var gallery_frame1 = frame1.find('.gallery_place');
            var gallery_frame2 = frame2.find('.gallery_place');
            var gallery_images = (''+gallery_frame1.data('targ')).split(',');
            gallery = gallery_frame1.galleryInit({
                frame2: gallery_frame2,
                path: gallery_frame1.data('path'),
                images: gallery_images,
                start_num: gallery_frame1.data('start'),
                preview_width: false,
                time: 600,
                mobile: mobile,
                force3d: transitions_av,
                afterMove: function (num) {
                    body_size.load_content(gallery_frame1.data('url') + '/' + gallery_images[num], {'suppress_load': true});
                },
                loadComplete: function () {
                    frame1.find('.bg_img').remove();
                }
            });
			parallax = frame2.find('.p_item').parallaxInit({
                transitions_av: transitions_av,
                mouse_pos: mouse_pos,
				off: true
            })
        } else
        if (targ == 'panorams') {
			menu_targ = 'gallery';
			make_submenu_active(targ, frame2);
			cur_pano=0;
			load_pano_img(0);
			frame.find('.bg_img').attr('src','/assets/i/blank.gif');
		}else
        if (targ == 'news') {
			
        } else
		if (targ == 'around') {			
			reint_svg_parallax();			
		} else
        if (targ == 'map') {
			menu_targ='around';
            frame2.find('.map_place').attr('id', 'map_place');
            load_placement_map(frame2);
        } else
        if (targ == 'plans' || targ == 'plans-view2') {
			menu_targ = 'plans';
			plans_val['view']=targ;
            test_json(function () {
                load_korpus_map(frame1, frame2);
            })
        } else
        if (targ == 'parking') {
            menu_targ = 'plans';
            test_parking_json(function () {
                load_parking_map(frame1, frame2);
            })
        } else
        if (targ == 'contacts') {
			frame2.find('.contacts_txt.n2').text($('.footer_phone').text());
            frame2.find('.map_place').attr('id', 'map_place');
            load_contacts_map(frame2);
        } else
        if (targ == 'search') {
            menu_targ = 'plans';
            test_json(function () {
                param_search = centrer2.find('.load_frame:last').searchInit({
                    data: data.apartments,
                    scroll_height: 70,
                    loadAnimate: function(el) {
                    },
                    resultClick: function (id) {
                        var d = data.apartments[id];
                        body_size.load_content('/plans/floor' + d.f + '/flat' + d.tn);
                        //window.open('/assets/php/pdf.php?id='+id,'_blank');
                    }
                });
            })
        }
		
		
		if(from_home) {
			frame2.find('.big_close.from_home_back').show();
		}
		from_home=false;
		if(targ=='news' || targ=='contacts' || targ=='map' || targ=='page404' || targ=='parking') {
			body_size.addClass('dark');	
		}
		var footer_plans = $('.footer_plans');
        if (targ=='home' || targ=='views' || targ=='place' || targ=='quality' || targ=='comfort' ||  targ=='about'  || targ=='engineering'  || targ=='infrastructure'  || targ=='plans' || targ=='plans-view2') {
            hide_element(footer_plans);
        } else {
            show_element(footer_plans);
        }
        
        if (frame2.find('.pano_place').length) {
            frame2.find('.pano_place')
				.css({'cursor': 'url(/assets/i/cur1.cur), move'})
				.on('mousedown', function () {
					$(this).css({'cursor': 'url(/assets/i/cur2.cur), move'})
				})
				.on('mouseup', function () {
					$(this).css({'cursor': 'url(/assets/i/cur1.cur), move'})
				})
        }
        if (frame2.find('.text_blur_bg_frame').length) {
            text_blur_bg = frame2.find('.text_blur_bg_frame').parent();
            move_blur_bg(text_blur_bg);
        }
        $('.menu')
			.find('.active').removeClass('active').end()
			.find('.' + menu_targ + '_link').addClass('active');
        old_page = targ;
    }

    function unload_js(targ, next) {
        //console.log('unload_js '+targ);
        var frame1 = scroll1.find('.' + targ + '_frame:last');
        var frame2 = scroll2.find('.' + targ + '_frame:last');

        if (targ == 'home') {
           //stop_intro();
        }

        route = unloadPlugin(route);
        gallery = unloadPlugin(gallery);
        param_search = unloadPlugin(param_search);
        carousel = unloadPlugin(carousel);
        sequence = unloadPlugin(sequence);
        apart_zoom = unloadPlugin(apart_zoom);
        parallax = unloadPlugin(parallax);
        slideshow = unloadPlugin(slideshow);
        bg_pano = setNull(bg_pano);
        normal_pano = setNull(normal_pano);
        text_blur_bg = setNull(text_blur_bg);
        svg_paper = setNull(svg_paper);
        svg_paper_2 = setNull(svg_paper_2);
        svg_paper_3 = setNull(svg_paper_3);
        svg_paper_4 = setNull(svg_paper_4);

        if (frame2.find('.map_place').length) {
            frame2.find('.map_place').removeAttr('id');
        }
        if (frame2.find('.pano_place').length) {
            frame2.find('.pano_place').off();
        }
		close_menu();
    }
    function add_stat(url) {
        //console.log('add_stat '+url);
        //ga('send', 'pageview', url);
        //_gaq.push(['_trackPageview', url]);
        yaCounter28167102.hit(url);
    }
    function unloadPlugin(targ) {
        if (targ) {
            targ.removeEvents();
            return null;
        }
    }
    function setNull(targ) {
        if (targ) {
            return null;
        }
    }
    function addZero(num) {
        return num < 10 ? '0' + num : num;
    }
    function test_json(targ_function) {
        if (!data) {
            var date = new Date();
            $.ajax({
                url: '/assets/js/data.json',
                dataType: 'json',
                success: function (response) {
                    data = response;
                    targ_function();
                }
            });
        } else {
            targ_function();
        }
    }
    function test_parking_json(targ_function) {
        if (!parking_data) {
            var date = new Date();
            $.ajax({
                url: '/assets/js/parking_data.json?v=' + addZero(date.getDate()) + addZero(date.getMonth() + 1) + date.getFullYear(),
                dataType: 'json',
                success: function (response) {
                    parking_data = response;
                    targ_function();
                }
            });
        } else {
            targ_function();
        }
    }
    function test_infra_xml(url, targ_function) {
        if (!infra_xml) {
            $.ajax({
                url: url,
                dataType: 'xml',
                success: function (response) {
                    infra_xml = [];
                    var i = 1;
                    var hrefs = {'pmlbs.png': 0, 'pmbls.png': 1, 'pmdbs.png': 2, 'pmgns.png': 3, 'pmnts.png': 4, 'pmpns.png': 5, 'pmvvs.png': 6, 'pmyws.png': 7, 'pmors.png': 8, 'pmdos.png': 9, 'pmrds.png': 10, 'pmgrs.png': 11, 'pmwts.png': 12};
                    $(response).find('Placemark').each(function () {
                        var point_item = $(this);
                        var point_coord = point_item.find('coordinates').text().split(',');
                        var type = hrefs[point_item.find('href').text().replace('http://api-maps.yandex.ru/i/0.4/micro/', '')];
                        infra_xml.push([Number(point_coord[1]), Number(point_coord[0]), point_item.find('name').text(), point_item.find('description').text(), type, i++]);
                    });
                    targ_function();
                }
            })
        } else {
            targ_function();
        }
    }

    function make_submenu_active(targ, frame) {
        frame.find('.' + targ + '_sublink').addClass('active');
    }

    function scale_show(targ, delay, time, callback) {
        targ.css({'opacity': 0, 'scale': 0.8}).delay(delay).transition({'opacity': 1, 'scale': 1}, time, callback);
    }

    function hide_element(el, css) {
        if (!el.data('hidden')) {
            el.transitionStop(true).data('hidden', true).transition({'opacity':0}, (old_page?time:0), function(){
				$(this).css({'display':'none'});	
			});
        }
    }
    function show_element(el, css) {
        if (el.data('hidden')) {
            el.transitionStop(true).data('hidden', false).css({'display':'block','opacity':0}).transition({'opacity':1}, (old_page?time:0));
        }
    }

    function scroll_reint(frame) {
        if (frame.length) {
            var jsp = frame.data('jsp');
            jsp.scrollTo(0, 0);
            jsp.reinitialise();
        }
    }
    function scroll_load_html(scroll_frame, html, time) {
        scroll_frame.transitionStop(true).transition({'opacity': 0}, time, function () {
            scroll_frame.find('.jspPane>div').html(html);
            scroll_reint(scroll_frame);
            scroll_frame.transition({'opacity': 1}, time);
        });
    }
	function close_menu() {
		var menu=$('.menu_over');
		if(menu.data('open')=='opened') {
			var menu_time=700;
			menu.data('open','animated').transitionStop(true).transition({'width':90},menu_time,function(){
				menu.data('open','closed')	
			})
				.find('.menu_open_btn').transitionStop(true).transition({'opacity':1},menu_time).end()
				.find('.menu_open_icon.n0').transitionStop(true).transition({'rotate':0,'opacity':1},menu_time).end()
				.find('.menu_open_icon.n1').transitionStop(true).transition({'rotate':-360,'opacity':0},menu_time).end()
				.find('.menu_close_btn').removeClass('opened');
		}
	}
	function open_menu() {
		var menu_time=900;
		$('.menu_over').data('open','animated').transitionStop(true).transition({'width':1030},menu_time,function(){
			$(this).data('open','opened')
		})
			.find('.menu_open_btn').transitionStop(true).transition({'opacity':0},menu_time).end()
			.find('.menu_open_icon.n0').transitionStop(true).transition({'rotate':360,'opacity':0},menu_time).end()
			.find('.menu_open_icon.n1').transitionStop(true).css({'rotate':-360,'opacity':0}).transition({'rotate':0,'opacity':1},menu_time).end()
			.find('.menu_close_btn').addClass('opened');
	}
	function reint_svg_parallax() {
		var p_item=$('.around_frame .p_item');
		if(frame_w/frame_h>1020/800) {
			var targ_h=800*frame_w/1020;
			var targ_delta_y=100*((targ_h/frame_h)-1);
			p_item.data({'delta_y':targ_delta_y,'delta_x':0})
				.find('.svg_map').css({'top':-0.5*targ_delta_y+'%','left':0,'width':'100%','height':'auto'});
		} else {
			var targ_w=1020*frame_h/800;
			var targ_delta_x=100*((targ_w/frame_w)-1);
			p_item.data({'delta_x':targ_delta_x,'delta_y':0})
				.find('.svg_map').css({'left':-0.5*targ_delta_x+'%','top':0,'height':'100%','width':'auto'});
		}
		parallax = p_item.parallaxInit({
			transitions_av: transitions_av,
			mouse_pos: mouse_pos
		})
	}
	function open_feedback(path) {
		open_popup({
			path: path,
			beforeOpen: function (frame) {
				frame.find('input, textarea').placeholder().on('change', function () {
					$(this).removeClass('error');
				})
					.filter('.phone_input').mask('+7 (999) 999-99-99');
				if (path=='feedback2') {
					frame.find('.num_input').val('АПАРТАМЕНТЫ #'+data.apartments[plans_val.n].n)
				} else
                if (path=='feedback3') {
                    frame.find('.num_input').val('МАШИНОМЕСТО #'+parking_data.apartments[plans_val.n].nt)
                }
			}
		})
	}
	var pano_arr=[	
		'<div class="div_100 p_item events-none" data-delta_x="62" data-delta_y="0"><img class="div_100 accel" style="left:-31%;" src="/assets/images/gallery/panorams/'+(mobile?'m/':'')+'01.jpg" /></div>',
		'<div class="div_100 p_item events-none" data-delta_x="40" data-delta_y="0"><img class="div_100 accel" style="left:-20%;" src="/assets/images/gallery/panorams/'+(mobile?'m/':'')+'02.jpg" /></div>',
		/*'<div class="div_100 p_item events-none" data-delta_x="261" data-delta_y="0"><img class="div_100 accel" style="left:-130.5%;" src="/assets/images/gallery/panorams/03.jpg" /></div>',
		'<div class="div_100 p_item events-none" data-delta_x="240" data-delta_y="0"><img class="div_100 accel" style="left:-120%;" src="/assets/images/gallery/panorams/04.jpg" /></div>'*/
	]
	function load_pano_img(t) {		
		$('.pano_p_items_frame').append(pano_arr[cur_pano])
			.find('.p_item:last').css({'translate3d':0,'opacity':0}).find('img').css({'translate3d':0}).load(function(){
				var fr=$(this).parent();
				fr.transition({'opacity':1},t,function(){
					$(this).prevAll().remove();	
				});
				parallax = fr.parallaxInit({
					transitions_av: transitions_av,
					mouse_pos: mouse_pos
				})
			})	
	}

    /* панорамы */


    function load_pano(targ, frame, normal) {
        preloader.show();
        var pano_frame = frame.find('.pano_place');
        pano_frame.transitionStop(true).css({'opacity': 0, 'display': 'block'}).addClass('off').html('<div class="pano_screen div_100" id="pano_' + targ + '"><script>embedpano({swf:"/assets/pages/pano/pano.swf",xml:"/assets/pages/pano/' + targ + '.xml",target:"pano_' + targ + '",id:"pano_' + targ + '_swf",wmode:"opaque","bgcolor":"#000000",html5:"prefer"});</script></div>');
        krpano = document.getElementById('pano_' + targ + '_swf');
        if (normal) {
            pano_frame.append('<div class="shadow events-none"></div><div class="close_btn pano_close"></div><div class="pano_help events-none"></div>');
            if (pano_help) {
                $('.pano_help').delay(1500).fadeIn(300).delay(4000).fadeOut(300);
                pano_help = false;
            }
        }
        return pano_frame;
    }
    function unload_pano() {
        preloader.hide();
        normal_pano.transitionStop(true).transition({'opacity': 0}, 500, function () {
            $(this).hide().html('');
        });
    }
    subload_pano = function (targ, keepview) {
        krpano.call('loadpano("/assets/pages/pano/' + targ + '.xml",null,' + (keepview || 'null') + ',BLEND(1));');
    }
    subload_bg_pano = function (targ) {
        body_size.load_content(targ);
    }
    pano_loaded = function () {
        preloader.hide();
        var targ = bg_pano || normal_pano;
        targ.transition({'opacity': 1}, 400, function () {
            $(this).removeClass('off');
        })
    }
    pano_rotated = function () {
        console.log(krpano.get('view.hlookat') + ' / ' + krpano.get('view.vlookat'));
    }
	
	

    /* поп-ап обратной связи и видео */

    function open_popup(options) {
        if (!$('.' + options.path + '_popup').length) {
            options = $.extend({
                time: 0,
                loadAnimate: function (targ) {
                    targ.children().css({'display': 'block', 'opacity': 0}).transition({'opacity': 1}, 500);
                },
                beforeOpen: function () {
                },
                frame: centrer2.find('.load_frame:last')
            }, options);
            options.frame.append('<div class="popup_overlay ' + options.path + '_popup"></div>')
                    .find('.' + options.path + '_popup').load('/assets/pages/popup/' + options.path + '.html', function () {
                $(this).css({'display': 'block', 'opacity': 0}).transition({'opacity': 1}, options.time, function () {
                    options.loadAnimate($(this));
                    options.beforeOpen($(this));
                })
            })
        }
    }

    function close_popup(options) {
        options = $.extend({
            time: 0,
            unloadAnimate: function (targ, callback) {
                targ.children().transitionStop(true).transition({'opacity': 0}, 500, callback);
            },
            afterClose: function () {
            }
        }, options);
        options.unloadAnimate(options.target, function () {
            options.target.transition({'opacity': 0}, options.time, function () {
                options.afterClose(options.target);
                $(this).remove();
            })
        });
    }

    /* квартиры */

    function load_parking_map(frame1, frame2) {        
        svg_paper_4=true;
        plans_val['floor_frame']=frame2;
        plans_val['apart_details']=frame2.find('.apart_details_frame');
        plans_val['apart_act']=frame2.find('.apart_act_frame');
        var fr = plans_val['floor_frame'].find('.plan_frame_centrer');
        fr.load('/assets/pages/parking/1.html', function () {
            var img=fr.find('.floor_map');
            fr.find('.floor_map_cont').clone().appendTo($(this));
            fr.find('.floor_map:first').attr('src', '/assets/i/blank.gif');
            svg_paper_2 = fr.find('.floor_map:first').area2svg({
                'opacity': 0,
                'fill': '#c05130',
                'fill-opacity': 1,
                'stroke-opacity': 0,
                click: function (el) {
                },
                mouseover: function (el) {
                },
                mouseout: function (el) {
                }
            })
            svg_paper_3 = fr.find('.floor_map:last').area2svg({
                'opacity': 0,
                'cursor': 'default',
                click: function (el) {
                    var alt = el.data('alt');
                    if (el.data('av') == 1) {
                        if(plans_val.n) {
                            if(plans_val.n==alt) {
                                svg_paper_2.getByAlt(alt).stop().animate(500).attr({'opacity': 0});
                                plans_val.n=null;
                                plans_val['apart_act'].transitionStop(true).transition({'opacity':0},500,function(){
                                    $(this).css({'display':'none'});
                                });
                            } else {
                                svg_paper_2.getByAlt(plans_val.n).stop().animate(500).attr({'opacity': 0});
                                plans_val.n=alt;
                            }
                        } else {
                            plans_val['apart_act'].transitionStop(true).css({'opacity':0,'display':'block'}).transition({'opacity':1},300);
                            svg_paper_2.getByAlt(alt).stop().animate(300).attr({'opacity': 1});
                            plans_val.n=alt;
                        }
                    }
                },
                mouseover: function (el) {
                    var alt = el.data('alt');
                    if (svg_paper_2) {
                        if (el.data('av') == 1) {
                            svg_paper_2.getByAlt(alt).stop().animate(300).attr({'opacity': 1});
                        }
                    }
                    load_parking_details(alt);
                },
                mouseout: function (el) {
                    var alt = el.data('alt');
                    if (svg_paper_2 && el.data('av') == 1 && plans_val.n!=alt) {
                        svg_paper_2.getByAlt(alt).stop().animate(500).attr({'opacity': 0});
                    }
                    if(!plans_val.n) {
                        plans_val['apart_details'].css({'display': 'none'});
                    } else {
                        load_parking_details(plans_val.n);
                    }
                },
                each: function (el) {
                    var alt = el.data('alt');
                    var d = parking_data.apartments[alt];
                    if (!d || d.st != 1) {
                        if (!d) {
                            d = {};
                            d.st = 0;
                            console.log('null data at ' + alt)
                        }
                        svg_paper_2.getByAlt(alt).attr({'opacity': 1,'fill':'#e5e5e5'});
                    } else {
                        el.attr({'cursor': 'pointer'});
                        /*var box = el.getCentroid();
                        apart_popups+='<div class="apart_popup n'+alt+'" style="top:'+(100*box.cy/h)+'%;left:'+(100*box.cx/w)+'%;"><div class="apart_popup_detail_frame css_ani"><div class="apart_popup_detail_str n0">количество комнат<div>'+d.n+'</div></div><div class="apart_popup_detail_str n1">площадь, м<sup>2</sup><div>'+d.sq+'</div></div></div></div>';*/
                    }
                    el.data('av', d.st);
                }
            })
            plan_check_size();
        })
    }
    function load_parking_details(alt) {
        var d = parking_data.apartments[alt];
        plans_val['apart_details'].css({'display': 'block'})
        if (d.st == 1) {
            plans_val['apart_details'].removeClass('not-sale')
                .find('.n1 .val').text(d.nt).end()
                .find('.n3 .val').text(d.t).end()
               // .find('.n4 .val').text(addspace(d.tc));
        } else {
            plans_val['apart_details'].addClass('not-sale');
        }
    }
    
    function load_korpus_map(frame1, frame2) {
        plans_val['b'] = 1;
		plans_val['s'] = 1;
        plans_val['floor_frame'] = frame2.find('.floor_frame');
        plans_val['sect_sel'] = frame2.find('.korp_det.n1');
        plans_val['floor_sel'] = frame2.find('.korp_det.n2');
        plans_val['apart_details'] = frame2.find('.apart_details_frame');
        plans_val['apart_views'] = frame2.find('.apart_views2');
        /*apart_zoom = frame2.find('.plan_frame_centrer').apartZoom({
            margin: 0.1,
            scale: 2
        })*/
        var floor_popup = frame1.find('.floor_popup');
        if (frame1.hasClass('opened_floor') || frame1.hasClass('opened_flat')) {
			body_size.addClass('dark');
            plans_val['f'] = Number(frame1.find('.plans_info').data('floor'));
            if (frame1.hasClass('opened_floor')) {
                load_floor(0, true);
            } else
            if (frame1.hasClass('opened_flat')) {
                var flat_num = plans_val['b'] + '-' + plans_val['f'] + '-' + Number(frame1.find('.plans_info').data('flat'));
                load_floor_details();
                load_apart(flat_num, 0, true);
                svg_paper_4 = true;
                plan_check_size();
            }
        }
		var img=frame1.find('.plans_map');
        svg_paper = img.area2svg({			
            'fill': '#ffffff',
            'fill-opacity': 1,
            'stroke-opacity': 0,
            click: function (el) {
                var av = el.data('av');
                if (av) {
                    var alt = el.data('alt');
                    open_floor_popup(alt);
                    floor_popup.css({'display': 'none'});
                }
            },
            mouseover: function (el) {
                var av = el.data('av');
				el.animate(300).attr({'opacity':0.61})
                if (av) {
                    var alt = el.data('alt');
                    var box = el.bbox();
                    var scale = img.width() / img.attr('width');
                    floor_popup.css({'display': 'block', 'top': box.cy * scale, 'left': 0.887*box.x2 * scale})
						.find('.n1>div').text(alt).end()
						.find('.n2>div').text(av);
                }
            },
            mouseout: function (el) {
				el.animate(500).attr({'opacity':0})
                if (el.data('av')) {
                    floor_popup.css({'display': 'none'});
                }
            }
        });
        test_floors(frame2, data.floors);
        svg_paper.changeSize(centrer1_w, centrer1_h);
    }
    function test_floors(frame2, where) {
        var rooms_av = [];
        frame2.find('.rooms_sel.active').each(function () {
            rooms_av.push(Number($(this).data('targ')));
        })
        svg_paper.forEach(function (el) {
            var alt = el.data('alt');
            var av = 0;
            var floor_data = where[plans_val['b'] + '-' + plans_val['s'] + '-' + alt];
            if (floor_data) {
                if (rooms_av.length) {
                    $.each(rooms_av, function (index, value) {
                        av += floor_data.arc[value];
                    })
                } else {
                    av += floor_data.at;
                }
            }
            if (av != 0) {
                el.attr({'opacity': 0, 'cursor': 'pointer'}).data('av', av);
            } else {
                el.attr({'opacity': 0, 'cursor': 'default'}).data('av', av);
            }
        })
    }
    function open_floor_popup(alt) {
        plans_val['f'] = Number(alt);
        plans_val['floor_frame'].transitionStop(true).css({'display': 'block', 'opacity': 0}).transition({'opacity': 1}, 700);
        //show_blur_bg();
        load_floor(0);
		body_size.addClass('dark');
    }
    function close_floor() {
        plans_val['floor_frame'].transitionStop(true).transition({'opacity': 0}, 400, function () {
            $(this).hide().find('.plan_frame_centrer').html('');
            svg_paper_2 = null;
            svg_paper_3 = null;
            svg_paper_4 = null;
        })
       // hide_blur_bg();
	   	body_size.removeClass('dark');
        body_size.load_content('/'+plans_val['view'], {'suppress_load': true});
    }
    function show_blur_bg(search_bg) {
        $('.blur_bg').transitionStop(true).css({'display': 'block', 'opacity': 0}).transition({'opacity': 1}, 400);
        if (search_bg) {
            $('.korp_det.n0').addClass('low-z');
        }
    }
    function hide_blur_bg(search_bg) {
        $('.blur_bg').transitionStop(true).transition({'opacity': 0}, 700, function () {
            $(this).hide();
            if (search_bg) {
                $('.korp_det.n0').removeClass('low-z');
            }
        });
    }
    function get_real_floor(f, delta) {
        f += delta;
        if (data.floors[plans_val['b'] + '-' + plans_val['s'] + '-' + f]) {
            return f;
        } else {
            return get_real_floor(f, delta);
        }
    }
    function load_floor_details() {        
        plans_val['floor_frame'].find('.floor_up, .floor_down').addClass('active');        
        if (!data.floors[plans_val['b'] + '-' + plans_val['s'] + '-' + (plans_val['f'] - 1)]) {
            plans_val['floor_sel'].find('.floor_down').removeClass('active');
        }
        if (!data.floors[plans_val['b'] + '-' + plans_val['s'] + '-' + (plans_val['f'] + 1)]) {
            plans_val['floor_sel'].find('.floor_up').removeClass('active');
        }
        plans_val['floor_frame']
        //.find('.windrose').attr('src','/assets/images/roses/'+plans_val['q']+'-'+plans_val['b']+'-'+plans_val['s']+'.png');
        plans_val['floor_sel']
			.find('.korp_det_val>div').text(plans_val['f']).end()
			.find('.floor_up>div').text(plans_val['f']+1).end()
			.find('.floor_down>div').text(plans_val['f']-1).end()
		load_minimap();
    }
    function load_floor(time, no_history) {
        load_floor_details();
        plans_val['floor_frame']
			.find('.plan_frame_centrer').transitionStop(true).transition({'opacity': 0}, time, function () {
				$(this).removeClass('apart_opened');
				load_floor_map(time);
				plans_val['floor_frame']                   
					.find('.at_floor').transitionStop(true).css({'display':'block','opacity':0}).transition({'opacity':1},time*2).end()
					.find('.at_apart').transitionStop(true).transition({'opacity':0},time*2,function(){
						$(this).css({'display':'none'});	
					});
			});
        if (!no_history) {
            body_size.load_content('/'+plans_val['view']+'/floor' + plans_val['f'], {'suppress_load': true});
        }
    }
	function load_minimap(targ) {
		var fr=plans_val['floor_frame'].find('.minimap_frame');
		fr.load('/assets/pages/minimap/'+plans_val['b']+'-'+plans_val['s']+'-'+plans_val['f']+'.html',function(){
			minimap=fr.find('.floor_minimap').area2svg({
				'fill':'#c05130',
				'opacity':0,
				'fill-opacity':1,
				'stroke-opacity':0,
				'cursor':'default',
				click:function(el) {
				},
				mouseover:function(el) {
				},
				mouseout:function(el) {
				},
				each:function(el) {
					if(targ) {
						var alt=el.data('alt');
						if(alt==targ) {
							el.attr({'opacity':1});
						}
					}
				}
			});
		})
	}
    function load_floor_map(time) {
        plans_val['floor_frame'].find('.plans_close').attr('class', 'plans_close floor_close');
        svg_paper_2 = null;
        svg_paper_3 = null;
        svg_paper_4 = true;
        plans_val['n'] = null;
        if (apart_zoom) {
            apart_zoom.setOff();
        }
        var fr = plans_val['floor_frame'].find('.plan_frame_centrer')
        fr.load('/assets/pages/floors/' + plans_val['b'] + '-' + plans_val['s'] + '-' + plans_val['f'] + '.html', function () {
			var av_rooms=[];
			var apart_popups='<div class="floor_dir n0"></div><div class="floor_dir n1"></div><div class="floor_dir n2"></div><div class="floor_dir n3"></div>';
			var img=fr.find('.floor_map');
			var w=img.attr('width');
			var h=img.attr('height');
            img.load(function () {
                $(this).off('load');
                fr.transition({'opacity': 1}, time);
            })
            fr.find('.floor_map_cont').clone().appendTo($(this));
            fr.find('.floor_map:first').attr('src', '/assets/i/blank.gif');
            svg_paper_2 = fr.find('.floor_map:first').area2svg({
                'opacity': 0,
                'fill': '#000000',
                'fill-opacity': 0.2,
                'stroke-opacity': 0,
                click: function (el) {
                },
                mouseover: function (el) {
                },
                mouseout: function (el) {
                }
            })
            svg_paper_3 = fr.find('.floor_map:last').area2svg({
                'opacity': 0,
                'cursor': 'default',
                click: function (el) {
                    var alt = el.data('alt');
                    if (el.data('av') == 1) {
                        load_apart(alt, 200);
                    }
                },
                mouseover: function (el) {
                    var alt = el.data('alt');
                    if (svg_paper_2) {
                        if (el.data('av') == 1) {
                            svg_paper_2.getByAlt(alt).animate(300).attr({'opacity': 1});
							fr.find('.apart_popup.n'+alt).transitionStop(true).css({'display':'block'}).transition({'opacity':1},150);
                        }
                        //load_apart_details(alt);
                    }
                },
                mouseout: function (el) {
                    var alt = el.data('alt');
                    if (svg_paper_2 && el.data('av') == 1) {
                        svg_paper_2.getByAlt(alt).animate(500).attr({'opacity': 0});
						fr.find('.apart_popup.n'+alt).transitionStop(true).transition({'opacity':0},250,function(){
                            $(this).css({'display':'none'});
                        });
                    }
                    if (!plans_val['n']) {
                        plans_val['apart_details'].css({'display': 'none'});
                    }
                },
                each: function (el) {
                    var alt = el.data('alt');
                    var d = data.apartments[alt];
                    if (!d || d.st != 1) {
                        if (!d) {
                            d = {};
                            d.st = 0;
                            console.log('null data at ' + alt)
                        }
                        svg_paper_2.getByAlt(alt).attr({'opacity': 1,'fill':'#e5e5e5'});
						/*if($.inArray(-1,av_rooms)==-1) {
							av_rooms.push(-1);	
						}*/
                    } else {
                        //svg_paper_2.getByAlt(alt).attr(rc_attr(data.apartments[alt].rc));
                        el.attr({'cursor': 'pointer'});
						/*if($.inArray(d.rc,av_rooms)==-1) {
							av_rooms.push(d.rc);	
						}*/
						//var box=el.bbox();
						var box = el.getCentroid();
						apart_popups+='<div class="apart_popup n'+alt+'" style="top:'+(100*box.cy/h)+'%;left:'+(100*box.cx/w)+'%;"><div class="apart_popup_detail_frame css_ani"><div class="apart_popup_detail_str n0">количество комнат<div>'+d.n+'</div></div><div class="apart_popup_detail_str n1">площадь, м<sup>2</sup><div>'+d.sq+'</div></div></div></div>';
                    }
                    el.data('av', d.st);
                }
            })
            plan_check_size();
			/*av_rooms.sort();
			var txt='';
			$.each(av_rooms,function(index,value){
				if(value==-1) {
					txt+='<span class="rc_help sold"><span class="rc_help_icon"></span>Не в продаже</span>';
				} else {
					txt+='<span class="rc_help sale rc'+value+'" data-targ="'+value+'"><span class="rc_help_icon"></span>'+value+' комнат'+word_end(value)+'</span>';
				}
			})
			plans_val['floor_frame'].find('.floor_help').html(txt)
				.find('.sale').each(function(){
					$(this).find('.rc_help_icon').css(rc_attr($(this).data('targ')))
				});
			txt=null;
			av_rooms=null;*/
			$('.floor_map:last').after(apart_popups).find('.apart_popup').css({'opacity':0,'translate3d':0});
			apart_popups=null;
        })
    }
    function load_apart_details(alt) {
        var d = data.apartments[alt];
        if (d.st == 1) {
            plans_val['apart_details'].removeClass('not-sale')
                .find('.n1 .val').text(d.n).end()
                .find('.n3 .val').text(d.sq).end()
               // .find('.n4 .val').text(addspace(d.tc));
        } else {
            plans_val['apart_details'].addClass('not-sale');
        }
        var apart_views='';
        $.each(d.vs.split(','),function(index,value){
            if(value!=0) {
                apart_views+='<span class="apart_views_icon n'+value+'"></span>';
            }
        })
        if(apart_views!='') {
            apart_views='<span class="apart_views_title">Виды на:</span>'+apart_views;
        }
        plans_val['apart_views'].html(apart_views);
    }


    function load_apart_img(frame, path, svg, time) {
        if (!svg || ($.browser.msie && $.browser.version < 10)) {
            frame.html('<img class="apart_img" src="' + path + '.png" />')
                    .find('.apart_img').load(function () {
                $(this).css({'translate3d': 0}).off('load')
                frame.transition({'opacity': 1}, time);
                if (apart_zoom) {
                    apart_zoom.setOn();
                }
            })
        } else {
            $.get(path + '.svg', function (data) {
                var $svg = $(data).find('svg');
                $svg = $svg.removeAttr('xmlns:a');
                $svg.css({'translate3d': 0}).attr('class', 'apart_img');
                frame.html($svg).transition({'opacity': 1}, time);
                if (apart_zoom) {
                    apart_zoom.setOn();
                }
            }, 'xml');
        }
    }
    function load_apart(alt, time, no_history) {
        plans_val['n'] = alt;
        svg_paper_2 = null;
        svg_paper_3 = null;
		load_apart_details(alt);
        plans_val['floor_frame'].find('.plan_frame_centrer').transitionStop(true).transition({'opacity': 0}, time, function () {
			$(this).addClass('apart_opened');
            load_apart_img($(this),'/assets/images/apts/'+alt,false,time);
            //load_apart_img($(this), '/assets/images/apts/' + '1-6-17', false, time);
        })
        plans_val['floor_frame']
			.find('.at_apart').transitionStop(true).css({'display':'block','opacity':0}).transition({'opacity':1},time*2).end()
			.find('.at_floor').transitionStop(true).transition({'opacity':0},time*2,function(){
				$(this).css({'display':'none'});	
			}).end()
			.find('.pdf_btn').data('targ', alt);
        plans_val['floor_frame'].find('.plans_close').attr('class', 'plans_close apart_close');
        if (!no_history) {
            body_size.load_content('/'+plans_val['view']+'/floor' + plans_val['f'] + '/flat' + data.apartments[plans_val['n']].tn, {'suppress_load': true});
        }
		load_minimap(alt);
    }

    /* карты */

	var gmaps_styles=[ { "stylers": [ { "saturation": -64 } ] } ];


    function load_placement_map(frame) {
        var obj_point = new google.maps.LatLng(55.744183,37.556249);
        var obj_point_screen = new google.maps.LatLng(55.744183,37.556249);
        var myOptions = {
            zoom: 15,
            center: obj_point_screen,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
			styles: gmaps_styles
        };
        var map = new google.maps.Map(document.getElementById('map_place'), myOptions);
        var image0 = new google.maps.MarkerImage(
			'/assets/i/sprite.png',
			new google.maps.Size(76, 76),
			new google.maps.Point(458, 182),
			new google.maps.Point(38, 38)
		);
        var marker0 = new google.maps.Marker({
            position: obj_point,
            map: map,
            icon: image0
        });
    }

    
    function load_contacts_map(frame) {
        var obj_point = new google.maps.LatLng(55.744183,37.556249);
        var obj_point_screen = new google.maps.LatLng(55.744183,37.556249);
        var myOptions = {
            zoom: 15,
            center: obj_point_screen,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.LARGE,
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
			styles: gmaps_styles
        };
        var map = new google.maps.Map(document.getElementById('map_place'), myOptions);
        var image0 = new google.maps.MarkerImage(
			'/assets/i/sprite.png',
			new google.maps.Size(76, 76),
			new google.maps.Point(458, 182),
			new google.maps.Point(38, 38)
		);
        var marker0 = new MarkerWithLabel({
            position: obj_point,
            map: map,
            icon: image0,
			labelContent: '<span class="gmaps_labels_span">'+frame.find('.contacts_adr').html()+'</span>',
            labelClass: 'gmaps_labels',
        });
		google.maps.event.addListener(marker0, 'click', function () {
			open_feedback('feedback0');
		})
    }


    function stop_bg_video() {
        big_ani_step = null;
        if (ani) {
            clearInterval(videoInt);
            clearTimeout(videoTime);
            bg_video.pause();
        }
    }
    function load_bg_video(targ, video_hide) {
        var i = 0;
        $('#bg_video').show();        
        bg_video.src([
            {type: 'video/webm', src: '/assets/video/' + targ + '.webm'},
            {type: 'video/mp4', src: '/assets/video/' + targ + '.mp4'}
        ]);
        videoInt = setInterval(function () {
            i++;
            if ((bg_video.bufferedPercent() > 0.60 || i > 60) && html_loaded) {
                preloader.hide();
                clearInterval(videoInt);
                bg_video.play();
                if (video_hide) {
                    video_hide.stop(true).transitionStop(true).delay(video_hide_delay).transition({'opacity': 0}, 0);
                }
            }
        }, 50);
    }
    function load_page_video(targ) {
        if (ani) {
            stop_bg_video();
            var video_hide = scroll1.find('.' + targ + '_frame').children('.video-hide');
            videoTime = setTimeout(function () {
                html_loaded = true;
                load_bg_video('bg/' + targ, video_hide);
            }, time * 1.2);
        }
    }
    function big_ani_get_bg(callback) {
        scroll1.append('<div class="load_frame double_ani_frame"></div>');
        var fr = $('.double_ani_frame');
        var targ_num = big_ani_group.length - 1;
        var loaded_num = 0;
        function load_ajax_bg(i) {
            $.ajax({
                type: "GET",
                url: page_urls[big_ani_group[i].split('-')[1]],
                beforeSend: function (request) {
                    request.setRequestHeader('X-PJAX', 'true');
                },
                success: function (data) {
                    var txt1 = /to_centrer1">([\s\S]*)<\/div>\s*<div class="to_centrer2/.exec(data)[1];
                    var src = /bg_img.*src="(.*)"/.exec(txt1)[1];
                    var bg = '<img class="div_100 n' + i + '" src="' + src + '" />';
                    fr.append(bg)
                            .find('.n' + i).css({'opacity': 0}).load(function () {
                        loaded_num++;
                        if (loaded_num == targ_num) {
                            callback();
                        }
                    });
                }
            })
        }
        for (var i = 0; i < targ_num; i++) {
            load_ajax_bg(i);
        }
    }
    body_size.pjax2({
        beforeSend: function (new_page) {
            preloader.show();
            unload_js(old_page, new_page);
            stop_bg_video();
            var video_name = old_page + '-' + new_page;
            var frame1 = scroll1.find('.' + old_page + '_frame');
            var frame2 = scroll2.find('.' + old_page + '_frame');
            var video_hide = frame1.children('.video-hide');            
            if (ani && $.inArray(video_name, ani_names) != -1) {
                if(video_name=='advantages-advantages-view2') {
                    video_name='plans-view2-plans';
                } else
                if(video_name=='advantages-view2-advantages') {
                    video_name='plans-plans-view2';
                }
                is_video = true;
                html_loaded = false;
                var bg_visible = false;                
                function video_load_ready() {
                    video_hide.stop(true).transitionStop(true).transition({'opacity': 1}, 0.25 * time, function () {
                        if (bg_visible == false) {
                            bg_visible = true;
                            load_bg_video('fly/' + video_name, video_hide);
                        }
                    })
                    frame1.children(':not(.video-hide)').transitionStop(true).transition({'opacity': 0}, time, function () {
                        $(this).hide();
                    })
                    frame2.transitionStop(true).transition({'opacity': 0}, time, function () {
                        $(this).remove();
                    })
                }
                if ($.inArray(video_name, pano_ani_names) != -1) {
                    krpano.call('moveto(0,0,tween(easeInExpo,0.5));');
                    videoTime = setTimeout(function () {
                        video_load_ready();
                    }, 500);
                } else
                if (big_ani_names[video_name]) {
                    big_ani_step = 0;
                    big_ani_group = big_ani_names[video_name];
                    video_name = big_ani_group[big_ani_step];
                    big_ani_get_bg(function () {
                        video_load_ready();
                    });
                } else {
                    video_load_ready();
                }
            } else {
                is_video = false;
                video_hide.stop(true).transitionStop(true).transition({'opacity': 1}, 0.25 * time);
            }
        },
        success: function (data, type, url, slug, custom_type) {
            //console.log(type,url,slug,custom_type)
            page = type;
            var txt1 = /to_centrer1">([\s\S]*)<\/div>\s*<div class="to_centrer2/.exec(data)[1];
            var txt2 = /to_centrer2">([\s\S]*)<\/div>\s*$/.exec(data)[1];
            if (mobile) {
            	txt1 = txt1.replace(/(bg_img.*"\s.*)\/(\w*\.jpg".*\/>)/, '$1/m/$2');
            }
            scroll1.append('<div class="load_frame ' + type + '_frame' + custom_type + '" style="left:100%;">' + txt1 + '</div>');
            scroll2.append('<div class="load_frame ' + type + '_frame' + custom_type + '" style="left:100%;">' + txt2 + '</div>');
            $('.load_frame.' + type + '_frame:last-child .bg_img:first').load(function () {
                $(this).off('load');
                if (is_video) {
                    html_loaded = true;
                } else {
                    preloader.hide();
                    load_js(type, old_page);
                }
            })
            add_stat(url);
        },
        success_function: load_js,
    });


    body_size.on('click', function (e) {
        var targ_id = e.target.id;
        var targ_class = e.target.className;
        var targ = $(e.target);
        var targ_data = targ.data('targ');

        if (targ_class == 'ani_toggle') {
            ani = false;
            targ.addClass('off').text('вкл. анимацию');
        } else
        if (targ_class == 'ani_toggle off') {
            ani = true;
            targ.removeClass('off').text('выкл. анимацию');
        } else
        if (targ_class == 'audio_toggle') {
            targ.addClass('off').text('вкл. звук');
            bg_music.pause();
            $.cookie('music', 'off', {path: '/', expires: 365});
            audio_playing = false;
        } else
        if (targ_class == 'audio_toggle off') {
            targ.removeClass('off').text('выкл. звук');
            bg_music.play();
            $.cookie('music', 'on', {path: '/', expires: 365});
            audio_playing = true;
        } else
        if (targ_class == 'pano_open_btn') {
            normal_pano = load_pano(targ_data, scroll2.find('.vtour_frame'), true);
        } else
        if (targ_class == 'close_btn pano_close') {
            unload_pano();
        } else
        if (targ_class == 'to_plans to_video css_ani') {
            open_popup({
                path: targ_data,
                beforeOpen: function (frame) {
                    popup_video = frame.popupVideoInit({
                        margin_w: 80,
                        margin_h: 80,
                        //autoplay: false
                    });
                },
                loadAnimate: function (frame) {
                    frame.find('.video_popup_center').css({'display': 'block', 'opacity': 0, 'scale': 0.8}).transition({'opacity': 1, 'scale': 1}, 500);
                },
                time: 200,
                frame: centrer2
            })
        } else
        if (targ_class == 'close_btn video_close') {
            close_popup({
                target: targ.parents('.popup_overlay'),
                afterClose: function (frame) {
                    popup_video = unloadPlugin(popup_video);
                },
                unloadAnimate: function (frame, callback) {
                    frame.find('.video_popup_center').transition({'opacity': 0, 'scale': 1.2}, 500, callback);
                },
                time: 200
            })
            if (slideshow) {
                slideshow.on();
            }
        } else
        if (targ_class == 'apart_act reserve_btn css_ani' || targ_class == 'footer_call css_ani') {
			open_feedback('feedback'+targ_data);			
        } else
        if (targ_class == 'close_btn feedback_close') {
            close_popup({
                target: targ.parents('.popup_overlay')
            })
        } else
        if (targ_class == 'send_btn css_ani') {
            var fr = targ.parents('.feedback_bg');
            fr.find('input, textarea').each(function () {
                var val = $(this).val();
                if ($(this).hasClass('required') && (val == '' || val == $(this).attr('placeholder') || ($(this).hasClass('mail_input') && !/\S+@\S+\.\S+/.test(val)))) {
                    $(this).addClass('error');
                }
            })
            if (!fr.find('.error').length) {
                var txt_name = fr.find('.name_input').val();
                var txt_text = '';
                var txt_title = fr.find('.feedback_name').data('title');
                var message_type = fr.find('.feedback_name').data('title2');
                var contact = '';
                if(fr.find('.phone_input').val()) {
                    contact = fr.find('.phone_input').val();
                } else 
				if(fr.find('.mail_input').val()) {
					contact = fr.find('.mail_input').val();
				}
                
                targ.addClass('no-active');
                $.cookie('name', $.md5(txt_name), {expires: 1, path: '/'});
                fr.find('input, textarea').each(function () {
                    txt_text += $(this).data('title') + ': ' + $(this).val() + '\n';
                })
                /*if(fr.hasClass('n2')) {
                 txt_text+='\nКвартира: '+plans_val['n']; // для брони квартиры
                 }*/
				yaCounter28167102.reachGoal(targ_data);
                $.ajax({
                    url: '/feedbacks/send',
                    cache: false,
                    type: 'POST',
                    data: {type: message_type, contact: contact, name: txt_name, title: txt_title, text: txt_text},
                    success: function (data) {
                        if (data == 'ok') {
                            fr
                                    .find('.feedback_inputs').fadeOut(200).end()
                                    .find('.feedback_sended').delay(200).fadeIn(200).delay(5000).fadeOut(200, function () {
                                close_popup({
                                    target: fr.parents('.popup_overlay')
                                })
                            });
                        } else {
                            targ.removeClass('no-active');
                        }
                    },
                    error: function () {
                        targ.removeClass('no-active');
                    }
                });
            }
        } else
        if (targ_class == 'rotate_help' || targ_class == 'rotate_help_frame') {
            rotate_help.hide();
            rotate_help = null;
        } else
        if (targ_class == 'plans_close floor_close') {
            close_floor();
        } else
        if (targ_class == 'plans_close apart_close') {
            load_floor(200);
        } else
        if (targ_class == 'sect_left active') {
            plans_val['s']--;
            load_floor(100);
        } else
        if (targ_class == 'sect_right active') {
            plans_val['s']++;
            load_floor(100);
        } else
        if (targ_class == 'floor_down active') {
            plans_val['f']--;
            load_floor(100);
        } else
        if (targ_class == 'floor_up active') {
            plans_val['f']++;
            load_floor(100);
        } else
        if (targ_class == 'apart_act pdf_btn css_ani') {			
           //window.open('/assets/php/pdf.php?id=' + targ_data[4], '_blank');
             window.open('/assets/pdf/' + targ_data[4] + '.pdf', '_blank');
        } else
        if (targ_class == 'apart_act pdf_btn parking_pdf css_ani') {            
           window.open('/assets/php/pdf.php?id=' + plans_val.n+'&t=p', '_blank');
        } else
        if (targ_class == 'fonts_sel') {
            targ.addClass('active').siblings().removeClass('active');
            $('#body_frame').attr({'style': 'font-family: "' + targ_data + '" !important;'});
        } else
        if (targ_class == 'skip_intro') {
            load_page_js(page, old_page);
        } else
        if (targ_class == 'text_slide_title') {
            targ.addClass('active').next().stop(true).css({'opacity': 0}).animate({'opacity': 1, 'height': 'show'}, 500);
            targ.parent().siblings('.text_slide').find('.active').trigger('click');
        } else
        if (targ_class == 'text_slide_title active') {
            targ.removeClass('active').next().stop(true).animate({'opacity': 0, 'height': 'hide'}, 500);
        } else
        if (targ_class == 'close_btn news_popup_close') {
            $('.news_popup').transitionStop(true).data('visible', false).transition({'opacity': 0, 'margin-left': 390}, 500, function () {
                $(this).css({'display': 'none'});
            });
			$('.news_subpage_btns').hide();
            var url = '/about/news';
            body_size.load_content(url, {'suppress_load': true});
            add_stat(url);
            $('.news_item.active').removeClass('active');
        } else
        if (targ_class == 'menu_close_btn') {
			open_menu();
        } else
        if (targ_class == 'menu_close_btn opened') {
			close_menu();
        } else
        if (targ_class == 'home_menu_left active') {
			$('.home_menu_dot.active').prevAll('.home_menu_dot:first').trigger('click');
		} else
        if (targ_class == 'home_menu_right active') {
			$('.home_menu_dot.active').nextAll('.home_menu_dot:first').trigger('click');
		} else
        if (targ_class == 'gallery_menu_open') {
			//$('.gallery_menu_frame').moveEl({type:'from',opacity:0,time:600})
			//$('.g_btn, .gallery_menu_open').moveEl({type:'to',opacity:0,time:600})
			
		} else
        if (targ_class == 'g_btn left pano_btn' || targ_class == 'g_btn right pano_btn') {
			cur_pano+=Number(targ_data);
			if(cur_pano<0) {
				cur_pano=pano_arr.length-1;
			} else
			if(cur_pano>pano_arr.length-1) {
				cur_pano=0;
			}
			load_pano_img(700);
		} else
        if (targ_class == 'home_slogan_text n4 pjax css_ani') {
			from_home=true;
		}
    })
	
	/*.on('click', '.home_menu_dot', function () {
        if(!$(this).hasClass('active')) {
			var prev_num=Number($('.home_menu_dot.active').data('targ'));
			var num=Number($(this).data('targ'));
			function load_parallax_img(frame,src,ani_prev) {
				frame.append('<img class="div_100 n'+num+'" src="'+src+'" />')
					.find('.div_100:last').css({'opacity':0,'translate3d':0}).load(function(){
						if(ani_prev) {
							$(this).prevAll().transition({'opacity':0},800,function(){
								$(this).remove();	
							})
						}
						$(this).transition({'opacity':1},800,function(){
							$(this).prevAll().remove();
						})	
					})	
			}
			load_parallax_img($('.p_item.n1'),'/assets/images/parallax/'+(mobile?'m/':'')+num+'_bg.jpg',false);
			load_parallax_img($('.p_item.n2'),'/assets/images/parallax/'+num+'.png',true);
			var dir=1;
			if(prev_num>num) {
				dir=-1;
			}
			$('.home_slogan_frame.n'+prev_num).moveEl({type:'to',opacity:0,'margin-left':-150*dir,time:600});
			$('.home_slogan_frame.n'+num).moveEl({type:'from',opacity:0,'margin-left':200*dir,time:600,delay:300});
			
			$(this).addClass('active').siblings().removeClass('active');
			if(num==0) {
				$('.home_menu_left').removeClass('active');
			} else {
				$('.home_menu_left').addClass('active');
			}
			if(num==3) {
				$('.home_menu_right').removeClass('active');
			} else {
				$('.home_menu_right').addClass('active');
			}
			$('.home_frame .shadow.n'+prev_num).moveEl({type:'to',opacity:0,time:800});
			$('.home_frame .shadow.n'+num).moveEl({type:'from',opacity:0,time:800});
			
		}
    })*/
	.on('mouseenter', '.menu_over', function () {
		if($(this).data('open')=='closed') {
			open_menu();
		}
		clearTimeout(menu_auto_close);
	})
    .on('click', '.day-night_sel_frame', function () {
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
            gallery.reloadPath($('.gallery_place').data('path')+'night/');
        } else {
            gallery.reloadPath($('.gallery_place').data('path'));
        }
    })
	if (mobile && window.DeviceOrientationEvent) {
        window.ondeviceorientation = function(event) {
			var x_max=20;
			var y_max=20;
			var y_center=45;
			var event_gamma=event.gamma;
			var event_beta=event.beta;
			var event_x, event_y;
			var orientation=window.orientation;			
			if(orientation==90) {
				if(event_gamma<=90 && event_gamma>=45) {
					event_gamma=-180+event_gamma;
					if(event_beta<0) {
						event_beta=-180-event_beta;
					} else {
						event_beta=180-event_beta;
					}
				}
				event_x=event_beta;
				event_y=-event_gamma;            	
			} else
			if(orientation==-90) {
				if(event_gamma>=-90 && event_gamma<=-45) {
					event_gamma=180+event_gamma;
					if(event_beta<0) {
						event_beta=-180-event_beta;
					} else {
						event_beta=180-event_beta;
					}
				}
				event_x=-event_beta;
				event_y=event_gamma;            	
			} else
			if(orientation==180) {
				if(event_beta<=-90) {
					event_gamma=-event_gamma;
				}
				event_x=-event_gamma;
				event_y=-event_beta;
			} else {
				if(event_beta>=90) {
					event_gamma=-event_gamma;
				}
				event_x=event_gamma;
				event_y=event_beta;
			}
			mouse_pos = {
				pageX : frame_w*Math.min(1,Math.max(0,(event_x+x_max)/(2*x_max)))*mobile_scale,
				pageY : frame_h*Math.min(1,Math.max(0,(event_y+y_max-y_center)/(2*y_max)))*mobile_scale,
			};
            if (parallax) {
				parallax.move(mouse_pos);
            }
        }
    } else {
		body_size.on('mousemove', function (e) {
			mouse_pos=e;
			if (parallax) {
				parallax.move(e);
			}
			if (apart_zoom) {
				apart_zoom.move(e);
			}			
		})
	}
	
	
	open_menu();
	var menu_auto_close=setTimeout(function(){
		close_menu();
	},4000)
});