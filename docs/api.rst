:mod:`gs.content.js.loader` API
===============================

In GroupServer a page may be made up of multiple components that
are quite separate from each other. A common pattern is for some
a component to add some HTML to the page, and then to inject some
JavaScript code into the bottom of the page. Each component is
usually unaware of what modules have been loaded by the other
components. To get around this global tracking of loaded modules
prevents modules from being loaded and parsed
unnecessarily. While originally written for GroupServer, there is
nothing specific to GroupServer in this product.

.. js:data:: gsJsLoader

   The global object (singleton) that keeps track of what is
   loaded.

The :js:func:`gsJsLoader.with_module` method of the
``gsJsLoader`` object loads one or more resources and runs a
function afterwards. Introspection is provided by the
:js:func:`gsJsLoader.loaded`, :js:func:`gsJsLoader.loading` and
:js:func:`gsJsLoader.exists` methods.

.. js:function:: gsJsLoader.with_module(url | [url1, url2… urlN], fn)

  :param string url: The URL of the module you wish to load. If a
                      *list* of URLs is supplied each module is
                      loaded *in sequence*.

  :param function fn: The function to execute after the module
                      has loaded. (Usually this is the code that
                      depends on the module.) If a *list* of URLs
                      is supplied as the first argument then the
                      function is executed after all the modules
                      have been loaded.

  :returns: Nothing.

  *With* some *modules* run a *function.*

   * If the module has not been loaded and not been requested:

     + Inserts ``<script>`` elements into the ``<head>`` of the
       document, to cause the module or modules specified in
       ``url`` to load.

     + Connects the ``function`` to the ``load`` (or ``onload``
       for older versions of Internet Explorer) callback of the
       ``<script>``.

   * If the module has been requested, but has not been loaded:

     + Connects the ``function`` to the ``load`` callback of the
       ``<script>``.

   * If the module has been loaded:

     + Calls the ``function``.

.. js:function:: gsJsLoader.loaded(url)

   :param string url: The URL of the module to test.
   :returns: ``true`` if the module has been loaded; ``false`` if
             the module is *being* loaded or has yet to be
             requested.
   :rtype: boolean

   This function tests if a module has *been* loaded (past-tense).

.. js:function:: gsJsLoader.loading(url)

   :param string url: The URL of the module to test.
   :returns: ``true`` if the module is being loaded; ``false`` if
             the module has *been* loaded or has not been requested.
   :rtype: boolean

   Test if a module is being *loaded* (present continuous tense).


.. js:function:: gsJsLoader.exists(url)

   :param string url: The URL of the module to test.
   :returns: ``true`` if the module has being loaded or has been requested;
             ``false`` otherwise.
   :rtype: boolean

   Test if a module is known (it has either been loaded, or is
   being loaded).

Examples
--------

Run the function ``init_topic_search`` with the base search code:

.. code-block:: javascript

    gsJsLoader.with_module('/++resource++gs-search-base-js-20121217.js', 
                           init_topic_search);

Load two modules, jQuery and then Twitter Bootstrap. Execute the
function ``my_code`` after both modules have been loaded.

.. code-block:: javascript

  gsJsLoader.with_module(['/++resource++jquery-1.8.3.js', 
                          '/++resource++bootstrap-2.2.2/js/bootstrap.js'], 
                         my_code);

Wait for the window to load, then initialise the post searching
code. Detect and support loading if we are using a version of
Microsoft Internet Explorer that does not support the standard
``addEventListener`` method:

.. code-block:: javascript

  if (window.addEventListener) {
      window.addEventListener('load', function () {
          gsJsLoader.with_module(
              '/++resource++gs-search-base-js-20121217.js',
              init_post_search);
      }, false);
  
  } else {
      window.attachEvent('onload', function () {
          gsJsLoader.with_module(
              '/++resource++gs-search-base-js-20121217.js',
              init_post_search);
      });
  }

The same call as above, but using jQuery to attach to the
``load`` event:

.. code-block:: javascript

  jQuery(window).load(function () {
            gsJsLoader.with_module(
                '/++resource++gs-search-base-js-20121217.js',
                init_post_search);
   });

(This module is devoid of jQuery code, so it can be used to
*load* jQuery.)
