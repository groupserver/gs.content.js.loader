Introduction
============

This module contains a dynamic JavaScript module loader_. It allows modules
to be loaded *from* *JavaScript*, rather than having the dependencies
written in HTML ``script`` elements. It is based on the ideas of others
(see Acknowledgements_ below), but it mainly differs from prior work in
that it keeps track of a **global** list of loaded scripts. The reason for
this is the odd way that GroupServer_ is written.

In GroupServer a page may be made up of multiple components, called
*viewlets,* that are quite separate from each other. A common pattern is
for some viewlets to inject some JavaScript code into the bottom of the
page. Each viewlet is usually unaware of what modules have been loaded by
the other viewlets; the global tracking of loaded modules, provided
here, prevents modules from being loaded and parsed unnecessarily. While
originally written for GroupServer, there is nothing specific to
GroupServer in this product.

Finally, the getScript_ function from jQuery performs a similar role to the
loader_ presented here. Most people should use ``getScript`` as I am sure
that it is better written and better maintained.

.. _getScript: http://api.jquery.com/jQuery.getScript/


Loader
======

The with_ method of the ``gsJsLoader`` object loads one or more resources
and runs a function afterwards. The global ``gsJsLoader`` object keeps
track of what is loaded.

``with``
--------

*With* some *modules* run a *function.*

Synopsis
~~~~~~~~

::

  gsJsLoader.with(URL | [URL₁, URL₂… URLₙ], function);

Arguments
~~~~~~~~~

``url``:
  The URL of the module you wish to load. If a *list* of URLs is supplied
  each module is loaded *in sequence*.

``function``:
  The function to execute after the module has loaded. (The code that
  depends on the module.) If a *list* of URLs is supplied as the first
  argument then the function is executed after all the modules have been
  loaded.

Example
~~~~~~~

Run the function ``init_topic_search`` with the base search code::

    gsJsLoader.with('/++resource++gs-search-base-js-20121217.js', 
                    init_topic_search);

Load two modules, jQuery_ and then Bootstrap_. Execute the function
``my_code`` after both modules have been loaded.::

  gsJsLoader.with(['/++resource++jquery-1.8.3.js', 
                   '/++resource++bootstrap-2.2.2/js/bootstrap.js'], 
                   my_code);

.. _jQuery: http://jquery.com/
.. _Bootstrap: http://twitter.github.com/bootstrap/

Wait for the window to load, then initialise the post searching
code. Detect and support loading if we are using a version of Microsoft
Internet Explorer that does not support the standard ``addEventListener``
method::

  if (window.addEventListener) {
      window.addEventListener('load', function () {
          gsJsLoader.with('/++resource++gs-search-base-js-20121217.js',
                          init_post_search);
      }, false);
  
  } else {
      window.attachEvent('onload', function () {
          gsJsLoader.with('/++resource++gs-search-base-js-20121217.js',
                          init_post_search);
      });
  }

Acknowledgements
================

The Loader_ code was based on two jQuery loaders, from `CSS Tricks`_ and
the blog by `Joel Varty`_. The code to load multiple modules was based on
the `Async Script Loader with Callback`_ from CSS Tricks.

.. _CSS Tricks: http://css-tricks.com/snippets/jquery/load-jquery-only-if-not-present/
.. _Joel Varty: http://weblogs.asp.net/joelvarty/archive/2009/05/07/load-jquery-dynamically.aspx
.. _Async Script Loader with Callback: http://css-tricks.com/snippets/javascript/async-script-loader-with-callback/

Resources
=========

- Code repository: https://source.iopen.net/groupserver/gs.content.js.loader/
- Questions and comments to http://groupserver.org/groups/development/
- Report bugs at https://redmine.iopen.net/projects/groupserver/

.. _GroupServer: http://groupserver.org/

..  LocalWords:  jQuery UI Plone
