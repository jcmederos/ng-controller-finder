var ngControllerFinder;

var config = {
    paths : {
        webpage : '//jcmederos.github.io/ng-controller-finder/',
        github_repository : '//github.com/jcmederos/ng-controller-finder/',
        ng_controller_finder : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/',
        ionic_icons : '//jcmederos.github.io/ng-controller-finder/bower_components/Ionicons/png/512/'
    },
    css_path : '//jcmederos.github.io/ng-controller-finder/ng-controller-finder/ng-controller-finder/css/',
    ng_controller_finder_styles : 'ng-controller-finder.css',
    img:{
        angular : '//angular.io/resources/images/logos/angular2/angular.png',
        info : 'information-circled.png',
        close : 'ios7-close-outline.png',
        github_black : 'social-github.png',
        github_white : 'social-github-outline.png'
    },
    options_id : {
        angular : 'angular' ,
        info: 'info',
        ng_controller_text: 'ng-controller-text',
        close : 'close'
    }
};

function NgControllerFinder(eventListenerName){
	this.eventListenerName = eventListenerName;
    // this.infoButtomHtml = config.paths.webpage;
}

/*
NgControllerFinder.prototype.addInfoText = function () {
    var infoButtomHtml = "<span><a href='" + config.paths.webpage + "'><img>" + config.paths.webpage + "</a><span><br>" + "<span><a href='" + config.paths.github_repository + "'><img>" + config.paths.github_repository + "</a><span>"
        ;
    document.getElementById('option-ng-controller-text').innerHTML = infoButtomHtml;
};
*/

NgControllerFinder.prototype.createPlugin = function(){
	
            var html =  "<div id='option-" + config.options_id.angular + "' class='options center-element'><img src='" + config.img.angular + "' class='option-img'></div>" + 
                        "<div id='option-"  + config.options_id.info +  "' class='options center-element'><img src='" + config.paths.ionic_icons + config.img.info + "'  class='option-img'></div>" +
                        "<div id='option-" + config.options_id.ng_controller_text + "' class='center-element'>Click the element to find its <b style='padding:0 4px;'> ng-controller </b> </div>" +
                        "<div id='option-" + config.options_id.close + "' class='options center-element'><img src='" + config.paths.ionic_icons + config.img.close + "'  class='option-img'></div>"
            ;
    
            var s = document.createElement('div');
            s.setAttribute('id', 'ng-controller-finder');
            s.innerHTML = html;

            document.body.appendChild(s);

};



NgControllerFinder.prototype.addPluginListener = function (){
        window.addEventListener(this.eventListenerName, this.pluginListener);
};

NgControllerFinder.prototype.removePluginListener = function (){
    window.removeEventListener(this.eventListenerName, this.pluginListener);
};

NgControllerFinder.prototype.removePlugin = function (){
    var pluginElement = document.getElementById('ng-controller-finder');
    pluginElement.parentNode.removeChild(pluginElement);
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
		console.log("ng-controller-finder : ANGULAR was loaded");
		ngControllerFinder.addPluginListener();
	}else{
		console.log("ng-controller-finder : ANGULAR NOT loaded");
		document.getElementById('option-ng-controller-text').innerHTML = 'Angular is not loaded';
		document.getElementById('option-ng-controller-text').style.color = 'red';
	}

    ngControllerFinder.addPluginListener();

    var closeBtn = document.querySelector('#option-close img');
    var infoBtn = document.querySelector('#option-info img');

    //Listeners
    closeBtn.addEventListener('click', ngControllerFinder.removePlugin);
    // infoBtn.addEventListener('click', ngControllerFinder.addInfoText);

    infoBtn.addEventListener('click', function(){

        /*
        var infoButtomHtml = "<span><a href='" + config.paths.webpage + "'><img src='"+ config.paths.ionic_icons + config.img.github_black +"'>" + config.paths.webpage + "</a><span><br>" + "<span><a href='" + config.paths.github_repository + "'><img src='" + config.paths.ionic_icons + config.img.github_white +"'>" + config.paths.github_repository + "</a><span>"
            ;
        */

        var infoButtomHtml = "<span><a href='" + config.paths.webpage + "'><img src='"+ config.paths.ionic_icons + config.img.github_black +"'>" + config.paths.webpage + "</a></span><br>" + "<span><a href='" + config.paths.github_repository + "'><img src='" + config.paths.ionic_icons + config.img.github_white +"'>" + config.paths.github_repository + "</a></span>"
        ;
        document.getElementById('option-ng-controller-text').innerHTML = infoButtomHtml;
    });

})();

//Alternative method with jQuery
// $('selector').closest('[ng-controller]').attr('ng-controller');
