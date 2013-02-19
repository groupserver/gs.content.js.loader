// Load a script. jQuery could be one of the scripts that we could be 
// loading, so everything here uses the core DOM methods.

function gs_is_function(f) {
        var retval = null;
        retval = (f && (typeof(f) === "function"));
        return retval;
}


function GSSequentialJSLoader(loader) {
    var globalLoader = loader, origCallback = null, toLoad = null;

    function load() {
        var script = null;
        if (toLoad.length > 0) {
            script = toLoad.pop();
            globalLoader.with_module(script, load);
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
} //GSSequentialJSLoader


function GSJSLoader() {
    //
    // Private Variables
    //

    // The dictionary of scripts we have loaded, as (URL, element) pairs.
    var scripts = {}, scriptsLoading = {};

    //
    // Private methods
    //
    
    function load_handler(url, script, callback) {
        // A closure around a function factory. Thanks slebetman
        // http://stackoverflow.com/questions/1997531/javascript-callback-function-and-parameters
        return function(event) {
            scripts[url] = script; 
            delete scriptsLoading[url];
            if (gs_is_function(callback)) {
                callback.call();
            }
        }
    }

    function create_script_element(url, callback) {
        // Create a <script> element, that loads "src" and calls the "callback"
        // when it is loaded
        var e = null;
        e = document.createElement('script');
        e.type = "text/javascript";
        e.src = url;
        e.async = true;
        e.onload = load_handler(url, e, callback);
        return e;
    }

    function add_script(script) {
        // Add the "script" to the <head> of the document.
        var head = null;
        head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    };

    function script_loaded(url) {
        var retval = null;
        retval = (typeof scripts[url] !== "undefined");
        return retval;
    }

    function script_loading(url) {
        var retval = null;
        retval = (typeof scriptsLoading[url] !== "undefined");
        return retval;
    }

    function script_exists(url) {
        var retval = null;
        retval = (script_loaded(url) || script_loading(url));
        return retval
    }

    function attach_onload_callback(url, callback) {
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

    function load_module(url, callback) {
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
        loading: function(url) {return script_loading(url);},
        exists: function(url) {return script_exists(url);},
        with_module: function(url, callback) {
            var m = null;
            if (typeof url === 'string') {
                load_module(url, callback);
            } else {
                m = new GSSequentialJSLoader(this);
                m.load_modules(url, callback);
            }
        }
    }
} // GSJSLoader

var gsJsLoader = GSJSLoader();
