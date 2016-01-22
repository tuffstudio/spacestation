// VARS
var $j = jQuery.noConflict();
var $rslts;
var $grid;

var layouts = new Array(
            'standard left',
            'standard left space',
            'standard right',
            'standard right space',
            'square_big top-left',
            'square_big top-right'
            );


// Range SLIDER
	/* We need to change slider appearance oninput and onchange */
	function showValue(val,slidernum) {
	  // console.log(val);
	}
	/* we often need a function to set the slider values on page load */
	function setValue(val,num) {
	  $j("#slider"+num).value = val;
	  showValue(val,num);
	}


// clearForm
function clearForm() { 
                $form = $j('fieldset#parameters');
                $form.find('input').val('');
                // $form.find('input[type=checkbox]').attr('checked', false);
                $form.find('option:selected').attr('selected', false);

                $form.find('.select').each(function() {
                    var $element = $j(this);
                    var $select = $element.find('select');
                    var $value = $element.find('.select-value');

                    $value.text($select.find(':selected').html());
                });

                $j('form#theForm').submit();
            }

//(re)triggerMasonry
	// function triggerMasonry(){

	// 	// don't proceed if $grid has not been selected
	// 	if ( !$grid.length ){
	// 		return;
	// 	}

	// 	$rslts.masonry('layout');
	// }
// inintMsnry
	// function inintMsnry(){ 
	
	// 	$rslts.masonry({
	//     	// options
	//     	itemSelector : '.property_search_result',
	//     	columnWidth: 300,
	//     	gutterWidth: 20
	//      });

	// 	imagesLoaded( '#result', function() {
 //        	$rslts.masonry('layout');
 //    	});

	// }
// killMsnry
	// function killMsnry(){ 
	// 		$rslts.masonry('destroy');
	// }

// layoutButtonActive
	function layoutButtonActive(currentLayout){
		
		$j('.view a').removeClass('active');
		$j('#'+currentLayout).addClass('active');
		
	}


// DOCUMENT READY - 2st
	$j(document).ready(function() {


		$rslts = $j('.tuff');
		$grid = $j('.grid');


		// LAYOUT COOKIE CHECK - 1st
			$j(function() {

				switch($j.super_cookie().read_value("layout_cookie","layout")){
					
					case 'grid':
						layoutButtonActive('grid');
						$rslts.removeClass('list').addClass('grid');
						$j('article.portfolio_masonry_item').removeClass('standard').removeClass('left').removeClass('space').removeClass('right').removeClass('top-left').removeClass('top-right').addClass('square_big').addClass('top-full');
						break;
					
					case 'dynamic':
						layoutButtonActive('list');
						$rslts.removeClass('grid').addClass('list');

						$j('article.portfolio_masonry_item').removeClass('square_big').removeClass('top-full').each(function(index, el) {
							var randomLayout = layouts[Math.floor(Math.random()*layouts.length)];
							$j(this).addClass(randomLayout);

						});

						break;
					
					default:
						alert('no "layout_cookie"');
				}

			});
		
	//LAYOUT CHANGE BUTTONS
		$j('#grid').click(function() {
			$rslts.fadeOut(300, function() {
				$j(this).removeClass('list').addClass('grid').fadeIn(300);
				$j('article.portfolio_masonry_item').removeClass('standard').removeClass('left').removeClass('space').removeClass('right').removeClass('top-left').removeClass('top-right').addClass('square_big').addClass('top-full');
				$j('.arrow-right , .arrow-left').remove();

				// check if layout_cookie exists
				if($j.super_cookie().check("layout_cookie")){
					//if available -> replace value to 'grid'
					$j.super_cookie().replace_value("layout_cookie","layout","grid");
				}else{
					//if not available create layout_cookie with value "grid"
					$j.super_cookie({expires: 7,path: "/"}).create("layout_cookie",{layout:"grid"});
				}
				
				setTimeout(function(){ initPortfolioMasonry(); },300 );
			});
			layoutButtonActive('grid');
			return false;
		});
		
		$j('#list').click(function() { 
			$rslts.fadeOut(300, function() {
				$j(this).removeClass('grid').addClass('list').fadeIn(300);
				

				$j('article.portfolio_masonry_item').removeClass('square_big').removeClass('top-full').each(function(index, el) {
					var randomLayout = layouts[Math.floor(Math.random()*layouts.length)];
					$j(this).addClass(randomLayout);

					if (randomLayout.toLowerCase().indexOf("left") >= 0){
						$j(this).find('.portfolio_link_for_touch').after("<span class='arrow-right'></span>");
					}else if (randomLayout.toLowerCase().indexOf("right") >= 0){
						$j(this).find('.portfolio_link_for_touch').after("<span class='arrow-left'></span>");
					}
				});

				// check if layout_cookie exists
				if($j.super_cookie().check("layout_cookie")){
					//if available -> replace value to 'dynamic'
					$j.super_cookie().replace_value("layout_cookie","layout","dynamic");
				}else{
					//if not available create layout_cookie with value "dynamic"
					$j.super_cookie({expires: 7,path: "/"}).create("layout_cookie",{layout:"dynamic"});
				}

				setTimeout(function(){ initPortfolioMasonry(); },300 );
			});
			layoutButtonActive('list');
			return false;
		});

	//onChange FORM SUBMIT

	$j('form#theForm').on('change', 'input', function() {
		$j(this).closest("form").submit();
	});

	$j('form[name="PB_page_form"]').on('change', 'select, input', function() {
		$j(this).closest("form").submit();
	});


	// Clear Filters
	$j('.js-clear-all-filters').on('click',function(e){ 
		e.preventDefault();
		clearForm();
	})

	
	
});

// WINDOW LOAD - 3rd
	$j(window).load(function(){

		// fade in error box if '#no_listing' url query
		if(document.URL.split('#')[1] === 'no_listing'){
			$j('.error').fadeIn();
		}

	});

