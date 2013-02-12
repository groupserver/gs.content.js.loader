// Load a script. jQuery could be one of the scripts that we could be 
// loading, so everything here uses the core DOM methods.

var gs_is_function = function(f) {
        var retval = null;
        retval = (f && (typeof(f) === "function"));
        return retval;
}


var GSSequentialJSLoader = function (loader) {
    var globalLoader = loader;
    var origCallback = null;
    var toLoad = null;

    var load = function() {
        var script = null;
        if (toLoad.length > 0) {
            script = toLoad.pop();
            globalLoader.with(script, load);
        } else if ((toLoad.length == 0) && gs_is_function(origCallback)) {
            origCallback.call();
        }
    }

    return {
        load_modules: function(scripts, callback) {
            toLoad = scripts;
            toLoad.reverse();
            origCallback = callback;

            load();
        }
    }
}


var GSJSLoader = function() {
    //
    // Private Variables
    //

    // The dictionary of scripts we have loaded, as (URL, element) pairs.
    var scripts = {};
    var scriptsLoading = {};

    //
    // Private methods
    //
    
    var load_handler = function(url, script, callback) {
        // A closure around a function factory. Thanks slebetman
        // http://stackoverflow.com/questions/1997531/javascript-callback-function-and-parameters
        return function(event) {
            console.info('Loaded ' + url);
            scripts[url] = script; 
            delete scriptsLoading[url];
            if (gs_is_function(callback)) {
                callback.call();
            }
        }
    }

    var create_script_element = function(url, callback) {
        // Create a <script> element, that loads "src" and calls the "callback"
        // when it is loaded
        var e = null;
        e = document.createElement('script');
        e.type = "text/javascript";
        e.src = url;
        e.async = true;
        console.info(e);
        e.onload = load_handler(url, e, callback);
        return e;
    }

    var add_script = function(script) {
        // Add the "script" to the <head> of the document.
        var head = null;
        head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    };

    var script_loaded = function(url) {
        var retval = null;
        retval = (typeof scripts[url] !== "undefined");
        return retval;
    }

    var script_loading = function(url) {
        var retval = null;
        retval = (typeof scriptsLoading[url] !== "undefined");
        return retval;
    }

    var script_exists = function(url) {
        var retval = null;
        retval = (script_loaded(url) || script_loading(url));
        return retval
    }

    var attach_onload_callback = function(url, callback) {
        var script = null;
        if (gs_is_function(callback)) {
            script = scriptsLoading[url];
            if (script.addEventListener) {
                script.addEventListener('load', callback, false);
            } else {
                window.attachEvent('onload', callback);
            }
        }
    }

    var load_module = function(url, callback) {
        // Run the function in "callback", ensuring that the module in
        // "url" is loaded first.
        var script = null;
        if (script_loaded(url)) {
            callback.call();
        } else if (script_loading(url)) {
            attach_onload_callback(url, callback);
        } else { // The script does not exist.
            script = create_script_element(url, callback);
            add_script(script);
            scriptsLoading[url] = script;
        }
    }

    // Public Methods
    return {
        loaded: function(url) {return script_loaded(url);},
        with: function(url, callback) {
            var m = null;
            if (typeof url === 'string') {
                load_module(url, callback);
            } else {
                m = new GSSequentialJSLoader(this);
                m.load_modules(scripts, callback);
            }
        },
    };
};
var gsJsLoader = GSJSLoader();
