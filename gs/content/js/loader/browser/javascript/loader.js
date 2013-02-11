var GSJSLoader = function() {
    // Load a script. jQuery could be one of the scripts that we could be 
    // loading, so everything here uses the core DOM methods.

    // http://css-tricks.com/snippets/javascript/async-script-loader-with-callback/
    // http://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/

    //
    // Private Variables
    //

    // The dictionary of scripts we have loaded, as (URL, element) pairs.
    var scripts = {};

    //
    // Private methods
    //
    
    var callback_is_function = function (callback) {
        var retval = null;
        retval = (callback && (typeof(callback) === "function"));
        return retval;
    }

    var create_script_element = function(url, callback) {
        // Create a <script> element, that loads "src" and calls the "callback"
        // when it is loaded
        var e = null;
        e = document.createElement('script');
        e.type = "text/javascript";
        e.src = url;
        e.async = true;
        
        if (callback_is_function(callback)) {
            e.onload = callback;
        }
        return e;
    }

    var add_script = function(script) {
        // Add the "script" to the <head> of the document.
        var head = null;
        head = document.getElementsByTagName('head')[0];
        head.appendChild(script);
    };

    var script_exists = function(url) {
        var retval = null;
        retval = !(typeof scripts[url] === "undefined");
        return retval
    }

    var script_loaded = function(url) {
        var retval = null;
        var script = null;
        script = scripts[url];
        retval = ((typeof script !== "undefined") &&
                  (!script.readyState || (script.readyState == 'loaded')
                   || (scipt.readyState == 'complete')));
        return retval
    }

    var attach_onload_callback = function(url, callback) {
        var script = null;
        if (callback_is_function(callback)) {
            script = scripts[url];
            script.addEventListner('onload', callback, false);
        }
    }

    // Public Methods
    return {
        loaded: function(url) {script_loaded(url);},
        register: function(url) {scripts[url] = script;},
        with_module: function(url, callback) {
            // Run the function in "callback", ensuring that the module in
            // "url" is loaded first.
            var script = null;
            if (script_exists(url)) {
                if (script_loaded(url)) {
                    callback();
                } else {
                    attach_onload_callback(url, callback);
                }
            } else { // The script does not exist.
                script = create_script_element(url, callback);
                add_script(script);
                register(script);
            }
        }
    };
};
var gsJsLoader = GSJSLoader();

