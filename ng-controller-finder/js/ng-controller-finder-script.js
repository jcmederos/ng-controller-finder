
var config = {
	paths : {
		ng_controller_finder : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/'
	},
	img_path : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/bower_components/Ionicons/png/512/',
	css_path : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/ng-controller-finder/css/',
	ng_controller_finder_styles : 'ng-controller-finder.css',
	img_src:{
		angular : '//angular.io/resources/images/logos/angular2/angular.png',
		click : 'information-circled.png',
		close : 'close-circled.png'
	},
	options_id : {
		angular : 'angular' ,
		tap: 'tap',
		ng_controller_text: 'ng-controller-text',
		close : 'close'
	}
}

function importJS(src, look_for, onload) {
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', src);
    if (onload) wait_for_script_load(look_for, onload);
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        head.appendChild(s);
    } else {
        document.body.appendChild(s);
    }
}

function importCSS(href, look_for, onload) {
    var s = document.createElement('link');
    s.setAttribute('rel', 'stylesheet');
    s.setAttribute('type', 'text/css');
    s.setAttribute('media', 'screen');
    s.setAttribute('href', href);
    if (onload) wait_for_script_load(look_for, onload);
    var head = document.getElementsByTagName('head')[0];
    if (head) {
        head.appendChild(s);
    } else {
        document.body.appendChild(s);
    }
}


function createNgClosestControllerContainer(){
    var s = document.createElement('div');
    s.setAttribute('id', 'closest-ng-controller');   
    document.body.appendChild(s);
}


function wait_for_script_load(look_for, callback) {
    var interval = setInterval(function() {
        if (eval("typeof " + look_for) != 'undefined') {
            clearInterval(interval);
            callback();
        }
    }, 50);
}

(function(){
    
            var html =  "<div id='option-" + config.options_id.angular + "' class='options angular-not-found center-element'><img src='" + config.img_src.angular + "' class='option-img'></div>" + 
                        "<div id='option-"  + config.options_id.tap +  "' class='options angular-not-found center-element'><img src='" + config.img_path + config.img_src.click + "'  class='option-img'></div>" +
                        "<div id='option-" + config.options_id.ng_controller_text + "' class='center-element'>Click the element to find its <b style='padding:0 4px;'> ng-controller </b> </div>" +
                        "<div id='option-" + config.options_id.close + "' class='options center-element'><img src='" + config.img_path + + config.img_src.close + "'  class='option-img'></div>"
            ;
    
            var s = document.createElement('div');
            s.setAttribute('id', 'closest-ng-controller');
            s.innerHTML = html;
            
            document.body.appendChild(s);
    
    // importCSS('https://dv0akt2986vzh.cloudfront.net/stable/lib/selectorgadget.css');
    importCSS(config.paths.ng_controller_finder + 'css/' + 'ng-controller-finder.css');
    
    /*
    if(jQuery){
        addListener();
    }else{
        importJS('https://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js', 'jQuery', function() { // Load everything else when it is done.
            jQuery.noConflict();
            addListener();
        });
    }
    */
    
    if(window.angular){
        console.log("ng-closest-controller : ANGULAR was loaded");
        addListener();
    }else{
        console.log("ng-closest-controller : ANGULAR NOT loaded");
        document.getElementById('option-ng-controller-text').innerHTML = 'Angular is not loaded';
        document.getElementById('option-ng-controller-text').style.color = 'red';
    }
            
    function addListener(){
        
        window.addEventListener('click', function(e){
            console.log(e.target);
            
            
            if(e.target.getAttribute('class').indexOf('option-') === -1){
                console.log('------------------------'+e.target.getAttribute('id'));

                // console.log($(e.target).closest('[ng-controller]').attr('ng-controller'));
                
                //if(jQuery){}
                //console.log('ng-controller: ' + $(e.target).closest('[ng-controller]').attr('ng-controller'));
                
                //else
                var a = findUpTag(e.target);
                if (a){ 
                    document.getElementById('option-ng-controller-text').innerHTML = a.getAttribute('ng-controller');
                    console.log('ng-controller: ' + a.getAttribute('ng-controller'));
                }
                
                 // createNgClosestControllerContainer();   
            }
            
        });
    }
    
    function findUpTag(el) {
        var all = '';
        var found = false;
        
        while (el.parentNode) {
            el = el.parentNode;
            try{
                if (el != document && el.hasAttribute('ng-controller') == true){
                    if(all == ''){
                        all = 'ng-controller';
                        console.log('ng-controller: ' + el.getAttribute('ng-controller'));
                        found = true;
                        return el;
                    }
                }else{
                    console.log('ng-controller: ' + 'NOT FOUND');
                }
            }catch(ex){
                console.log("Exception");
                console.log(el);
            }
        }
        
        return null;
    }
    

})();

// $('body').closest('[ng-controller]').attr('ng-controller');
