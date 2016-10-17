$(function(){

	/*-------------Toggle-menu-------------*/
	$('.toggle-menu').click(function() {
		$(this).toggleClass('on');
		$('.hidden-menu').slideToggle('slow');
	});

	/*-------------Smooth-scroll-------------*/
	$('.main-menu').on('click','a', function(){
		$('body,html').animate({scrollTop:$($(this).attr('href')).position().top-79}, 500);
		//$('.hidden-menu').slideToggle('slow');
	});

	/*-------------Swiper-default-set-------------*/
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		nextButton: '.swiper-button-next',
		prevButton: '.swiper-button-prev',
		spaceBetween: 30
	});

});
