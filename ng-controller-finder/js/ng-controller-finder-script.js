var ngControllerFinder;

function NgControllerFinder(eventListenerName){
	this.eventListenerName = eventListenerName;

}

NgControllerFinder.prototype.createPlugin = function(){
	
            var html =  "<div id='option-" + config.options_id.angular + "' class='options center-element'><img src='" + config.img.angular + "' class='option-img'></div>" + 
                        "<div id='option-"  + config.options_id.tap +  "' class='options center-element'><img src='" + config.paths.ionic_icons + config.img.click + "'  class='option-img'></div>" +
                        "<div id='option-" + config.options_id.ng_controller_text + "' class='center-element'>Click the element to find its <b style='padding:0 4px;'> ng-controller </b> </div>" +
                        "<div id='option-" + config.options_id.close + "' class='options center-element'><img src='" + config.paths.ionic_icons + config.img.close + "'  class='option-img'></div>"
            ;
    
            var s = document.createElement('div');
            s.setAttribute('id', 'ng-controller-finder');
            s.innerHTML = html;

            document.body.appendChild(s);

};



NgControllerFinder.prototype.addListener = function (){
        
        window.addEventListener(this.eventListenerName, this.pluginListener);

};

NgControllerFinder.prototype.removeListener = function (){

    window.removeEventListener(this.eventListenerName, this.pluginListener);

};


NgControllerFinder.prototype.pluginListener = function(e){

    var event = e || window.event;
    console.log(e.target);


    if(event.target.getAttribute('class').indexOf('option-') === -1){
        console.log('Click event over : ' + event.target.getAttribute('id'));

        var a = ngControllerFinder.getParentNgController(event.target);
        if (a){
            document.getElementById('option-ng-controller-text').innerHTML = a.getAttribute('ng-controller');
            console.log('ng-controller: ' + a.getAttribute('ng-controller'));
        }

    }

};


NgControllerFinder.prototype.getParentNgController = function(el) {
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
};

var config = {
	paths : {
		webpage : '//jcmederos.github.io/ng-controller-finder/',
		github_repository : '//jcmederos.github.io/ng-controller-finder/',
		ng_controller_finder : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/',
		ionic_icons : '//jcmederos.github.io/ng-controller-finder/bower_components/Ionicons/png/512/'
	},
	css_path : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/ng-controller-finder/css/',
	ng_controller_finder_styles : 'ng-controller-finder.css',
	img:{
		angular : '//angular.io/resources/images/logos/angular2/angular.png',
		click : 'information-circled.png',
		close : 'ios7-close-outline.png'
	},
	options_id : {
		angular : 'angular' ,
		tap: 'tap',
		ng_controller_text: 'ng-controller-text',
		close : 'close'
	}
};

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

function wait_for_script_load(look_for, callback) {
    var interval = setInterval(function() {
        if (eval("typeof " + look_for) != 'undefined') {
            clearInterval(interval);
            callback();
        }
    }, 50);
}

(function(){

	ngControllerFinder = new NgControllerFinder('click');
	ngControllerFinder.createPlugin();
	
	importCSS(config.paths.ng_controller_finder + 'css/' + 'ng-controller-finder.css');
        
	if(window.angular){
		console.log("ng-closest-controller : ANGULAR was loaded");
		ngControllerFinder.addListener();
	}else{
		console.log("ng-closest-controller : ANGULAR NOT loaded");
		document.getElementById('option-ng-controller-text').innerHTML = 'Angular is not loaded';
		document.getElementById('option-ng-controller-text').style.color = 'red';
	}

    ngControllerFinder.addListener();

})();

//Alternative method with jQuery
// $('selector').closest('[ng-controller]').attr('ng-controller');
